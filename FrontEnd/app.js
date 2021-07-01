//récupération données API
function getOursList(){
    fetch ('http://localhost:3000/api/teddies')
.then (res => res.json())
.then(data => {
    console.log('myApi',data);
    //console.log('image', data[1].imageUrl);
    for (i=0; i< data.length; i++){
        itemsList(data[i]);
    }
});
};

//squelette html page accueil
function itemsList(ours){
    //affichage dynamique des produits sur la page d'accueil
var itemCard = document.createElement('a')
const itemContainer = document.getElementById('item-container');
itemContainer.appendChild(itemCard);
itemCard.setAttribute('href', 'produit.html?id='+ours._id);

var item = document.createElement('div');
itemCard.appendChild(item);
item.setAttribute('class' , 'item');

//--------creation div image------
var itemImage= document.createElement('img');
item.appendChild(itemImage);
itemImage.setAttribute('class', 'item-image');
itemImage.setAttribute('src', ours.imageUrl);


//-----creation div name-----
var itemName= document.createElement('div');
item.appendChild(itemName);
itemName.setAttribute('class', 'item-name');
itemName.innerHTML = ours.name;

//------creation div prix----
var itemPrice= document.createElement('div');
item.appendChild(itemPrice);
itemPrice.setAttribute('class', 'item-price');
itemPrice.innerHTML = ours.price/100;
//précision type de monnaie
var currency = document.createElement('span');
itemPrice.appendChild(currency);
currency.innerHTML = '€'

var itemDescription= document.createElement('div');
item.appendChild(itemDescription);
itemDescription.setAttribute('class', 'item-description');
itemDescription.innerHTML = ours.description;

console.log(item);
};



//récupération de la chaine de requette (querystring)
var queryString = window.location.search;
console.log(queryString);
//methode 1
//const leId = queryString.slice(4);

//methode 2
const urlSearchParams = new URLSearchParams(queryString);
let idOurs = urlSearchParams.get('id');
console.log(idOurs);

//affichage du produit (de l'objet) qui a été sélectionné par l'id
//-------------2 methodes possible--------

//--- Methode 1: avec fetch et en mettant la valeur de l'id à la fin de l'url
function getOursById(idOurs){
    fetch ('http://localhost:3000/api/teddies/'+idOurs)
.then (res => res.json())
.then(data => {
    itemById(data);
});
}
//squelette html page produit
function itemById(ours){
    //-----creation div carte item------
    var itemCard = document.createElement('div')
    const itemContainer = document.getElementById('item-container');
    itemContainer.appendChild(itemCard);
    itemCard.setAttribute('href', 'produit.html?id='+ours._id);


    var item = document.getElementById('item');
    itemCard.appendChild(item);
    item.setAttribute('class' , 'item');

    //--------creation div image------
    var itemImage= document.getElementById('item-image');
    itemImage.setAttribute('src', ours.imageUrl);

    //-----creation div name-----
    var itemName= document.getElementById('item-name');
    itemName.innerHTML = ours.name;

    //------creation div couleur------

    var selectColor = document.getElementById('color');
    var optionColor= ours.colors;
        let structureOptions =[];
        console.log('democolor', optionColor);
        for (let j = 0; j< optionColor.length; j++){
            structureOptions = structureOptions + `
            <option> ${optionColor[j]}</option>
            `;
        }
        selectColor.innerHTML = structureOptions;


    console.log('colors', selectColor.value);
    //------creation div prix----
    var itemPrice= document.getElementById('item-price');
    itemPrice.innerHTML = ours.price/100 + '€';

    //---------creation div description-------
    var itemDescription= document.getElementById('item-description');
    itemDescription.innerHTML = ours.description;

    //-------creation boutton commander------
    var btnCommander = document.getElementById('btn-commander');
    console.log(btnCommander);

   
    //----écouter le boutton et envoyer le panier-----
    btnCommander.addEventListener('click', function(event){

        event.preventDefault();


        const selectorColorOption = document.getElementById('color');
        const colorSelected = selectorColorOption.value;

         //-----récupération des valeurs du formulaire---
         var itemAddedToBasket = {
            nomProduit: ours.name,
            idProduit: ours._id,
            couleurProduit: colorSelected,
            quantite:1,
            prix: ours.price/100,
            };   

         //-----gestion localStorage-----
        let produitsLocalStorage =JSON.parse(localStorage.getItem('produit'));
        
  
        console.log('localSorage', produitsLocalStorage);
        console.log(Boolean(produitsLocalStorage));

        //fonction popupConfirmation
        const popupConfirmation = ()=>{
            if(window.confirm (`${ours.name} a bien été ajouté au panier
            Consulter le panier OK ou revenir à l'accueil ANNULER`)){
                window.location.href = "panier.html";
            }else{
                //window.location.href  = 'index.html';
            }
        }

        //fonction ajouter un produit sélectionné dans le localStorage 
        const addProductToCart= () =>{
            //ajout dans le tableau objet choisi pas utilisateur
            produitsLocalStorage.push(itemAddedToBasket);

            //transformation en format json et envoie dans 'produit' du localStorage
            localStorage.setItem('produit', JSON.stringify(produitsLocalStorage));
        }

            // si localStorage pas vide   
            if(produitsLocalStorage){
            console.log('ok');
            addProductToCart();
            console.log('mes produits', produitsLocalStorage);
            popupConfirmation();
            }
            // si localSorage vide
            else{
            
            produitsLocalStorage=[];
            addProductToCart();
            popupConfirmation();
            };       
console.log(itemAddedToBasket);
    }, false); 
    
};


