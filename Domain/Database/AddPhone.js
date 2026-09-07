const db = require("./Database.JS");

/*db.exec(`
    INSERT INTO Phone (Brand, Series, PhoneModel) 
    VALUES 
    ('Samsung', 'Galaxy', 'S20'),
    ('Samsung', 'Galaxy', 'S20+'),
    ('Samsung', 'Galaxy', 'S20 Ultra'),
    ('Samsung', 'Galaxy', 'S21'),
    ('Samsung', 'Galaxy', 'S21+'),
    ('Samsung', 'Galaxy', 'S21 Ultra'),
    ('Samsung', 'Galaxy', 'S22'),
    ('Samsung', 'Galaxy', 'S22+'),
    ('Samsung', 'Galaxy', 'S22 Ultra'),
    ('Samsung', 'Galaxy', 'S23'),
    ('Samsung', 'Galaxy', 'S23+'),
    ('Samsung', 'Galaxy', 'S23 Ultra'),
    ('Samsung', 'Galaxy', 'S24'),
    ('Samsung', 'Galaxy', 'S24+'),
    ('Samsung', 'Galaxy', 'S24 Ultra'),
    ('Samsung', 'Galaxy', 'S25'),
    ('Samsung', 'Galaxy', 'S25+'),
    ('Samsung', 'Galaxy', 'S25 Ultra'),
    ('Samsung', 'Galaxy', 'S26'),
    ('Samsung', 'Galaxy', 'S26+'),
    ('Samsung', 'Galaxy', 'S26 Ultra')
`);*/

db.exec(`
    INSERT INTO Phone (Brand, Series, PhoneModel) 
    VALUES
    ('Apple', 'IPhone', '13'),
    ('Apple', 'IPhone', '13 Pro'),
    ('Apple', 'IPhone', '13 Pro Max'),
    ('Apple', 'IPhone', '14'),
    ('Apple', 'IPhone', '14 Pro'),
    ('Apple', 'IPhone', '14 Pro Max'),
    ('Apple', 'IPhone', '15'),
    ('Apple', 'IPhone', '15 Pro'),
    ('Apple', 'IPhone', '15 Pro Max'),
    ('Apple', 'IPhone', '16'),
    ('Apple', 'IPhone', '16 Pro'),
    ('Apple', 'IPhone', '16 Pro Max'),
    ('Apple', 'IPhone', '17'),
    ('Apple', 'IPhone', '17 Pro'),
    ('Apple', 'IPhone', '17 Pro Max')
`);

Phone = db.prepare(`
    SELECT * FROM Phone
    `).all();

console.log(Phone)