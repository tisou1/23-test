3use sqlx::{mysql::MySqlPool, prelude::FromRow};
// use std::env;
// use structopt::StructOpt;


#[derive(Debug, FromRow)]
struct User {
    id: i32,
    name: String,
    age: i32,
}

#[tokio::main]
async fn main()-> Result<(), sqlx::Error> {
    println!("Hello, world!");

    // let pool = MySqlPoolOptions::new()
    //     .max_connections(5)
    //     .connect("mysql://root:123456@localhost/rs_data")
    //     .await?;

    let pool = MySqlPool::connect("mysql://root:123456@localhost/rs_data").await?;
    let mut conn = pool.acquire().await?;

    let  rows = sqlx::query_as::<_, User>("SELECT id,name,age FROM user")
        .fetch_all(&mut *conn)
        .await?;

    for row in rows.iter() {
        println!("{:?}", row);
    }

    Ok(())
}



[dependencies]
anyhow = "1.0"
futures = "0.3"
sqlx = { version = "0.7", features = [ "mysql", "runtime-tokio-native-tls" ] }
structopt = "0.3"
tokio = { version = "1.20.0", features = ["full"]}
