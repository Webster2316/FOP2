// const express = require('express');
// const fs = require('fs');
// const app = express();
// const parse = require("csv-parse").parse;
// const cors = require('cors');
// app.use(cors());

// app.use(express.json());

// let shoppingTrendData;

// async function readAllShoppingTrendData() {
//    return new Promise((resolve, reject) => {
//       const rData = [];

//       fs.createReadStream(".\\data\\shopping_trends.csv")
//          .pipe(parse({ delimiter: ',', from_line: 2 }))
//          .on('data', function (csvrow) {
//             let newRecord = {
//                customerID       : csvrow[0],
//                age              : parseInt(csvrow[1]),
//                sex              : csvrow[2],
//                itemPurchased   : csvrow[3],
//                category         : csvrow[4],
//                purchaseAmountUSD  : parseFloat(csvrow[5]),
//                location             : csvrow[6],
//                size                 : csvrow[7],
//                color                : csvrow[8],
//                season               : csvrow[9],
//                reviewRating        : parseFloat(csvrow[10]),
//                subscriptionStatus  : csvrow[11],
//                shippingType        : csvrow[12],
//                discountApplied     : csvrow[13],
//                promoCodeUsed      : csvrow[14],
//                previousPurchases   : parseInt(csvrow[15]),
//                paymentMethod       : csvrow[16],
//                frequencyOfPurchases     : csvrow[17],
//             };
//             rData.push(newRecord);
//          })
//          .on('end', function () {
//             resolve(rData)
//          })
//          .on('error', function (err) {
//             reject(err);
//          });
//    });
// }

// // This responds with " Nothing" on the homepage
// app.get('/', function (req, res) {
//    console.log("Host data ready");
//    res.send('Your Data Host is Ready!');
// })

// // Endpoint All Data e.g. http://localhost:8081/allshoppingtrend
// app.get('/allshoppingtrend', function (req, res) {
//    console.log("All ShoppingTrend Data");
//    res.send(shoppingTrendData);
// })

// // Endpoint Query Gender e.g. http://localhost:8081/bysex/Male
// app.get('/bysex/:sex', (req, res) => {
//    let sex = req.params.sex;
//    const result = shoppingTrendData.filter((shoppingData) => { return shoppingData.sex == sex})
//    res.status(200);
//    res.type('application/json');
//    res.json(result);   
// });

// // Endpoint Query By Category e.g. http://localhost:8081/bycategory/Clothing
// app.get('/bycategory/:category', (req, res) => {
//    let category = req.params.category;
//    const result = shoppingTrendData.filter((shoppingData) => { return shoppingData.category == category})
//    res.status(200);
//    res.type('application/json');
//    res.json(result);     
// });

// // Endpoint Query Season e.g. http://localhost:8081/byseason/Winter
// app.get('/byseason/:season', (req, res) => {   
//    let season = req.params.season ;
//    const result = shoppingTrendData.filter((shoppingData) => { return shoppingData.season == season})
//    res.status(200);
//    res.type('application/json');
//    res.json(result);     
// });

// // Endpoint Query Promo_Code_Used e.g. http://localhost:8081/bypromocodeused/Yes
// app.get('/bypromocodeused/:promocodeused', (req, res) => {   
//    let promocodeused = req.params.promocodeused ;
//    const result = shoppingTrendData.filter((shoppingData) => { return shoppingData.promoCodeUsed == promocodeused})
//    res.status(200);
//    res.type('application/json');
//    res.json(result);     
// });

// // Endpoint Query Promo_Code_Used e.g. http://localhost:8081/categogry
// app.get('/category', (req, res) => {   
//    const uniqueCategory = shoppingTrendData.reduce((acc, obj) => {
//       if (!acc.includes(obj.category)) {
//         acc.push(obj.category);
//       }
//       return acc;
//     }, []).sort();
//     console.log(uniqueCategory);
//    res.status(200);
//    res.json(uniqueCategory);     
// });


// readAllShoppingTrendData().then((alldata) => {
//    shoppingTrendData = alldata;
//    const server = app.listen(8081, 'localhost', () => {
//       const host = server.address().address
//       const port = server.address().port
//       console.log(`Example app listening at http://${host}:${port}`);
//    })
// }).catch((error) => {
//    console.log("Error:", error)
// });
// // to run the server: node server
const express = require('express');
const fs = require('fs');
const path = require('path');
const parse = require("csv-parse").parse;
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let shoppingTrendData;

// -------------------- Read CSV --------------------
async function readAllShoppingTrendData() {
    return new Promise((resolve, reject) => {
        const rData = [];
        const csvPath = path.join(__dirname, 'data', 'shopping_trends.csv');

        fs.createReadStream(csvPath)
            .pipe(parse({ delimiter: ',', from_line: 2 }))
            .on('data', function (csvrow) {
                const newRecord = {
                    customerID: csvrow[0],
                    age: parseInt(csvrow[1]),
                    sex: csvrow[2],
                    itemPurchased: csvrow[3],
                    category: csvrow[4],
                    purchaseAmountUSD: parseFloat(csvrow[5]),
                    location: csvrow[6],
                    size: csvrow[7],
                    color: csvrow[8],
                    season: csvrow[9],
                    reviewRating: parseFloat(csvrow[10]),
                    subscriptionStatus: csvrow[11],
                    shippingType: csvrow[12],
                    discountApplied: csvrow[13],
                    promoCodeUsed: csvrow[14],
                    previousPurchases: parseInt(csvrow[15]),
                    paymentMethod: csvrow[16],
                    frequencyOfPurchases: csvrow[17],
                };
                rData.push(newRecord);
            })
            .on('end', function () {
                resolve(rData);
            })
            .on('error', function (err) {
                reject(err);
            });
    });
}

// -------------------- Routes --------------------

// Health check
app.get('/', (req, res) => {
    res.send('Your Data Host is Ready!');
});

// All data
app.get('/allshoppingtrend', (req, res) => {
    res.json(shoppingTrendData);
});

// Query by gender
app.get('/bysex/:sex', (req, res) => {
    const sex = req.params.sex;
    const result = shoppingTrendData.filter(d => d.sex === sex);
    res.json(result);
});

// Query by category
app.get('/bycategory/:category', (req, res) => {
    const category = req.params.category;
    const result = shoppingTrendData.filter(d => d.category === category);
    res.json(result);
});

// Query by season
app.get('/byseason/:season', (req, res) => {
    const season = req.params.season;
    const result = shoppingTrendData.filter(d => d.season === season);
    res.json(result);
});

// Query by promo code used
app.get('/bypromocodeused/:promocodeused', (req, res) => {
    const promocodeused = req.params.promocodeused;
    const result = shoppingTrendData.filter(d => d.promoCodeUsed === promocodeused);
    res.json(result);
});

// Unique categories
app.get('/category', (req, res) => {
    const uniqueCategory = shoppingTrendData.reduce((acc, obj) => {
        if (!acc.includes(obj.category)) acc.push(obj.category);
        return acc;
    }, []).sort();
    res.json(uniqueCategory);
});

// -------------------- Start Server --------------------
readAllShoppingTrendData()
    .then(data => {
        shoppingTrendData = data;
        const port = process.env.PORT || 8081;
        app.listen(port, () => console.log(`Server running on port ${port}`));
    })
    .catch(err => {
        console.error("Error loading CSV:", err);
    });
