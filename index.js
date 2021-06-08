// toggle navigation//
var menu = document.getElementById('btn');
var navItems = document.getElementById('navItems');


function toggleNav() {
    if (navItems.style.display ==='none'){
        navItems.style.display='block'
    }
    else {
        navItems.style.display='none';
    }   
};
//toggle navigation/




//creation product card//
    function myFunction (){
        var myTeddy = document.createElement('a')    
        const bear = document.getElementById('bear');
        bear.appendChild(myTeddy);
        myTeddy.setAttribute('id', 'myTeddy');
        myTeddy.setAttribute('href', 'produit.html'); 
        
        //creation balise img//
        var myTeddyImg = document.createElement('img');
        myTeddy.appendChild(myTeddyImg); 
        myTeddyImg.setAttribute('id', 'teddyImage'); 

        //creation div name//
        var myTeddyName = document.createElement('div');
        myTeddy.appendChild(myTeddyName); 
        myTeddyName.setAttribute('id', 'teddyName');


        //creation div price//
        var myTeddyPrice = document.createElement('div');
        myTeddy.appendChild(myTeddyPrice); 
        myTeddyPrice.setAttribute('id', 'teddyPrice');

        //creation div colors//
        var myTeddyColors = document.createElement('div');
        myTeddy.appendChild(myTeddyColors); 
        myTeddyColors.setAttribute('id', 'teddyColors');

        //creation div info//
        var myTeddyInfo = document.createElement('div');
        myTeddy.appendChild(myTeddyInfo); 
        myTeddyInfo.setAttribute('id', 'teddyInfo');
    
    };myFunction();
//creation product card//

function myAPI(){
    fetch ('http://localhost:3000/api/teddies')
    .then (res=>res.json())
    .then (data =>{
        console.table(data.length);
        for (let i=0; i < data.length; i++){
            myFunction();
            myTeddy[i].innerHTML = data[i].name;
        }  
    })
}; myAPI();
 
/*
//creation div teddyImage//
function teddyImage(){
    var myTeddyImg = document.createElement('img');
    var elt = document.getElementById('myTeddy');
    elt.appendChild(myTeddyImg);
    myTeddyImg.setAttribute('id', 'teddyImage')
}; 

    
    
    //creation div teddyName//
function teddyName(){
    var myTeddyName = document.createElement('div');
    var elt = document.getElementById('myTeddy');
    elt.appendChild(myTeddyName);
    myTeddyName.setAttribute('id', 'teddyName')
};
    
    
    //creation div teddyPrice//
function teddyPrice(){
    var myTeddyPrice = document.createElement('div');
    var elt = document.getElementById('myTeddy');
    elt.appendChild(myTeddyPrice);
    myTeddyPrice.setAttribute('id', 'teddyPrice')
};
    
    
    //creation div teddyColors//
function teddyColors(){
    var myTeddyColors = document.createElement('div');
    var elt = document.getElementById('myTeddy');
    elt.appendChild(myTeddyColors);
    myTeddyColors.setAttribute('id', 'teddyColors')
};
    
    
    //creation div teddyDescription//
function teddyDescription(){
    var myTeddyInfo = document.createElement('div');
    var elt = document.getElementById('myTeddy');
    elt.appendChild(myTeddyInfo);
    myTeddyInfo.setAttribute('id', 'teddyInfo')
};
    
function teddyContent(){  
        teddyImage();
        teddyName();
        teddyPrice();
        teddyColors();
        teddyDescription();
};

*/























