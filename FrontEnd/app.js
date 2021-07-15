//-------------TOGGLE NAVIGATION-----------

   /* var navigation = document.getElementById('navItems');
    var btnMenu = document.getElementById('btn');
    navigation.style.display = 'none'
    btnMenu.addEventListener('click', function(e){
        e.preventDefault();
        
        if(navigation.style.display = 'none'){
            navigation.style.display= 'block'
        }  
        else{
            navigation.style.display = 'none';
        }  
    });*/



//--------------------------PAGE ACCUEIL-----------------
//-------PROMISE DE TYPE GET -> getOursList-------------
function getOursList(){
    const promise1 = fetch('http://localhost:3000/api/teddies');
    console.log(promise1);
    promise1
    .then(res => res.json())
    .then(data =>{
    console.log(data);
    console.log(data.length);
    console.log(data[1]._id);
    
        //put the content in a for... //
    for(i=0; i<data.length; i++){
        const cardContainer = document.getElementById('card-container');
        var structureCard  = `
        <div class="card">
        <a href='produit.html?id=${data[i]._id}'>
        <img src="${data[i].imageUrl}" alt="" class="image">
        <div class="name">${data[i].name}</div>
        <div class="price">${data[i].price/100} <span>€</span></div>
        <div class="colors">${data[i].colors}</div>
        <div class="description">${data[i].description}</div>
        </a>
        </div>
        `;
        cardContainer.insertAdjacentHTML("beforeend" ,structureCard); 
        };
    });

}



//----------PROMISE DE TYPE GET -> getOursById-------------

//récupération de la chaine de requête (querystring)
var queryString = window.location.search;
console.log(queryString);
const urlSearchParams = new URLSearchParams(queryString);
let idOurs = urlSearchParams.get('id');
//console.log(idOurs);

//affichage du produit (de l'objet) qui a été sélectionné par l'id

//--- Methode 1: avec fetch et en mettant la valeur de l'id à la fin de l'url
function getOursById(){
    const promise2=  fetch ('http://localhost:3000/api/teddies/'+idOurs)
    promise2
        .then (res => res.json())
        .then(data => {
        const cardContainer = document.getElementById('card-container');
        var structureCard  = `
        <div class="card">
        <img src="${data.imageUrl}" alt="" class="image">
        <div class="name">${data.name}</div>
        <div class="price">${data.price/100} <span>€</span></div>
        <select class="colors">${data.colors}</select>
        <div class="description">${data.description}</div>
        <button type="submit" class="btn-add-to-basket">AJOUTER DANS PANIER</button>
        </div>
        `;
        cardContainer.insertAdjacentHTML("beforeend" ,structureCard);
        
        const colorsSelector= document.querySelector('.colors');
        var optionColor= data.colors;
            let structureOptions =[];
            console.log('democolor', optionColor);
            for (let i = 0; i< optionColor.length; i++){
                structureOptions = structureOptions + `
                <option> ${optionColor[i]}</option>
                `;
            };
            colorsSelector.innerHTML = structureOptions;
            console.log(colorsSelector);


        var btnSelect = document.querySelector('.btn-add-to-basket');
        console.log('btn', btnSelect);

        btnSelect.addEventListener('click', function(myCart){
            myCart.preventDefault();
            
            var colorSelected = colorsSelector.value;
            
            var itemInStorage ={
                idProduit:data._id,
                name:data.name,
                price:data.price/100,
                colors:colorSelected,
                quantite:0,
            };  
          
            console.log(itemInStorage.idProduit);
            console.log(typeof(itemInStorage.quantite));

            //----------------STOCKAGE PRODUIT DU PANIER-------------
             
            var produitsLocalStorage =JSON.parse(localStorage.getItem('tableauItem'));

            //produitsLocalStorage = []; 
            //produitsLocalStorage.push(itemInStorage); 
           // localStorage.setItem('tableauItem', JSON.stringify(produitsLocalStorage));     
      
           if (produitsLocalStorage==undefined) {  
                produitsLocalStorage = [];     
            } else{ 
                itemInStorage = produitsLocalStorage.find(x => x.idProduit === data._id); 
                itemInStorage.quantite = itemInStorage.quantite+1;                
                console.log(itemInStorage.quantite = itemInStorage.quantite+1); 
            }

            produitsLocalStorage.push(itemInStorage); 
            localStorage.setItem('tableauItem', JSON.stringify(produitsLocalStorage));    


            console.log('mesProduits', produitsLocalStorage);
            console.log("monProduit",itemInStorage.quantite);
        });
  
    });
};

