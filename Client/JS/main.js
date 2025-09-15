// Name : Alaina Saher
// Class: DIT/1B/01
// Admin No: P2429379
//


// // Fill up the code for the question
// const readline = require("readline-sync");
//const fetch = require('node-fetch');


// // Data Variable from Server
let allShoppingTrends;
let qryByGender;
let qryByCat;
let qryBySeason;
let qryByPromo;

// /***********************************************************************/
// Load Data
// Fetch data get and post

//endpoint 1

function loadAllData() {
    return new Promise((resolve, reject) => {
        fetch('http://fop2.onrender.com//allshoppingtrend')
            .then(response => response.json())
            .then(function (data) {
                resolve(data) 
            });
    });
}

// //endpoint 2
function getGetByGender(gender) {
    return new Promise((resolve, reject) => {
        fetch(`http://fop2.onrender.com/bygender/${gender}`)
            .then(response => response.json())
            .then(function (data) {
                resolve(data) 
            });
    });
}

// //endpoint 3

function getGetByCat(cat) {
    return new Promise((resolve, reject) => {
        fetch(`http://fop2.onrender.com/bycategory/${cat}`)
            .then(response => response.json())
            .then(function (data) {
                resolve(data) 
            });
    });
}

// //endpoint 4

function getGetBySeason(season) {
    return new Promise((resolve, reject) => {
        fetch(`http://fop2.onrender.com/byseason/${season}`)
            .then(response => response.json())
            .then(function (data) {
                resolve(data) 
            });
    });
}

// //endpoint 5
function getGetByPromoCodeUsed(bool) {
    return new Promise((resolve, reject) => {
        fetch(`http://fop2.onrender.com/bypromocodeused/${bool}`)
            .then(response => response.json())
            .then(function (data) {
                resolve(data) 
            });
    });
}


//###################################################################################################


//###################################################################################################

const userArray = [];
function createArray(data) {
    for (let i = 0; i < data.length; i++) {
        const record = data[i];
        userArray.push(record);
    }
    return userArray
}


function loadCards () {
    const nameCardsDiv = document.querySelector("#namecards");

    userArray.slice(0, 10).forEach(nameCard => {
        const newNameCard = document.createElement('name-card');
        newNameCard.setAttribute('username', `Customer ID: ${nameCard.customerID}`);
        newNameCard.setAttribute('usercontact', nameCard.age);
        newNameCard.setAttribute('useremail', nameCard.itemPurchased);

        const contactDetails = document.createElement('span');
        contactDetails.setAttribute('slot', 'moreInfo');
        contactDetails.textContent = `Amount spent: $${nameCard.purchaseAmountUSD} Size: ${nameCard.size} Color: ${nameCard.color} Season: ${nameCard.season} Review Rating: ${nameCard.reviewRating} Subscription Status: ${nameCard.subscriptionStatus} Discount Applied: ${nameCard.discountApplied} Payment Method: ${nameCard.paymentMethod} Frequency Of Purchases: ${nameCard.frequencyOfPurchases}`;

        newNameCard.append(contactDetails);
        nameCardsDiv.append(newNameCard);
    });
}




// Fetch data first, then update the array and load cards
document.addEventListener("DOMContentLoaded", async () => {
    console.log("DOM fully loaded and parsed");
    
    try {
        allShoppingTrends = await loadAllData(); // Wait for data
        createArray(allShoppingTrends); // Populate the array
        loadCards(); // Render the cards
    } catch (error) {
        console.error("Error loading data:", error);
    }
});

