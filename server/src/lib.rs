#[macro_use] extern crate rocket;

pub mod auth;
pub mod transactions;
pub mod metadata;
pub mod addresses;

pub fn get_routes() -> Vec<rocket::Route> {
    routes![
        auth::does_wallet_exist,
        auth::create_wallet,
        transactions::transaction,
        transactions::get_transaction_history,
        metadata::get_metadata,
        addresses::get_addresses,
    ]
}