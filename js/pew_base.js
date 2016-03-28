function reload_slider(slider){

	if($(window).innerWidth() < 830) {
		slider.reloadSlider({ 
			mode: 'horizontal',
			speed: 200,
			auto: false,
			pager: true,
			controls: true,
			adaptiveHeight: true,
			pause: 4000,
			prevText: 'prev',
			nextText: 'next'
		});
		$('.proessaywritings-slide .testimonial-text').each(function(){
			$(this).addClass('one-slide');
			$(this).parent('.tw-testimonial-body').removeClass('show-dots');
		});
	}else {
		slider.reloadSlider({ 
			mode: 'horizontal',
			speed: 200,
			auto: true,
			minSlides: 3,
			maxSlides: 3,
			slideWidth: 360,
			slideMargin: 10,
			pager: true,
			controls: true,
			adaptiveHeight: true,
			pause: 4000,
			prevText: 'prev',
			nextText: 'next'
		});
		$('.proessaywritings-slide .testimonial-text').each(function(){
			$(this).removeClass('one-slide');
			if($(this).text().length > 175) {
				$(this).parent('.tw-testimonial-body').addClass('show-dots');
			}
		});
		$('.show-dots').on('click', function(){
			$(this).toggleClass('show');
			$(this).parents('li').addClass('current');
		});
	}
	};
