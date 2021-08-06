
//--------------------------PAGE ACCUEIL-----------------
//-------PROMISE DE TYPE GET -> getOursList-------------


function getOursList(){
console.log('GETOURSLIST');

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

};



//----------PROMISE DE TYPE GET -> getOursById-------------




//console.log(idOurs);

//affichage du produit (de l'objet) qui a été sélectionné par l'id

//--- Methode 1: avec fetch et en mettant la valeur de l'id à la fin de l'url
function getOursById(idOurs){


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
                console.log(colorSelected );
            
                 
                //----------------STOCKAGE PRODUIT DU PANIER-------------
                
                var produitsLocalStorage = JSON.parse(localStorage.getItem('tableauItem'));
                if (produitsLocalStorage==undefined) {  
                    produitsLocalStorage = [];      
                } 
                

                var testIndex = produitsLocalStorage.findIndex(x => x.idProduit === data._id && x.color === colorSelected);           
                if(testIndex==-1){
                    
                    var itemInStorage ={
                        idProduit:data._id,
                        name:data.name,
                        price:data.price/100,
                        color:colorSelected,
                        quantite:1,
                    };  
                    //objet n'existe pas dans le storage et il faut l'ajouter
                    produitsLocalStorage.push(itemInStorage); 
                   
                    /*var idItemInBasket = JSON.parse(localStorage.getItem('tableauIdItem'));
                    idItemInBasket = [];
                    idItemInBasket.push(itemInStorage.idProduit);    
                    localStorage.setItem('tableauIdItem', JSON.stringify(idItemInBasket));*/                      
                }else{
                    //objet existe mais on modifie la qté
                    produitsLocalStorage[testIndex].quantite= produitsLocalStorage[testIndex].quantite+1;
                    console.log(produitsLocalStorage[testIndex].quantite);
                }


                
                localStorage.setItem('tableauItem', JSON.stringify(produitsLocalStorage));       
                //itemInStorage = produitsLocalStorage.find(x => x.idProduit === data._id); 
                //console.log('récup ligne prdt',produitsLocalStorage.find(x => x.idProduit === data._id));
                
                var count = 1;
        
                if(localStorage.getItem('productcount')){
                    count = parseInt(localStorage.getItem('productcount')) + 1;
                }

                localStorage.setItem('productcount', count); 
                basketCount();
            });       
        });
};


function basketCount(){
    if(localStorage.getItem('productcount') && document.getElementById('produit-count')){
    var productCount = document.getElementById('produit-count');
    //console.log(productCount);
    productCount.innerHTML = localStorage.getItem('productcount');   
    } 
};


//console.log(localStorage.setItem('produit', 'my variable'));
//console.log(localStorage.getItem('tableauItem'));
//console.log(JSON.parse(localStorage.getItem('tableauItem')));



