class Shopping {

     closeShoppingPage(){
             ROOT_SHOPPING.innerHTML = "";
    }
     renderError(){
        const html = `
            <div class="shopping-error">
               The cart is empty 🙁
            </div>
        `
        ROOT_SHOPPING.innerHTML = html;
    }
    renderSuccess(){
         const html = `
         <div class="shopping-success">
               Thank you for choosing our store.
               Have a nice day 😉
            </div>
         `
        localStorage.clear();
        ROOT_SHOPPING.innerHTML = "";
        pageReload()
        ROOT_SHOPPING.innerHTML = html;
        setTimeout(()=>{
            ROOT_SHOPPING.style.transition = '.7s'
            ROOT_SHOPPING.style.opacity = '0';
            setTimeout(()=>{
                ROOT_SHOPPING.style.opacity = '1';
                ROOT_SHOPPING.innerHTML = "";
            },3000)
        },2000)
    }
     shoppingElementPlus(element,id){
         localStorageUtil.putProductsAmount(id, "plus")
         pageReload()
    }
     shoppingElementMinus(element,id){
         localStorageUtil.putProductsAmount(id, "minus")
         pageReload()
     }
     deleteElement(elem,id){
         elem.parentNode.remove()
         localStorageUtil.putProducts(id)
         pageReload()
     }
    render(){
        const productsStore = localStorageUtil.getProducts();
        if(productsStore.length !== 0){
            let htmlCatalog = '';
            let totalPrice = 0;
            let totalItems = 0;
            CATALOG.forEach(({id, name, price}) => {
                let index, amount;
                productsStore.forEach((item,i)=>{
                    if(item.id === id){
                        index = i;
                        amount = item.amount
                    }
                })

                if(index !== undefined){
                    totalPrice = totalPrice + (price * amount) ;
                    totalItems += amount;
                    htmlCatalog += `
                <div class="shopping-element">
                    <div class="shopping-element__delete" onclick=" shoppingPage.deleteElement(this,'${id}')"></div>
                    <div class="shopping-element__name">🍭 ${name}</div>
                    
                    <div class="shopping-element__calc" >
                        <button class="shopping-element__calc-minus" onclick=" shoppingPage.shoppingElementMinus(this,'${id}')">-</button>
                        <input type="number" min="1" max="3" value="${amount}" onchange="localStorageUtil.putProductsAmountInput('${id}',this.value);shoppingPage.render();headerPage.render()" class="shopping-element__calc-input">
                        <button class="shopping-element__calc-plus" onclick="shoppingPage.shoppingElementPlus(this,'${id}')">+</button>            
                    </div>
                    <div class="shopping-element__price">${(price * amount).toFixed(1)} USD</div>
                </div>   
               
                `
                }
            });
            const html = `
        <div class="shopping-bg-wrapper" >
            <div class="shopping-container">
                <div onclick="shoppingPage.closeShoppingPage()" class="shopping-container_close"></div>
                
                 ${htmlCatalog}   
                
                <div class="shopping-container__total">Total (${totalItems} item): ${totalPrice.toFixed(1)} USD
                <button onclick="shoppingPage.renderSuccess()" class="shopping-container__pay">To PAY</button>
                </div>
            </div>
         </div>
        `
            ROOT_SHOPPING.innerHTML = html;

        }else {
            shoppingPage.closeShoppingPage()
        }

    }
}
const shoppingPage = new Shopping()
