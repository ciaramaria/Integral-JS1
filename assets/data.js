const productsData = [
    {
    id: 1,
    name: 'Agenda Rugrats',
    price: 1000,
    category: 'agenda',
    cardImg: './assets/img/agendaRugrats.png',
    
    },
    {
    id: 2,
    name: 'Buzo Jerry',
    category: 'buzo',
    price: 8000,
    cardImg: './assets/img/buzoJerry.jpg',
    },
    {
    id: 3,
    name: 'Buzo Simpson',
    category: 'buzo',
    price: 9500,
    cardImg: './assets/img/buzoSimpson.webp',
    },
    {
    id: 4,
    name: 'Buzo Tom',
    category: 'buzo',
    price: 7500,
    cardImg: './assets/img/buzoTom.jpg',
    },
    {
    id: 5,
    name: 'Libro colorear Billy & Mandy',
    category: 'libro',
    price: 1200,
    cardImg: './assets/img/colorearBilly&Mandy.jpg',
    },
    {
    id: 6,
    name: 'Gorra Correcaminos',
    category: 'gorra',
    price: 2000,
    cardImg: './assets/img/gorraCorrecaminos.jpg',
    },
    {
    id: 7,
    name: 'Gorra Coyote',
    category: 'gorra',
    price: 1500,
    cardImg: './assets/img/gorraCoyote .jpg',
    },
    {
    id: 8,
    name: 'Gorra Vaca y polito',
    category: 'gorra',
    price: 1000,
    cardImg: './assets/img/gorraVacaYPollito.jpg',
    },
    {
    id: 9,
    name: 'Llavero Johny Bravo',
    category: 'llavero',
    price: 500,
    cardImg: './assets/img/llaveroJonhnyBravo.jpg',
    },
    {
    id: 10,
    name: 'Medias Coraje el Perro Cobarde',
    category: 'medias',
    price: 500,
    cardImg: './assets/img/mediasCorajeElPerro.jpgg',
    },
    {
    id: 11,
    name: 'Medias Simpson',
    category: 'medias',
    price: 500,
    cardImg: './assets/img/mediasSimpson.jpg',
    },
    {
    id: 12,
    name: 'Pantalon Pinky y Cerebro',
    category: 'pantalon',
    price: 5000,
    cardImg: '/assets/img/pantalonPinkyYACerebro.jpg',
    },
    {
    id: 13,
    name: 'Pelicula Doug',
    category: 'pelicula',
    price: 1000,
    cardImg: './assets/img/peliculaDoug.jpg',
    },
    {
    id: 14,
    name: 'Pelicula Tom & Jerry',
    category: 'pelicula',
    price: 1200,
    cardImg: './assets/img/peliculaTomAndJerry.jpg',
    },
    {
    id: 15,
    name: 'Serie Castores Cascarrabias',
    category: 'serie',
    price: 1000,
    cardImg: './assets/img/serieCastoresCascarrabias.jpg',
    },
    {
    id: 16,
    name: 'Serie Dexter',
    category: 'serie',
    price: 800,
    cardImg: './assets/img/serieDexter.jpg',
    },
    {
    id: 17,
    name: 'Serie Ed Edd & Eddie',
    category: 'serie',
    price: 900,
    cardImg: './assets/img/serieEdEdd&Eddy.jpg',
    },
    {
    id: 18,
    name: 'Serie Rocket Power',
    category: 'serie',
    price: 700,
    cardImg: './assets/img/serieRocketPower.jpg',
    },
    {
    id: 19,
    name: 'Taza Coraje el Perro Cobarde',
    category: 'taza',
    price: 1500,
    cardImg: './assets/img/tazaCoraje.jpg',
    },
    {
    id: 20,
    name: 'Taza Pinky & Cerebro',
    category: 'taza',
    price: 1000,
    cardImg: './assets/img/tazaPinkyycerebro.jpg' ,
    },
    {
    id: 21,
    name: 'Zapatillas Toallin',
    category: 'zapatillas',
    price: 9000,
    cardImg: './assets/img/zapatillasToallin.jpg',
    },
    
];

const splitProducts = size => {
    let dividedProducts = [];
    for (let i = 0; i < productsData.length; i += size){
        dividedProducts.push(productsData.slice(i, i + size));
    }
    return dividedProducts;
};

const productsController = {
    dividedProducts : splitProducts(6),
    nextProductsIndex: 1,
    productsLimitit: splitProducts(6).length,
};

// console.log(productsController);