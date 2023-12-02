var menu = {
    pizzas: [
        {
            name: "Barbacoa",
            description: "Salsa barbacoa, ternera, bacon, cebolla y maíz",
            image: "./images/barbacoa.jpg",
            price: "8.95",
            id: "barbacoa"
        },
        {
            name: "Carbonara",
            description: "Salsa carbonara, bacon, cebolla y champiñones",
            image: "./images/carbonara.jpg",
            price: "9.95",
            id: "carbonara"
        },
        {
            name: "Hawaiana",
            description: "Salsa de tomate, jamón york, piña y queso",
            image: "./images/hawaiana.jpg",
            price: "7.95",
            id: "hawaiana"
        }
    ],
    postres: [
        {
            name: "Brownie",
            description: "Brownie de chocolate con nueces",
            image: "./images/brownie.jpg",
            price: "3.95",
            id: "brownie"
        },
        {
            name: "Tarta de queso",
            description: "Tarta de queso con mermelada de frambuesa",
            image: "./images/tartaqueso.jpg",
            price: "4.95",
            id: "tartaqueso"
        },
        {
            name: "Tiramisú",
            description: "Tiramisú casero",
            image: "./images/tiramisu.jpg",
            price: "4.95",
            id: "tiramisu"
        }
    ],
    drinks: [
        {
            image: "./images/cocacola.jpg",
            name: "Coca-Cola",
            description: "Refresco de cola",
            price: "4.95",
            id: "cocacola"
        },
        {
            image: "./images/cocacola.jpg",
            name: "Agua",
            description: "Botella de agua",
            price: "2.45",
            id: "agua"
        },
        {
            image: "./images/fanta.jpg",
            name: "Fanta",
            description: "Refresco de fanta",
            price: "3.95",
            id: "fanta"
        }
    ],
    offers: [
        {
            image: "./images/barbacoa.jpg",
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
            image: "./images/barbacoa.jpg",
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
            image: "./images/barbacoa.jpg",
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
        {
            image: "./images/barbacoa.jpg",
            title: "El Dulce",
            description: "Elige un pizza, postre, y refresco por 12,95€",
            price: "12.95",
            id: "eldulce",
            requirements: [
                {
                    type: [
                        "barbacoa",
                        "carbonara",
                        "hawaiana"
                    ],
                    quantity: 1
                },
                {
                    type: [
                        "brownie",
                        "tartaqueso",
                        "tiramisu"
                    ],
                    quantity: 1
                },
                {
                    type: [
                        "cocacola"
                    ],
                    quantity: 1
                }
            ]
        }
    ]
}