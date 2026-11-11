const db = require("./Database.JS");

/*db.exec(`
    CREATE UNIQUE INDEX IF NOT EXISTS unique_customer_email
    ON Customer(Email);
`);*/
/*db.exec(`
    ALTER TABLE Product
    ALTER COLUMN Image TEXT;
    `);*/

/*db.exec(`
    ALTER TABLE Product
    ADD Image TEXT;
    `);*/

   /* db.exec(`
        UPDATE Product
        SET Image = '/Product Images/Carbon_Series_Grid.png'
        WHERE CaseModel = 'Carbon';
    `);
    db.exec(`
        UPDATE Product
        SET Image = '/Product Images/Citizen_Series_Grid.png'
        WHERE CaseModel = 'Citizen';
    `);
    db.exec(`
        UPDATE Product
        SET Image = '/Product Images/Classic_Series_Grid.png'
        WHERE CaseModel = 'Classic';
    `);*/
    db.exec(`
        UPDATE Logins
        SET Password = ''
        WHERE LoginID = 3;
        `);
    
    user = db.prepare(`
            SELECT * FROM Logins
            `).all();
        
        console.log(user)
