var menu = {
    pizzas: [
        {
            title: "Barbacoa",
            description: "Salsa barbacoa, ternera, bacon, cebolla y maíz",
            image: "/images/barbacoa.jpeg",
            price: "8.95",
            id: "barbacoa"
        },
        {
            title: "Carbonara",
            description: "Salsa carbonara, bacon, cebolla y champiñones",
            image: "/images/carbonara.jpeg",
            price: "9.95",
            id: "carbonara"
        },
        {
            title: "Hawaiian",
            description: "Salsa de tomate, jamón york, piña y queso",
            image: "/images/hawaiian.jpeg",
            price: "7.95",
            id: "hawaiana"
        }
    ],
    postres: [
        {
            title: "Brownie",
            description: "Brownie de chocolate con nueces",
            image: "/images/brownie.jpg",
            price: "3.95",
            id: "brownie"
        },
        {
            title: "Tarta de queso",
            description: "Tarta de queso con mermelada de frambuesa",
            image: "/images/tarta_queso.jpg",
            price: "4.95",
            id: "tartaqueso"
        },
        {
            title: "Tiramisú",
            description: "Tiramisú casero",
            image: "/images/tiramisu.jpg",
            price: "4.95",
            id: "tiramisu"
        }
    ],
    drinks: [
        {
            image: "/images/cocacola.jpg",
            title: "Coca-Cola",
            description: "Refresco de cola",
            price: "2.95",
            id: "cocacola"
        },
        {
            image: "/images/agua.jpeg",
            title: "Botella de agua",
            description: "Botella de agua",
            price: "1.45",
            id: "agua"
        },
        {
            image: "/images/fanta .jpg",
            title: "Fanta",
            description: "Refresco de fanta",
            price: "2.45",
            id: "fanta"
        }
    ],
    offers: [
        {
            image: "/images/triple.png",
            title: "El Triple",
            description: "Elige 3 medianas (hasta 5 igredientes) desde 8,95€ c/u",
            price: "8.95",
            id: "eltriple",
            requirements: [
                {
                    type: [
                        "barbacoa",
                        "carbonara",
                        "hawaiana"
                    ],
                    quantity: 3
                }
            ]
        },
        {
            image: "/images/doble.png",
            title: "El Doble",
            description: "Elige una mediana y recibe otra gratis",
            price: "8.95",
            id: "eldoble",
            requirements: [
                {
                    type: [
                        "hawaiana"
                    ],
                    quantity: 1
                }
            ]
        },
        {
            image: "/images/bebida_oferta.png",
            title: "2 Refrescos",
            description: "Elige 2 refrescos de 2L por 3,95€ c/u",
            price: "7.9",
            id: "2refrescos",
            requirements: [
                {
                    type: [
                        "cocacola"
                    ],
                    quantity: 2
                }
            ]
        },
    ]
}

