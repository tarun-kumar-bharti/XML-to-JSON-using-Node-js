const { NotFoundError } = require("../helpers/utility");
const Inventory 		= require("../models/inventory.model.js");
const xml2js 			= require('xml2js');
const stripnum  		= require('xml2js').processors.parseNumbers;
const parser			= new xml2js.Parser({ 
									//attrkey: "ATTR",
									ignoreAttrs : true, 
									mergeAttrs : false,
									explicitArray: false, 
									trim:true, 
									valueProcessors:[stripnum]
								});	

 

exports.saveRecon = async (req, res) => {
    try { 		
		const source = new Inventory(req.body);
		let item; 
		let jsonresult;
		 
		if(req.rawBody){									
			 			
			const xmldata = req.rawBody; 
			 
			parser.parseString(xmldata,  function(error, result) {
				if(error === null) {					 
					jsonresult =  result;					
				}else {
					res.send(error);
				}
			});  
			 
			source.reconData = JSON.stringify(jsonresult);  
			item =  await Inventory.create(source);
		    res.status(200).send({ "message": "success", "item":item });  
		}else{
			res.status(500).send("Error in parameter");
		}  
    }
    catch (err) {
        res.status(500).send(err);
    }
};
  
exports.getStatus = async (req, res) => {
    try {
        const sources = await Inventory.getAll(req.query.customerId, req.query.insertStartDate, req.query.insertEndDate);
        res.send(sources);
    }
    catch (err) {
        res.status(500).send(err);
    }
} 