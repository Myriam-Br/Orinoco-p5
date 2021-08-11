//-----------------Récupération de la liste des ours et création du html pour chaque ours ---------------
function getOursList(){
    const promise1 = fetch('http://localhost:3000/api/teddies');
    promise1
    .then(res => res.json())
    .then(data =>{

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



//-----------------Récupération d'un ours à partir de l'id et création du html de l'ours spécifié------------
function getOursById(idOurs){

    const promise2=  fetch ('http://localhost:3000/api/teddies/'+idOurs)
    promise2
        .then (res => res.json())
        .then(data => {

            const cardContainer = document.getElementById('card-container');
            var structureCard  = `
            <div class="card card-pdt">
            <img src="${data.imageUrl}" alt="" class="image">
            <div class="name">${data.name}</div>
            <div class="price">${data.price/100} <span>€</span></div>
            <select class="colors">${data.colors}</select>
            <div class="description">${data.description}</div>
            <button type="submit" class="btn-add-to-basket">AJOUTER DANS PANIER</button>
            </div>
            `;

            cardContainer.insertAdjacentHTML("beforeend" ,structureCard);
        
            //création code html pour la sélection d'une couleur (menu déroulant)
            const colorsSelector= document.querySelector('.colors');
            var optionColor= data.colors;
                let structureOptions =[];
                
                for (let i = 0; i< optionColor.length; i++){
                    structureOptions = structureOptions + `
                    <option> ${optionColor[i]}</option>
                    `;
                };
            colorsSelector.innerHTML = structureOptions;
            

            var btnSelect = document.querySelector('.btn-add-to-basket');

            btnSelect.addEventListener('click', function(myCart){
                myCart.preventDefault();


                //----------------STOCKAGE PRODUIT DU PANIER-------------
                var colorSelected = colorsSelector.value;

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
                   
                }else{
                    //objet existe mais on modifie la qté
                    produitsLocalStorage[testIndex].quantite= produitsLocalStorage[testIndex].quantite+1;
                }
  
                localStorage.setItem('tableauItem', JSON.stringify(produitsLocalStorage));       
                
                var count = 1;
        
                if(localStorage.getItem('productcount')){
                    count = parseInt(localStorage.getItem('productcount')) + 1;
                }

                localStorage.setItem('productcount', count); 
                basketCount();
            });       
        });
};

//injection du compteur de produit dans le html (icon panier)
function basketCount(){
    if(localStorage.getItem('productcount') && document.getElementById('produit-count')){
    var productCount = document.getElementById('produit-count');
    productCount.innerHTML = localStorage.getItem('productcount');   
    } 
};


//-------------Récupération élément du panier dans localStorage et création/remplissage du html de la page panier--------------
function myBasket(){
  

    var produitsLocalStorage =JSON.parse(localStorage.getItem('tableauItem'));
    
    var idItemInBasket = [];
    var totalPriceTable=[];

    if(produitsLocalStorage === null){

       
    }else{  

        for(j=0; j < produitsLocalStorage.length; j++){

            //---------------ajout des id dans le localstorage (tableau id)--------------
            idItemInBasket.push(produitsLocalStorage[j].idProduit);

            //-------------récupérer produits du localStorage et injecter dans le html de la page produit------------
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
  
            //-----------récupération prix produits du localStorage et calcul du prix total -------------------
            totalPriceTable.push(produitsLocalStorage[j].price*produitsLocalStorage[j].quantite);
            const reducer = (accumulator, currentValue ) => accumulator + currentValue;
            const totalPrice = totalPriceTable.reduce(reducer);
            var totalPriceAmount = document.getElementById('total-price-amount');
            totalPriceAmount.innerHTML = totalPrice + '€';
        }     
    };
};

//----------------- Stockage des données users dans le localStorage (uniquement si elles sont valides)--------------
function dataUser(){

    //récupération élément du formumaire du DOM
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

    var sendForm = true; //paramètre utiliser pour valider l'envoie (si faux la confirmation de la commande n'est pas autorisée)


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
        
        requireCity.innerHTML = ""; 
        localStorage.setItem('userCity', userCity);
    };

    //verification email
    let requireEmail = document.getElementById('require-email');
    var emailFilter =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
        localStorage.setItem('userEmail', userEmail);
    };

    return sendForm; //si tous les critères sont valide, on renvoie sendForm = vrai -> l'envoie pourra être effectué
};



