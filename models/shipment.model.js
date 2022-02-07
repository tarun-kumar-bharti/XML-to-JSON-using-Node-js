const sql = require("./db.js");
const config = require("../config/config.js");
const { NotFoundError } = require("../helpers/utility");

const Shipment = function (source) {    
    this.reconData 	= source.reconData;
    this.id			= source.id;	
};

Shipment.create = async (source) => {
 
    let insert = await sql.query("INSERT INTO shipment_confirm SET ?", source);
    if (insert.insertId) {
        return insert.insertId;
    }
    else {
        return;
    }
};
 
 
Shipment.getAll = async (value,  insertStartDate, insertEndDate) => {
    let rows;
    if (insertStartDate && insertEndDate) {
       // var startDate = new Date(insertStartDate);
       // var endDate = new Date(insertEndDate);
       // var endOfDayDate = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), 23, 59, 59);
        rows = await sql.query(`SELECT * FROM shipment_confirm WHERE customerId = ? AND insertDate BETWEEN ? AND ?`, [value, insertStartDate, insertEndDate]);
    } else {
        rows = await sql.query(`SELECT * FROM shipment_confirm WHERE customerId = ?`, [value]);
    }

    if (rows.length) {
        return rows;
    } else {
        return [];
    }
}; 

module.exports = Shipment;
