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
        // Change the URL to point to your PHP endpoint
        $.get({
            url: "/../WP_Ilma_Hodzic/backend/items",
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
    <div class="container" >
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
            
            <!--Quantity: <input type="text" class="form-control quantity mb-4" name="" value="1">-->
            
            <a class="btn btn-full-width btn-lg btn-outline-primary" onclick="addToCart1(${itemData.item_id})">Dodaj</a></div>
    </div>
</div>
    `;
    // Save item data to localStorage
    localStorage.setItem("itemData", JSON.stringify(itemData));
}

function addToCart(item_id) {
    $.ajax({
        url: "rest/add_to_cart.php",
        type: "POST",
        data: { item_id: item_id },
        dataType: "json",
        success: function(response) {
            console.log(response.message);
            // Handle success response (e.g., show a success message)
        },
        error: function(xhr, status, error) {
            console.error("Error adding item to cart:", error);
            // Handle error response (e.g., show an error message)
        }
    });
}
