var products = [];

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

};

function getOursList(){
    fetch ('http://localhost:3000/api/teddies')
    .then (res=>res.json())
    .then (data =>{ 
        products = data;
        //console.log(data);
        for (let i=0; i < data.length; i++){
            //console.log("myAPI", data[i])
            cardOurs(data[i]); 
        }  
       
    })  
}; 

function getOursById(id){
    fetch ('http://localhost:3000/api/teddies/'+id )
    .then (res=>res.json())
    .then (data =>{
        console.log(data); 
        cardOursProduit(data);
    })
}; 

// main//
var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
let idOurs = urlParams.get("id");
//let panier = urlParams.get("page")
//console.log(idOurs)
console.log(window.location.search)
if (idOurs){
    getOursById(idOurs);
}
else if(window.location.pathname === "/projet5-Orinoco/panier.html"){

}
else{
    getOursList();
};



/*fetch("http://localhost:3000/api/teddies/order", {
	method: 'POST',
	headers: { 
'Accept': 'application/json', 
'Content-Type': 'application/json' 
},
	body: JSON.stringify({
        contact:{
            firstName : 'a',
            lastName: 'b',
            adress : 'f',
            city: 'd',
            email:'c'
        },
        products:[products];
    })
});*/
 



















