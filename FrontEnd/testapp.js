const testGetListOurs =()=>{
    const promise1 = fetch('http://localhost:3000/api/teddies');  
    console.log(promise1);

    //---------Promis de type GET-------------
    promise1
    .then(res => res.json())
    .then(data =>{
        //----------récupérations des données de l'API au format json----------
        console.log("données de l'API",data); 


        //récupération donnée API d'un ours à partir de son index

        console.log('premier ours',data[0]);
            //récupération des couleurs
            console.log('premier ours colors',data[0].colors);

            //récupération de l'id
            console.log('premier ours id',data[0]._id);

            //récupération du nom
            console.log('premier ours name',data[0].name);

            //récupération du prix
            console.log('premier ours price',data[0].price);

            //récupération de la description
            console.log('premier ours description',data[0].description);


        console.log('deuxième ours',data[1]);
            //récupération des couleurs
            console.log('deuxième ours colors',data[1].colors);

            //récupération de l'id
            console.log('deuxième ours id',data[1]._id);

            //récupération du nom
            console.log('deuxième ours name',data[1].name);

            //récupération du prix
            console.log('deuxième ours price',data[1].price);

            //récupération de la description
            console.log('deuxième ours description',data[1].description);


        console.log('troisième ours',data[2]);
            //récupération des couleurs
            console.log('troisième ours colors',data[2].colors);

            //récupération de l'id
            console.log('troisième ours id',data[2]._id);

            //récupération du nom
            console.log('troisième ours name',data[2].name);

            //récupération du prix
            console.log('troisième ours price',data[2].price);

            //récupération de la description
            console.log('troisième ours description',data[2].description);


        console.log('quatrième ours',data[3]);
            //récupération des couleurs
            console.log('quatrième ours colors',data[3].colors);

            //récupération de l'id
            console.log('quatrième ours id',data[3]._id);

            //récupération du nom
            console.log('quatrième ours name',data[3].name);

            //récupération du prix
            console.log('quatrième ours price',data[3].price);

            //récupération de la description
            console.log('quatrième ours description',data[3].description);


        console.log('cinquième ours',data[4]);
            //récupération des couleurs
            console.log('cinquième ours colors',data[4].colors);

            //récupération de l'id
            console.log('cinquième ours id',data[4]._id);

            //récupération du nom
            console.log('cinquième ours name',data[4].name);

            //récupération du prix
            console.log('cinquième ours price',data[4].price);

            //récupération de la description
            console.log('cinquième ours description',data[4].description);
    });

}; testGetListOurs();

