$(document).ready(function(){
	var win = $(window),
		wHeight = window.innerHeight,
		sPos = win.scrollTop(),
		iGrid = document.getElementsByClassName('image-grid'),
		tl = new TimelineLite(),
		colCont = [];

		function imgObj(elem) {
			this.cols = elem.querySelectorAll('[class*=col-');
			this.curElem = elem;
		}

		imgObj.prototype.ranNums = [];
		imgObj.prototype.winHeight = wHeight;
		imgObj.prototype.ranNumFunc = function(){
			var array = [];
			for (var z = 0; z < this.cols.length; z++) {
				array.push(Math.random() * .1);
			}
			this.ranNums.push(array);

		};
		imgObj.prototype.parTop = function(){
			return this.curElem.getBoundingClientRect().top - wHeight;
		};
		imgObj.prototype.sTop = function(){
			return this.curElem.offsetTop;
		};
		imgObj.prototype.parBttm = function(){
			return this.curElem.getBoundingClientRect().bottom;
		};

		imgObj.prototype.init = function() {
			this.ranNumFunc();
			this.parTop();
			this.parBttm();
		}

		for (var i = 0; i < iGrid.length; i++) {
			var obj = new imgObj(iGrid[i]);
				colCont.push(obj);
				obj.init();
		}

		win.on('resize', function(){
			wHeight = window.innerHeight;
			for (var x = 0; x < colCont.length; x++) {
				colCont[x].parTop();
				colCont[x].parBttm();
			}
		});

		win.on('scroll', function(event){
			var oScroll = sPos,
				sPos = win.scrollTop(),
				it = 0,
				tB = new TimelineLite();
				tl.add(tB);

				for (var x = 0; x < colCont.length; x++) {
					var top = colCont[x].parTop(),
						oTop = colCont[x].sTop(),
						bottom = colCont[x].parBttm(),
						aDivS = (sPos - (oTop - wHeight));
						// trigger when in view
						if (top <= 0 && bottom > 0) {

							for (var z = 0; z < colCont[x].cols.length; z++) {
								var col = colCont[x].cols[z];

									for (var q = 0; q < colCont[x].ranNums[z].length; q++) {
										var ranNum = colCont[x].ranNums[z][q],
											borders = colCont[x].curElem.getElementsByClassName('border-cont');

											tl.set(col, {y: (-aDivS * ranNum)});

											// if absolute value of top equals bottom
											if (Math.abs(top) >= bottom && borders.length > 0) {
												// trigger border animations, if they exist

												for (var b = 0; b < borders.length; b++) {
													bTop = borders[b].getElementsByClassName('border-top')[0],
													bRight = borders[b].getElementsByClassName('border-right')[0],
													bBttm = borders[b].getElementsByClassName('border-bottom')[0],
													bLeft = borders[b].getElementsByClassName('border-left')[0];

													// tB.to(bTop, .3, {width: "100%"});
													// tB.to(bRight, .3, {height: "100%"});
													// tB.to(bBttm, .3, {width: "100%"});
													// tB.to(bLeft, .3, {height: "100%"});
												}
											}

									} // end for

							} // end for
						} // end if
				} // end for
		});
});