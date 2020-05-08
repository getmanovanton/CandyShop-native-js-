
    class Products{
        constructor(){
            this.classNameActive = "products-element__btn-active";
            this.labelAdd = 'Add to cart';
            this.labelRemove = 'Delete from cart';
        }

        handleSetLocationStorage(el,id){
           const {pushProduct, products} = localStorageUtil.putProducts(id);
            if(pushProduct === true){
                el.classList.add(this.classNameActive);
                el.innerHTML = this.labelRemove;
            } else{
                el.classList.remove(this.classNameActive);
                el.innerHTML = this.labelAdd;
            }
            headerPage.render(products.length)
        }
        render(){
            const productsStore = localStorageUtil.getProducts();
            let htmlCatalog = '';
            let inputValue = document.querySelector(".header-search").value.toLowerCase();
            CATALOG.forEach(({id, name, price, img}) => {

                if(inputValue === "" || name.indexOf(inputValue) !== -1){


                let index;
                let activeClass = '';
                let activeText = '';
                productsStore.forEach((item,i)=>{
                    if(item.id === id){
                        index = i;
                    }
                });
                if(index === undefined){
                    activeText = this.labelAdd
                }else {
                    activeClass = ' '+this.classNameActive;
                    activeText = this.labelRemove
                }

                name = name[0].toUpperCase() + name.slice(1)
                htmlCatalog += `
                <li class="products-element">
                <span class="products-element__name">${name}</span>
                <img class="products-element__img" alt="candy ${name}" src="${img}">
                <span class="products-element__price"> 💵 ${price.toLocaleString()} $</span>
                <button class="products-element__btn${activeClass}" onclick=(productsPage.handleSetLocationStorage(this,'${id}'))>
                ${activeText}
                </button>
                </li>
                `
                }


            });

            if(htmlCatalog === ""){
                htmlCatalog = `
                                <div class="error-page">
                                     Sorry, we cannot find it 🥺  
                                </div>
                `
            }


            const html = `
            <ul class="products-container">
            ${htmlCatalog}
            </ul>
            `;
            ROOT_PRODUCTS.innerHTML = html;
        }
    }
    const productsPage = new  Products;



