let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

let products = [
    {
        id: 1,
        name: 'PASTEURISED HOMOGINSED DOUBLE TONED MILK',
        image: 'P1.jpg',
        price: 32
    },
    {
        id: 2,
        name: 'PASTEURISED TONED MILK',
        image: 'P2.jpg',
        price: 28
    },
    {
        id: 3,
        name: 'PASTEURISED FULL CREAM MILK',
        image: 'P3.jpg',
        price: 30
    },
    {
        id: 4,
        name: 'PASTEURISED HOMOGINSED STANDARD MILK',
        image: 'P4.jpg',
        price: 22
    },
    {
        id: 5,
        name: 'PASTEURISED HOMOGINSED TONED MILK',
        image: 'P5.jpg',
        price: 27
    },
    {
        id: 6,
        name: 'ULTRA PASTEURISED HOMOGINSED MILK',
        image: 'P6.jpg',
        price: 30
    },
    {
        id: 7,
        name: 'VITAMIN A & D MILK',
        image: 'P9.jpg',
        price: 32
    },
    {
        id: 8,
        name: 'NEW VISAKHA GOLD',
        image: 'P35.jpg',
        price: 27
    },
    {
        id: 9,
        name: 'UTG PROCEED MILK',
        image: 'P36.jpg',
        price: 28
    }
];
let listCards  = [];
function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Card</button>`;
        list.appendChild(newDiv);
    })
}
initApp();
function addToCard(key){
    if(listCards[key] == null){
        // copy product form list to list card
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}
function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
                listCard.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}
function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}