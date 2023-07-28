use num_bigint::BigInt;
use odyssey::{
    wallet::{hash_public_key, Wallets},
    BlockChain,
};
use rocket::serde::json::Json;
use serde::Serialize;

#[derive(Serialize)]
pub struct Addresses {
    pub address: String,
    pub balance: u64,
    pub last_transaction: String,
}

#[get("/get_addresses")]
pub fn get_addresses() -> Json<Vec<Addresses>> {
    let wallets = Wallets::fetch_wallets();
    let mut addresses = vec![];

    let chain = BlockChain::fetch_blockchain();

    for wallet in wallets.wallets.iter() {
        let address = wallet.1.get_address();
        let mut iterator = chain.get_iterator();

        loop {
            let block = iterator.next_block();

            for transaction in block.transactions.iter() {
                let mut last_transaction = "never".to_string();

                if !transaction.is_coinbase() {
                    for input in transaction.inputs.iter() {
                        if input.uses_key(&hash_public_key(&wallet.1.public_key)) {
                            last_transaction = block.timestamp.to_string();
                        }
                    }
                }

                addresses.push(Addresses {
                    address: address.clone(),
                    balance: chain.get_balance(&address),
                    last_transaction,
                });
            }

            if block.prev_hash == BigInt::from(0) {
                break;
            }
        }
    }

    Json(addresses)
}
