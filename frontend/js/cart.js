

let isInitialized = false;

const deleteCartItem = (itemId) => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user || !user.token) {
        console.error("User is not authenticated");
        return;
    }

    const token = user.token;
    const user_id = user.user_id;

    $.ajax({
        url: "/../WP_Ilma_Hodzic/backend/delete_cart_item",
        type: "DELETE",
        contentType: "application/json",
        data: JSON.stringify({ product_id: itemId, user_id: user_id }),
        headers: {
            Authorization: `Bearer ${token}`
        },
        success: function(response) {
            console.log("Item deleted:", response.message);
            // Optionally, you can update the cart total
            initialize();  // Reinitialize to refresh the cart data
        },
        error: function(xhr, status, error) {
            console.error("Error deleting item:", error);
        }
    });
};
const initialize = async () => {
    if (isInitialized) {
        return;
    }

    console.log("Initializing...");

    const cartTotal = document.querySelector(".cart-total");
    
    console.log("Cart Total:", cartTotal);

    const fetchDataWithId = (id) => {
        return new Promise((resolve, reject) => {
            let storedItemData = localStorage.getItem(`itemData_${id}`);
            if (storedItemData) {
                let itemData = JSON.parse(storedItemData);
                console.log("ITEM DATA (from storage): ", itemData);
                resolve(itemData);
            } else {
                console.log("Fetching all items data from API...");
                $.get({
                    url: `/../WP_Ilma_Hodzic/backend/items`,  // Adjust the endpoint if necessary
                    dataType: "json",
                    success: function(data) {
                        let itemData = data.find(item => item.item_id == id);
                        if (itemData) {
                            console.log("ITEM DATA (from API): ", itemData);
                            localStorage.setItem(`itemData_${id}`, JSON.stringify(itemData));
                            resolve(itemData);
                        } else {
                            console.error("Item not found with id: ", id);
                            reject(new Error("Item not found"));
                        }
                    },
                    error: function(xhr, textStatus, errorThrown) {
                        console.error("Error fetching data from API");
                        reject(errorThrown);
                    }
                });
            }
        });
    };

    const renderItems = async (cartDataArray) => {
        let cartTotalPrice = 0;
        const cartBody = document.querySelector(".table-condensed");
        console.log("Cart Body:", cartBody);
        if (!cartBody) return;
        cartBody.innerHTML = '';

        for (const instance of cartDataArray) {
            let item = document.createElement("tbody");

            try {
                let productInfo = await fetchDataWithId(instance.product_id);
                console.log("Item info: ", productInfo);

                cartTotalPrice += instance.quantity * productInfo.price;

                item.classList.add("row");
                item.innerHTML = `
                <tr>
                <td data-th="Product">
                    <div class="row">
                        <div class="col-md-3 text-left">
                            <img src="${productInfo.image}" alt="" class="img-fluid">
                        </div>
                        <div class="col-md-9 text-left mt-sm-2">
                            <h4>${productInfo.item_name}</h4>
                        </div>
                    </div>
                </td>
                <td data-th="Price">${(instance.quantity * productInfo.price)}KM</td>
                <td data-th="Quantity">
                    <input type="number" class="form-control text-center" value="${instance.quantity}" data-product-id="${instance.product_id}">
                </td>
                <td class="actions" data-th="">
                    <div class="text-right">
                        <button class="btn btn-white btn-md mb-2" onclick="deleteCartItem(${instance.product_id})"><i class="fas fa-trash"></i></button>
                    </div>
                </td>
            </tr>
                `;

                cartBody.append(item);
            } catch (error) {
                console.error("Error rendering item:", error);
            }
        }
        if (cartTotal) {
            cartTotal.textContent = cartTotalPrice.toFixed(2);
        }
    };

    const fetchCartDataFromDB = () => {
        const user = JSON.parse(localStorage.getItem('user'));

        if (!user || !user.token) {
            console.error("User is not authenticated");
            return;
        }

        const token = user.token;
        const user_id = user.user_id;
        console.log("Retrieved token:", token);
        console.log("Retrieved user_id:", user_id);

        return new Promise((resolve, reject) => {
            $.ajax({
                url: "/../WP_Ilma_Hodzic/backend/get_cart_items",
                type: "GET",
                data: { user_id: user_id },
                headers: {
                    Authorization: `Bearer ${token}`
                },
                dataType: "json",
                success: function(response) {
                    console.log("Cart items fetched: ", response.data);
                    renderItems(response.data);
                    resolve();
                },
                error: function(xhr, status, error) {
                    console.error("Error fetching cart items:", error);
                    reject(error);
                },
                complete: function(xhr, status) {
                    console.log("AJAX request completed with status:", status);
                }
            });
        });
    };

    try {
        await fetchCartDataFromDB();
        console.log("Initialization complete.");
        isInitialized = true;
    } catch (error) {
        console.error(`Failed to initialize: ${error}`);
    }
};

document.addEventListener('DOMContentLoaded', initialize);
