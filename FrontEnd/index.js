// toggle navigation//
var menu = document.getElementById('btn');
var navItems = document.getElementById('navItems');
navItems.style.display='none';

function toggleNav() {
    //console.log(navItems.style.display)
    if (navItems.style.display =='none'){
        navItems.style.display='block'
    }
    else {
        navItems.style.display='none';
    }   
};
//toggle navigation/



//creation product card//
function cardOurs(ours){
    var myTeddy = document.createElement('a');    
    var bear = document.getElementById('bear');
    bear.appendChild(myTeddy);
    myTeddy.setAttribute('class', 'myTeddy');
    myTeddy.setAttribute('href', 'produit.html?id='+ours._id); 
    
    //creation balise img//
    var myTeddyImg = document.createElement('div');
    myTeddy.appendChild(myTeddyImg); 
    myTeddyImg.setAttribute('class', 'teddyImage'); 
    myTeddyImg.style.backgroundImage = "url("+ours.imageUrl+")";

    //creation div name//
    var myTeddyName = document.createElement('div');
    myTeddy.appendChild(myTeddyName); 
    myTeddyName.setAttribute('class', 'teddyName');
    myTeddyName.innerHTML  = ours.name;
    //console.log(ours.name)

    //creation div price//
    var myTeddyPrice = document.createElement('div');
    myTeddy.appendChild(myTeddyPrice); 
    myTeddyPrice.setAttribute('class', 'teddyPrice');
    myTeddyPrice.innerHTML  = ours.price/100 + '€';

    //creation div colors//
    var myTeddyColors = document.createElement('div');
    myTeddy.appendChild(myTeddyColors); 
    myTeddyColors.setAttribute('class', 'teddyColors');
    myTeddyColors.innerHTML  = ours.colors;


    //creation div info//
    var myTeddyInfo = document.createElement('div');
    myTeddy.appendChild(myTeddyInfo); 
    myTeddyInfo.setAttribute('class', 'teddyInfo');
    myTeddyInfo.innerHTML  = ours.description;
};

//creation product card and color selection//
function cardOursProduit(ours){

        var myTeddy = document.createElement('div');    
        var bear = document.getElementById('bear');
        bear.appendChild(myTeddy);
        myTeddy.setAttribute('class', 'myTeddy');

        
        //creation balise img//
        var myTeddyImg = document.createElement('div');
        myTeddy.appendChild(myTeddyImg); 
        myTeddyImg.setAttribute('class', 'teddyImage'); 
        myTeddyImg.style.backgroundImage = "url("+ours.imageUrl+")";

        //creation div name//
        var myTeddyName = document.createElement('div');
        myTeddy.appendChild(myTeddyName); 
        myTeddyName.setAttribute('class', 'teddyName');
        myTeddyName.innerHTML  = ours.name;
        //console.log(ours.name)

        //creation div price//
        var myTeddyPrice = document.createElement('div');
        myTeddy.appendChild(myTeddyPrice); 
        myTeddyPrice.setAttribute('class', 'teddyPrice');
        myTeddyPrice.innerHTML  = ours.price/100 + '€';

        //creation button color selection
        var btnSelectColor = document.createElement('input');
        myTeddy.appendChild(btnSelectColor);
        btnSelectColor.setAttribute('id', 'btnColor');
        btnSelectColor.setAttribute('type', 'button');
        btnSelectColor.setAttribute('value', 'Sélectionnez votre couleur');

        //creation list colors and balises a//
        var myTeddyColors = document.createElement('ul');
        myTeddy.appendChild(myTeddyColors); 
        myTeddyColors.setAttribute('class', 'selectColor');
   
            for (i=0; i< ours.colors.length; i++){
            var myTeddyColorsLi = document.createElement('li');
            myTeddyColors.appendChild(myTeddyColorsLi);
            myTeddyColorsLi.setAttribute('class', 'colors');

            // link color 'a'//
            var myTeddyColorsLiA = document.createElement('a')
            myTeddyColorsLi.appendChild(myTeddyColorsLiA)
            myTeddyColorsLiA.innerHTML  = ours.colors[i];
            }   
        //creation div info//
        var myTeddyInfo = document.createElement('div');
        myTeddy.appendChild(myTeddyInfo); 
        myTeddyInfo.setAttribute('class', 'teddyInfo');
        myTeddyInfo.innerHTML  = ours.description;
                   
        var commander = document.getElementById('btn-commander');
        commander.setAttribute("href", "panier.html");

};


function getOursList(){
    fetch ('http://localhost:3000/api/teddies')
    .then (res=>res.json())
    .then (data =>{ 
        //console.log(data);
        for (let i=0; i < data.length; i++){
            console.log("myAPI", data[i])
            cardOurs(data[i]); 
    
        }        
    })  
}; 

function getOursById(id){
    fetch ('http://localhost:3000/api/teddies/'+id )
    .then (res=>res.json())
    .then (data =>{
        console.log("id",data); 
        console.log(id);
        cardOursProduit(data);
    })
}; 

// main//
var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
let idOurs = urlParams.get("id");
console.log(window.location.search);
console.log(idOurs);
//let panier = urlParams.get("page");


if (idOurs){
    getOursById(idOurs);
    console.log('produit')
}
else if(window.location.pathname === "/Orinoco-p5/FrontEnd/panier.html" || window.location.pathname == "/panier.html"){
    console.log('panier')
}
else{
    getOursList();
    console.log('index')
};

/*function createDiv(ours){
var demoTeddy = document.querySelector('.demoteddy');

var demoTeddyName = document.createElement('div');
demoTeddy.appendChild(demoTeddyName);
demoTeddyName.setAttribute('class', 'demoTeddyName');
demoTeddyName.innerHTML = 'my teddy name';

var demoTeddyPrice= document.createElement('div');
demoTeddy.appendChild(demoTeddyPrice);
demoTeddyPrice.setAttribute('class', 'demoTeddyPrice');
demoTeddyPrice.innerHTML = ours.products;
};*/


//pour la validation de la commande
fetch("http://localhost:3000/api/teddies/order", {
	method: 'POST',
	headers: { 
'Accept': 'application/json', 
'Content-Type': 'application/json' 
},
	body: JSON.stringify({
        contact:{
            firstName : 'firstName',
            lastName: 'lastName',
            address : 'address',
            city: 'city',
            email:'email'
        },
        products:[]   
    })   
})
.then (res=>res.json())

.then (data =>{ 
    console.log("myDataPost",data);
    console.log(data.products);
    console.log(data.contact);
    data.products.push('product1');
    console.log(window.localStorage);
    /*localStorage.setItem ('contact', data.contact.address);
    var contactFirstName = localStorage.getItem('contact');
    console.log(contactFirstName);*/

   /* let inputFirstName = document.getElementById('firstName').value;
    window.localStorage.setItem('server', inputFirstName);*/
    console.log(window.localStorage.setItem('order', data.contact.firstName));
    console.log(window.localStorage.getItem('order'));
}); 


console.log(localStorage);




 



