document.addEventListener("DOMContentLoaded", function () {
    //if the page location comtains menu_page/pago.html
    if (window.location.pathname.includes("menu_page/pago.html")) {
        //get the cart from the local storage
        var numberItems = document.getElementById("number-items");
        var items = document.getElementById("items");
        var subtotal = document.getElementById("subtotal");
        var delivery = document.getElementById("delivery");
        if (localStorage.getItem("addressDetails") == null) {
            window.location.href = "/?error=address";
        }
        else {
            var addressDetails = JSON.parse(localStorage.getItem("addressDetails"));
            if (addressDetails.type == "recogida") {
                delivery.innerHTML = "Recogida en tienda";
            }
            else {
                delivery.innerHTML = "5.00";
            }
        }
        var cart = {};
        if (localStorage.getItem("cart") != null) {
            var cart = JSON.parse(localStorage.getItem("cart"));
        }
        //if the cart is empty
        if (cart == {}) {
            //redirect to the menu page
            window.location.href = "menu.html";
            numberItems.innerHTML = "0";
            items.innerHTML = "";
        }
        //if the cart is not empty
        else {

            var getMenuItem = (product) => { //get the menu item from the menu object that has same name as the product
                var menuItem = menu.pizzas.find(item => item.title == product);
                if (menuItem == undefined) {
                    menuItem = menu.postres.find(item => item.title == product);
                }
                if (menuItem == undefined) {
                    menuItem = menu.drinks.find(item => item.title == product);
                }
                if (menuItem == undefined) {
                    menuItem = menu.offers.find(item => item.title == product);
                }
                if (menuItem == undefined) {
                    //if product contains Pizza Personalizada
                    if (product.includes("Pizza Personalizada")) {
                        menuItem = {
                            title: product,
                            description: "Pizza Personalizada",
                            image: "/images/pizza-frabisa.jpg",
                            price: "8.95",
                        }

                    }
                    else {
                        alert("Error: " + product + " not found in menu");
                        return null;
                    }
                }
                return menuItem;
            }
            for (var product in cart) {
                var menuItem = getMenuItem(product);

                if (menuItem == null) {
                    continue;
                }
                /*
                create a element for each product in the cart like this*/

                var card = document.createElement("div");
                card.classList.add("card");
                card.classList.add("mt-2");

                var row = document.createElement("div");
                row.classList.add("row");
                row.classList.add("d-flex");
                row.classList.add("align-items-stretch");
                var col4 = document.createElement("div");
                col4.classList.add("col-4");
                //cetner the image
                col4.classList.add("d-flex");
                col4.classList.add("justify-content-center");

                //make the image strech to the size of the column
                var img = document.createElement("img");
                img.classList.add("card-img-top");
                img.classList.add("w-50");

                img.src = menuItem.image;
                img.alt = "Image of " + menuItem.title
                col4.appendChild(img);
                var col8 = document.createElement("div");
                col8.classList.add("col-8");
                var cardBody = document.createElement("div");
                cardBody.classList.add("card-body");
                cardBody.classList.add("pb-2");
                var cardTitle = document.createElement("h5");
                cardTitle.classList.add("card-title");
                cardTitle.innerHTML = menuItem.title;
                var cardSubtitle = document.createElement("h6");
                cardSubtitle.classList.add("card-subtitle");
                cardSubtitle.classList.add("text-body-secondary");
                cardSubtitle.innerHTML = menuItem.price + "€";
                var cardText = document.createElement("p");
                cardText.classList.add("card-text");
                var label = document.createElement("label");
                label.innerHTML = "Quantity: ";
                var br = document.createElement("br");
                var input = document.createElement("input");
                input.id = menuItem.id + "-quantity";
                input.type = "number";
                input.value = cart[product];
                label.setAttribute("for", input.id);
                //add to the subtotal and round to 2 decimal
                subtotal.innerHTML = Number(subtotal.innerHTML) + Number(menuItem.price) * Number(cart[product]);
                subtotal.innerHTML = Math.round(subtotal.innerHTML * 100) / 100;
                numberItems.innerHTML = Number(numberItems.innerHTML) + Number(cart[product]);

                input.min = "1";
                input.max = "10";
                input.disabled = true;
                
                cardText.appendChild(label);
                cardText.appendChild(br);
                cardText.appendChild(input);
                // cardText.appendChild(a);
                cardBody.appendChild(cardTitle);
                cardBody.appendChild(cardSubtitle);
                cardBody.appendChild(cardText);
                col8.appendChild(cardBody);
                row.appendChild(col4);
                row.appendChild(col8);
                card.appendChild(row);
                items.appendChild(card);


            }
            document.getElementById("total").innerHTML = Number(subtotal.innerHTML);
            //if the delivery is not recogida
            if (delivery.innerHTML != "Recogida en tienda") {
                document.getElementById("total").innerHTML = Number(subtotal.innerHTML) + Number(delivery.innerHTML);
            }
            sessionStorage.setItem("total", document.getElementById("total").innerHTML);
            sessionStorage.setItem("subtotal", subtotal.innerHTML);
            sessionStorage.setItem("delivery", delivery.innerHTML);
            sessionStorage.setItem("numberItems", numberItems.innerHTML);
        }
    }


    // if page is pagopago.html
    if (window.location.pathname.includes("menu_page/pagopago.html")) {
        // Obtener datos del formulario de inicio de sesión si están disponibles
        //disable card fields unless con tarjeta is checked
        document.getElementById("numero_tarjeta").disabled = true;
        document.getElementById("date").disabled = true;
        document.getElementById("ccv").disabled = true;
        document.getElementById("en_efectivo").checked = true;
        document.getElementById("con_tarjeta").addEventListener("click", function () {
            document.getElementById("numero_tarjeta").disabled = false;
            document.getElementById("date").disabled = false;
            document.getElementById("ccv").disabled = false;
        });
        document.getElementById("en_efectivo").addEventListener("click", function () {
            document.getElementById("numero_tarjeta").disabled = true;
            document.getElementById("date").disabled = true;
            document.getElementById("ccv").disabled = true;
        });
        
        const userEmail = getCookie("userEmail");

        if (userEmail) {
            const fullName = getCookie('fullName');
            const postalCode = getCookie('postalCode');
            const address = getCookie('address');

            // Autocompletar los campos del formulario de pago con datos del usuario
            document.getElementById("nombre").value = fullName || "";
            document.getElementById("codigo_postal").value = postalCode || "";
            document.getElementById("direccion").value = address || "";
            //if addressDetails is not null, fill the address field with the address
            if (localStorage.getItem("addressDetails") != null) {
                var addressDetails = JSON.parse(localStorage.getItem("addressDetails"));
                if(addressDetails.type == "recogida"){
                    //change address-header to Recogida
                    document.getElementById("address-header").innerHTML = "Recogida";
                    //get and remove the code postal field and its label

                }
                    //changed 
                document.getElementById("direccion").value = addressDetails.address;
                //set the code postal field to the code postal from the address
                //get the code postal from the address, the longest string of numbers
                var codePostal = addressDetails.address.match(/\d+/g).reduce(function (a, b) { return a.length > b.length ? a : b; });
                document.getElementById("codigo_postal").value = codePostal;
            }
            //if there is card data
            if (getCookie("cardNumber")) {
                // Autocompletar los campos del formulario de pago con datos de la tarjeta
                document.getElementById("numero_tarjeta").value = getCookie("cardNumber");
                document.getElementById("date").value = getCookie("cardDate");
                document.getElementById("ccv").value = getCookie("cardCCV");
            }
        } else {
            // Si el usuario no ha iniciado sesión, redirigir a la página de inicio de sesión
            window.location.href = "/log-in.html"; // Ajusta la ruta según tu estructura de archivos
        }

        // fill the subtotal envio and total
        document.getElementById("subtotal").innerHTML = sessionStorage.getItem("subtotal");
        document.getElementById("delivery").innerHTML = sessionStorage.getItem("delivery");
        document.getElementById("total").innerHTML = sessionStorage.getItem("total");
        document.getElementById("number-items").innerHTML = sessionStorage.getItem("numberItems");
    }


    //if page is pagofinal
    if(window.location.pathname.includes("menu_page/pagofinal.html")){
        //get the total from the session storage
        // document.getElementById("number-items").innerHTML = sessionStorage.getItem("numberItems");
        document.getElementById("confirmation-subtotal").innerHTML = sessionStorage.getItem("subtotal");
        document.getElementById("confirmation-delivery").innerHTML = sessionStorage.getItem("delivery");
        document.getElementById("confirmation-total").innerHTML = sessionStorage.getItem("total");
    }
});

