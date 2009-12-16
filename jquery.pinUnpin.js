
////////////////////////////////INFO////////////////////////////////////////
// This library was created by Kim Doberstein

// Version 1.0
// Date: 12-16-2009
//
// This jQuery-based plug-in allow for an object to be easily pinned and unpinned at the top of the screen

// NOTE: These functions require the jQuery library.  It was created using version 1.3.2
// You can downloaded jQuery at: http://jquery.com/
////////////////////////////////////////////////////////////////////////////



jQuery(document).ready(function(){jQuery('.pinnable').pinUnPin();});

jQuery.fn.pinUnPin = function(){
	

	/*************** VARS ******************/
	var pinLinkText="pin to top page";
	var unpinLinkText="remove pin";
	var fadeInSpeed="normal";
	var fadeOutSpeed="normal";
	var headerSpace=15; //space between the top of the browser window and first "pinned item"
	var spacerSpace=5;  //space between pinned items
	var additionalPinnedCSS={'border-top':'2px solid #333','border-bottom':'2px solid #333'};
	var additionalUnPinnedCSS={'border-top':'','border-bottom':''};
	
	

	/*******************************************/
	/* NOTE: if you change any of these values  - you must change the corresponding class name the css */
	var pinLinkClass='pinLink'; 
	var unpinLinkClass="unpinLink";	
	var pinnedClass='currentlyPinned';
	
	
	/******************************************/
	return this.each(function(){
		
		/************** ATTACH PIN/UNPIN LINK ***************/
		jQuery(this).css('position','relative'); //This is needed to position the pin/unpin link
		var html="<a href='javascript:void(0)' class='"+pinLinkClass+"' title='"+pinLinkText+"'><span>"+pinLinkText+"</span></a>";
		
		jQuery(this).append(html);
		var jQueryparentDiv=jQuery(this);
		jQuery(this).find('.'+pinLinkClass+':first').click(function(){
															   
			var jQuerypinLinkObj=jQuery(this);
			
			
			/**************** ITEM IS ALREADY PINNED - PUT BACK **************/
			if(jQueryparentDiv.hasClass(pinnedClass)){
			
				jQueryparentDiv.fadeOut(fadeOutSpeed,function(){
					jQueryparentDiv.css({"position":"relative","top":""}).removeClass(pinnedClass).css(additionalUnPinnedCSS);
					jQuerypinLinkObj.attr('title',pinLinkText).addClass(pinLinkClass).removeClass(unpinLinkClass).find('span:first').text(pinLinkText);
					jQueryparentDiv.fadeIn(fadeInSpeed);
					
					//Now need to reposition the existing pinned items
					//Returned in the order in the DOM - not necessary in order displayed
					//So each need to be thrown into an array and then ordered by top
					
					var pinnedArray=new Array();
					
					jQuery('.'+pinnedClass).each(function(){ pinnedArray[parseInt(jQuery(this).css('top'))]=jQuery(this);});
					
					var topVal=headerSpace;
					for(var top in pinnedArray){
						jQuerycurrentDiv=pinnedArray[top];
						jQuerycurrentDiv.css({'position':'fixed','top':topVal+'px'});
						topVal+=jQuerycurrentDiv.outerHeight()+spacerSpace;
					}						   
				
				});
				
				
			}
			
			/**************** ITEM IS NOT PINNED - PUT AT TOP OF PAGE **************/
			else{
				// calculate top value - will be placed at the bottom of the list
				var topVal=headerSpace;
				jQuery('.'+pinnedClass).each(function(){topVal+=jQuery(this).outerHeight()+spacerSpace;});
				
				
				// Position item
				jQueryparentDiv.fadeOut(fadeOutSpeed,function(){
					jQuerypinLinkObj.attr('title',unpinLinkText).removeClass(pinLinkClass).addClass(unpinLinkClass).find('span:first').text(unpinLinkText);
					jQuery(this).css({'position':'fixed','top':topVal+'px'}).addClass(pinnedClass).css(additionalPinnedCSS).fadeIn(fadeInSpeed);								   
												   
				});
			}									   
															   
															   
		});
	
	});
	
};