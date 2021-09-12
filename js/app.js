// load data from api
const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `

    <div class="card shadow-lg single-product" style="width: 25rem;">
      <img src=${image} class="card-img-top product-image" alt="...">
      <div class="card-body">
        <h5 class="card-title">${product.title}</h5>
        <p class="card-text"> Category: ${product.category}</p>
        <p class="card-text"> Rating: ${product.rating.rate}</p>
        <p class="card-text"> Response: ${product.rating.count}.</p>
        <h2>Price: $ ${product.price}</h2>
        <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
      <button id="details-btn" onclick="loadDetail(${product.id})" class="btn btn-danger">Details</button>
      </div>
    </div>

      `;
    document.getElementById("all-products").appendChild(div);
  }
};
// load single product details from api
const loadDetail = (id) => {
  const url = `https://fakestoreapi.com/products/${id}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showDetail(data));
};

// show single product details
const showDetail = (product) => {
  const detail = document.getElementById("pd-details");
  detail.innerHTML = `
  <div class="card" style="width: 18rem">
  <img src=${product.image} class="card-img-top singlepd-img" alt="..." />
  <div class="card-body">
  <h5 class="card-title">${product.title}</h5>
  <p class="card-text"> Category: ${product.category}</p>
  <p class="card-text"> Rating: ${product.rating.rate}</p>
  <p class="card-text"> Response: ${product.rating.count}.</p>
  <h2>Price: $ ${product.price}</h2>
  </div>
</div>
  
  `;
};
// add to cart section
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
  updateTotal();
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);

  const total = parseFloat(convertedOldPrice + convertPrice);

  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = Math.round(value);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") +
    getInputValue("delivery-charge") +
    getInputValue("total-tax");

  document.getElementById("total").innerText = grandTotal.toFixed(2);
};
