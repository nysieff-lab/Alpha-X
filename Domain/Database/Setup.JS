const db = require("./Database.JS");

db.pragma("foreign_keys = ON");

db.exec(`
    CREATE TABLE IF NOT EXISTS Logins (
        LoginID INTEGER PRIMARY KEY AUTOINCREMENT,
        UserName TEXT NOT NULL UNIQUE,
        Password TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS Phone ( 
        PhoneID INTEGER PRIMARY KEY AUTOINCREMENT, 
        Brand TEXT NOT NULL, 
        Series TEXT NOT NULL, 
        PhoneModel TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS Product (
        ProductID INTEGER PRIMARY KEY AUTOINCREMENT,
        PhoneID INTEGER NOT NULL,
        CaseModel TEXT NOT NULL,
        Colour TEXT NOT NULL,
        StockQuantity INTEGER NOT NULL DEFAULT 0,
        Price REAL NOT NULL,
        Image BLOB,
        Description TEXT,

        FOREIGN KEY (PhoneID)
            REFERENCES Phone(PhoneID)
    );

    CREATE TABLE IF NOT EXISTS Customer (
        CustomerID INTEGER PRIMARY KEY AUTOINCREMENT,
        Name TEXT NOT NULL,
        Surname TEXT NOT NULL,
        Email TEXT NOT NULL,
        PhoneNumber TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS Address (
        AddressID INTEGER PRIMARY KEY AUTOINCREMENT,
        CustomerID INTEGER NOT NULL,
        Address TEXT NOT NULL,
        City TEXT NOT NULL,
        Province TEXT NOT NULL,
        PostalCode TEXT NOT NULL,
        Country TEXT NOT NULL,

        FOREIGN KEY (CustomerID)
            REFERENCES Customer(CustomerID)
    );

    CREATE TABLE IF NOT EXISTS Orders (
        OrdersID INTEGER PRIMARY KEY AUTOINCREMENT,
        CustomerID INTEGER NOT NULL,
        AddressID INTEGER NOT NULL,
        OrderDate TEXT NOT NULL,
        TotalAmount REAL NOT NULL,

        FOREIGN KEY (CustomerID)
            REFERENCES Customer(CustomerID),

        FOREIGN KEY (AddressID)
            REFERENCES Address(AddressID)
    );

    CREATE TABLE IF NOT EXISTS OrdersDetails (
        OrdersItemID INTEGER PRIMARY KEY AUTOINCREMENT,
        OrdersID INTEGER NOT NULL,
        ProductID INTEGER NOT NULL,
        OrdersItemQuantity INTEGER NOT NULL,
        OrdersItemPrice REAL NOT NULL,

        FOREIGN KEY (OrdersID)
            REFERENCES Orders(OrdersID),

        FOREIGN KEY (ProductID)
            REFERENCES Product(ProductID)
    );

`);

console.log('Tables Created successfully')