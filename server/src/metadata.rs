use odyssey::{wallet::Wallets, BlockChain};
use rocket::serde::json::Json;
use secp256k1::SecretKey;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct MetaData {
    pub balance: u64,
    pub address: String,
    pub public_key: String,
}

#[get("/get_metadata/<secret_key>")]
pub fn get_metadata(secret_key: &str) -> Result<Json<MetaData>, String> {
    let wallets = Wallets::fetch_wallets();
    let secret_key: SecretKey = bincode::deserialize(&*hex::decode(secret_key).unwrap()).unwrap();

    for wallet in wallets.wallets.iter() {
        if wallet.1.private_key == secret_key {
            let address = wallet.1.get_address();
            let metadata = MetaData {
                balance: BlockChain::fetch_blockchain().get_balance(&address),
                address,
                public_key: hex::encode(bincode::serialize(&wallet.1.public_key).unwrap()),
            };

            return Ok(Json(metadata));
        }
    }

    Err("wallet not found".to_string())
}