function addToCart(products){
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
            products:products,   
        })   
    })
    .then (res=>res.json())
    .then (data=>{
        console.log('methodepost', data);
         
    })

};
//squelette html page panier
function myCart(){
//-------AFFICHAGE DES PRODUITS DU PANIER------
//--- récupération valeur du localStorage-----
let produitsLocalStorage =JSON.parse(localStorage.getItem('produit'));
var tabIds =[];
console.log(tabIds);
console.log('productinlocalstorage' ,produitsLocalStorage);

//selection de la classe qui contiendra le panier
const basketContainer = document.getElementById('panier');

//si le panier est vide: afficner le panier et vide
if(produitsLocalStorage === null){
    const panierVide = `
    <div class='container-panier-vide'>Le panier est vide</div>
    `;
    basketContainer.innerHTML = panierVide;
} else{

    //si le panier n'est pas vide :afficher élément localStorage
    let produitsInBasket = [];

    console.log(produitsLocalStorage.length);

    for (j=0; j < produitsLocalStorage.length; j++){

        tabIds.push(produitsLocalStorage[j].idProduit);
        produitsInBasket = produitsInBasket + ``;

        //--------creation div image------
        var itemImage= document.querySelector('img');
        var itemPanierContainer = document.getElementById('item-panier-container')

        var itemPanier= document.createElement('tr');
        itemPanierContainer.appendChild(itemPanier);
        itemPanier.setAttribute('class', 'item-panier')

        //-----creation div name-----
        var itemName= document.createElement('td');
        itemPanier.appendChild(itemName);
        itemName.setAttribute('class', 'item-name-panier')
        itemName.innerHTML = produitsLocalStorage[j].nomProduit;
       
        //-------color produit panier-----
        var itemColor = document.createElement('td');
        itemPanier.appendChild(itemColor);
        itemColor.setAttribute('class', 'item-color-panier')
        itemColor.innerHTML = produitsLocalStorage[j].couleurProduit;

        //------creation div prix----
        var itemPrice= document.createElement('td');
        itemPanier.appendChild(itemPrice);
        itemPrice.setAttribute('class', 'item-price-panier')
        itemPrice.innerHTML = produitsLocalStorage[j].prix;
        //précision type de monnaie
        var currency = document.createElement('span');
        itemPrice.appendChild(currency);
        currency.innerHTML = '€';

       

        //-----creation div quantité----
        var itemQte= document.createElement('td');
        itemPanier.appendChild(itemQte);
        itemQte.setAttribute('class', 'item-quantity')
        itemQte.innerHTML = produitsLocalStorage[j].quantite;
        
        console.log(produitsInBasket);
    }
}  

//------récupération info user------



//-------gestion boutton passer la commande-----
    var btnValiderCommande = document.getElementById('btn-valider-commande');
    btnValiderCommande.addEventListener('click', (event =>{
    console.log('ok je fonctionne');
    addToCart(tabIds);

}));


}; console.log('myCart()');


//-----redirection vers les différentes pages html du site-----
if (idOurs){
    getOursById(idOurs);
    console.log('produit')
}
else if(window.location.pathname === "/FrontEnd/panier.html" || window.location.pathname == "/panier.html" || window.location.pathname =="/projet5alt/FrontEnd/panier.html"){
    console.log('panier');
    myCart(); 
}

else{
    console.log('index');
    getOursList();
};