(function($){

	var methods = {

		init: function() {


		},

		show_like: function() {

		},
		get_activity: function(elem) {
			$.getJSON('/bricks/aj_export_statistics.html?json=1', function(data){
				$('.activity-stat-item.orders-count').text(data.orders_count);
				var activities = {
					'quality-score': data.quality_score,
					'orders-count': data.orders_count,
					'visitors-count': data.visitors_count,
					'writers-count': data.writers_count,
					'writers-online': data.writers_online
				};
				if($(elem).hasClass('activity')){
					animate_number_stats(activities);
				}
				function animate_number_stats(activities){
					var space_separator_step = $.animateNumber.numberStepFactories.separator(' '),
						comma_separator_step = $.animateNumber.numberStepFactories.separator(','),
						decimal_places = 2,
						decimal_factor = decimal_places === 0 ? 1 : decimal_places * 50;
					$.each(activities, function (i, item) {
						if(i == 'quality-score'){
							$('.' + i).html(0).animateNumber({
								number: item * decimal_factor,
								numberStep: function(now, tween) {
									var floored_number = Math.floor(now) / decimal_factor,
									target = $(tween.elem);
									if (decimal_places > 0) {
										floored_number = floored_number.toFixed(decimal_places);
									}
										target.text(floored_number);
									}
							}, 2000);
						} else {
							$('.' + i).html(0).animateNumber({ number: item , numberStep: space_separator_step }, 2000);
						}
					});
				}	
			});
		},
		animate_activity: function(data){
			
		},
		get_testimonials : function(type) {
			$.getJSON('/testimonials_json.html?format=json', function(data){/*test*/
			var container = $("#proessaywritings-testimonials");/*test*/
			/*for real*/
			//var container = $(this);
			//var es_testimonials = new ESTestimonials({});
			//var showTestimonialsHorizontalRotatorCallback = function(data) {
			
			 if (data.length == 0) {
					//console.log("NO DATA!");
					container.removeClass('es-loader');
					if (type == 'mini') {
						$('.inner-box.empty-bg-box').hide();
					}
					return false;
			}
			if (type == 'mini') {
				$('.inner-box.empty-bg-box').show();
				container = $("#testimonials-container-mini");/*test*/
				$(container).find('.proessaywritings-carousel-mini').empty()
				for (var i = 0; i < 2; i++) {
					$(container).find('.proessaywritings-carousel-mini').append('<li><div class="mini-testimonial-item"><div class="mini-testimonial-feedback"><p class="mini-testimonial-text">' + data[i].order.rating_writer_comment + '</p></div><div class="mini-testimonial-info">Customer\'s ID #' + data[i].order.id + ', ' + data[i].order.rating_dt_date + '</div></div></li>');

					
				};
				var slider = $('.proessaywritings-carousel-mini').bxSlider({ 
					mode: 'vertical',
					speed: 200,
					auto: true,
					minSlides: 2,
					maxSlides: 2,
					pager: false,
					controls: false,
					adaptiveHeight: true,
					pause: 4000,
				});
				slider.on('mouseover',function(){
					slider.stopAuto();
				});
				slider.on('mouseout',function(){
					slider.startAuto();
				});
				
			} else {
				
				var inner_container = container.find('.proessaywritings-carousel');
				var text = '<!--dynamic-->';
				
				$.each(data, function() {

						if (this.order.title.substring(0,14) == text) {
								this.order.title = '<span class="grey">Hidden by customer</span>';
						}
						
						if (this.writer.award_qty > 0) {
							this.writer.award_qty = '<div class="has-award"></div>'
						} else {
							this.writer.award_qty = '';
						}
							
						function round(a,n){
							var m = Math.pow(10,n);
							return Math.round(a*m)/m;
						}
						function rating(a){
							return round(a,1) * 10;
						}

						$(inner_container).append('<li class="item"><div class="l2-item"><div class="a-inner"><div class="writer-info box"><div class="writer-short"><img src="' + this.writer.avatar + '" class="tw-writer-avatar"><h4 class="tw-writer-name font-12 bold">' + this.writer.award_qty + this.writer.pen_name + '</h4></div><div class="wp-rating font-12"><div class="rating-icon-grey"><div class="current-rating tw-rating-icon-orange" style="width:' + rating(this.writer.rating) + 'px;"></div></div><span class="wp-rating-number f-bold">' + round(this.writer.rating, 1) + '<span class="lo-customer-rating-from">/10</span></span></div></div></div><div class="tw-customer-info box"><div class="tw-estimonial-header title-color"><h3 class="tw-order-title">' + this.order.rating_dt_date + '</h3></div><div class="tw-testimonial-body"><h5 class="wp-comment-title tw-customers-feedback font-13 bold blue-color">Customer\'s feedback:</h5><p class="testimonial-text wp-writer-comment">' + this.order.rating_writer_comment + '</p></div></li>');
					});
					
					$('.proessaywritings-carousel .item').first().addClass('active');
					

						if($(window).innerWidth() < 830) {
							var slider = $('.proessaywritings-carousel').bxSlider({ 
								mode: 'horizontal',
								speed: 200,
								auto: false,
								pager: true,
								controls: true,
								adaptiveHeight: true,
								pause: 4000,
								prevText: 'prev',
								nextText: 'next'
							});
							$('.proessaywritings-slide .testimonial-text').each(function(){
								$(this).addClass('one-slide');
								$(this).parent('.tw-testimonial-body').removeClass('show-dots');
							});
						}else {
							var slider = $('.proessaywritings-carousel').bxSlider({ 
								mode: 'horizontal',
								speed: 200,
								auto: true,
								minSlides: 3,
								maxSlides: 3,
								slideWidth: 360,
								slideMargin: 10,
								pager: true,
								controls: true,
								adaptiveHeight: true,
								pause: 4000,
								prevText: 'prev',
								nextText: 'next'
							});
							$('.proessaywritings-slide .testimonial-text').each(function(){
								$(this).removeClass('one-slide');
								if($(this).text().length > 175) {
									$(this).parent('.tw-testimonial-body').addClass('show-dots');
								}
							});
							$('.show-dots').on('click', function(){
								$(this).toggleClass('show');
								$(this).parents('li').addClass('current');
							});
						}
					
					
					
					slider.on('mouseover',function(){
						slider.stopAuto();
					});
					slider.on('mouseout',function(){
						slider.startAuto();
					});
					$(window).on('resize',function(){
						reload_slider(slider);
					});
				}
				container.removeClass('es-loader');
			});
			//es_testimonials.getDataForHorizontalRotator(showTestimonialsHorizontalRotatorCallback); // 1

		},
		get_order: function () {

			var container = $(this);

			if (container.parents().hasClass('how-it-works')) {
				
				container.on('click', function(){
					$('.hiw-order-article').show();
					var target = $('.order-form').offset().top;
						
						$('html, body').animate({
							scrollTop: target}, 400, function(){
							$('#id_esof_email').focus();
						});

						$(window).trigger('resize', function(){
							$(window).width() + 1 - 1; // spike for ZebraDatepicker update position
						})
				});

			}

			container.on('click', function() {
				
				var target = $('.order-form').offset().top;
				
				$('html, body').animate({
					scrollTop: target}, 200, function(){
						$('#id_esof_email').focus();
					}
				);

			});

		},

		test_svg: function () {

			if(!Modernizr.svg) {
				$('img[src*="svg"]').attr('src', function() {
					return $(this).attr('src').replace('.svg', '.png').replace('/img/', '/img/png/');
				});
			}

		},

		show_menu: function () {

			var menu = $('.menu-wrapper');
			this.on('click', function(){
				
				if (menu.hasClass('hide')) {
					menu.slideDown().removeClass('hide');
				} else if (menu.css('display') == 'none') {
					menu.slideDown();
				} else {
					menu.slideUp().addClass('hide');
				}

			});

		},

		get_order_form: function () {

			/* Authorization, Order form */
			var es_auth = {};
			var es_esof = {};

				es_auth = new ESAuth({
					container_id: 'proessaywritings_auth_container',
					userAuthorized: function (data) {
						$(document).pew_base('checkActiveMessages');
					}
				});

				es_auth.init({
					auto_open: false, 
					disable_close: false,
					show_link_registration: true,
					show_link_remind: true, 
					prefix_html: '',
					postfix_html: '',
					force_user_role: '',
					force_user_login: '',
					on_login_callback: function(data) { if (data.redirect != undefined) { window.location.href = data.redirect; } },
					on_logout_callback: function(data) { if (data.redirect != undefined) { window.location.href = data.redirect; } }
				});

				es_esof = new ESSOF({
					container_id: 'proessaywritings_sof_container',
					es_auth: es_auth,
					callback_function: function(data) {
						$('#dt_esof_esof_pages_qty').text($('#dt_esof_esof_pages_qty').text().trim());
						$('#dt_esof_esof_deadline_date').text($('#dt_esof_esof_deadline_date').text().trim());
						$('#proessaywritings_sof_container').removeClass('es-loader');

						var whats_next = $('#dialog-whats-next');
						var overlay = $('#es-overlay');
						var whats_button = $('.what-next');

						/* Whats next module */
						whats_button.on('click', function(){
							overlay.css('visibility', 'visible');
							whats_next.css('display', 'block');
						});

						$('#id_es_wh_next_container_close, .es-inner-content button').on('click', function(){
							overlay.css('visibility', '');
							whats_next.css('display', 'none');
						});

						/* Placeholder */
						$('#id_esof_email').prop('placeholder','Your E-mail');
						$('#id_esof_paper_type .paper_type_').text('Select type of paper');

						/* Order form */
						$('.clear').remove();

						// Check writer-cookie
						var cookie = methods.get_cookie('writer');

						if (cookie !== undefined) {
						
							cookie = JSON.parse(cookie);
							methods.request_writer(cookie.id, cookie.name);
						
						}

						// Check page URL, if auth_required_customer - get auth modal-window
						if (window.location.pathname === '/auth_required_customer.html') {
							$('#id_esauth_myaccount_login_link').click();
						}

					}
				});

				es_vars = new ESVars({});
				es_esof.showForm();
				//es_vars.populate('current_var_container', 'content_terms');

		},

		get_latest_orders : function() {
			
			/* New latest orders */
			var latestOrder = new ESLatestOrders;
			
			latestOrder.render(function(html, pagination, data) {
				
				var container = $('#latest_orders_container');
				container.empty();

				var contentContainer = $('<div class="lo-container" />').html(html);
				container.append(contentContainer);
				
				var paginationContainer = $('<div class="lo-pagination" />').html(pagination);
				container.append(paginationContainer);
				//add data-id for each order
				var items = $('.latest-orders-item');
				for (var i=0; i < items.length; ++i) {
					var ids = $(items[i]).find('.lo-order-id').text(),
						orderid = ids.replace('#','');
					$(items[i]).attr('data-id',orderid);
				}
				//rebuild lo-order-type
				for (var i=0; i < pagination.orders.length; ++i) {
					var orderPages = parseInt(pagination.orders[i].order_pages_qty) <= 1 ? ' page' : ' pages';
					$('.latest-orders-item[data-id='+pagination.orders[i].order+'] .lo-order-type').text(pagination.orders[i].order_paper_type + ', ' + pagination.orders[i].discipline_title + ', ' + pagination.orders[i].order_pages_qty+orderPages);
				}
				
					$('.lo-order-time-date').each(function(){
						$(this).parents('.latest-orders-item').find('.lo-writer-block-href').after($(this));
					});
					$('.lo-order-title').remove();
					/* Latest orders Show/Hide writer's comment */
					var writer_feedback_button = $('.lo-show-writer-feedback').addClass('ico-hide');
					$('.lo-writer-feedback-block').hide();
					
					$('.lo-writer-feedback-block').each(function(){
						if ($(this).find('.lo-writer-comment').text() == '') {
							$(this).next().hide();
						}
					});

					writer_feedback_button.on('click', function() {
						var lo_container = $(this).closest('.latest-orders-item');
						var lo_writer_feedback_block = lo_container.find('.lo-writer-feedback-block');
						var button = $(this);			

							if (lo_writer_feedback_block.hasClass('opened')) {
								lo_writer_feedback_block.slideUp('fast', function(){
									$(this).removeClass('opened');
									button.empty().text('Show writer\'s comment').removeClass('ico-hide-up');
								});
							} else {
								lo_writer_feedback_block.slideDown('fast', function(){
									$(this).addClass('opened');
									button.empty().text('Hide writer\'s comment').addClass('ico-hide-up');
								});
							}

						return false;
					});


				container.on('click', '.pagination-item, .lo-pagination-control', function(e) {
					var target = $(e.target);
					var index = target.attr('href').substring(1);
					var peirs = window.location.search.substring(1);
					peirs = peirs.split('&');
					var new_peirs = [];
				
					for (var i=0; i < peirs.length; ++i) {
						var peir = peirs[i].split('=');
						if (peir[0] === 'eslopage')
							continue;
						new_peirs.push(peirs[i]);
					}
					var separator = '?';
				
					if (0 != index)
						new_peirs.push('eslopage=' + index);
				
					var new_url = window.location.pathname + separator + new_peirs.join('&');
					window.location.href = new_url;
				
					return false;
				});
				
				$('.lo-writer-rating').remove();
				$('.lo-writer-orders').remove();
				$('.lo-order-header-desc').remove();
				$('.lo-writer-block-href').replaceWith(function(){
					return $("<span />").append($(this).contents()).removeAttr( "href" ).addClass('lo-writer-block-href');
				});
				$('#latest_orders_container').removeClass('es-loader');

			}, function (item, i, len, data) {// Pre-transformation latest orders	
				item.writer_rating_number = item.writer_rating;
				item.customer_rating_number = item.rating_customer;

				item.rating_writer_number = item.rating_writer;

				item.writer_rating = Math.round(item.writer_rating * 10);
				item.rating_customer = item.rating_customer * 10;
				item.rating_writer = item.rating_writer * 10;

				if (item.order_title == '***') {
					item.order_title = 'Hidden by customer';
				}
				
				return item;
			}, '/resources/test.json');
		},
		get_top_writers_filter : function() {
				if($.urlParam('discipline')!=null){
					$('.tw-filter-comp-current').text('10+ orders');
					$('.tw-filter-completed-content .tw-filter-href').each(function(){
						$(this).removeClass('active');
					});
					$('#r10').addClass('active');
				}else{
					$('.tw-filter-comp-current').text('50+ orders');
					$('.tw-filter-completed-content .tw-filter-href').each(function(){
						$(this).removeClass('active');
					});
					$('#r50').addClass('active');
				}
			//------------------------------------------
			$('.tw-filter-item').on('click',function(){
				$(this).next('.tw-filter-content').removeClass('hide');
				$(this).addClass('js-active');
				
			});
			//---------set selected filter params-------------
			if($.urlParam('reviews_qty')!=null){
				$('.tw-filter-comp-current').text($.urlParam('reviews_qty') + '+ orders');
				$('.tw-filter-completed-content .tw-filter-href').each(function(){
					$(this).removeClass('active');
				});
				$('#r' + $.urlParam('reviews_qty')).addClass('active');
			}
			if($.urlParam('discipline')!=null){
				$('.tw-filter-disc-current').text($('#d'+$.urlParam('discipline')).text());
				$('.tw-filter-discipline-content .tw-filter-href').each(function(){
					$(this).removeClass('active');
				});
				$('#d' + $.urlParam('discipline')).addClass('active');
			}
			if($.urlParam('sort')!=null){
				$('.tw-filter-sort-content .tw-filter-href').each(function(){
					$(this).removeClass('active');
				});
				if($.urlParam('sort')=='qty'){
					$('.tw-filter-sort-current').text('orders');
					$('.rating-ach a').addClass('active');
				}else {
					if($.urlParam('sort')=='rating'){
						$('.rating-rate a').addClass('active');
					}else{
						$('.rating-awards a').addClass('active');
					}
					$('.tw-filter-sort-current').text($.urlParam('sort'));
				}

			}
			if($.urlParam('online')==1){
				$('#onstatus').prop('checked', true);
			}else{
				$('#onstatus').prop('checked', false);
			}
			
			//---------send filter params-------------
			var param_discipline = null, param_reviews_qty = null, param_sort = null, param_online = null;
			$('.tw-filter-completed-content .tw-filter-href').click(function(e){
				e.preventDefault();
				param_reviews_qty = $(this).attr('id').substr(1);
				if(param_reviews_qty == 0) {
					param_reviews_qty = null;
				}else {
					//if(param_reviews_qty == 50) {
					//	new_params = removeQueryStringParameter(window.location.href, 'reviews_qty');
					//}else{
						new_params = updateQueryStringParameter(window.location.href, 'reviews_qty', param_reviews_qty);
					//}
				}
				f_reload_by_filter(new_params);
			});
			$('.tw-filter-discipline-content .tw-filter-href').click(function(e){
				e.preventDefault();
				param_discipline = $(this).attr('id').substr(1);
				if(param_discipline == 0) {
					new_params = removeQueryStringParameter(window.location.href, 'discipline');
				}else{
					new_params = updateQueryStringParameter(window.location.href, 'discipline', param_discipline);
				}
				f_reload_by_filter(new_params);
			});
			$('.tw-filter-sort-content .tw-filter-href').click(function(e){
				e.preventDefault();
				param_sort = $(this).text();
				if(param_sort=='orders'){
					param_sort='qty';
				}
				if(param_sort=='rating'){
					new_params = removeQueryStringParameter(window.location.href, 'sort');
				}else {
					new_params = updateQueryStringParameter(window.location.href, 'sort', param_sort);
				}
				f_reload_by_filter(new_params);
			});
			$('#onstatus').on('change', function(e){
				if($(this).is(':checked')) {
					param_online = 1;
					new_params = updateQueryStringParameter(window.location.href, 'online', param_online);
				}else {
					new_params = removeQueryStringParameter(window.location.href, 'online');
				}
				f_reload_by_filter(new_params);
			});
			function updateQueryStringParameter(uri, key, value) {
				var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
				var separator = uri.indexOf('?') !== -1 ? "&" : "?";
				if (uri.match(re)) {
					return uri.replace(re, '$1' + key + "=" + value + '$2');
				}
				else {
					return uri + separator + key + "=" + value;
				}
			};
			function removeQueryStringParameter(uri, key) {
				var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
				var separator = uri.indexOf('?') !== -1 ? "&" : "?";
				var result = uri;
				if (uri.match(re)) {
					result = uri.replace(re, separator);
				}
				if(result.indexOf('?') == -1 && result.indexOf('&') != -1) {
					result = result.replace('html&', 'html?');
				}
				return result;
			};
			function f_reload_by_filter(new_params){
				if(new_params.substr(new_params.length - 1) === '&' || new_params.substr(new_params.length - 1) === '?') {
					new_params = new_params.slice(0,-1);
				}
				window.location.href = new_params;
			};
		},
		dropdown: function (items) { // Simple dropdowns
			if (!items) {
				return false;
			}
			var tabStatus = null,
				currentTabActive = {};
				// Close tab function
				var closeTab = function (item) {
					$('.' + item.button).removeClass('js-active');
					$('.' + item.container).addClass(item.modificator);
						currentTabActive = {};
					return null;
				}
			// activeHandler (show content when 'click' on button)
			$.each(items, function (key, item) {
				$('.' + item.button).on('click', function (event) {
					tabStatus = tabStatus !== null ? closeTab(tabStatus) : null;
					if (tabStatus === null) {
						tabStatus = item;
						$('.' + item.button).addClass('js-active');
						$('.' + item.container).removeClass(item.modificator);
					}
					/*if (item.current) {
						var currentWidth = $('.' + item.current).outerWidth();
						
						$('.' + item.container).css({
							'width': currentWidth + 10
						});
					}*/
					currentTabActive = item;
					if (event.stopPropagation) {
						event.stopPropagation();
					} else {
						event.returnValue = false;
					}
				});
			});
			// Close event handler
			$(document).on('click', function (event) {
				if (tabStatus !== null) {
					tabStatus = closeTab(currentTabActive);
					if (event.stopPropagation) {
						event.stopPropagation();
					} else {
						event.returnValue = false;
					}
				}
			});
		},
		get_top_writers: function() {
			
			var topWriters = new ESTopWriters;
				
				topWriters.render(function(html, pagination, data) {
				
				var container = $('#topwiriters_container');
						container.empty();
				var contentContainer = $('<div class="tw-container" />').html(html);
						container.append(contentContainer);

				$('.award-fail').remove();
				$('#topwiriters_container').removeClass('es-loader');

			/* Awards description */
				function position_description(target) {
					$('.awards-description').removeClass('hide').css({'top': $(target).offset().top + $(target).height() + 10, 'left': $(target).offset().left - $('.awards-description').outerWidth()/2 + $(target).width()/2});
				};

				$('.tw-writer-award div').on({	
					
					mouseenter: function() {
						var target = this;

						if ($(this).hasClass('tw-tripleten')) {
							$('.tripleten-description').removeClass('hide');
								position_description(target);
							
							var award_qty = null;
							award_qty = $('.award-received').empty().append($(this).data('qty'));

						} else if ($(this).hasClass('tw-nineplus')) {

							$('.nineplus-description').removeClass('hide');
								position_description(target);
						
						} else if ($(this).hasClass('tw-punctuality')) {

							$('.punctuality-description').removeClass('hide');
								position_description(target);
						
						} else if ($(this).hasClass('tw-reliability')) {

							$('.reliability-description').removeClass('hide');
								position_description(target);

						} else if ($(this).hasClass('tw-newcomer')) {

							$('.newcomer-description').removeClass('hide');
								position_description(target);

						} else if ($(this).hasClass('tw-monthwriter')) {

							$('.monthwriter-description').removeClass('hide');
								position_description(target);

						} else if ($(this).hasClass('tw-loyalty')) {

							$('.loyalty-description').removeClass('hide');
								position_description(target);

						}

						$('.awards-description').stop().animate({opacity: '1'}, 400);
					},
					
					mouseleave: function() {

						$('.awards-description, .awards-description div').addClass('hide');
						$('.awards-description').css({opacity: '0'});
					}
				});

			// PreCallback for Our top writers
			}, function (item, i, len, data) {

				item.online_status_text = item.online_status;
				item.rating_writer = item.rating * 10;
				item.rating_number = item.rating;
				
				if (item.awards.length === 0) {
					item.tripleten = 'fail';
					item.nineplus = 'fail';
					item.punctuality = 'fail';
					item.reliability = 'fail';
					item.newcomer = 'fail';
					item.writermonth = 'fail';
					item.loyalty = 'fail';
				} else {
					item.tripleten = 'fail';
					item.nineplus = 'fail';
					item.punctuality = 'fail';
					item.reliability = 'fail';
					item.newcomer = 'fail';
					item.writermonth = 'fail';
					item.loyalty = 'fail';

					for (var i in item.awards) {
						item.tripleten_qty = item.awards[0].qty;
							
							switch (item.awards[i].slog) {
								case 'triple10':
									item.tripleten = 'tripleten';
								break;
								
								case 'nineplus':
									item.nineplus = 'nineplus';
								break;
								
								case 'punctuality_proofed':
									item.punctuality = 'punctuality';
								break;
								
								case 'reliability_proofed':
									item.reliability = 'reliability';
								break;

								case 'newcomer_of_month':
									item.newcomer = 'newcomer';
								break;

								case 'writer_of_month':
									item.writermonth = 'monthwriter';
								break;

								case 'customer_loyalty':
									item.loyalty = 'customer_loyalty';
								break;
							}
					}
				}
				return item;
			});

		},

		get_writer_profile: function() {
			
			var WriterProfile = new ESWriterProfile;

			WriterProfile.render(function (html, pagination, data) {

				if (data.error == 404) {
					$('#writer-profile').html(html).addClass('empty-box');
				} else {
					$('#writer-profile').html(html);
					$('#writer-profile-pagination').html(pagination);
					$('.wp-writers-card .wp-rating-icon-orange').css("width", data.profile.rating * 10 + "px");

					methods.set_writerInfo('profile', data.profile);

					for (var i in data.profile.orders) {
						var order = data.profile.orders[i];
						var writer = $('.wp-to-customer-rating .wp-rating-icon-orange').eq(i);
						var customer = $('.wp-customer-rating .wp-rating-icon-orange').eq(i);
						writer.css("width", order.rating_customer * 10 + "px");
						customer.css("width", order.rating_writer * 10 + "px");
						
						if(!order.writer_comment.trim()){
							$('#order-'+order.id).find('.wp-writer-feedback').addClass('hide-writer-feedback');
						}else{
							$('#order-'+order.id).find('.wp-writer-feedback').addClass('hide-writer-feedback').
							append('<span class="wp-comment-title ico-hide">Show writer’s comment</span>');
							$('#order-'+order.id).find('.wp-writer-feedback').on('click',function(){
								$(this).toggleClass('hide-writer-feedback');
								$(this).find('.ico-hide').toggleClass('ico-hide-up')
								if($(this).hasClass('hide-writer-feedback')) {
									$(this).find('.ico-hide').text('Show writer’s comment');
								}else{
									$(this).find('.ico-hide').text('Hide writer’s comment');
								}
							});
						}
						
						
					}
					$('.wp-disciplines-list li').each(function(){
						var html = $(this).html();
						$(this).html(html.replace(':', ''));
					});
					
					data.profile.awardsqty = data.profile.awards.length;
					if(parseInt(data.profile.awardsqty) === 0){
						$('.wp-awards-list').hide();
					}
					methods.request_writer();
				}

				$('#writer_profile_container').removeClass('es-loader');
			}, function (profile, data) {

				var i;
				
				for (i in data.profile.orders) {
					var item = data.profile.orders[i];

					item.statusClass = item.status.toLowerCase().split(' ')[0];
				}
				
				for (i in data.profile.orders_completed_in_disceplines) {
					var item = data.profile.orders_completed_in_disceplines[i];
					
					if(item.qty == 0){
						item.hide = true;
					}
				}
				
				return null;
			});

		},

		faq_rendering: function() {
			$.easing.def = "easeInOutBack";
				$('#faq_container p').hide();
				$('#faq_container h3').on('click', function(){
					var container = $(this).parent();
					var title = $(this);
					var content = $(this).siblings('p');
					if (container.hasClass('faq-open')) {
						content.slideUp('fast');
						container.removeClass('faq-open');
					} else {
						container.addClass('faq-open');
						content.slideDown('fast');
					}
				});
		
		},
		
		request_writer: function (id, name) {

			var addWriterToOrder = function(id, name) {
				
				$('.order-form').addClass('of-blink');
				
				setTimeout(function () {
					$('.order-form').removeClass('of-blink');
				}, 400);

				var request_element = '<dl id="writer_temp"><dt class="writer-temp-title">Writer</dt><dd id="dd_sof_writer_req"><input type="hidden" name="writer_req" id="id_writer_req" value="' + id + '" />' + name + ' <span class="cancel-request-container"><span id="cancel_request_writer"></span></span></dd></dl>';

				$(request_element).insertBefore('#dl_esof_subm');

			}

			var removeWriterFromOrder = function() {
			
				$('.cancel-request-container').on('click', function() {

					$('#writer_temp').remove();
					methods.remove_cookie('writer');
				
				});

			}

			if (id !== undefined && name !== undefined && $('#writer_temp').length === 0) {

				addWriterToOrder(id, name);

			} else {
			
				var writer_profile = methods.get_writerInfo('profile');

				// Request button click Event
				$('.wp-request-writer').on('click', function() {
					
					if (writer_profile.pen_name_slug !== id) {
						
						$('#writer_temp').remove();
						methods.remove_cookie('writer');
						addWriterToOrder(writer_profile.pen_name_slug, writer_profile.pen_name);

					}

					if ($('#writer_temp').length === 0) {
						addWriterToOrder(writer_profile.pen_name_slug, writer_profile.pen_name);
					}
					
					removeWriterFromOrder();

					var writer_info = {
						"id" : writer_profile.pen_name_slug,
						"name" : writer_profile.pen_name
					}

				// Set writer's-cookie
					writer_info = JSON.stringify(writer_info);
					methods.set_cookie('writer', writer_info);

				});

			};

			removeWriterFromOrder();
		
		},
		
		set_writerInfo: function(key, value){
			$('.layout').data(key, value);
		
		},
		
		get_writerInfo: function(key) {
			return $('.layout').data(key);
		
		},

		set_cookie: function(name, value, options) {

			options = options || {};

			var expires = options.expires;

			if (typeof expires == "number" && expires) {
				var d = new Date();
				d.setTime(d.getTime() + expires * 1000 * 60 * 60 * 24);
				expires = options.expires = d;
			}
			
			if (expires && expires.toUTCString) {
				options.expires = expires.toUTCString();
			}

			value = encodeURIComponent(value);

			var updatedCookie = name + "=" + value;

			for (var propName in options) {
			
				updatedCookie += "; " + propName;
				var propValue = options[propName];
			
				if (propValue !== true) {
					updatedCookie += "=" + propValue;
				}
			}

			document.cookie = updatedCookie;

		},

		get_cookie: function(name) {

			var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
			return matches ? decodeURIComponent(matches[1]) : undefined;

		},
	
		remove_cookie: function(name) {

			methods.set_cookie(name, "", { expires: -1 });

		},

		getPageContent: function(container, content) {
			
			var contentAjaxCallback = function() {
				
				if (content === 'content_faq_for_customers') {
					$('#faq_container').pew_base('faq_rendering');
				}
				
				$('#' + container).removeClass('es-loader');

			}

			var es_vars = new ESVars();

				es_vars.ajax_complete_function = contentAjaxCallback;
			
				es_vars.populate(container, content, 'html');
		
		},

		footer_tabs: function(type) {
			
			$('.tab-title').on('click', function(){
			
				if( !$(this).parents('.tabs-title-item').hasClass('active') ) {
			
					var href = $(this).attr('href');
					
					$(this).parents('.footer-tabs').find('.tabs-content .tab-pane').hide();
					$(this).parents('.footer-tabs').find('.tabs-content .tab-pane' + href).show();
					
					$(this).parents('.footer-tabs').find('.footer-tabs-container .tabs-title-item').removeClass('active');
					$(this).parents('.tabs-title-item').addClass('active');
				}

			});

		},

		doctor: function(from) {
			
			var leftPanelHeight = $('.left-panel').height(),
				rightPanelHeight = $('.right-panel').height(),
				panelHeight;
			
			if (leftPanelHeight - rightPanelHeight < 370) {

				panelHeight = rightPanelHeight + 325;

			} else {

				panelHeight = leftPanelHeight;

			}

			$('.right-panel').height(panelHeight);
			$('.professor-bottom').show();

		},

		show_like: function () {
			var container = $(this);

		},
		click_link_my_account: function() { 
			if($('#id_esauth_myaccount_current_login').size() > 0) {/*logged already*/
				window.location = "/customer/profile/";
			}else {
				$('#id_esauth_myaccount_login_link').trigger('click');
			}
		},
		faq_show_hide: function() {
				function f_timeout_hide(obj){
						setTimeout(function() {
							obj.parents('li').find('p').hide();
							obj.parents('li').find('p ~ ul').hide();
						}, 300);
					};
					$('#faq_container h3').on('click',function(){
							if($(this).parents('li').hasClass('faq-show')) {
								$(this).parents('li').removeClass('faq-show');
								$(this).parents('li').find('p').css('right','-10000px');
								$(this).parents('li').find('p ~ ul').css('right','-10000px');
								f_timeout_hide($(this));
								
							}else {
								$(this).parents('li').addClass('faq-show');
								$(this).parents('li').find('p').slideDown(100).css('right',0);
								$(this).parents('li').find('p ~ ul').slideDown(100).css('right',0);
							}
							
					});
		},
		checkActiveMessages: function() {
			$.getJSON('/customer/messages/new.html', function (data) {
				if (data != undefined && !data.error_slug) {
					if (data.order_bidding.length != 0 || data.order_progress.length != 0) {
						//console.log('Has active message');
						$('#es-indicator .message_order').addClass('active-message');
					} else {
						//console.log('Hasn\'t active messages');
						$('#es-indicator .message_order').removeClass('active-message');
					}
				}
			});
		},
		ajax_finish: function () {
				if(typeof checkActiveMessages == 'function')
				{
					checkActiveMessages(true, false);
				}
		}

	}

	$.fn.pew_base = function(method){
		if (methods[method]) {

			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));

		} else if (typeof method === 'object' || ! method) {

			return methods.init.apply(this, arguments);

		} else {

			$.error('Method ' + method + ' doesn\'t exist in Proessaywritings');

		}
	};

	// All ajax finished
	$(document).on('ajaxStop', function() {
		f_tw_no_filter();
		$('#id_esauth_myaccount_current_logout_link').parents('#proessaywritings_auth_container').addClass('signout');
	});
	
	$(window).scroll(function(){
		$('.section.why-us,.section.activity,.aid-item').viewportChecker({
			classToAdd: 'visible',
			offset: 100,
			repeat: false, 
			callbackFunction: function(elem, action){
				if(elem.hasClass('activity')){
					methods.get_activity(elem);
				} else if(elem.hasClass('aid-item')){
					$(elem).prev().addClass('prev-visible');
				}
			}, 
			scrollHorizontal: false
		});
		if($(window).scrollTop() > 33){
			$('.wrapper').addClass('menu-fixed');
		} else {
			$('.wrapper').removeClass('menu-fixed');
		}
	});

})(jQuery);

