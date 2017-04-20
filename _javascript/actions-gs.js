$(document).ready(function(){
	var body = $("body"),
		win = $(window),
		head = $(".main-prod-display"),
		hGal = $(".main-prod-display .image-cont"),
		hSlide = head.find(".slider"),
		hPosY = head.position().top,
		hHeight = head.height(),
		wH = window.innerHeight,
		wScroll = win.scrollTop(),
		bHeight = body.height(),
		prodColor = $(".products li.color"),
		cCont = $(".content-cont"),
		cont = $(".image-grid"),
		logo = $("#Logo"),
		cHeight = cont.height(),
		gallery = $(".gallery"),
		cPosY = cCont.position().top,
		fCont = $(".footer-content"),
		fHeight = fCont.height(),
		fPosY = fCont.position().top,
		prevColor = $(".products li.prev-color"),
		products = $(".products"),
		product = $("li.product"),
		pBound = products[0].getBoundingClientRect(),
		pHeight = products.height() * (product.length),
		trig = false,
		tl = new TimelineLite(),
		yPos = $(product[0]).find('.gallery').css("transform").split(',')[5],
		yPos = yPos.replace(")", ""),
		explode = $(".explode"),
		fBttn = $(".feat-point");


		// force height to include height of extra absolute positioned products
		body.css('height',  (hHeight * hGal.length) + cHeight + fHeight + pHeight);

		fBttn.on('click', function(){
			var dPt = $(this).data("feat"),
				data = $("[data-point=" + dPt + "]"),
				p = $(data).find("p"),
				aS = data.hasClass("visible") == false ? "+=" : "-=";

				tl.insert(TweenLite.set(data, {className: aS + "visible"}));
				setTimeout(function(){
						tl.insert(TweenLite.set(p, {className: aS + "visible"}));
				}, 250);
		});

		win.on('load', function(){
			cont.scrollTop(10000);
		});

		win.on('scroll', function(){
			wScroll = win.scrollTop(),
			pBound = products[0].getBoundingClientRect();

			if (wScroll >= hPosY && wScroll < (hPosY + hHeight)) {

				var nextPos = (wH + hPosY + head.height() * (x + 1)),
					curPos = (wH + hPosY + head.height() * (x)),
					prevPos = (wH + hPosY + (head.height() * (x - 1))),
					pxScroll = head.height() * hGal.length,
					iInc = (head.height()/hGal.length);

					head.css({
						'position': 'fixed',
						'z-index': 100,
						'top': 0,
						'left': 0
					});

					for (var z = 0; z < hGal.length; z++) {

						var image = $(hGal[z]),
							data = image.find(".feat"),
							pPerD = data.length != 0 ? iInc/data.length : false;

							// multiple by per to see if traveled far enough
							if (wScroll >= ((iInc * z))) {
								var cImg = $(hGal[z]),
									dlen = cImg.find('.feat').length;
									$(hGal[z - 1]).css("display", "none");
									cImg.css("display", "flex");

									// for data points activation on scroll

									if (dlen > 0) {
										var c = cImg;
										var q = 0,
											interval = setInterval(function(){
												var c = cImg;
								   				if(q === dlen){
								   				    clearInterval(interval);
								   				}
								   				q++;
								   				$(c).find(".feat:nth-of-type(" + q + ")").addClass("visible");
								   				$(c).find(".feat:nth-of-type(" + q + ") p").addClass("visible");
											}, 150);
									}


								if (z == 2) {
									tl.to(hSlide, .3, {y: "-100%"});
									tl.set(logo, {opacity: "0"});
								}
							} else if (wScroll < ((iInc * z))) {
								$(hGal[z]).css("display", "none");
							}


					} // end for loop

			} else if (wScroll >= cPosY) {
				cCont.css({
					'position': 'fixed',
					'z-index': 100,
					'top': 0,
					'left': 0
				});

				// do animations based on scroll position
				for (var x = 0; x < product.length; x++) {

					// var nextPos = (wH + cPosY + products.height() * (x + 1)),
					// 	curPos = (wH + cPosY + products.height() * (x)),
					// 	prevPos = (wH + cPosY + (products.height() * (x - 1))),
					// 	pxScroll = (nextPos - curPos),
					// 	per = (curPos - wScroll) / (nextPos - curPos);
					// 	nProd = $(product[x + 1]),
					// 	col3 = $(product[x]).find('.col-3'),
					// 	col9 = $(product[x]).find('.col-9'),
					// 	nCol9 = $(product[x + 1]).find('.col-9'),
					// 	nCol3 = $(product[x + 1]).find('.col-3'),
					// 	images = $(product[x]).find('.gallery li'),
					// 	iInc = (pxScroll/images.length),
					// 	lastProd = false,
					// 	lastImg = false;

					// 	if (wScroll >= ((cPosY + products.height() * x)) && wScroll < ((cPosY + products.height() * (x + 1)))) {
	
					// 	} else if (wScroll >= ((cPosY + products.height() * (x + 1)))) {
					// 		lastProd = (x == product.length -1) ? true : false;

					// 		if (lastProd == false) {
					// 			tl.to(col9, .5, {x: "200%"}, 0)
					// 			   .to(col3, .5, {x: "-200%"}, 0)
					// 			   .set(product[x], {display: "none"})
					// 			   .set(nProd, {opacity: 1, className: "+=active"})
					// 			   .set(nCol3, {display: "block"})
					// 			   .set(nCol3, {y: "0", opacity: "1"})
					// 			   .set(nCol9, {y: "0", opacity: "1"});
					// 		} else if (lastProd == true) {
					// 			console.log('last product');
					// 		}
		
					// 	}
				}// end for loop
			}
			else if (wScroll < cPosY) {

				var per = 1 - (pBound.top/cPosY);
				cCont.css({
					'position': 'relative',
					'z-index': 1
				});
				// tl.set($(".product:first-of-type").find(".gallery"), {opacity: per, y: (yPos - (yPos * per)) });

			}

		});

});