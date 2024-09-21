$(document).ready(() => {
    var users = [];
var idCounter = 1;

// Define utility functions
function blockUi(element) {
    $(element).block({ message: '<div class="loading-spinner"></div>' });
}

function unblockUi(element) {
    $(element).unblock({});
}

function serializeForm(form) {
    let jsonResult = {};
    $.each($(form).serializeArray(), function() {
        jsonResult[this.name] = this.value;
    });
    return jsonResult;
}

    $("#checkoutForm").validate({
        rules: {
            firstName: { required: true },
            lastName: { required: true },
            email: { required: true, email: true },
            country: { required: true },
            address: { required: true },
            city: { required: true },
            zip: { required: true },
            ccname: { required: true },
            ccnumber: { required: true, minlength: 16, maxlength: 16 },
            ccexpiration: { required: true },
            cccvv: { required: true, minlength: 3, maxlength: 3 }
        },
        messages: {
            firstName: { required: "Molimo vas unesite vaše ime" },
            lastName: { required: "Molimo vas unesite vaše prezime" },
            email: { required: "Molimo vas unesite validnu email adresu", email: "Molimo vas unesite validnu email adresu" },
            country: { required: "Molimo vas unesite državu" },
            address: { required: "Molimo vas unesite adresu" },
            city: { required: "Molimo vas unesite grad" },
            zip: { required: "Molimo vas unesite poštanski broj" },
            ccname: { required: "Molimo vas unesite ime na kartici" },
            ccnumber: { required: "Molimo vas unesite broj kartice", minlength: "Broj kartice mora imati 16 brojeva", maxlength: "Broj kartice mora imati 16 brojeva" },
            ccexpiration: { required: "Molimo vas unesite datum isteka kartice" },
            cccvv: { required: "Molimo vas unesite CVV", minlength: "CVV mora imati 3 brojeva", maxlength: "CVV mora imati 3 brojeva" }
        },
        submitHandler: function(form, event) {
            event.preventDefault();
            blockUi("#checkoutForm");
    
            let data = serializeForm(form);
            data['id'] = idCounter;
            idCounter += 1;
            users.push(data);
            $("#checkoutForm")[0].reset();
            console.log(users);
    
            unblockUi("#checkoutForm");
            $(".success-message").show();
    
            setTimeout(function() {
                $(".success-message").hide();
            }, 5000);
    
            $('#add-order-modal button[type="cancel"]').trigger("click");
    
            $.post("/../WP_Ilms_Hodzic/backend/add_order", data)
                .done(function(response) {
                    console.log(response);
                    Utils.unblock_ui("#add-order-modal");
                    $("#add-order-modal").modal("toggle");
                })
                .fail(function(xhr, status, error) {
                    console.error(error);
                });
        }
    });});

