var FormValidation = {
    serialize_form : function (form) {
      let result = {};
      $.each(form.serializeArray(), function () {
          result[this.name] = this.value;
      });
      return result;
    },
    validate: function (form_selector, form_rules, form_submit_handler_callback) {
      var form_object = $(form_selector);
      var error = $(".alert-danger", form_object);
      var success = $(".alert-success", form_object);
  
      $(form_object).validate({
        rules: form_rules,
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
    }
      });
    },
  };