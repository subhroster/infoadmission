/**
 * Created by subhr on 3/26/2016.
 */
jQuery(document).ready(function() {
    var contact = $('.contact-form');
    console.log(contact);
    contact.validate({
        //set this to false if you don't what to set focus on the first invalid input
        focusInvalid: false,
        //by default validation will run on input keyup and focusout
        //set this to false to validate on submit only
        //by default the error elements is a <label>
        errorElement: "div",
        //place all errors in a <div id="errors"> element
        errorPlacement: function(error, element) {
           // $("#errors").html("Please correct");

            error.appendTo("div#errors");
        },
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
                minlength: "Your name must consist of at least 2 characters"
            },
            email: {
                required: "We need your email address to contact you",
                email: "Your email address must be in the format of name@domain.com"
            },
            phone : {
                required: "Enter your Phone number"
            }
        },
        invalidHandler: function(form, validator) {
            console.log("error");
            var errors = validator.numberOfInvalids();
            if (errors) {
                var message = errors == 1
                    ? 'Please correct the following error:\n'
                    : 'Please correct the following ' + errors + ' errors.\n';

                //$("#error-heading").html(message);
                //$("#error-heading").fadeOut("slow");
               // $(".error").show();
                console.log(errors);
            } else {
                //$("#error-heading").hide();
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
                    console.log("success");
                    contact.hide( "slow");
                    contact.hide( "scale", { direction: "down" }, "slow" );
                    $( ".wpcf7-response-output" ).css("visibility","visible");
                    $( ".wpcf7-response-output" ).html("Thanks for submitting the form. We will get back to you soon.").show( "fold", 1000 );

                },
                error: function() {

                    console.log("error validation");
                }
            });
        }
    });
});