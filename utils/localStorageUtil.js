
 class LocalStorageUtil{
     constructor(){
         this.keyName = 'products';
         this.keyInput = 'inputValue';
     }
     getInputValue(){
         const value = localStorage.getItem(this.keyInput)
         if(value !== null){
             return value;
         }
         return  "";
     }
     setInputValue(inputValue){
         let value = this.getInputValue()
         value = inputValue.toLowerCase()
         localStorage.setItem(this.keyInput, value)
     }
     updatesCheck(){
         let products = this.getProducts();
         products = products.filter(item => {
            return  CATALOG.some(catalogItem => {
                return item.id === catalogItem.id
             })
         })
         localStorage.setItem(this.keyName, JSON.stringify(products))
     }
     getProducts(){
         const productsLocalStorage = localStorage.getItem(this.keyName);
         if(productsLocalStorage !== null){
             return JSON.parse(productsLocalStorage);
         }
         return  [];
     }
     putProducts(id){
         let item = {
             id: id,
             amount: 1
         };
         let products = this.getProducts()
         let index;
         products.forEach((item,i)=>{
             if(item.id === id){
                 index = i;
             }
         })

         let pushProduct = false

         if(index === undefined){
             products.push(item)
             pushProduct = true;
         }else {
             products.splice(index,1)
         }
         localStorage.setItem(this.keyName, JSON.stringify(products))
         return {pushProduct, products}
     }
     putProductsAmount(id, symbol){
         let products = this.getProducts();
         products.forEach((item)=>{
             if(item.id === id && symbol === "plus" && item.amount < 100 ){
                     item.amount = item.amount +1
             }else if(item.id === id && symbol === "minus" && item.amount > 1 ){
                        item.amount = item.amount -1
             }
         })
         localStorage.setItem(this.keyName, JSON.stringify(products))
     }
     putProductsAmountInput(id, number){
         let products = this.getProducts();
         products.forEach((item)=>{
             if(item.id === id && Number(number) <= 100 && Number(number) > 1) {
                 item.amount = Number(number);
             }
         })
         localStorage.setItem(this.keyName, JSON.stringify(products))
     }
 }
 const localStorageUtil = new LocalStorageUtil();


