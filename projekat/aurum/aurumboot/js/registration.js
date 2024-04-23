var users=[]; //global variable
var idCounter = 1; //counting new ids
$("#registrationForm").validate({
    rules:{
        username:{
            required:true
        },
        email:{
            required:true,
            email:true 
        },
        password:{
            required:true,
            minlength: 5
        }
    },
    messages: {
        username:{
            required: "Molimo vas unesite vaše korisničko ime"
        },
        email: {
            required: "Molimo vas unesite validnu email adresu.",
            email: "Molimo vas unesite validnu email adresu." 
        },

        password: {
            required:"Molim vas unesite lozinku.",
            minlength: "Dužina lozinke mora biti 5 slova/brojeva."
        }
    },
    submitHandler: function (form, event)
    {
        event.preventDefault();
        blockUi("#registrationForm");
        let data=serializeForm(form);

        data['id']=idCounter;
        idCounter+=1;

        users.push(data);
        $("#registrationForm")[0].reset(); //reset to add more users
        console.log(users);
        
        unblockUi("#registrationForm");
        $(".success-message").show();

        setTimeout(function() {
            $(".success-message").hide();
        }, 5000);

        
$('#add-patient-modal button[type="cancel"]').trigger("click");

$.post(Constants.API_BASE_URL + "add_user.php", data)
.done(function(data){
    Utils.unblock_ui("#add-patient-modal");
    $("#add-patient-modal").modal("toggle");
    

})
    }
    
});

blockUi=(element) => {
    $(element).block({message: '<div class="loading-spinner"></div>'});
}

unblockUi=(element) => {
    $(element).unblock({});
}

serializeForm=(form)=>
{
    let jsonResult={};
    $.each($(form).serializeArray(), function(){
        jsonResult[this.name]=this.value;
    });
    return jsonResult;
}