$(document).ready(function(){var t=$(".products li.product"),o=$(".products"),a=!1,e=new TimelineLite;$("html").bind("mousewheel DOMMouseScroll",function(i){var l=i.originalEvent.wheelDelta||-i.originalEvent.detail,r=i.originalEvent.wheelDeltaY||-i.originalEvent.detail,c=t.filter(".active").first().length>0?t.filter(".active").first():t.first(),n=t.filter(".active").first().next(),s=t.filter(".active").first().length>0?t.filter(".active").first().prev():t.last(),f=c.data("color"),v=c.prev().data("color"),d=c.next().data("color");if(r<=-9&&0==a&&t.last().hasClass("active")===!1){var p=c.find(".col-3"),m=c.find(".col-9");a=!0,e.to(p,.4,{y:"-1000%"}),e.to(m,.15,{opacity:0}),e.to(c,.05,{className:"-=active",onComplete:function(){a=!1,o.attr("data-color",d),e.to(n,.05,{className:"+=active"})}})}else if(r>=9&&0==a&&t.first().hasClass("active")===!1){var p=s.find(".col-3"),m=s.find(".col-9");a=!0,prevColor.attr("data-color",f),e.to(m,.15,{opacity:0}),e.to(c,.05,{className:"-=active"}),e.to(s,.05,{className:"+=active"}),e.to(prodColor,.3,{opacity:0,onComplete:function(){prodColor.attr("data-color",v),e.to(prodColor,.2,{opacity:1})}}),e.to(p,.4,{y:"0%",onComplete:function(){a=!1,e.to(m,.15,{opacity:1})}})}})});