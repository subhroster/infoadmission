<!DOCTYPE html>
<!--[if lt IE 8 ]><html class="ie7 ie8 no-svg" lang="en"> <![endif]-->
<!--[if lt IE 9 ]><html class="ie8 no-svg" lang="en"> <![endif]-->
<!--[if IE 9 ]><html class="ie9" lang="en"> <![endif]-->
<!--[if (gte IE 9)|!(IE)]><!--><html lang="en"><!--<![endif]-->
<head>
@yield('title')

    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/kube/3.0.2/css/kube.min.css">
    <link rel="stylesheet" href="{{ URL::to('/') }}/stylesheet/pew.css">
    <script type="text/javascript" src="{{ URL::to('/') }}/bricks/js_translation.js"></script>
    <script src="http://code.jquery.com/jquery-2.1.1.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.15.0/jquery.validate.min.js"></script>
    <script src="http://malsup.github.com/jquery.form.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">



    <script src="{{ URL::to('/') }}/scripts/formValidate.js"></script>

    <script src="{{ URL::to('/') }}/js/modernizr.js"></script>
    <script src="{{ URL::to('/') }}/js/pew_base.js"></script>
    <script src="{{ URL::to('/') }}/bricks/es_js.js"></script>
    <script src="{{ URL::to('/') }}/js/jquery.bxslider.min.js"></script>
    <script src="{{ URL::to('/') }}/scripts/jquery-scrollto.js"></script>



    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
    <script src="{{ URL::to('/') }}/js/html5shiv.js"></script>
    <script src="{{ URL::to('/') }}/js/respond.js"></script>
    <![endif]-->
    <script>
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

        ga('create', 'UA-63147625-1', 'auto');
        ga('send', 'pageview');

    </script>
</head>

<header class="header mini-header grid">
    <div class="page-in units-row">
        <div class="unit-30 logo-wrap">

            <a href="proessaywritings_default.html" class="logo f-dosis" title="ProEssayWritings">
                <!--[if (gte IE 9)|!(IE)]-->
                <img src="{{ URL::to('/') }}/img/logo2.png" alt="ProEssayWritings" title="ProEssayWritings" class="hvr-wobble-horizontal">
                <!--[endif]-->
                <!--[if lt IE 9]>
                <img src="{{ URL::to('/') }}/img/logo-ie8.png" alt="ProEssayWritings" title="ProEssayWritings">
                <![endif]-->
            </a>
        </div>
        <nav class="unit-70 top-menu f-dosis ta-rgt">
            <span class="menu-mq">&nbsp;</span>
            <div class="menu-mq-in">
                <a href="{{ route('home')}}" title="How it works" class="top-link hvr-underline-from-left">Home</a>
                <a href="{{ route('eligibility')}}" title="Latest Orders" class="top-link hvr-underline-from-left">Elligibility</a>
                <a href="{{ route('eng-college')}}" title="Our Writers" class="top-link hvr-underline-from-left">Colleges</a>
                <a href="customer-faq.html" title="FAQ" class="top-link hvr-underline-from-left">Placements</a>
                <a href="#about" id= "scroll" title="Blog" class="top-link hvr-underline-from-left">contacts</a>
                <div id="proessaywritings_auth_container" class="top-link-sign log-bar es-loader hvr-sweep-to-left"></div>
            </div>
        </nav>

        <script>
            function f_func_mq_menu(){
                $('.top-menu').on('click',function() {
                    if($('.menu-mq').is(':visible') && $('.menu-mq-in').is(':visible')) {
                        $('.menu-mq-in').slideUp(300);
                    }
                    else if($('.menu-mq').is(':visible') && !$('.menu-mq-in').is(':visible')) {
                        $('.menu-mq-in').slideDown(300);
                        $(this).addClass('active');
                    }
                    else if(!$('.menu-mq').is(':visible') && $('.menu-mq-in').is(':visible')) {
                        $('.menu-mq-in').show();
                        $('.menu-mq-in').css('max-height',$(window).innerHeight()-50);
                    }
                });
            };
            $(document).ready(function(){
                f_func_mq_menu();
            });
            $(window).resize(function(){
                if(!$('.menu-mq').is(':visible')) {
                    $('.menu-mq-in').show();
                }else {
                    $('.menu-mq-in').hide();
                }
            });

        </script>	</div>
</header>
@yield('content')
<section class="section-follow">
    <div class="page-in clearfix">
        <p class="ta-center f-white f-24 f-dosis">
            <span class="follow-item-text">Follow us on the networks</span>
        <div class="footer-icons">
            <ul class="social-network social-circle">
                <li><a href="#" class="icoFacebook" title="Facebook"><i class="fa fa-facebook"></i></a></li>
                <li><a href="#" class="icoTwitter" title="Twitter"><i class="fa fa-twitter"></i></a></li>
                <li><a href="#" class="icoGoogle" title="Google +"><i class="fa fa-google-plus"></i></a></li>
                <li><a href="#" class="icoLinkedin" title="Linkedin"><i class="fa fa-linkedin"></i></a></li>
            </ul>


        </div>
        </p>
    </div>
</section>
<div class="hfooter">&nbsp;</div>
<footer class="footer grid-footer">
    <div class="page-in">
        <div class="units-row foot-links">
            <div class="unit-90">
                <div class="units-row">
                    <div class="unit-30">

                            Admission
                            <span>Info</span>
                        <p class="footer-links">
                            <a href="#">Home</a>
                            |
                            <a href="#">Eligibility</a>
                            |
                            <a href="#">Courses</a>

                        </p>


                    </div>
                    <div class="unit-30 contacts" id="about">
                        <i class="fa fa-map-marker"></i>

                                <span>21 xxxxx</span>
                               <p>Bangalore, India</p>

                            <p><i class="fa fa-phone"></i>
                                <span>+191 9999999999</span></p>

                        <p>
                            <i class="fa fa-envelope"></i>
                            <span>
                                <a href="mailto:support@company.com">support@company.com</a>
                            </span>
                        </p>


                    </div>
                    <div class="unit-30">
                            <span>About the company</span>
                            Lorem ipsum dolor sit amet, consectateur adispicing elit. Fusce euismod convallis velit, eu auctor lacus vehicula sit amet.

                    </div>

                </div>
            </div>
        </div>
        <div class="copy-rights">&copy; 2016 ProEssayWritings.com. All Rights Reserved</div>
    </div>
</footer>
<script>
    $(document).pew_base('get_order_form');
    $('body').pew_base('test_svg');
    $('.get-order').pew_base('get_order');
    $('.navicon').pew_base('show_menu');
    $(document).pew_base('ajax_finish');
</script>
<script type="text/javascript" src="{{ URL::to('/') }}/scripts/jquery.marquee.min.js"></script>

<script src="{{ URL::to('/') }}/scripts/modernizr.custom.js"></script>


<script src="{{ URL::to('/') }}/scripts/jquery.slinky.js"></script>

<script>
    $(document).ready(function(){
        $('#colleges').fadeOut().load('alliance').fadeIn();

        $('#menu').slinky();
        $( "#scroll" ).click(function() {
            $('#about').ScrollTo({
                duration: 2000,
                easing: 'linear'
            });
        });

    });
</script>
<script>
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


</script>
</body>
</html>