//console.log(localStorage.setItem('produit', 'my variable'));
console.log(localStorage);
//console.log(localStorage.getItem('tableauItem'));
console.log(JSON.parse(localStorage.getItem('tableauItem')));



    //-------------CREATION DU PANIER--------------
function myBasket(){
  
    var produitsLocalStorage =JSON.parse(localStorage.getItem('tableauItem'));
    //console.log('myBasket',produitsLocalStorage);
   // console.log(produitsLocalStorage.length);
    
    var idItemInBasket = [];
    var totalPriceTable=[];

    if(produitsLocalStorage === null){

        console.log('panier est vide');   
    } 
    else{
        
        //let productsInBasket = [];
        //productsInBasket.push(produitsLocalStorage);
        
        console.log('id produitInBasket',idItemInBasket);
        console.log('mybasket',produitsLocalStorage);
        for(j=0; j < produitsLocalStorage.length; j++){
            //---------------AJOUT ID PRODUIT DANS TABLEAU ID--------------
            idItemInBasket.push(produitsLocalStorage[j].idProduit);
            console.log(produitsLocalStorage[j].idProduit);

            //-------------REMPLACER PRODUIT DU LOCALSTORAGE DANS LE HTML DU PANIER ------------
            const itemBasket = document.getElementById('tbody');
            var structurePanier = `
            <tr class="tbody-item">
            <td>${produitsLocalStorage[j].name}</td>
            <td>${produitsLocalStorage[j].colors}</td>
            <td>${produitsLocalStorage[j].quantite}</td>
            <td>${produitsLocalStorage[j].price+"€"}</td>
            </tr> 
            `;
            itemBasket.insertAdjacentHTML('beforeend', structurePanier); 
            

            //-----------CALCUL DU PRIX TOTAL-------------------
            totalPriceTable.push(produitsLocalStorage[j].price);
            const reducer = (accumulator, currentValue ) => accumulator + currentValue;
            console.log(reducer);
    
            const totalPrice = totalPriceTable.reduce(reducer);
            console.log("prix total", totalPrice);
        
            var totalPriceAmount = document.getElementById('total-price-amount');
            console.log(totalPriceAmount);
            totalPriceAmount.innerHTML = totalPrice + '€';
        }   
        
        console.log(produitsLocalStorage.length);
    };


//----------------- STOCKAGE DATA USERS--------------
function dataUser(){
    var userLocalStorage = JSON.parse(localStorage.getItem('dataUsers'));
   
    var userFirstName = document.getElementById('user-first-name');
    userFirstName = userFirstName.value;

    var userLastName = document.getElementById('user-last-name');
    userLastName = userLastName.value;

    var  userAddress= document.getElementById('user-adress');
    userAddress = userAddress.value;

    var userCity = document.getElementById('user-city');
    userCity = userCity.value;

    var userEmail = document.getElementById('user-email');
    userEmail = userEmail.value;
   
    var contactUser ={
       firstName: userFirstName,
       lastName: userLastName,
       address: userAddress,
       city: userCity,
       email: userEmail,
   };

   if(userLocalStorage){
    userLocalStorage.push(contactUser);
    localStorage.setItem('dataUsers', JSON.stringify(userLocalStorage));
   } 
   else{
    userLocalStorage = [];
    userLocalStorage.push(contactUser);
    localStorage.setItem('dataUsers', JSON.stringify(userLocalStorage));
   };
};



};


    const promise3 =  fetch("http://localhost:3000/api/teddies/order",{
        method: 'POST',
        headers: { 
        'Accept': 'application/json', 
        'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
            contact:{
                firstName : 'firsName',
                lastName: 'lastName',
                address : 'address',
                city: 'city',
                email:'email'
            },
            products:[],   
        })   
    });

    promise3
    .then (res=>res.json())
    .then (data=>{
        console.log('methodepost', data);
        console.log(data.contact.firstName); 
        console.log(JSON.parse(localStorage.getItem('tableauItem')));
        console.log(data.orderId);
       
        //---------recupérer idProduit localStorage dans POST----------
        var produitsLocalStorage = JSON.parse(localStorage.getItem('tableauItem'));
        //console.log(produitsLocalStorage[1].idProduit);
        var idItemInBasket = [];

        if(produitsLocalStorage==null){
            produitsLocalStorage=[];
            
        }else{
            for(j=0; j < produitsLocalStorage.length; j++){
                idItemInBasket.push(produitsLocalStorage[j].idProduit);
            };
        }

        console.log(idItemInBasket);
        data.products = idItemInBasket;

        if(userLocalStorage==null){
            localStorage.setItem('dataUsers', JSON.stringify(userLocalStorage));
        } else{
              //-----------récupérer usersData localStorage dans POST-------------
        console.log(JSON.parse(localStorage.getItem('dataUsers')));
        var userLocalStorage = JSON.parse(localStorage.getItem('dataUsers'));
    
        data.contact.firstName = userLocalStorage.firstName;
        data.contact.lastName = userLocalStorage.lastName;
        data.contact.address = userLocalStorage.address;
        data.contact.city = userLocalStorage.city;
        data.contact.email = userLocalStorage.email;

        }
 
  });



  
    
     //--------------structure page de commande-------------
