/*! 
 * Copyright (c) 2010 Scott Murphy @hellocreation (http://scott-murphy.net)
 * 
 * jQuery quickClear plugin
 * Version 1.0 (Aug 2010)
 * @requires jQuery v1.2.3 or later
 *
 * Licensed under the MIT License
 */
(function($){
	$.fn.quickClear = function(options) {

		var defaults = {
			clearImg : "<img src=\"clear.png\" />",
			container: "<span class=\"clearBtnContainer\"></span>",
			padding : 5
		};
	
		var options = $.extend(defaults, options);

		return this.each(function() {	

			var textField = $(this); 
			var clearButton = $(options.clearImg);
			var container = $(options.container);
			var clicked = false;  //flag when button is pressed, prevent blur from firing.
			
			init();

			function init() {
				createClearButton();		
				textField.bind({
					  focus: function() {
							showClearButton();
					  },
					  focusout: function() {
						    if (clicked) { 
								return clicked = false;
							} else {
								removeClearButton();
							};
					  },
				});
				clearButton.bind({
						mousedown: function() {
							clicked = true; 
							clearValue();
							//setTimeOut to allow focus event to fire after the blur event
							setTimeout(function() { textField.focus();}, 0);  	
						},
						
				});
				textField.parent("span").bind({
						mouseover: function() {
							showClearButton();
						},
						mouseout: function() {
							removeClearButton();	
						}
				});
			}
					
			function createClearButton() {
				textField.wrap(container).after(clearButton);
				clearButton.hide().addClass('clearButton');
				
				//adjust width of input field based on image size
				var clearBtnWidth = clearButton.outerWidth();
				textField.css('padding-right', clearBtnWidth + options.padding);
      			textField.width(textField.width() - clearBtnWidth - options.padding);
			}
			
			function showClearButton() { clearButton.show(); }
			function removeClearButton() {  clearButton.hide(); }
			function clearValue() { textField.val(""); }
			
		});
	};

	init();
})(jQuery);