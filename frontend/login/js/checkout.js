$(document).ready(() => {
    const cartTotal = document.querySelector(".checkout-total");
    const cartBody = document.querySelector(".checkout-body");

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
            console.log("Data added to cartData: ", cartData);
            renderItems(cartData);
        });
    } 

    async function renderItems(cartDataArray) {
        
        for (const instance of cartDataArray) {
            let item = document.createElement("div");

            let productInfo = await fetchDataWithId(instance.productId, "js/shop.json");
            console.log("Item info: ", productInfo);

            cartTotalPrice += (instance.quantity * productInfo.price);
            console.log("cartTotalPrice: ", cartTotalPrice);

            item.classList.add("li");
            item.innerHTML = `
        
            <div>
                <h6 class="my-0">${productInfo.name}</h6>
            </div>
            <span class="text-muted">${productInfo.price} KM</span>
       
`;

cartBody.append(item);

        }

        console.log("Cart total price while adding: ", cartTotalPrice);
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