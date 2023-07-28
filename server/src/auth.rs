use odyssey::{wallet::Wallets, BlockChain};
use rocket::serde::json::Json;
use secp256k1::SecretKey;
use serde::{Deserialize, Serialize};

#[get("/does_wallet_exist/<secret_key>")]
pub fn does_wallet_exist(secret_key: &str) -> &'static str {
    let wallets = Wallets::fetch_wallets();
    let key: SecretKey = bincode::deserialize(&hex::decode(secret_key).unwrap()).unwrap();

    for (_, wallet) in wallets.wallets.iter().clone() {
        if wallet.private_key == key {
            return "true";
        }
    }

    "false"
}

#[derive(Serialize, Deserialize)]
pub struct KeyPair {
    public_key: String,
    private_key: String,
}

#[get("/create_wallet")]
pub fn create_wallet() -> Json<KeyPair> {
    let wallets = Wallets::fetch_wallets();
    let res = wallets.create_wallet();
    if let Err(e) = res {
        println!("Failed to create wallet: {}", e);
        Json(KeyPair {
            public_key: "".to_owned(),
            private_key: "".to_owned(),
        })
    } else {
        let wallet = wallets.get_wallet(res.unwrap().as_str()).unwrap();
        let chain = BlockChain::fetch_blockchain();
        let address = wallet.get_address();

        let _ = chain.add_block(vec![
            odyssey::transactions::new_coinbase_transaction(&address, "".to_owned()).unwrap()
        ]);

        Json(KeyPair {
            public_key: hex::encode(bincode::serialize(&wallet.public_key).unwrap()),
            private_key: hex::encode(bincode::serialize(&wallet.private_key).unwrap()),
        })
    }
}
