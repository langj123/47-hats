$(document).ready(function(){
	var scenes = [],
		activeScenes = [],
		tweens1 = [],
		mainNav = $("body > header:first-of-type"),
		header = $("#MainHeader"),
		hImg = $("#MainHeader .image-cont"),
		images = [],
		hImgH = hImg.height() * hImg.length,
		hSlide = header.find(".slider"),
		gal = $("#GalleryImgs"),
		gH = gal.height(),
		// TweenMax can tween any property of any object. We use this object to cycle through the array
		obj = {curImg: 0},
		prod = {curProd: 0, it: 0, mouse: $(window).scrollTop()},
		sweats = {curProd: 0, it: 0, mouse: $(window).scrollTop()},
		timeout = 50,
		resizetimeout = null,
		isMobile = (function(a){return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ipad|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);


		hImg.each(function(index){
			images.push($(this).find("img").attr("src"));
		});


	if (isMobile == false) {
		var controller = new ScrollMagic.Controller({refreshInterval: 1});
		// 360 degree animation in header
		tweens1.push(TweenMax.to(obj, 0.5,
			{
				curImg: images.length - 1,	// animate propery curImg to number of images
				roundProps: "curImg",				// only integers so it can be used as an array index
				repeat: 0,									// repeat 0 times
				immediateRender: true,			// load first image automatically
				ease: Linear.easeNone,			// show every image the same ammount of time
				onUpdate: function () {
				  var view1 = $("#MainHeader .view-1");
				  	  view1.find("img").attr("src", images[obj.curImg]); // set the image source

				  	  view1.data("current", obj.curImg + 1);
				  	  view1.attr("data-current", obj.curImg + 1);

				  	  var data = $(".view-" + (obj.curImg + 1)).find(".feat-cont");

				  	  if (data.length > 0) {
				  	  	var dClone = $(data).clone(true);
				  	  	// do animations for feature points
				  	  	if (view1.find(".feat-cont").length == 0) {
				  	  		dClone.appendTo(view1);
				  	  	}
				  	  } else {
				  	  	var d = view1.find(".feat-cont");
				  	  		d.remove();
				  	  }
				}
			}
		));
		tweens1.push(TweenMax.staggerFromTo(header, .3, {"background-position": "0 0"}, {"background-position": "100% 100%"}));

		// insert scene 1
		scenes.push( function(){
			return new ScrollMagic.Scene({
  				triggerElement: "#MainHeader",
  				offset: gH/2,
  				duration: function(){
  					return (gH * hImg.length)/4;
  				}
  			})
			.setTween(tweens1)
			.setPin("#MainHeader")
			.addTo(controller);
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
		// do stuff of mobile
		var headGal = $("#GalleryImgs");
		TweenMax.set(mainNav, {y: -mainNav.outerHeight()});
		// set header to
		headGal.flexslider({
      			   	animation: "fade",
      			 	selector: ".image-cont",
      			 	controlNav: false,
      			 	directionNav: false,
      			 	slideshow: true,
      			 	itemWidth: "100%",
      			 	animationSpeed: 1,
      			 	slideshowSpeed: 100,
      			 	pauseOnAction: true,
      			 	touch: true,
      			 	start: function(slider) {
      			 		// don't want to see data points on initial animation
      			 		slider.addClass("hide-data");
      			 	},
      			 	after: function(slider) {
      			 		if ((slider.currentSlide + 1) == slider.count) {
                 			slider.pause();
                 			slider.removeClass("hide-data");
                 			TweenMax.to(mainNav, .3, {y: 0});
            			}
      			 	}
      			});
	}

	$(window).on("scroll", function(){
			var wTop = $(window).scrollTop(),
				mainH = mainNav.outerHeight();

				if (wTop > mainH && isMobile == false) {
					mainNav.css({"position": "relative"});
					secNav.css({"top": 0});
				} else if (wTop <= mainH && isMobile == false) {
					mainNav.css({"position": "fixed"});
					secNav.css({"top": mainNav.outerHeight()});
				} else if (wTop > mainH && isMobile == true) {
					TweenMax.to(mainNav, .3, {y: -mainNav.outerHeight()});
				} else if (wTop <= mainH && isMobile == true) {
					TweenMax.to(mainNav, .3, {y: 0});
				}
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




});