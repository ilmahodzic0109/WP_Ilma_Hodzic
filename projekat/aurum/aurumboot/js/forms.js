var users=[]; //global variable
var idCounter = 1; //counting new ids
$("#checkoutForm").validate({
    rules:{
        firstName:{
            required:true
        },
        lastName:{
            required: true
        },
        email:{
            required:true,
            email:true 
        },
        country:{
            required:true
        },
        address:{
            required:true
        },
        city:{
            required:true
        },
        zip:{
            required:true,
            digits: true 
        },
        ccname:{
            required:true,
            digits:false
        },
        ccnumber:{
            required:true,
            digits:true,
            minlength:16
        },
        ccexpiration:{
            required:true,
            digits:true,
            minlength:4
        },
        cccvv:{
            required:true,
            digits:true,
            minlength:3
        }
    },
    messages: {
        firstName: {
            required: "Popunite svoje ime."
        },
        lastName: {
            required: "Popunite svoje prezime."
        },
        email: {
            required: "Molimo vas unesite validnu email adresu.",
            email: "Molimo vas unesite validnu email adresu." 
        },
        country: {
            required: "Molimo vas unesite državu."
        },
        address: {
            required: "Molimo vas unesite adresu."
        },
        city: {
            required: "Molimo vas unesite grad."
        },
        zip: {
            required: "Molimo vas unesite poštanski broj.",
            digits: "Molimo vas unesite samo cifre." 
        },
        ccname:{
            required:"Molimo vas unesite ime i prezime na kartici.",
            digits:"Unesite ispravan format."
        },
        ccnumber:{
            required:"Molimo vas unesite broj sa kartice.",
            digits:"Unesite ispravan format.",
            minlength:"Minimalno 16 brojeva."
        },
        ccexpiration:{
            required:"Molimo vas unesite datum isteka kartice.",
            digits:"Unesite ispravan format.",
            minlength:"Minimalno 4 broja."
        },
        cccvv:{
            required:"Molimo vas unesite CVV broj.",
            digits:"Unesite ispravan format.",
            minlength:"Minimalno 3 broja."
        }
    },
    submitHandler: function (form, event)
    {
        event.preventDefault();
        blockUi("#checkoutForm");
        let data=serializeForm(form);

        data['id']=idCounter;
        idCounter+=1;

        users.push(data);
        $("#checkoutForm")[0].reset(); //reset to add more users
        console.log(users);
        
        unblockUi("#checkoutForm");
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