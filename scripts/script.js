$(document).ready(function(){
    $('#menu').slinky();
  
 // Contact
    var contact         = $('.contact-form'),
      successMessage    = $('.contact-success'),
      errorMessage      = $('.contact-error');

    contact.validate({

      rules: {
        name: {
          required: true,
          minlength: 2
        },
        email: {
          required: true,
          email: true
        },
        phone : {
          required:true,
          digits:true,
          minlength:10,
          maxlength:10

        }
        
      },

      messages: {
        name: {
          required: "Enter your name",
          minlength: "your name must consist of at least 2 characters"
        },
        email: {
          required: "no email, no message"
        }
        
      },
      invalidHandler: function(form, validator) {
        console.log("error");
      var errors = validator.numberOfInvalids();
      if (errors) {
        var message = errors == 1
          ? 'Please correct the following error:\n'
          : 'Please correct the following ' + errors + ' errors.\n';
        //var errors = "";
        
         //  $('#error').css("visibility", "visible");

         //jQuery("#error").html(message + errors);
         $('.ajax-loader').css("visibility", "hidden");
              $('.contact-error').css("visibility", "visible");
              errorMessage.fadeIn();
        //alert();
      }
      validator.focusInvalid();
    },
      submitHandler: function(form) {
        $('.fa-spin').css('visibility','visible');
        $('.ajax-loader').css("visibility", "visible");
        $(form).ajaxSubmit({
          type:"POST",
          data: $(form).serialize(),
          url:"./",
          success: function() {
            contact.hide( "slow");
             //$('.contact').css("visibility", "hidden");
             //contact.html("Thanks for submitting");
               contact.hide( "scale", { direction: "down" }, "slow" );
                $( ".wpcf7-response-output" ).css("visibility","visible");
              $( ".wpcf7-response-output" ).html("Thanks for submitting the form. We will get back to you soon.").show( "fold", 1000 );

            successMessage.fadeIn();

                         
 
          },
          error: function() {

 console.log("error");
            //contact.fadeTo( "slow", 0.15, function() {
             $('.contact-error').css("visibility", "visible");
              errorMessage.fadeIn();
           // });
          }
        });
      }
    });



  });

 $('.ajax').click(function() {
    
    //$('#colleges').load(this.href + ' #header3-7');
       $('#colleges').fadeOut().load(this.href).fadeIn();
 //$('#test').html("hello");
        // it's important to return false from the click
        // handler in order to cancel the default action
        // of the link which is to redirect to the url and
        // execute the AJAX request
        return false;
    }); 

