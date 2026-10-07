//Gets a list of items for the filter boxes from DB returned via API

const db = require("../Domain/Database/Database.JS");

function GetFilters() {
    const Brand = db.prepare(`
        SELECT DISTINCT Brand FROM Phone
        `).all();
    const Series = db.prepare(`
        SELECT DISTINCT Series FROM Phone
        `).all();
    const PhoneModel = db.prepare(`
        SELECT DISTINCT PhoneModel FROM Phone
        `).all();
    const CaseModel = db.prepare(`
        SELECT DISTINCT CaseModel FROM Product
        `).all();
    const Colour = db.prepare(`
        SELECT DISTINCT Colour FROM Product
        `).all();
    return {Brand,Series,PhoneModel,CaseModel,Colour}
}

module.exports = GetFilters;