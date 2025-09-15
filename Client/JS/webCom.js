// Name : Alaina Saher
// Class: DIT/1B/01
// Admin No: P2429379


const template = document.createElement('template');

template.innerHTML = `
    <style>
        :host {
            display : block;
            border-style: outset;
            font-family: Arial, Helvetica, sans-serif;
             background-color: rgb(228, 160, 219);

        }
     body {
            background-color:  rgb(49, 22, 45);
     }
        div {
            padding : 00px 30px 30px 30px;
        }
        h3 {
            font-size : 2rem;
        }
        h5 {
            font-size : 1rem;
        }
        button#detailsBtn { 
            border: none;
            outline:none;
            font-weight:bold;
            font-family: Arial, Helvetica, sans-serif;
            font-size : 1rem;
            color:rgb(136, 82, 128);
            background-color: white;
            border-radius: 30%;
        }
        p#moreInfo {
            display: none;
            font-size: 20px
        }
    </style>
    <div>
        <h3 id='userName'>NAME GOES HERE</h3>
        <hr>
        <h4>Age: <span id='contactNumber'>123456789</span></h4>
        <h4>Item purchased: <span id='userEmail'>email_here@something.com</span></h4>
        <button id='detailsBtn'>more...</button>
        <p id='moreInfo'>
            <slot name="moreInfo">no additional information</slot>
        </p>
    </div>
`;

class NameCard extends HTMLElement {
    constructor () {
        super();
        this.root = this.attachShadow({mode: 'closed'});
        
        let clone = template.content.cloneNode(true);
        this.root.append(clone);

        let detailsBtn = this.root.querySelector("#detailsBtn");
        detailsBtn.addEventListener('click', event => {
            let detailsParagraph = this.root.querySelector('#moreInfo');
            detailsParagraph.style.display = 
                (detailsParagraph.style.display === 'block') ? 
                'none': 'block'; 
        });
    }

    // define attributes you need
    static get observedAttributes() {
        return ['username', 'usercontact', 'useremail'];
    }

    // link attributes to properties 
    get username() {
        return this.getAttribute('username');
    }
    set username(value) {
        this.setAttribute('username', value); 
    }

    get usercontact() {
        return this.getAttribute('usercontact');
    }
    set usercontact(value) {
        this.setAttribute('usercontact', value); 
    }

    get useremail() {
        return this.getAttribute('useremail');
    }
    set useremail(value) {
        this.setAttribute('useremail', value); 
    }

    // handle attribute updates
    attributeChangedCallback(attrName, oldValue, newValue ) {
        attrName = attrName.toLowerCase();
        let element;

        switch (attrName) {
            case 'username' :
                element = this.root.querySelector('#userName')
                element.textContent = newValue;
            break;
            case 'usercontact' :
                element = this.root.querySelector('#contactNumber')
                element.textContent = newValue;
            break;
            case 'useremail' :
                element = this.root.querySelector('#userEmail')
                element.textContent = newValue;
            break;
        }
    }




}

window.customElements.define('name-card', NameCard);