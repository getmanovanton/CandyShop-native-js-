const pageRender = function () {
    headerPage.render();
    spinnerPage.render()

};

const pageReload = function () {
    shoppingPage.render();
    headerPage.render();
    productsPage.render();
};

const pageClear = function () {
    localStorage.clear();
    headerPage.render();
    productsPage.render();
};





let CATALOG = [];

pageRender();

fetch('server/catalog.json')
        .then(res => res.json())
        .then(body => {
            CATALOG = body;
            localStorageUtil.updatesCheck()
            setTimeout(()=> {
                productsPage.render()
                spinnerPage.handleClear();
            },2000);
        })


        .catch(error => {
            setTimeout(()=> {
                errorPage.render()
                console.log(error)
            },2000);
        });


