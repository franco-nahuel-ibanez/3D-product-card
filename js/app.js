const container = document.querySelector('.container');
const containerProd = document.querySelector('.content-products');
const table = document.querySelector('.table');

container.addEventListener('click',  (e) =>{
	e.preventDefault()

	e.target.textContent === 'Buy' && captureData(e);
})

containerProd.addEventListener('click', e =>{
	e.preventDefault()

	if( e.target.classList.contains('icon-times') ){
	
		deleteProd(e)		
	
	}else if ( e.target.classList.contains('icon-expand_less') ) {
	
		addQuantity(e)
	
	}else if ( e.target.classList.contains('icon-expand_more') ) {
			
			subtractQuantity(e)
	}

})


function captureData(data){

	showShopping();

	const box = data.target.closest('.box');
	const name = box.querySelector('.name').textContent;
	const price = box.querySelector('.price').textContent;
	const img = box.querySelector('img').getAttribute('src');

	insertData(name, price, img);
}

function insertData(name, price, img){
	const contentProducts = document.querySelector('.content-products');
	const product = document.createElement('div');

	for(let i = 0; i < contentProducts.childElementCount; i++){

		let product = contentProducts.children[i];

		if(product.querySelector('.prod-name').textContent.trim() === name){

			product.querySelector('.cantidad').textContent++;

			update();
		
			return;
		}
	}

	// <input type="number" value="1" name="cantidad" />

	product.innerHTML = `

	        <article class="product-id animate__animated animate__fadeInUp">
                <div class="row img-row">
                    <img src="${img}">
                </div>

                <div class="row prod-name">
                    <p>${name}</p>
                </div>

                <div class="row quantity">
                	<p class="cantidad">1</p>
                	<span class="icon-expand_less"></span>
                	<span class="icon-expand_more"></span>
                </div>

                <div class="row price">
                    <p>${price}</p>
                </div>

                <div class="row delete">
                    <span class="icon-times"></span> 
                </div>
            </article>
	`;
	contentProducts.appendChild(product);

	update();
}

function update(){

	const products = document.querySelectorAll('.product-id');
	const contentTotal = document.querySelector('.total');

	let total = 0;
	
	products.forEach(product =>{
		const quantityProd = Number(product.querySelector('.cantidad').textContent.trim())
		const priceProd =  Number(product.querySelector('.price > p').textContent.replace('$', ''))
		
		total = total + (quantityProd * priceProd);
	})

	contentTotal.innerHTML = `Total: $${total.toFixed(2)}`; 
}

function deleteProd(e) {
	const allProducts = document.querySelectorAll('.product-id');
	const listProducts = e.target.parentNode.parentNode;

	const name = listProducts.querySelector('.prod-name').textContent;

	allProducts.forEach(prod =>{
		if(prod.querySelector('.prod-name').textContent === name){
			containerProd.removeChild(prod.parentNode);
			update();
			hidenShopoing();
		}
	})
}

function addQuantity( e ){

	const containQuantity = e.target.parentNode;
	containQuantity.querySelector('.cantidad').textContent++;
	update();
}

function subtractQuantity( e ){

	const containQuantity = e.target.parentNode;
	containQuantity.querySelector('.cantidad').textContent;
	let cant = containQuantity.querySelector('.cantidad').textContent--;
	
	if(cant == 1){
		deleteProd(e)
	}

	update();
}

function showShopping(){
	table.style.display = 'block';
}

function hidenShopoing(){
	const shooping = document.querySelector('.content-products').children;

	if( shooping.length == 0 ){
		table.classList.add('animate__fadeOutDown');

		setTimeout( ()=>{
			table.style.display = 'none';
		}, 1100 )
	}
}








