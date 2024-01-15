'use strict';

module.exports = function (app) {

  app.route('/api/stock-prices')
    .get(function (req, res){
      let stock  = req.query.stock ;
      let price  = req.query.price ;
      // let likes  = Number(req.query.likes) ;
      
      // console.log(price)
      // console.log(likes)
      let stockData = {
        
        stock : {
          type : String
        } , 
        price : {
          type : Number
        } ,
        likes :{
          type : Number
        }  
      }
      stockData.stock = stock
      stockData.price = price
      console.table(stockData)
      res.send({stockData})
    });
    
};
