var users=[]; //global variable
var idCounter = 1; //counting new ids
$("#loginForm").validate({
    rules:{
        
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
        email: {
            required: "Molimo vas unesite validnu email adresu.",
            email: "Molimo vas unesite validnu email adresu." 
        },

        password: {
            required:"Molimo vas unesite lozinku.",
            minlength: "Dužina lozinke mora biti 5 slova/brojeva."
        }
    },
    submitHandler: function (form, event)
    {
        event.preventDefault();
        blockUi("#loginForm");
        let data=serializeForm(form);

        data['id']=idCounter;
        idCounter+=1;

        users.push(data);
        $("#loginForm")[0].reset(); //reset to add more users
        console.log(users);
        
        unblockUi("#loginForm");
        $(".success-message").show();

        setTimeout(function() {
            $(".success-message").hide();
        }, 5000);
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