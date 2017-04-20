$(document).ready(function(){
	var products = $('.products li.product'),
		prodCont = $('.products'),
		trig = false,
		tl = new TimelineLite();

	$('html').bind('mousewheel DOMMouseScroll', function (e) {
    	var delta = (e.originalEvent.wheelDelta || -e.originalEvent.detail),
    		deltaY = (e.originalEvent.wheelDeltaY || -e.originalEvent.detail),
    		product = products.filter('.active').first().length > 0 ? products.filter('.active').first() : products.first(),
    		nexProd = products.filter('.active').first().next(),
    		prevProd = products.filter('.active').first().length > 0 ? products.filter('.active').first().prev() : products.last(),
    		cColor = product.data('color'),
    		pColor = product.prev().data('color'),
    		dColor = product.next().data('color');

	    	if (deltaY <= -9 && trig == false && products.last().hasClass('active') === false) { // for down scrolling
	    		var cont = product.find('.col-3'),
	    			contImg = product.find('.col-9');
	    			trig = true;

	    			tl.to(cont, .4,{y: "-1000%"});
	    			tl.to(contImg, .15, {opacity: 0});
	    			tl.to(product, .05, {className: "-=active", onComplete: function(){
	    				trig = false;
	    				prodCont.attr('data-color', dColor);
	    				tl.to(nexProd, .05, {className: "+=active"});
	    			}});

	    	} else if (deltaY >= 9 && trig == false && products.first().hasClass('active') === false) { // for up scrolling

	    		var cont = prevProd.find('.col-3'),
	    			contImg = prevProd.find('.col-9');
	    			trig = true;
	    			prevColor.attr('data-color', cColor);

	    			tl.to(contImg, .15, {opacity: 0});
	    			tl.to(product, .05, {className: "-=active"});
	    			tl.to(prevProd, .05, {className: "+=active"});
	    			tl.to(prodColor, .3, {opacity: 0, onComplete: function(){
	    				prodColor.attr('data-color', pColor);
	    				tl.to(prodColor, .2, {opacity: 1});
	    			}});
	    			tl.to(cont, .4,{y: "0%", onComplete: function(){
	    				trig = false;
	    				tl.to(contImg, .15, {opacity: 1});
	    			}});

    		}
	});
});







