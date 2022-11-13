console.log('hola')

const products = document.querySelector(".products-container");
const productsCart = document.querySelector(".cart-container");
const total = document.querySelector(".total");
const categories = document.querySelector(".categories");
const categoriesList = document.querySelectorAll(".category");
const btnLoad = document.querySelector(".btn-load");
const buyBtn = document.querySelector(".btn-buy");
const cartBtn = document.querySelector(".cart-label");
const barsBtn = document.querySelector(".menu-label");
const cartMenu = document.querySelector(".cart");
const barsMenu = document.querySelector(".navbar-list");
const overlay = document.querySelector(".overlay");
const mostPopular = document.querySelector(".info-cards-container");
const deleteBtn = document.querySelector(".btn-delete");
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

const closeOnClick = (e) => {
        if (!e.target.classList.contains('navbar-link')) return;
        barsMenu.classList.remove('open-menu');
        overlay.classList.remove('show-overlay');
    }
  
const closeOnOverlayClick = () => {
        cartMenu.classList.remove('open-menu');
        barsMenu.classList.remove('open-menu');
        overlay.classList.remove('show-overlay');
    }



const renderCartProduct = (cartProduct) => {
    const { id, name, bid, img, quantity } = cartProduct;
    return `
    <div class="cart-item">
      <img src=${img} alt="Nft del carrito" />
      <div class="item-info">
        <h3 class="item-title">${name}</h3>
        <span class="item-price">${bid} Pesos</span>
      </div>
      <div class="item-handler">
        <span class="quantity-handler down" data-id=${id}>-</span>
        <span class="item-quantity">${quantity}</span>
        <span class="quantity-handler up" data-id=${id}>+</span>
      </div>
    </div>
    `;
}
const renderCart = () => {
    if(!cart.length) {
        productsCart.innerHTML= `<p class="empty-msg"> No hay productos</p>`;
         return;
    }
    productsCart.innerHTML = cart.map(renderCartProduct).join('');
   };
    
const getCartTotal = () => {
return cart.reduce((acc, cur) => acc + Number(cur.bid) * cur.quantity , 0)
}


const showTotal = () => {
    total.innerHTML = `${getCartTotal().toFixed(2)} pesos`
};



const disableBtn = (btn) => {
    if (!cart.length){
        btn.classList.add('disabled');
    } else {
        btn.classList.remove('disabled');
    }
};

// const createProductData = (id, name, price, cardImg)  => {
//     return {id, name, price, cardImg};
// };

// const addProduct = (e) => {
//     if (!e.target.classList.contains('btn-add')) return;
//     const { id, cardImg, name, price } = e.target.dataset;
//     const product = createProductData (id, name, price, cardImg);
//     console.log(product);
// };


const createProductData = (id, name, bid, img) => {
    return { id, name, bid, img };
  };

  const isExistingCartProduct = (product) => {
    return cart.find((item) => item.id === product.id);
  };

  const addUnitToProduct = (product) => {
    cart = cart.map((cartProduct) => {
      return cartProduct.id === product.id
        ? {...cartProduct, quantity: cartProduct.quantity + 1 }
        : cartProduct;
    });
  };

//   se crea prod y agrega cantidad
  const createCartProduct = (product) => {
    cart = [...cart, {...product, quantity: 1}]
  };

  const showSuccessModal = (msg) => {
    successModal.classList.add('active-modal');
    successModal.textContent = msg
    setTimeout(() => {
        successModal.classList.remove('active-modal')
    }, 1400)
  };

  const checkCartState = () => {
    saveLocalStorage(cart);
    renderCart(cart);
    showTotal(cart);
    disableBtn(deleteBtn);
    disableBtn(buyBtn);
  };

const addProduct = (e) => {
    if (!e.target.classList.contains("btn-add")) return;
    // me traigo todo con destructuring
    const { id, name, bid, img } = e.target.dataset;

    const product = createProductData(id, name, bid, img); 

    if(isExistingCartProduct(product)){
        addUnitToProduct(product)
        showSuccessModal('Se agrego una unidad al carrito')
    } else {
        createCartProduct(product);
        showSuccessModal('Se agrego una unidad al carrito')
    }
    checkCartState();
}
// funciones restar carrito
const substractProductUnit = (existingProduct) => {
    cart = cart.map((product) => {
        return product.id === existingProduct.id 
        ? {...product, quantity: Number(product.quantity) - 1} 
        : product;
    });
};


const removeProductFromCart = (existingProduct) => {
    cart = cart.filter(product => product.id !== existingProduct.id);
    checkCartState();
};

const handleMinusBtnEvent = (id) => {
    const existingCartProduct = cart.find((item) => item.id === id);
    if(existingCartProduct.quantity === 1) {
        if(window.confirm('Desea eliminar el producto?')){

            removeProductFromCart(existingCartProduct);
        }
        return;
    }
    substractProductUnit(existingCartProduct);
}
// funcion sumar carrito

const handlePlusBtnEvent = (id) => {
    const existingCartProduct = cart.find((item) => item.id === id);
    addUnitToProduct(existingCartProduct);
}

const handleQuantity = (e) => {
    if(e.target.classList.contains("down")){
        handleMinusBtnEvent(e.target.dataset.id);
    } else if (e.target.classList.contains('up')){
        handlePlusBtnEvent(e.target.dataset.id);
    };
    checkCartState();
};

const resetCartItems = () => {
    cart = []
    checkCartState()
};

const completeCartAction = (confirmMsg, successMsg) => {
    if(!cart.length) return
    if(window.confirm(confirmMsg)){
        resetCartItems();
        alert(successMsg);
    }
};

const completeBuy = () => {
    completeCartAction('Desea completar su compra?', 'Gracias por su compra!');  
};

const deleteCart = () => {
    completeCartAction('Desea vaciar el carrito?', 'No hay productos en el carrito!');  
};




const init = () => {
    renderProducts();
    categories.addEventListener('click', applyFilter);
    btnLoad.addEventListener('click', showMoreProducts);
    cartBtn.addEventListener('click', toggleCart);
    barsBtn.addEventListener('click', toggleMenu);
    window.addEventListener('scroll', closeOnScroll);
    barsMenu.addEventListener('click', closeOnClick);
    overlay.addEventListener('click', closeOnOverlayClick);
    document.addEventListener('DOMContentLoaded', renderCart);
    document.addEventListener('DOMContentLoaded', showTotal);
    disableBtn(deleteBtn);
    disableBtn(buyBtn);
    products.addEventListener('click', addProduct);
    productsCart.addEventListener ('click', handleQuantity);
    buyBtn.addEventListener('click', completeBuy);
    deleteBtn.addEventListener('click', deleteCart);
};

init();