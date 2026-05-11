const boxContainer = document.querySelector(".box-container")
const cartIcon = document.querySelector(".cart-icon")
const cartContainer = document.querySelector(".cart-container")
const cartCloseIcon = document.querySelector(".cart-close-icon")
cartIcon.addEventListener("click", () => {
  cartContainer.classList.add("active")
})
cartCloseIcon.addEventListener("click", () => {
  cartContainer.classList.remove("active")
})
document.addEventListener("DOMContentLoaded", loadFood)
function loadFood() {
  loadContent()
}
function loadContent() {
  //adding item to cart
  const Addbtn = document.querySelectorAll(".btn")
  //console.log(btn)
  Addbtn.forEach((btn) => {
    btn.addEventListener("click", clickToAddCart)
  })

  //remove items from cart
  let itemRemove = document.querySelectorAll(".dlt-box")
  itemRemove.forEach((btn) => {
    btn.addEventListener("click", removeItem)
  })

  //change quantity event
  let qtyElements = document.querySelectorAll("#cart-qnty")
  qtyElements.forEach((input) => {
    input.addEventListener("change", changeQty)
  })

  updateTotal()
}

//let unk = this.parentElement  // This is .img-dlt-box
//let titlee = unk.querySelector(".cart-title").innerHTML  // This fails!
//the problem=>
//.cart-title is not a child of .img-dlt-box
//its in the sibling .details-box div
//so querySelector(".cart-title") returns null,causing the removal to fail silently


//remove item from the cart
function removeItem() {
  if (confirm("are you sure to remove")) {
    let cartItem = this.closest(".cart-item-box")
    let titlee = cartItem.querySelector(".cart-title").innerHTML
    itemList = itemList.filter((el) => el.title != titlee)
    cartItem.remove()
    loadContent()
  }
}

function changeQty() {
  if (isNaN(this.value) || this.value < 1) {
    this.value = 1
  }
  loadContent()
}

//adding product card
const products = [
  {
    image: "picture-1.jpeg",
    productName: "Raw Denim Jacket",
    price: "TK. 1390",
  },
  {
    image: "picture-2.jpeg",
    productName: "Raw Contrast Denim Jacket",
    price: "TK. 1390",
  },
  {
    image: "picture-3.jpeg",
    productName: "super Light Denim Jacket",
    price: "TK. 1390",
  },
  {
    image: "picture-4.jpeg",
    productName: "Super Light Leather Jacket",
    price: "TK. 1390",
  },
  {
    image: "picture-5.jpeg",
    productName: "Black Denim Jacket",
    price: "Tk. 1390",
  },
]

function init() {
  products.forEach((value) => {
    let boxDiv = document.createElement("div")
    boxDiv.classList.add("box")
    boxDiv.innerHTML = `
         <div class="image">
           <img src="images/${value.image}" class="food-img" alt="">
         </div>
         <div class="prdName">${value.productName}</div>
         <div class="amount">${value.price}</div>
         <div class="btn">
           <button>Add to Cart</button>
         </div>
        `
    boxContainer.appendChild(boxDiv)
  })
}
init()

let itemList = []
//addddig products to  cart
function clickToAddCart() {
  // console.log("funtion added")

  let food = this.parentElement
  let imgsrc = food.querySelector(".food-img").src
  let price = food.querySelector(".amount").innerHTML
  let title = food.querySelector(".prdName").innerHTML
  //console.log(imgsrc)
  //check product is already in chart or not
  let newProduct = {title, price, imgsrc}
  if (itemList.find((el) => el.title == newProduct.title)) {
    alert("product already existing in cart")
    return
  } else {
    itemList.push(newProduct)
  }
  //console.log(itemList)

  let newProductEle = createCartProduct(title, price, imgsrc)
  let cartdiv = document.createElement("div")
  cartdiv.innerHTML = newProductEle
  let cartbasket = document.querySelector(".load-product-box-container")
  cartbasket.append(cartdiv)
  //console.log(title)
  loadContent()
}

function createCartProduct(title, price, imgsrc) {
  return `
  <div class="cart-item-box">
   <div class="img-dlt-box">
     <img src="${imgsrc}" height="60px" width="60px">
       <div class="dlt-box">
           <i class="fa-solid fa-trash"></i>
           <p>Remove</p>
        </div>
   </div>
   <div class="details-box">
  
     <div class="cart-title">${title}</div>
     <p class="price">${price}</p>
     <input type="number" value="1"  id="cart-qnty">
   </div>
  
   <div class="multifly-box">
   <div class="multi-price">${price}</div>
   </div>
   </div>
  
  `
  //cartbasket.appendChild(cartdiv)
}
function updateTotal() {
  const cartItems = document.querySelectorAll(".cart-item-box")
  const totalprice = document.querySelector(".total-price")
  let total = 0

  cartItems.forEach((product) => {
    let priceElement = product.querySelector(".price")
    let price = parseFloat(priceElement.innerHTML.replace("TK.", ""))
    // console.log(price)
    let qty = product.querySelector("#cart-qnty").value
    //console.log(qty)
    total += price * qty
    product.querySelector(".multi-price").innerText = "tk" + price * qty
  })

  //adding total cost
  totalprice.innerHTML = ` TK. ${total}`

  //adding count
  let countItem = document.querySelector(".item-count")
  let count = itemList.length
  countItem.innerHTML = count
  if (count == 0) {
    countItem.style.display = "none"
  } else {
    countItem.style.display = "block"
  }
}
