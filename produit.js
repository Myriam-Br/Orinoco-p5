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

fetch('http://localhost:3000/api/teddies')
.then(res => res.json())
.then(data =>{
    console.table(data);
    var myTeddyName = document.getElementById('teddyName');
    myTeddyName.innerHTML = data[0].name;
})


