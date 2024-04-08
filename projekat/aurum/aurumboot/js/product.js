document.addEventListener("DOMContentLoaded", function() {
    let shopBodySingle = document.querySelector(".featured-block1");
  
    if (shopBodySingle) {
        let id = localStorage.getItem("id");
        console.log("localstorage id: ", id);
        fetchDataWithId(id);
    } else {
        console.error("Element not found.");
    }
  });
  
  fetchDataWithId = (id) => {
    let storedItemData = localStorage.getItem(`itemData_${id}`);
    if (storedItemData) {
        let itemData = JSON.parse(storedItemData);
        console.log("Item data: ", itemData);
        renderItem(itemData);
    } else {
        console.log("Fetching item data from API");
        $.get({
            url: "js/shop.json",
            dataType: "json",
            success: function(data) {
                let itemData = data.find(item => item.id == id);
                if (itemData) {
                    console.log("Item data: ", itemData);
                    localStorage.setItem(`itemData_${id}`, JSON.stringify(itemData));
                    renderItem(itemData);
                } else {
                    console.error("Item not found with id: ", id);
                }
            },
            error: function(xhr, textStatus, errorThrown) {
                console.error("Error fetching data:", "js/shop.json");
            }
        });
    }
  }
  
  renderItem = (itemData) => {
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
            <h2 class="mb-3 mt-0">${itemData.name}</h2>
            <p class="lead mt-2 mb-3 primary-color">${itemData.price} KM</p>
            <h5 class="mt-4">${itemData.topic}</h5>
            <p>${itemData.description}</p>
        
            <select class="custom-select form-control mt-4 mb-4">
                <option selected>Veličina</option>
                <option value="1">S</option>
                <option value="2">M</option>
                <option value="3">L</option>
            </select>
            
            <!--Quantity: <input type="text" class="form-control quantity mb-4" name="" value="1">-->
            
            <a href="#" class="btn btn-full-width btn-lg btn-outline-primary">Dodaj</a></div>
    </div>
</div>
      
    `;
    
    localStorage.setItem("itemData", JSON.stringify(itemData));
  }








