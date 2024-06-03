$(document).ready(() => {
    const cartTotal = document.querySelector(".cart-total");
    const cartBody = document.querySelector(".table-condensed");

    let cartData = [];
    let cartTotalPrice = 0;

    fetchCartDataFromDB();

    function fetchCartDataFromDB() {
        const user = JSON.parse(localStorage.getItem('user'));
        
        if (!user || !user.token) {
            console.error("User is not authenticated");
            return;
        }

        const token = user.token;

        $.ajax({
            url: "/../WP_Ilma_Hodzic/backend/get_cart_items",
            type: "GET",
            headers: {
                'Authorization': 'Bearer ' + token
            },
            success: function(response) {
                console.log("Cart items fetched: ", response.data);
                cartData = response.data;
                renderItems(cartData);
            },
            error: function(xhr, status, error) {
                console.error("Error fetching cart items:", error);
            }
        });
    }

    async function renderItems(cartDataArray) {
        cartBody.innerHTML = ''; // Clear existing items
        cartTotalPrice = 0;

        for (const instance of cartDataArray) {
            let item = document.createElement("tbody");

            let productInfo = await fetchDataWithId(instance.product_id);
            console.log("Item info: ", productInfo);

            cartTotalPrice += (instance.quantity * productInfo.price);
            console.log("cartTotalPrice: ", cartTotalPrice);

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
                        <input type="number" class="form-control text-center" value="${instance.quantity}" data-product-id="${instance.product_id}">
                    </td>
                    <td class="actions" data-th="">
                        <div class="text-right">
                            <button class="btn btn-white btn-md mb-2"><i class="fas fa-trash"></i></button>
                        </div>
                    </td>
                </tr>
            `;

            cartBody.append(item);
        }

        console.log("Cart total price: ", cartTotalPrice);
        cartTotal.innerHTML = cartTotalPrice + ' KM';

        // Attach event listeners for quantity changes
        document.querySelectorAll('input[type="number"]').forEach(input => {
            input.addEventListener('change', handleQuantityChange);
        });
    }

    function fetchDataWithId(id) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `/../WP_Ilma_Hodzic/backend/items/${id}`,
                type: "GET",
                success: function(data) {
                    if (data) {
                        resolve(data);
                    } else {
                        reject(new Error(`Instance with ID ${id} not found`));
                    }
                },
                error: function(xhr, status, error) {
                    reject(new Error(`Failed to fetch data: ${error}`));
                }
            });
        });
    }

    function handleQuantityChange(event) {
        const input = event.target;
        const newQuantity = input.value;
        const productId = input.dataset.productId;

        // Update the quantity in the database
        updateCartItemQuantity(productId, newQuantity);
    }

    function updateCartItemQuantity(productId, quantity) {
        const user = JSON.parse(localStorage.getItem('user'));

        if (!user || !user.token) {
            console.error("User is not authenticated");
            return;
        }

        const token = user.token;
        const user_id = user.user_id;

        const dataToSend = { product_id: productId, user_id: user_id, quantity: quantity };
        console.log("Data being sent to backend for update:", dataToSend);

        $.ajax({
            url: "/../WP_Ilma_Hodzic/backend/update_cart_item_quantity",
            type: "POST",
            headers: {
                'Authorization': 'Bearer ' + token
            },
            data: JSON.stringify(dataToSend),
            contentType: "application/json",
            success: function(response) {
                console.log(response.message);
                // Re-fetch cart data to update total price and items
                fetchCartDataFromDB();
            },
            error: function(xhr, status, error) {
                console.error("Error updating item quantity:", error);
            }
        });
    }
});
