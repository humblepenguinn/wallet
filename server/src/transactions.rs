use std::sync::Mutex;

use rocket::serde::json::Json;
use odyssey::wallet::Wallets;
use odyssey::BlockChain;
use serde::{Serialize, Deserialize};

pub struct DataBaseHandler {
    pub transactions_db: Mutex<sled::Db>,
}

#[derive(Serialize, Deserialize)]
pub struct Transaction {
    pub reciever: String,
    pub date: String,
    pub amount: u64,
}


impl DataBaseHandler {
    fn new() -> Self {
        let db = sled::open("transactions").unwrap();
        DataBaseHandler {
            transactions_db: Mutex::new(db),
        }
    }

    fn get_instance() -> &'static mut Self {
        static mut INSTANCE: Option<DataBaseHandler> = None;
        static ONCE: std::sync::Once = std::sync::Once::new();

        ONCE.call_once(|| unsafe {
            INSTANCE = Some(DataBaseHandler::new());
        });

        unsafe { INSTANCE.as_mut().unwrap() }
    }
}

#[get("/transaction/<sender>/<amount>/<reciever>")]
pub fn transaction(sender: &str, amount: u64, reciever: &str) -> String {
    let wallets = Wallets::fetch_wallets();

    let chain = BlockChain::fetch_blockchain();
    if let Err(e) = chain.send(sender, reciever, amount, wallets) {
        return e;
    }

    let db_handler = DataBaseHandler::get_instance();

    let _ = db_handler.transactions_db.lock().unwrap().insert(
        sender,
        bincode::serialize(&Transaction {
            reciever: reciever.to_string(),
            date: chrono::Utc::now().to_string(),
            amount,
        })
        .unwrap(),
    );

    "true".to_string()
}

#[get("/get_transaction_history/<address>")]
pub fn get_transaction_history(address: String) -> Json<Vec<Transaction>> {
    let db_handler = DataBaseHandler::get_instance();

    let mut transactions = Vec::new();

    for transaction in db_handler.transactions_db.lock().unwrap().iter() {
        let transaction = transaction.unwrap();
        let sender_address = String::from_utf8(transaction.0.to_vec()).unwrap();

        let transaction: Transaction = bincode::deserialize(&transaction.1).unwrap();

        if sender_address == address {
            transactions.push(transaction);
        }
    }

    Json(transactions)
}