//-------------CREATION DU PANIER--------------
function myBasket(){
  
    var produitsLocalStorage =JSON.parse(localStorage.getItem('tableauItem'));
    //console.log('myBasket',produitsLocalStorage);
   // console.log(produitsLocalStorage.length);
    
    var idItemInBasket = [];
    var totalPriceTable=[];

    if(produitsLocalStorage === null){

        console.log('panier est vide');   
    }else{  
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
            <td>${produitsLocalStorage[j].color}</td>
            <td>${produitsLocalStorage[j].quantite}</td>
            <td>${produitsLocalStorage[j].price*produitsLocalStorage[j].quantite+"€"}</td>
            </tr> 
            `;
            itemBasket.insertAdjacentHTML('beforeend', structurePanier); 
  
            //-----------CALCUL DU PRIX TOTAL-------------------
            totalPriceTable.push(produitsLocalStorage[j].price*produitsLocalStorage[j].quantite);
            const reducer = (accumulator, currentValue ) => accumulator + currentValue;
            console.log(reducer);
    
            const totalPrice = totalPriceTable.reduce(reducer);
            console.log("prix total", totalPrice);
        
            var totalPriceAmount = document.getElementById('total-price-amount');
            console.log(totalPriceAmount);
            totalPriceAmount.innerHTML = totalPrice + '€';
        }   
      
    };

};

//----------------- STOCKAGE DATA USERS--------------
function dataUser(){

    //récupération élément form du DOM
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

    var sendForm = true;
    //-----------------verification du formulaire---------------//

    

    //verification firstName
    let requireFirstName = document.getElementById('require-firstname');
    var letterFilter = /^[a-z]+$/i;
    if(userFirstName == ""){
        requireFirstName.innerHTML = "Veuillez entrer votre prénom";  
        sendForm = false;  
    } else if(!userFirstName.match(letterFilter)){
        requireFirstName.innerHTML = "Veuillez entrer un prénom valide";  
        sendForm = false
    }else{
        //stockage userfirstname 
        console.log('prénom enregistré');
        requireFirstName.innerHTML = "";  
        localStorage.setItem('userFirstName', userFirstName);    
    };

    //verification lastName
    let requireLastName = document.getElementById('require-lastname');
    if(userLastName == ""){
        requireLastName.innerHTML = "Veuillez entrer votre nom"; 
        sendForm = false;  
    } else if(!userLastName.match(letterFilter)){
        requireLastName.innerHTML = "Veuillez entrer un nom valide";  
        sendForm = false
    }else{
        //stockage userlastname 
        console.log('nom enregistré');
        requireLastName.innerHTML = ""; 
        localStorage.setItem('userLastName', userLastName);
    };

    //verification adresse
    let requireAdress = document.getElementById('require-adress');
    var adressFilter = /^[a-zA-Z0-9\s,'-]*$/;
    if(userAddress == ""){
        requireAdress.innerHTML = "Veuillez entrer votre adresse"; 
        sendForm = false;  
    } else if(!userAddress.match(adressFilter)){
        requireAdress.innerHTML = "Veuillez entrer une adresse valide";  
        sendForm = false
    }else{
        //stockage useradress 
        console.log('adresse enregistré');
        requireAdress.innerHTML = "";
        localStorage.setItem('userAdress', userAddress);
    };

    //verification city
    let requireCity = document.getElementById('require-city');
    var cityFilter = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
    if(userCity == ""){
        requireCity.innerHTML = "Veuillez entrer votre ville"; 
        sendForm = false;  
    } else if(!userCity.match(cityFilter)){
        requireCity.innerHTML = "Veuillez entrer une ville valide";  
        sendForm = false
    }else{
        //stockage usercity
        console.log('ville enregistré');
        requireCity.innerHTML = ""; 
        localStorage.setItem('userCity', userCity);
    };

    //verification email
    let requireEmail = document.getElementById('require-email');
    var emailFilter = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(userEmail == ""){
        requireEmail.innerHTML = "Veuillez entrer votre email"; 
        sendForm = false;       
    }
    else if(!userEmail.match(emailFilter)) {
        requireEmail.innerHTML = "Veuillez entrer un email valide";
        sendForm = false;  
    }else{
        //stockage useremail
        requireEmail.innerHTML = ""; 
        console.log('email enregistré');
        localStorage.setItem('userEmail', userEmail);
    };

    return sendForm;
};


//dataUser();
//console.log(userProfil);

//------------------PROMISE DE TYPE POST---------------------

function dataBasketPost(sendForm){
    //---------recupérer idProduit localStorage dans POST----------
    var produitsLocalStorage = JSON.parse(localStorage.getItem('tableauItem'));
    //var idItemLocalStorage = localStorage.getItem('tableauId');
    //console.log(produitsLocalStorage);
    //console.log(produitsLocalStorage[1].idProduit);

    if(produitsLocalStorage==null){
        produitsLocalStorage=[];
        
        
    }else{
        var idItemInBasket=[];        
        for(j=0; j < produitsLocalStorage.length; j++){
            idItemInBasket.push(produitsLocalStorage[j].idProduit);
            // console.log(idItemInBasket.push(produitsLocalStorage[j].idProduit));
        };

        localStorage.setItem('idtab', idItemInBasket.join());
    };

    //récuperation id produit local storage
    //qvar idItemLocalStorage = localStorage.getItem('tableauId');
    if(idItemInBasket==[]){
    console.log('le panier est vide');
    sendForm = false;  
    };

    if(sendForm){
        const promise3 =  fetch("http://localhost:3000/api/teddies/order",{
        method: 'POST',
        headers: { 
        'Accept': 'application/json', 
        'Content-Type': 'application/json' 
        },
        body: JSON.stringify({

            contact:{
                firstName : localStorage.getItem('userFirstName'),
                lastName : localStorage.getItem('userLastName'),
                address : localStorage.getItem('userAdress'),
                city : localStorage.getItem('userCity'),
                email : localStorage.getItem('userEmail'),
            },

            products:localStorage.getItem('idtab').split(','),   
        })   
    });
    console.log(promise3);

        promise3
        .then (res=>res.json())
        .then (data=>{
        console.log(data);
        //récupération orderId
        localStorage.setItem('orderId',data.orderId); 
        pageConfirmation();
        });


    };

}
 

//--------------structure page de commande-------------
function validationCommande(){
    //console.log(JSON.parse(localStorage.getItem('dataUsers')));
    var userFirstNameStorage = localStorage.getItem('userFirstName');
    var produitsLocalStorage =JSON.parse(localStorage.getItem('tableauItem'));
    var recupeOrderId = localStorage.getItem('orderId');
    console.log(recupeOrderId);
    

    //récupération éléments du DOM
    var firstNameField = document.getElementById('user-first-name');
    var totalPriceField = document.getElementById('total-price-field'); 
    var orderIdField = document.getElementById('orderId');
    var totalPriceTable =[];

    //-----remplacement contenu élément du DOM----------

        //firstname
    firstNameField.innerHTML = userFirstNameStorage;
    
        //totalprice
    if(produitsLocalStorage){
        for(j=0; j<produitsLocalStorage.length; j++){      
            //-----------CALCUL DU PRIX TOTAL-------------------
            totalPriceTable.push(produitsLocalStorage[j].price*produitsLocalStorage[j].quantite);
            const reducer = (accumulator, currentValue ) => accumulator + currentValue;
            console.log(reducer);
            const totalPrice = totalPriceTable.reduce(reducer);
            console.log("prix total", totalPrice);
            totalPriceField.innerHTML =  totalPrice + '€';
        }; 
    }
      
        //orderId
    orderIdField.innerHTML = recupeOrderId;

};



//-------------REDIRECTION VERS LES DIFFERENTES PAGES DU SITE-----------//

//renvoie page confirmation (à changer)
function pageConfirmation(){
    document.location.href="./confirmation.html";
};

//récupération de la chaine de requête (querystring)
var queryString = window.location.search;
//console.log(queryString);
const urlSearchParams = new URLSearchParams(queryString);
let idOurs = urlSearchParams.get('id');
console.log(window.location.pathname);
basketCount();
if (idOurs){
    getOursById(idOurs);
    console.log('produit');

}else if(window.location.pathname === "/FrontEnd/panier.html" || window.location.pathname == "/panier.html" || window.location.pathname =="/Orinoco-p5/FrontEnd/panier.html" || window.location.pathname == "/projet5-Orinoco/projet5-Orinoco/FrontEnd/panier.html" ){
    console.log('panier');
    myBasket();
   
    //----------------ENVOIE DONNEE USER FORM VERS LOCAL STORAGE------------------
    var btnValider = document.getElementById('btn-valider');
    console.log('mybtn', btnValider);
    //------------écouter événement et lancer fontion valider--------
    btnValider.addEventListener('click', async function(event){
        event.preventDefault();
        var sendForm = await dataUser();
        dataBasketPost(sendForm);
    });
 
}else if(window.location.pathname === "/FrontEnd/confirmation.html" || window.location.pathname == "/confirmation.html" || window.location.pathname =="/Orinoco-p5/FrontEnd/confirmation.html" || window.location.pathname == "/projet5-Orinoco/projet5-Orinoco/FrontEnd/confirmation.html" ){
    validationCommande();

}else{
    console.log('index');
    getOursList();
};

