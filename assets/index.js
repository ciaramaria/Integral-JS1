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
                data-img='${cardImg}'>AGREGAR</button>
            </div>
        </div>
    </div>
</div>
    `;
};

const renderDividedProducts = (index = 0) => {
    products.innerHTML += productsController.dividedProducts[index].map(renderProduct).join ('');
};


const renderFilteredProducts = (category) => {
    const productList = productsData.filter(
        (product) => product.category === category
        );

    products.innerHTML = productList.map(renderProduct).join ('');
}

const renderProducts = (index = 0, category = undefined) => {
    if (!category) {
        renderDividedProducts(index);
        return;
    }
    renderFilteredProducts(category);
}

const changeBtnActiveState = (selectedCategory) => {
    const categories = [...categoriesList];
    categories.forEach((categoryBtn) => {
        if (categoryBtn.dataset.category !== selectedCategory) {
        categoryBtn.classList.remove('active');
        return;
        }
        categoryBtn.classList.add('active');
    })
};

const changeShowMoreBtnState = category => {
    if(!category){
        btnLoad.classList.remove('hidden') 
        return;
    }
    btnLoad.classList.add('hidden');
}


// cambios de estado btn, son dos arriba 
const changeFilterState = (e) => {
    const selectedCategory = e.target.dataset.category;
    changeBtnActiveState(selectedCategory);
    changeShowMoreBtnState(selectedCategory);
};


// filtro-principal 
const applyFilter = (e) => {
    if (!e.target.classList.contains('category')) return;
    changeFilterState(e);
    if (!e.target.dataset.category){
        products.innerHTML = '';
        renderProducts();
    } else {
        renderProducts(0, e.target.dataset.category);
        productsController.nextProductsIndex = 1;
    }
};

// true-false
const isLastIndexOf = () => productsController.nextProductsIndex === productsController.productsLimit;

// ver-más
const showMoreProducts = () => {
    renderProducts(productsController.nextProductsIndex);
    productsController.nextProductsIndex++;
    if (isLastIndexOf()) {
      btnLoad.classList.add("hidden");
    }
  };

// menu
const toggleMenu = () => {
    barsMenu.classList.toggle('open-menu');
    if(cartMenu.classList.contains('open-cart')){
        cartMenu.classList.remove('open-cart');
        return;
    }
    overlay.classList.toggle('show-overlay');
};

const toggleCart = () => {
    cartMenu.classList.toggle('open-cart');
    if(barsMenu.classList.contains('open-menu')){
        barsMenu.classList.remove('open-menu');
        return;
    }
    overlay.classList.toggle('show-overlay');
}

const closeOnScroll = () => {
    if(
        !barsMenu.classList.contains('open-menu') &&
        !cartMenu.classList.contains('open-cart')
        ) 
        return;
        barsMenu.classList.remove('open-menu')
        cartMenu.classList.remove('open-cart')
        overlay.classList.remove('show-overlay')
    }
  

const init = () => {
    renderProducts();
    categories.addEventListener('click', applyFilter);
    btnLoad.addEventListener('click', showMoreProducts);
    cartBtn.addEventListener('click', toggleCart);
    barsBtn.addEventListener('click', toggleMenu);
    window.addEventListener('scroll', closeOnScroll);


}

init();