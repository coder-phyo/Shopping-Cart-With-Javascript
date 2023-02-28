let productDiv = document.querySelector("#product-div");
let cartDiv = document.querySelector(".carts-table");
let totalCart = document.querySelector("#totalCart");
let showDiv = document.querySelector(".show");

// Render Products
function renderProducts() {
  products.forEach((product) => {
    productDiv.innerHTML += `
       <div class="col-12 col-lg-6 mb-4">
            <div class="card">
              <div class="card-body">
                <img src="${product.src}" class="w-100" />
                <hr />
                <p class="fs-5 fw-bold">${product.name}</p>
                <p>
                  Price -
                  <span class="text-primary fs-5 fw-bold">$ ${product.price}</span>
                </p>
                <div class="btn btn-primary w-100 cart-btn fs-6 fw-bold" onclick="addToCarts(${product.id})">
                  Add to cart
                </div>
              </div>
            </div>
        </div>
    `;
  });
}

renderProducts();

// cart array
let carts = JSON.parse(localStorage.getItem("productCarts")) || [];

// add to carts array
function addToCarts(id) {
  if (carts.some((cart) => cart.id === id)) {
    changeQuentity("plus", id);
  } else {
    let cart = products.find((product) => product.id === id);
    carts.push({ ...cart, quantity: 1 });
  }
  updateCarts();
}

// render product carts
function renderProductsCarts() {
  showDiv.innerHTML = "";
  cartDiv.innerHTML = "";
  carts.forEach((cart) => {
    cartDiv.innerHTML += `
   <tr>
      <td>
        <img src="${cart.src}" id="img-cart" title="${cart.name}" />
      </td>
      <td><p class="fs-5 pt-2">$ ${cart.price}</p></td>
      <td>
        <i
          class="fa-solid fa-circle-minus fs-5 text-primary pt-3" onclick="changeQuentity('minus',${cart.id})"
        ></i
        ><span class="mx-2 fs-5 pt-3">${cart.quantity}</span
        ><i
          class="fa-solid fa-circle-plus fs-5 text-primary pt-3" onclick="changeQuentity('plus',${cart.id})"
        ></i>
      </td>
      <td>
        <i
          class="fa-solid fa-trash text-danger fs-5 pt-3" onclick="removeCarts(${cart.id})"
          title="Remove"
        ></i>
      </td>
    </tr>
  `;
  });

  show_hide();
}

function changeQuentity(condition, id) {
  carts = carts.map((cart) => {
    let quantity = cart.quantity;

    if (id === cart.id) {
      if (condition === "plus" && quantity < 20) {
        quantity++;
      } else if (condition === "minus" && quantity > 1) {
        quantity--;
      }
    }

    return {
      ...cart,
      quantity,
    };
  });
  updateCarts();
}

// total cart list and price
function totalValue() {
  let totalCart = 0,
    totalPrice = 0;
  carts.forEach((cart) => {
    totalCart += cart.quantity;
    totalPrice += cart.price * cart.quantity;
  });

  document.querySelector("#totalCart").innerText = `${totalCart}`;
  document.querySelector("#totalPrice").innerText = `$ ${totalPrice}`;
}

function removeCarts(id) {
  carts = carts.filter((cart) => cart.id !== id);
  updateCarts();
}

// show hide
function show_hide() {
  if (!cartDiv.innerHTML) {
    showDiv.innerHTML = `<h5 class="text-center text-warning">
                <i class="fa-solid fa-circle-xmark me-2"></i>There is no carts
                here!
              </h5>
              <hr />`;
  }
}

// update on Everything
function updateCarts() {
  renderProductsCarts();
  totalValue();
  localStorage.setItem("productCarts", JSON.stringify(carts));
}

updateCarts();
