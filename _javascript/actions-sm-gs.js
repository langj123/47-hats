$(document).ready(function(){

	var scenes = [],
		activeScenes = [],
		tweens2 = [],
		tweens3 = [],
		tweens4 = [],
		tweens5 = [],
		tweens6 = [],
		mainNav = $("body > header:first-of-type"),
		secNav = $("nav.sub-nav"),
		header = $("#MainHeader"),
		hImg = $("#MainHeader .image-cont"),
		images = [],
		hImgH = hImg.height() * hImg.length,
		cols1 = $("#ImgGrid1 [class*=col-]"),
		cols2 = $("#ImgGrid2 [class*=col-]"),
		cols3 = $("#ImgGrid3 [class*=col-]"),
		hSlide = header.find(".slider"),
		prods = $(".product"),
		logo = $("#Logo"),
		altSlide = $("#Slider .slider"),
		slide360 = $("#Slider2 .slider"),
		// TweenMax can tween any property of any object. We use this object to cycle through the array
		timeout = 50,
		resizetimeout = null,
		cA = $(".click-activate"),
		isMobile = (function(a){return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ipad|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);

		// generate menus & clickpoints for subproducts
		prods.each(function(index){

			var totP = $(this).find(".sub-product");

			if (totP.length > 1) {
      			$(this).flexslider({
      			   animation: "slide",
      			 	selector: ".prod-cont > .sub-product",
      			 	controlNav: true,
      			 	slideshow: false,
      			 	itemWidth: "100%"
      			});
      		}
		});

		altSlide.each(function(index) {
			var totLi = $(this).find("li");

			if (totLi.length > 1) {
      			$(this).flexslider({
      			   	animation: "fade",
      			 	selector: "li",
      			 	controlNav: true,
      			 	slideshow: true,
      			 	itemWidth: "100%"
      			});
      		}
		});
		// 360 slider
		slide360.each(function(index) {
			var totLi = $(this).find("li"),
				par = $(this),
				s = $(this).data("slider"),
				rD = $('.slide-text').data("r-slider", s);

			if (totLi.length > 1) {
      			$(this).flexslider({
      			   	animation: "fade",
      			 	selector: "li",
      			 	controlNav: false,
      			 	directionNav: false,
      			 	slideshow: false,
      			 	itemWidth: "100%",
      			 	animationSpeed: 0,
      			 	mousewheel: true,
      			 	animationLoop: true,
      			 	before: function(slider){
      			 		slider.pause();
      			 		var desc = par.find(".flex-active-slide .desc"),
      			 			fill = rD.find(".dropshadow");
      			 		if (!par.hasClass("active")){
      			 			par.addClass("active");
      			 		}
      			 		if (desc.length > 0) {
      			 			//swap stuff
      			 			var	copy = desc.clone(true);
      			 				fill.html(copy);
      			 		}
      			 	}
      			});
      		}
		});

		hImg.each(function(index){
			images.push($(this).find("img").attr("src"));
		});


	if (isMobile == false) {
		var controller = new ScrollMagic.Controller({refreshInterval: 1});
		// 360 degree animation in header

		// lifestyle photos
		for (var x = 0; x < cols1.length; x++) {
			var	borders = $(cols1[x]).find(".border-cont [class*=border-]").length != 0 ? $(cols1[x]).find(".border-cont [class*=border-]") : false,
				floaty = $(cols1[x]).data("scroll");

				tweens2.push(TweenMax.staggerFromTo($(cols1[x]), 3, {y: 0}, {y: -floaty, ease: Back.easeOut}, .1));

				if (borders != false) {
					for (var z = 0; z < borders.length; z++) {
						if (z%2 == 0) {
							tweens2.push(TweenMax.staggerFromTo($(borders[z]), 3, {width: 0}, {width: "100%"}));
						} else {
							tweens2.push(TweenMax.staggerFromTo($(borders[z]), 3, {height: 0}, {height: "100%"}));
						}
					}
				}
		}

		for (var x = 0; x < cols2.length; x++) {
			var	borders = $(cols2[x]).find(".border-cont [class*=border-]").length != 0 ? $(cols2[x]).find(".border-cont [class*=border-]") : false,
				floaty = $(cols2[x]).data("scroll");

				tweens4.push(TweenMax.staggerFromTo($(cols2[x]), 3, {y: 0}, {y: -floaty, ease: Back.easeOut}, .1));
				if (borders != false) {
					for (var z = 0; z < borders.length; z++) {
						if (z%2 == 0) {
							tweens4.push(TweenMax.staggerFromTo($(borders[z]), 3, {width: 0}, {width: "100%"}));
						} else {
							tweens4.push(TweenMax.staggerFromTo($(borders[z]), 3, {height: 0}, {height: "100%"}));
						}
					}
				}

		}

		for (var x = 0; x < cols3.length; x++) {
			var	borders = $(cols3[x]).find(".border-cont [class*=border-]").length != 0 ? $(cols3[x]).find(".border-cont [class*=border-]") : false,
				floaty = $(cols3[x]).data("scroll");

				tweens6.push(TweenMax.staggerFromTo($(cols3[x]), 3, {y: 0}, {y: -floaty, ease: Back.easeOut}, .1));
				if (borders != false) {
					for (var z = 0; z < borders.length; z++) {
						if (z%2 == 0) {
							tweens6.push(TweenMax.staggerFromTo($(borders[z]), 3, {width: 0}, {width: "100%"}));
						} else {
							tweens6.push(TweenMax.staggerFromTo($(borders[z]), 3, {height: 0}, {height: "100%"}));
						}
					}
				}

		}

		// insert scene 2
		scenes.push( function(){
			if (isMobile == false) {
				return new ScrollMagic.Scene({
  					triggerElement: "#ImgGrid1",
  					duration: function(){
  						return $('#ImgGrid1').outerHeight()/1.75;
  					}
  				})
				.setTween(tweens2)
				.addTo(controller);
			}
		});

		// insert scene 4
		scenes.push( function(){
			if (isMobile == false) {
				return new ScrollMagic.Scene({
  					triggerElement: "#ImgGrid2",
  					duration: function() {
  						return $("#ImgGrid2").outerHeight();
  					}
  				})
				.setTween(tweens4)
				.addTo(controller);
			}
		});
		// insert scene 6
		scenes.push( function(){
			if (isMobile == false) {
				return new ScrollMagic.Scene({
  					triggerElement: "#ImgGrid3",
  					duration: function() {
  						return $("#ImgGrid3").outerHeight()/1.75;
  					}
  				})
				.setTween(tweens6)
				.addTo(controller);
			}
		});

		addScenes(scenes);

		// window resize, these will affect the tweens for calculating widths, and height
		$(window).on("resize", function(){
			if (resizetimeout) {
    			clearTimeout(resizetimeout);
  			}
  			resizetimeout = setTimeout(function() {
  				activeScenes.forEach(function(scene, index) {
  					if (scene) {
  						scene.destroy(true);
  					}
  				});
  				addScenes(scenes);
  			}, timeout);
		});

	}// end of mobile check
	else if (isMobile == true) {
		
	}

	var uD = 0;

	$(window).on("scroll", function(){
			var wTop = $(window).scrollTop(),
					mainH = mainNav.outerHeight();

					if (wTop > mainH && isMobile == false) {
						mainNav.css({"position": "relative"});
						mainNav.css({"top": -mainNav.outerHeight()});
						secNav.css({"top": 0});
					} else if (wTop <= mainH && isMobile == false) {
						mainNav.css({"position": "fixed"});
						mainNav.css({"top": 0});
						secNav.css({"top": mainNav.outerHeight()});
					} else if (wTop > mainH && isMobile == true) {
						TweenMax.to(mainNav, .3, {y: -mainNav.outerHeight()});
					} else if (wTop <= mainH && isMobile == true) {
						TweenMax.to(mainNav, .3, {y: 0});
					}

					uD = wTop;

	});

	cA.on("click", function() {
		var gal = $(this).prev(".slider");
		$(this).css("display", "none");
		gal.addClass("active");
	});

  	function addScenes(newScenes) {
  		// reset active scenes
  		activeScenes = [];
  		// loop over each scene and add/re-add
  		newScenes.forEach(function (newScene, index) {

  		if (typeof newScene === 'function') {
  		 	// add the new scene
  		 	var newScene = newScene();
  		 	// push it to our active scenes array
  		 	activeScenes.push(newScene);
  		}
  	});
	} // end of addScenes

	 $('a[href*=\\#]:not([href=\\#])').click(function() {
	    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
	      var target = $(this.hash);
	      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
	      if (target.length) {
	        $('html,body').animate({
	          scrollTop: target.offset().top - 100
	        }, 1000);
	        return false;
	      }
	    }
	 });

});