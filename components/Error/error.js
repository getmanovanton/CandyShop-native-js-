class Error {
    handleClear(){
        ROOT_SPINNER.innerHTML = '';
    }
    render(){
        const html = `
        <div class="error-page">
            
        Sorry, failed load the products 🥺<br> Please try again later.  
</div>
        `

        ROOT_SPINNER.innerHTML = html
    }

}

const errorPage = new Error();
