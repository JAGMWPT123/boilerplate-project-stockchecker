'use strict';

module.exports = function (app) {

  app.route('/api/stock-prices')
    .get(function (req, res){
      let stock  = req.query.stock ;
      let price  = req.query.price ;
      let likes  = req.query.likes ;
      
      // console.log(price)
      // console.log(likes)
      let stockData = {
        
        stock :  String, 
        price :  Number,
        likes : Number
        
      }
      stockData.stock = stock
      stockData.price = price
      stockData.likes = likes
      console.table(stockData)
      res.send({stockData})
    });
    
};