// Función para obtener el valor de una cookie por su nombre
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function finalizeOrder()
{
    //if all the fields are filled redirect to /menu_page/pagofinal.html
    var nombre = document.getElementById("nombre").value;
    var codigo_postal = document.getElementById("codigo_postal").value;
    var direccion = document.getElementById("direccion").value;
    if(nombre == "" || codigo_postal == "" || direccion == "")
    {
        alert("Por favor rellene todos los campos");
        return;
    }
    //if en efectivo is checked nothing more but if con tarjeta is checked check if the fields are filled
    var efectivo = document.getElementById("en_efectivo").checked;
    var tarjeta = document.getElementById("con_tarjeta").checked;
    //if neither efectivo or tarjeta is checked alert the user
    if(!efectivo && !tarjeta)
    {
        alert("Por favor seleccione un método de pago");
        return;
    }
    if(tarjeta)
    {
        var numero_tarjeta = document.getElementById("numero_tarjeta").value;
        var fecha_caducidad = document.getElementById("date").value;
        var cvv = document.getElementById("ccv").value;
        if(numero_tarjeta == "" || fecha_caducidad == "" || cvv == "")
        {
            alert("Por favor rellene las detalles de tarjeta");
            return;
        }
        document.cookie = `cardNumber=${numero_tarjeta}; path=/`;
        document.cookie = `cardDate=${fecha_caducidad}; path=/`;
        document.cookie = `cardCCV=${cvv}; path=/`;


    }
    document.location = "/menu_page/pagofinal.html";
}



