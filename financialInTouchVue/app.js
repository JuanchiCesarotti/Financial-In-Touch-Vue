var myApp = new Vue({
  el: "#sales",
  data: {
    cars: [],
    exchangeValueUYU: undefined,
    years: [],
    allBrands: [],
    yearSelected: "",
    brandSelected: "",
    models: [],
    modelSelected: "",
    statusSelected: "",
    currency: "usd",
  },
});

fetch("https://ha-front-api-proyecto-final.vercel.app/rates")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    myApp.exchangeValueUYU = data.uyu;
  })
  .catch(function (error) {
    console.log(error);
  });

// https://ha-front-api-proyecto-final.vercel.app/cars

fetch("https://ha-front-api-proyecto-final.vercel.app/cars")
  .then(function (infoAutosJson) {
    return infoAutosJson.json();
  })
  .then(function (infoAutos) {
    myApp.cars = infoAutos;
  });

// FETCH MARCAS

fetch("https://ha-front-api-proyecto-final.vercel.app/brands")
  .then(function (brandsJson) {
    return brandsJson.json();
  })
  .then(function (brands) {
    myApp.allBrands = brands;
  });

//FILTRO POR MARCAS

var btnFiltrar = document
  .querySelector("#btn-filtrar")
  .addEventListener("click", function (event) {
    event.preventDefault();

    yearSelected = myApp.yearSelected;
    brandSelected = myApp.brandSelected;
    modelSelected = myApp.modelSelected;
    statusSelected = myApp.statusSelected;
    fetch(
      "https://ha-front-api-proyecto-final.vercel.app/cars?" +
        "year=" +
        yearSelected +
        "&brand=" +
        brandSelected +
        "&model=" +
        modelSelected +
        "&status=" +
        statusSelected
    )
      .then(function (infoAutosJson) {
        return infoAutosJson.json();
      })
      .then(function (infoAutos) {
        myApp.cars = infoAutos;
      });
  });

// https://ha-front-api-proyecto-final.vercel.app/models?brand=Audi

//FILTRO POR MODELO

document.querySelector("#brand").addEventListener("change", function () {
  fetch(
    "https://ha-front-api-proyecto-final.vercel.app/models?brand=" +
      myApp.brandSelected
  )
    .then(function (data) {
      return data.json();
    })
    .then(function (data) {
      myApp.models = data;
    });
});

// CAMBIAR MONEDAS

document
  .querySelector("#btn-cambioDivisa")
  .addEventListener("click", function (event) {
    event.preventDefault();
    if (myApp.currency == "usd") {
      myApp.currency = "uyu";
    } else {
      myApp.currency = "usd";
    }
  });