//------------récupération données contact et produit du localStorage envoie de ces éléments avec la méthode POST (envoie uniquement si le formulaire est valide)----------
function dataBasketPost(sendForm){
    
    var produitsLocalStorage = JSON.parse(localStorage.getItem('tableauItem'));

    if(produitsLocalStorage==null){
        produitsLocalStorage=[];       
    }else{
        var idItemInBasket=[];        
        for(j=0; j < produitsLocalStorage.length; j++){
            idItemInBasket.push(produitsLocalStorage[j].idProduit);
        };

        localStorage.setItem('idtab', idItemInBasket.join());
    };

    if(idItemInBasket==null){
        alert('votre panier est vide :(');
        sendForm = false;  
    };



    //si le paramètre sendForm = vrai -> les données stockées dans le localStorage pourront être envoyé avec la méthode post
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

        promise3
        .then (res=>res.json())
        .then (data=>{

        //récupération orderId
        localStorage.setItem('orderId',data.orderId); 
        pageConfirmation();
        });
    };
}
 

//--------------structure page de commande-------------
function validationCommande(){
  
    //récupération des éléments du localStorage (firstname , produits(pour calcul du prix total), orderId)
    var userFirstNameStorage = localStorage.getItem('userFirstName');
    var produitsLocalStorage =JSON.parse(localStorage.getItem('tableauItem'));
    var recupeOrderId = localStorage.getItem('orderId');

    //récupération éléments du DOM
    var firstNameField = document.getElementById('user-first-name');
    var totalPriceField = document.getElementById('total-price-field'); 
    var orderIdField = document.getElementById('orderId');
    var totalPriceTable =[];

    //-----remplissage contenu élément du DOM----------

        //firstname
    firstNameField.innerHTML = userFirstNameStorage;
    
        //totalprice
    if(produitsLocalStorage){
        for(j=0; j<produitsLocalStorage.length; j++){      
            //-----------CALCUL DU PRIX TOTAL-------------------
            totalPriceTable.push(produitsLocalStorage[j].price*produitsLocalStorage[j].quantite);
            const reducer = (accumulator, currentValue ) => accumulator + currentValue;
            const totalPrice = totalPriceTable.reduce(reducer);
            totalPriceField.innerHTML =  totalPrice + '€';
        }; 
    }
      
        //orderId
    orderIdField.innerHTML = recupeOrderId;

};

//vider le panier après avoir passé la commande
function clearProductCount(){
    localStorage.removeItem('tableauItem');
    localStorage.removeItem('productcount');
    localStorage.removeItem('idtab');
    document.location.href="./index.html";
};

//renvoie page confirmation 
function pageConfirmation(){
    document.location.href="./confirmation.html?page=confirmation";
   
};











//-------------Routeur (affichage page du site en fonction de l'url-------//

//récupération de la chaine de requête (querystring)
var queryString = window.location.search;
const urlSearchParams = new URLSearchParams(queryString);
let idOurs = urlSearchParams.get('id');
let page= urlSearchParams.get('page');


basketCount();
if (idOurs){
    getOursById(idOurs);

}else if(page==="panier" ){
    myBasket();
   
    //------------écouter événement et lancer fontion valider (envoie des données uniquement si le formulaire est valide --------
    var btnValider = document.getElementById('btn-valider');
    btnValider.addEventListener('click', async function(event){
        event.preventDefault();
        var sendForm = await dataUser();
        dataBasketPost(sendForm);
    });
 
}else if(page==="confirmation" ){
    validationCommande();  

    //------------écouter événement et vider le panier--------
    var backToHome= document.getElementById('retour-accueil');
    backToHome.addEventListener('click', function(event){
        event.preventDefault();
        clearProductCount();
    });    

}else{
    getOursList();
};

