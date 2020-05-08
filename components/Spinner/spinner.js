class Spinner {
        handleClear(){
            ROOT_SPINNER.innerHTML = '';
        }
        render(){
        const html = `
            <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        `

        ROOT_SPINNER.innerHTML = html
    }

}

const spinnerPage = new Spinner();
