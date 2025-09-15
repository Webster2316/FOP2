// Name : Alaina Saher
// Class: DIT/1B/01
// Admin No: P2429379

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
        fetch('http://fop-2.vercel.app/allshoppingtrend')
            .then(response => response.json())
            .then(function (data) {
                resolve(data) 
            });
    });
}

// //endpoint 2
function getGetByGender(gender) {
    return new Promise((resolve, reject) => {
        fetch(`http://fop-2.vercel.app/bygender/${gender}`)
            .then(response => response.json())
            .then(function (data) {
                resolve(data) 
            });
    });
}

// //endpoint 3

function getGetByCat(cat) {
    return new Promise((resolve, reject) => {
        fetch(`http://fop-2.vercel.app/bycategory/${cat}`)
            .then(response => response.json())
            .then(function (data) {
                resolve(data) 
            });
    });
}

// //endpoint 4

function getGetBySeason(season) {
    return new Promise((resolve, reject) => {
        fetch(`http://fop-2.vercel.app/byseason/${season}`)
            .then(response => response.json())
            .then(function (data) {
                resolve(data) 
            });
    });
}

// //endpoint 5
function getGetByPromoCodeUsed(bool) {
    return new Promise((resolve, reject) => {
        fetch(`http://fop-2.vercel.app/bypromocodeused/${bool}`)
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
async function loadAllCategories() {
    try {
        const allData = await loadAllData(); 
        if (!allData || allData.length === 0) {
            console.log("No data available.");
            return;
        }

        // Extract unique categories
        const uniqueCategories = new Set(allData.map(item => item.category));

        // Populate the dropdown dynamically
        const categoryDropdown = document.querySelector("#category-dropdown");
        categoryDropdown.innerHTML = `<option selected disabled>Select a category</option>`;
        uniqueCategories.forEach(category => {
            const option = document.createElement("option");
            option.value = category;
            option.textContent = category;
            categoryDropdown.appendChild(option);
        });

    } catch (error) {
        console.error("Error fetching categories:", error);
    }
}

function displayCat() {
    const catDisplay = document.querySelector("#category-display");
    catDisplay.innerHTML = ""; // Clear previous content
  
    if (qryByCat.length > 0) {
        const categoryHeading = document.createElement("h4");
        categoryHeading.textContent = qryByCat[0].category; // Assume all items belong to the same category
        catDisplay.appendChild(categoryHeading);
    }

    qryByCat.slice(0, 10).forEach(item => {
        // Create a container for each item
        const itemDiv = document.createElement("div");
      
        // Create and append itemPurchased
        const purchasedElement = document.createElement("h5");
        purchasedElement.textContent = `Item Purchased - ${item.itemPurchased}`;
        itemDiv.appendChild(purchasedElement);
      
        // Create and append season
        const seasonElement = document.createElement("h5");
        seasonElement.textContent = `Season - ${item.season}`;
        itemDiv.appendChild(seasonElement);
      
        // Append the item container to the display
        catDisplay.appendChild(itemDiv);
    });
}

document.addEventListener("DOMContentLoaded", async () => {
    console.log("DOM fully loaded and parsed");

    // Load categories dynamically
    await loadAllCategories();

    document.querySelector("#category-dropdown").addEventListener("change", async (event) => {
        const selectedCategory = event.target.value;
        try {
            qryByCat = await getGetByCat(selectedCategory);
            userArray.length = 0;
            createArray(qryByCat);
            document.querySelector("#category-display").innerHTML = ''; // Target correct element
            displayCat();
        } catch (error) {
            console.error("Error fetching data for category:", error);
        }
    });
});



///////////////////////////////////////////////
const template = document.createElement('template');
template.innerHTML = `
    <div>
        <h5><span id='cat'></span></h5>
        <h5><span id='itemPurchased'></span></h5>
        <h5><span id='season'></span></h5>
    </div>
`;

    

class FilterByCat extends HTMLElement {
    constructor () {
        super();
        this.root = this.attachShadow({mode: 'closed'});
        
        let clone = template.content.cloneNode(true);
        this.root.append(clone);

    }
    static get observedAttributes() {
        return ['cat', 'itemPurchased', 'season'];
    }
    
        // link attributes to properties 
        get cat() {
            return this.getAttribute('cat');
        }
        set cat(value) {
            this.setAttribute('cat', value); 
        }
    
        get itemPurchased() {
            return this.getAttribute('itemPurchased');
        }
        set itemPurchased(value) {
            this.setAttribute('itemPurchased', value); 
        }
    
        get season() {
            return this.getAttribute('season');
        }
        set season(value) {
            this.setAttribute('season', value); 
        }
    
        // handle attribute updates
        attributeChangedCallback(attrName, oldValue, newValue) {
            let element;
    
            switch (attrName.toLowerCase()) {
                case 'cat':
                    element = this.root.querySelector('#cat');
                    element.textContent = newValue; // Update the category
                    break;
    
                case 'itemPurchased':
                    element = this.root.querySelector('#itemPurchased');
                    element.textContent = newValue; // Update the item purchased
                    break;
    
                case 'season':
                    element = this.root.querySelector('#season');
                    element.textContent = newValue; // Update the season
                    break;
            }
        }
    
    
    
    }
    window.customElements.define('cat-display', FilterByCat);


//////////////////////////////////////////////////