function validationCommande(){
    //console.log(JSON.parse(localStorage.getItem('dataUsers')));
    var userData = JSON.parse(localStorage.getItem('dataUsers'));
    console.log(userData[0].firstName);
    var firstNameField = document.getElementById('user-first-name');
    firstNameField.innerHTML = userData.firstName;
    console.log(firstNameField);
};


//-------------REDIRECTION VERS LES DIFFERENTES PAGES DU SITE-----------//
if (idOurs){
    getOursById(idOurs);
    console.log('produit')
}
else if(window.location.pathname === "/FrontEnd/panier.html" || window.location.pathname == "/panier.html" || window.location.pathname =="/Orinoco-p5/FrontEnd/panier.html"){
    console.log('panier');
    myBasket();

    //----------------ENVOIE DONNEE USER FORM VERS LOCAL STORAGE------------------

    var btnValider = document.getElementById('btn-valider');
    console.log('mybtn', btnValider);
    //------------écouter événement et lancer fontion valider--------
    btnValider.addEventListener('click', function(event){
        event.preventDefault();
        dataUser();
        validationCommande();
        var queryString = window.location.pathname;
        console.log(queryString);

    });
    
}

else{
    console.log('index');
    getOursList();
};





/*//----------prix total du panier---------
let totalPriceCalcul = [];
//chercher prix dans panier
for( let k=0; k < produitsLocalStorage.length; k++){
    let prixProduitPanier = produitsLocalStorage[k].prix;

    //mettre prix panier dans la variable 'totalPrice'.
    totalPriceCalcul.push(prixProduitPanier);
}

//additioner les prix des produit du panier
const reducer = (accumulator, currentValue ) => accumulator + currentValue;
const totalPrice = totalPriceCalcul.reduce(reducer);

//injecter le résultat dans le code html
const totalCommande= document.getElementById('total-price');
totalCommande.innerHTML = totalPrice + '€';
//console.log(totalPrice);
//console.log(totalPriceCalcul);
*/
