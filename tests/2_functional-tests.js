const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server.js');
const { suite } = require('mocha');

chai.use(chaiHttp);



suite('Functional Tests', function() {    
    it('Viewing one stock', (done)=>{
        let expc = {"stockData":{"stock":"GOOG","price":144.08,"likes":0}}
        chai.request(server).get('/api/stock-prices?stock=GOOG')
        .then((res) => {
                res = res.body.stockData
                //    console.log(res)
                chai.assert.deepEqual(res , expc.stockData )
                done()
            }).catch (error=> {
                done(error)
                // console.log(error)
            } )
           }); 
           it('Viewing one stock and liking it', (done)=>{
               let expc = {"stockData":{"stock":"GOOG","price":144.08,"likes":1}}
               chai.request(server).get('/api/stock-prices?stock=GOOG&like=true')
               .then((res) => {
                   res = res.body.stockData
                   //    console.log(res)
                   chai.assert.deepEqual(res , expc.stockData )
                   done()
                }).catch (error=> {
                    done(error)
                    // console.log(error)
                } )
            });
        });
           it('Viewing same stock and liking it again', (done)=>{
               let expc = {"stockData":{"stock":"GOOG","price":144.08,"likes":1}}
               chai.request(server).get('/api/stock-prices?stock=GOOG&like=true')
               .then((res) => {
                   res = res.body.stockData
                   //    console.log(res)
                   chai.assert.deepEqual(res , expc.stockData )
                   done()
                }).catch (error=> {
                    done(error)
                    // console.log(error)
                })})

           it('Viewing two stocks', (done)=>{
               let expc1 = {"stockData":[{"stock":"GOOG","price":144.08,"rel_likes":0},{"stock":"MSFT","price":390.27,"rel_likes":0}]}
               chai.request(server).get('/api/stock-prices?stock=GOOG&&stock=MSFT')
               .then((res) => {
                   res = res.body.stockData
                    //   console.log(res)
                    //   console.log(expc1.stockData)
                   assert.deepEqual(res , expc1.stockData )
                   done()
                }).catch (error=> {
                    done(error)
                    // console.log(error)
                })
            })

           it('Viewing two stock and liking it ', (done)=>{
               let expc2 = {"stockData":[{"stock":"GOOG","price":144.08,"rel_likes":1},{"stock":"MSFT","price":390.27,"rel_likes":1}]}
               chai.request(server).get('/api/stock-prices?stock=GOOG&stock=MSFT&like=true')
               .then((res) => {
                   res = res.body.stockData
                   //    console.log(res)
                   chai.assert.deepEqual(res , expc2.stockData )
                   done()
                }).catch (error=> {
                    done(error)
                    // console.log(error)
                } )
           });
           

