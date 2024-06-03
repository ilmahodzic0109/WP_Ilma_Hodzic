document.addEventListener("DOMContentLoaded", function() {
    let shopBodySingle = document.querySelector(".featured-block1");

    if (shopBodySingle) {
        let id = localStorage.getItem("id");
        console.log("LOCALSTORAGE ID: ", id);
        fetchDataWithId(id);
    } else {
        console.error("Element with class 'featured-block1' not found.");
    }
});

function fetchDataWithId(id) {
    let storedItemData = localStorage.getItem(`itemData_${id}`);
    if (storedItemData) {
        let itemData = JSON.parse(storedItemData);
        console.log("ITEM DATA (from storage): ", itemData);
        renderItem(itemData);
    } else {
        console.log("Fetching item data from API...");
        $.get({
            url: `/WP_Ilma_Hodzic/backend/items`,
            dataType: "json",
            success: function(data) {
                let itemData = data.find(item => item.item_id == id);
                if (itemData) {
                    console.log("ITEM DATA (from API): ", itemData);
                    localStorage.setItem(`itemData_${id}`, JSON.stringify(itemData));
                    renderItem(itemData);
                } else {
                    console.error("Item not found with id: ", id);
                }
            },
            error: function(xhr, textStatus, errorThrown) {
                console.error("Error fetching data from API");
            }
        });
    }
}

function renderItem(itemData) {
    let shopBodySingle = document.querySelector(".featured-block1");
    shopBodySingle.innerHTML = `
    <div class="container">
        <div class="row">
            <div class="col-md-6 text-center">
                <div class="product-image mt-3">
                    <img class="img-fluid" src="${itemData.image}">
                </div>
            </div>
            <div class="col-md-6 mt-5 mt-md-2 text-center text-md-left">
                <h2 class="mb-3 mt-0">${itemData.item_name}</h2>
                <p class="lead mt-2 mb-3 primary-color">${itemData.price} KM</p>
                <h5 class="mt-4">O proizvodu</h5>
                <p>${itemData.description}</p>
                <select class="custom-select form-control mt-4 mb-4">
                    <option selected>Veličina</option>
                    <option value="1">S</option>
                    <option value="2">M</option>
                    <option value="3">L</option>
                </select>
                <a class="btn btn-full-width btn-lg btn-outline-primary" onclick="addToCart(${itemData.item_id})">Dodaj</a>
            </div>
        </div>
    </div>
    `;
    localStorage.setItem("itemData", JSON.stringify(itemData));
}

function addToCart(item_id) {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user || !user.token) {
        console.error("User is not authenticated");
        return;
    }

    const token = user.token;
    const user_id = user.user_id;
    console.log("Retrieved token:", token);
    console.log("Retrieved user_id:", user_id);

    const dataToSend = { product_id: item_id, user_id: user_id, quantity: 1 };
    console.log("Data being sent to backend:", dataToSend);

    $.ajax({
        url: "/../WP_Ilma_Hodzic/backend/add_to_cart",
        type: "POST",
        headers: {
            'Authorization': 'Bearer ' + token
        },
        data: JSON.stringify(dataToSend),
        contentType: "application/json",
        success: function(response) {
            console.log(response.message);
        },
        error: function(xhr, status, error) {
            console.error("Error adding item to cart:", error);
        }
    });
}


function fetchCartDataFromDB() {
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (!user || !user.token) {
        console.error("User is not authenticated");
        return;
    }

    const token = user.token;

    $.ajax({
        url: "/../WP_Ilma_Hodzic/backend/get_cart_items",  // Assuming you have an endpoint to get cart items
        type: "GET",
        headers: {
            'Authorization': 'Bearer ' + token
        },
        success: function(response) {
            console.log("Cart items fetched: ", response.data);
            renderItems(response.data);
        },
        error: function(xhr, status, error) {
            console.error("Error fetching cart items:", error);
        }
    });
}

function renderItems(cartDataArray) {
    const cartBody = document.querySelector(".table-condensed");
    const cartTotal = document.querySelector(".cart-total");

    cartBody.innerHTML = ''; // Clear existing items
    let cartTotalPrice = 0;

    cartDataArray.forEach(instance => {
        fetchDataWithId(instance.product_id, "js/shop.json").then(productInfo => {
            cartTotalPrice += (instance.quantity * productInfo.price);

            let item = document.createElement("tbody");
            item.classList.add("row");
            item.innerHTML = `
                <tr>
                    <td data-th="Product">
                        <div class="row">
                            <div class="col-md-3 text-left">
                                <img src="${productInfo.image}" alt="" class="img-fluid">
                            </div>
                            <div class="col-md-9 text-left mt-sm-2">
                                <h4>${productInfo.name}</h4>
                            </div>
                        </div>
                    </td>
                    <td data-th="Price">${productInfo.price} KM</td>
                    <td data-th="Quantity">
                        <input type="number" class="form-control text-center" value="${instance.quantity}">
                    </td>
                    <td class="actions" data-th="">
                        <div class="text-right">
                            <button class="btn btn-white btn-md mb-2"><i class="fas fa-trash"></i></button>
                        </div>
                    </td>
                </tr>
            `;

            cartBody.append(item);
        });
    });

    cartTotal.innerHTML = cartTotalPrice;
}
