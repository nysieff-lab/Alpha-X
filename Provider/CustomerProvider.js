//Gets the Customer Data from the UI via the API and then stores it

//!!!!!!!!!! Must receive email as lower case and phone number in the format of xxx xxx xxxx
const db = require("../Domain/Database/Database.JS");

//writes customer data to db
function Customer(Name, Surname, Email, PhoneNumber, Address, City, Province, PostalCode, Country) { 

    Email = Email.toLowerCase();

    //Searchs for Customer
   const CheckCustomer = db.prepare(`
        SELECT * 
        FROM Customer
        WHERE Email = ?
    `).get(Email);

    if (!CheckCustomer) {
        //Adds new Customer to DB
        const AddNewCustomer = db.prepare(`
            INSERT INTO Customer (Name, Surname, Email, PhoneNumber)
            VALUES
            (?, ?, ?, ?)
        `).run(Name, Surname, Email, PhoneNumber); 
        CustomerID = AddNewCustomer.lastInsertRowid;
    } else { 

        // Updates Existing Customer Details
        UpdateCustomer = db.prepare(`
            UPDATE Customer
            SET Name = ?, Surname = ?, PhoneNumber = ?
            WHERE Email = ?
        `).run(Name, Surname, PhoneNumber, Email); 
        CustomerID = CheckCustomer.CustomerID;
    };

    const CheckAddress = db.prepare(`
        SELECT AddressID
        FROM Address
        WHERE CustomerID = ?
        AND Address = ?
        AND City = ?
        AND Province = ?
        AND PostalCode = ?
        AND Country = ?
    `).get(CustomerID, Address, City, Province, PostalCode, Country);

    if (!CheckAddress) {
        AddNewAddress = db.prepare(`
            INSERT INTO Address (CustomerID, Address, City, Province, PostalCode, Country)
            VALUES 
            (?, ?, ?, ?, ?, ?)
        `).run(CustomerID, Address, City, Province, PostalCode, Country);
        AddressID = AddNewAddress.lastInsertRowid;
    } else { 
        AddressID = CheckAddress.AddressID;
    };
    return {CustomerID, AddressID}
}

module.exports = {Customer};