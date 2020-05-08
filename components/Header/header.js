class Header {
        openShoppingPage(){
            if(localStorageUtil.getProducts().length < 1){
                shoppingPage.renderError()
            }else{shoppingPage.render()}
         }

        render(){
            let inputValue = localStorageUtil.getInputValue();
            let productsStoreItems = 0;
            localStorageUtil.getProducts().forEach((item)=> {
                productsStoreItems += item.amount
            })

            if(productsStoreItems === 0){
                productsStoreItems = ""
            }
            const html = `
            
            <div class="header-container">
                <div class="header-logo">   
                    <a href="#" onclick="pageClear()"><p class="header-logo__text">CANDY SHOP</p></a>
                    <div ><input value="${inputValue}" class="header-search" type="text" placeholder="Search..."
                     oninput="productsPage.render(); localStorageUtil.setInputValue(this.value)">
                     </div>
                </div>
                <div onclick="headerPage.openShoppingPage()" class="header-counter">
                                  ${productsStoreItems} 
                </div>
             </div>
           
                
            `;
            ROOT_HEADER.innerHTML = html;
        }

}

const headerPage = new Header();

