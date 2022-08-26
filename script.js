(async()=>{
    const productContainerEl=document.getElementById("productContainer");
    const searchInputEl=document.getElementById("searchInput")
    const url="http://fakestoreapi.com/products";

const featchProducts=async()=>{
    try {
        const res= await fetch(url);
        return await res.json();
    } catch (error) {
        return(error)
    }    
}
const products= await featchProducts();

const genrateProducts=(product)=>{

    return `<div class="product_card">
    <div class="img_container">
        <img src="${product.image}" alt="image">
    </div>
    <div class="product_content">
        <h2>${product.title}</h2>
        <p>${product.description.split(" ").slice(0, 20).join(" ")}</p>
        <button>$${product.price}</button>    
    </div>`
};
const renderProducts=(products)=>{
    productContainerEl.innerHTML="";
    products.forEach((product)=>{
        productContainerEl.innerHTML +=genrateProducts(product)
    });
}

const checkTextContain=(text, searchText)=>{
    return text.toString().toLowerCase().includes(searchText);
}

const filterHandler=(event)=>{
    const searText=event.target.value.toLowerCase();

    const filteredProduct=products.filter((product)=>{
        return checkTextContain(product.title, searText)||
        checkTextContain(product.description, searText)||
        checkTextContain(product.price, searText);
    });
    renderProducts(filteredProduct)
}

searchInputEl.addEventListener("keyup", filterHandler);

renderProducts(products)
})();