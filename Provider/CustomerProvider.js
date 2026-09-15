//Gets the Customer Data from the UI via the API and then stores it

//!!!!!!!!!! Must receive email as lower case and phone number in the format of xxx xxx xxxx
const db = require("../Domain/Database/Database.JS");

//FOR TESTING REMOVE
Name = 'Harry';
Surname = 'Van de merve';
Email = 'harRRRyvdm@gmail.com';
PhoneNumber = '987 654 3210';

Address = '21 Green Road Sundown';
City = 'Johannesburg';
Province = 'Gauteng'; 
PostalCode = '8790'; 
Country = 'South Africa'

function Customer(Name, Surname, Email, PhoneNumber, Address, City, Province, PostalCode, Country) { 

Email = Email.toLowerCase();
//Searchs for Customer
CheckCustomer = db.prepare(`
    SELECT * 
    FROM Customer
    WHERE Email = ?
`).get(Email);

if (!CheckCustomer) {
    //Adds new Customer to DB
    AddNewCustomer = db.prepare(`
        INSERT INTO Customer (Name, Surname, Email, PhoneNumber)
        VALUES
        (?, ?, ?, ?)
    `).run(Name, Surname, Email, PhoneNumber); 

} else { 

    // Updates Existing Customer Details
    UpdateCustomer = db.prepare(`
        UPDATE Customer
        SET Name = ?, Surname = ?, PhoneNumber = ?
        WHERE Email = ?
    `).run(Name, Surname, PhoneNumber, Email); 

};

//Searches for a customer Address
const CustomerID = CheckCustomer.CustomerID;
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
    db.prepare(`
        INSERT INTO Address (CustomerID, Address, City, Province, PostalCode, Country)
        VALUES 
        (?, ?, ?, ?, ?, ?)
    `).run(CustomerID, Address, City, Province, PostalCode, Country);
} else { 
    return
};
}

//FOR TESTING REMOVE
Customer(Name, Surname, Email, PhoneNumber, Address, City, Province, PostalCode, Country)
test = db.prepare(`SELECT * FROM Customer`).all();
console.log(test);
test = db.prepare(`SELECT * FROM Address`).all();
console.log(test);