'use strict';
const axios = require('axios');

module.exports = function (app) {



  app.route('/api/stock-prices')
    .get(function (req, res){
      let stock  = req.query.stock ;
      let urls = [`https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/${stock[0]}/quote`,
            `https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/${stock[1]}/quote`] ;
      var likes  = req.query.like
      
      function stockDat(stock,price,likes,rel_likes){
        this.stock =  stock, 
        this.price =  price,
        this.likes = likes
        this.rel_likes = rel_likes
        
      }
      function stockDa(stock,price,rel_likes){
        this.stock =  stock, 
        this.price =  price,
        this.rel_likes = rel_likes
        
      }
      let stockData ={
        stock :  String, 
        price :  Number,
        likes : Number,
      }
      let stockData1 ={
        stock :  String, 
        price :  Number,
        rel_likes : Number
      }
      
      
      let s = {}
      const m =[]
      if(stock == 'GOOG' || stock == 'MSFT'){
        
        // console.log(likes)
        axios.get(
                `https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/${stock}/quote`)
                .then((response) => {
                // console.log(response);
              
              
        stockData.stock = response.data.symbol
        stockData.price = response.data.latestPrice
        if (likes === 'true') {
          stockData.likes = 1
        }else{
          stockData.likes = 0

        }

        // console.log(stock)
        // console.log(stockData)
        res.send({"stockData" :stockData})
      })
      
      }else {
        const requests = urls.map((url) => axios.get(url));
        /*
        | For waiting the Promise is fulfilled
        | with the Response, use the then() method.
        | If the HTTP request received errors
        | use catch() method
        */
        axios.all(requests).then((responses) => {
          responses.forEach((resp) => {
            stockData1.stock = resp.data.symbol
            stockData1.price = resp.data.latestPrice
            if (likes === 'true') {
              stockData1.rel_likes = 1
            }else{
              stockData1.rel_likes = 0
            }
            s = new stockDa(stockData1.stock,stockData1.price,stockData1.rel_likes)
            m.push(s)
            // console.info(resp.config.url);
            // console.table(m);
          })
          res.send({"stockData" : m})
            });
    }
    
  })
};
// }else if(stock){

      //   // console.log("YEAH")

      //   const requests = axios.get(urls[0]);
      //   requests.then((resp)=>{
      //     // console.log(res.data);
      //     stockData1.stock = resp.data.symbol
      //     stockData1.price = resp.data.latestPrice
      //     if (likes === 'true') {
      //       stockData1.rel_likes = 1
      //     }else{
      //       stockData1.rel_likes = 0
      //     }

      //     s = new stockDa(stockData1.stock,stockData1.price,stockData1.rel_likes)
      //     // s = JSON.stringify(s)
      //     m.push(s)
      //     const requests1 = axios.get(urls[1]);
      //     requests1.then((resp1)=>{
      //     stockData1.stock = resp1.data.symbol
      //     stockData1.price = resp1.data.latestPrice
      //     if (likes === 'true') {
      //       stockData1.rel_likes = 1
      //     }else{
      //       stockData1.rel_likes = 0
      //     }
      //     s = new stockDa(stockData1.stock,stockData1.price,stockData1.rel_likes)
      //     // s = JSON.stringify(s)  
      //     m.push(s)
        
      //     // console.log(s)
      //     res.send({"stockData" : m})
      //   })
      //   })