(function($){
	$.fn.viewportChecker = function(useroptions){
		var options = {
			classToAdd: 'visible',
			offset: 100,
			repeat: false,
			callbackFunction: function(elem, action){}
		};
		$.extend(options, useroptions);
		var $elem = this,
			windowHeight = $(window).height(),
			scrollElem = ((navigator.userAgent.toLowerCase().indexOf('webkit') != -1) ? 'body' : 'html');

		this.checkElements = function(){
			var viewportTop = $(scrollElem).scrollTop(),
				viewportBottom = (viewportTop + windowHeight);
			$elem.each(function(){
				var $obj = $(this);
				if ($obj.hasClass(options.classToAdd) && !options.repeat){
					return;
				}
				var elemTop = Math.round( $obj.offset().top ) + options.offset,
					elemBottom = elemTop + ($obj.height());
				if ((elemTop < viewportBottom) && (elemBottom > viewportTop)){
					$obj.addClass(options.classToAdd);
					options.callbackFunction($obj, "add");
				} else if ($obj.hasClass(options.classToAdd) && (options.repeat)){
					$obj.removeClass(options.classToAdd);
					options.callbackFunction($obj, "remove");
				}
			});
		};
		$(window).bind("load scroll touchmove", this.checkElements);
		$(window).resize(function(e){
			windowHeight = e.currentTarget.innerHeight;
		});
		return this;
	};
})(jQuery);
function f_tw_no_filter(){
	//--no-filter TW -result  ---<div class="tw-no-writers">---
	var str_co = "",
		str_disc = "",
		str_online = "";
	if($.urlParam('reviews_qty')!=null){
		str_co = ' with more than <b>' + $.urlParam('reviews_qty') + ' completed orders</b>';
	}
	if($.urlParam('discipline')!=null){
		str_disc = ' in <b>' + $('#d' + $.urlParam('discipline')).text() + '</b> discipline';
	}
	if($.urlParam('online')!=null){
		str_online = ' <b>online</b>';
	}
	if($('#topwiriters_container .tw-container > div').size() == 0) {
		$('.tw-filter ~ .list-header').hide();
		$('#topwiriters_container .tw-container').append('<div class="tw-no-writers"><p class="font-14 grid-small-bot">There are no available writers' + str_co + str_disc + str_online +'.</p><p class="font-14">Try changing the number of completed orders or the discipline.</p></div>');
	}else {
		$('#topwiriters_container .tw-no-writers').remove();
		$('.tw-filter ~ .list-header').show();
	}
};
$.urlParam = function(name){
	var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
	if (results==null){
		return null;
	}
	else{
		return results[1] || 0;
	}
};

// scrollToOrderForm with animation
	jQuery(document).on('click','a.order-btn', function() {
		var target = jQuery('#es_form_esof').offset().top - 20;

		jQuery('body,html').animate({
			scrollTop: target}, 600, function(){
				jQuery('#id_esof_email').focus();
			});
		return false;
	});