const products = document.querySelector(".products-container");
const productsCart = document.querySelector(".cart-container");
const total = document.querySelector(".total");
const categories = document.querySelector(".categories");
// un html collection de todas las categorias
const categoriesList = document.querySelectorAll(".category");
const btnLoad = document.querySelector(".btn-load");
const buyBtn = document.querySelector(".btn-buy");
const cartBtn = document.querySelector(".cart-label");
const barsBtn = document.querySelector(".menu-label");
const cartMenu = document.querySelector(".cart");
const barsMenu = document.querySelector(".navbar-list");
const overlay = document.querySelector(".overlay");
// BOTON DE VACIAR CARRITO
const deleteBtn = document.querySelector(".btn-delete");
// SELECTOR DEL MODAL
const successModal = document.querySelector(".add-modal");


let cart = JSON.parse(localStorage.getItem('cart')) || [];

const saveLocalStorage = (cartList) => {
    localStorage.setItem('cart', JSON.stringify(cartList));

};

const renderProduct = (product) => {
    const { id, name, cardImg, price } = product
    return `
    <div class="product">
    <img src=${cardImg} alt=${name} />
    <div class="product-info">
        <!-- top -->
        <div class="product-top">
            <h3>${name}</h3>
            <span>${price} pesos</span>
        </div>
        <!-- bot -->
        <div class="product-bot">
                <button class="btn-add"
                data-id='${id}'
                data-name='${name}'
                data-bid='${price}'
                data-img='${cardImg}'>Add</button>
            </div>
        </div>
    </div>
</div>
    `;
};

const renderDividedProducts = (index = 0) => {
    products.innerHTML += productsController.dividedProducts[index].map(renderProduct).join ('');
};


const renderProducts = (index = 0, category = undefined) => {
    if (!category) {
        renderDividedProducts(index);
        return;
    }
}




const init = () => {
    renderProducts();
}

init();