$(document).ready(() => {
    const cartTotal = document.querySelector(".cart-total");
    const cartBody = document.querySelector(".table-condensed");

    let cartData = [];
    let itemCount = 0;
    let cartTotalPrice = 0;

    fetchCartData("js/cart.json");

    function fetchCartData(dataUrl) {
        $.get(dataUrl, (data) => {
            console.log("Data fetched: ", data);

            data.forEach(instance => {
                cartData.push(instance);
                itemCount++;
            })
            console.log("Data added to cartData:", cartData);
            renderItems(cartData);
        });
    } 

    async function renderItems(cartDataArray) {
        
        for (const instance of cartDataArray) {
            let item = document.createElement("tbody");

            let productInfo = await fetchDataWithId(instance.productId, "js/shop.json");
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

        }

        console.log("Cart total price: ", cartTotalPrice);
        cartTotal.innerHTML = cartTotalPrice;
    }

    function fetchDataWithId(id, dataUrl) {
        return new Promise((resolve, reject) => {
            $.get(dataUrl, (data) => {
                const foundInstance = data.find(instance => instance.id === id);
                if (foundInstance) {
                    console.log("instance: ", foundInstance);
                    resolve(foundInstance);
                } else {
                    reject(new Error(`Instance with ID ${id} not found`));
                }
            }).done(() => {
                console.log("DONE FETCHING DATA");
            }).fail((error) => {
                reject(new Error(`Failed to fetch data: ${error}`));
            });
        });
    }
});