jQuery(document).ready(function($) {
  						
/*-----------------------------------------------------------------------------------*/
/*	Isotope - http://isotope.metafizzy.co/
/*-----------------------------------------------------------------------------------*/

	$.Isotope.prototype._getCenteredMasonryColumns = function() {
        this.width = this.element.width();
        var parentWidth = this.element.parent().width();
        // i.e. options.masonry && options.masonry.columnWidth
        var colW = this.options.masonry && this.options.masonry.columnWidth ||
        // or use the size of the first item
        this.$filteredAtoms.outerWidth(true) ||
        // if there's no items, use size of container
        parentWidth;
        var cols = Math.floor(parentWidth / colW);
        cols = Math.max(cols, 1);
        // i.e. this.masonry.cols = ....
        this.masonry.cols = cols;
        // i.e. this.masonry.columnWidth = ...
        this.masonry.columnWidth = colW;
    };

    $.Isotope.prototype._masonryReset = function() {
        // layout-specific props
        this.masonry = {};
        // FIXME shouldn't have to call this again
        this._getCenteredMasonryColumns();
        var i = this.masonry.cols;
        this.masonry.colYs = [];
        while (i--) {
            this.masonry.colYs.push(0);
        }
    };

    $.Isotope.prototype._masonryResizeChanged = function() {
        var prevColCount = this.masonry.cols;
        // get updated colCount
        this._getCenteredMasonryColumns();
        return (this.masonry.cols !== prevColCount);
    };

    $.Isotope.prototype._masonryGetContainerSize = function() {
        var unusedCols = 0,
            i = this.masonry.cols;
        // count unused columns
        while (--i) {
            if (this.masonry.colYs[i] !== 0) {
                break;
            }
            unusedCols++;
        }
        return {
            height: Math.max.apply(Math, this.masonry.colYs),
            // fit container to columns that have been used;
            width: (this.masonry.cols - unusedCols) * this.masonry.columnWidth
        };
    };
    
   var $container = $('#portfolio-list'),
	      $body = $('body'),
	      colW = 60,
	      columns = null;
  
    $container.isotope({
	  	itemSelector : '.isotope-item',
		layoutMode : 'masonry',
		animationOptions: {
			duration: 500,
			queue: false
			},
	    resizable: false
	  });
   
		  
   $(window).smartresize(function(){
	    // check if columns has changed
	    var currentColumns = Math.floor( ( $body.width() -10 ) / colW );
	    if ( currentColumns !== columns ) {
	      // set new column count
	      columns = currentColumns;
	      // apply width to container manually, then trigger relayout
	      $container.width( columns * colW )
	        .isotope('reLayout');
	    }    
   }).smartresize(); // trigger resize to set container width
  
   
  
		/* $('#portfolio-list').infinitescroll({ 
		    navSelector  : "div.navigation",            
		                   // selector for the paged navigation (it will be hidden)
		    nextSelector : "div.navigation a:first",    
		                   // selector for the NEXT link (to page 2)
		    itemSelector : ".isotope-item"          
		                   // selector for all items you'll retrieve
		  }
		); */	
	
	    /* // load all post divs from page 2 into an off-DOM div
		$('<div/>').load('/page/2/ #portfolio-list .isotope-item',function(){ 
		    $(this).appendTo('#portfolio-list');    // once they're loaded, append them to our content area
		    var $newItems = $(this);
		    $('#portfolio-list').isotope( 'insert', $newItems );
		});
		// load all post divs from page 3 into an off-DOM div
		$('<div/>').load('/page/3/ #portfolio-list .isotope-item',function(){ 
		    $(this).appendTo('#portfolio-list');    // once they're loaded, append them to our content area
		    var $newItems = $(this);
		    $('#portfolio-list').isotope( 'insert', $newItems );
		});
		// load all post divs from page 4 into an off-DOM div
		$('<div/>').load('/page/4/ #portfolio-list .isotope-item',function(){ 
		    $(this).appendTo('#portfolio-list');    // once they're loaded, append them to our content area
		    var $newItems = $(this);
		    $('#portfolio-list').isotope( 'insert', $newItems );
		});
		// load all post divs from page 5 into an off-DOM div
		$('<div/>').load('/page/5/ #portfolio-list .isotope-item',function(){ 
		    $(this).appendTo('#portfolio-list');    // once they're loaded, append them to our content area
		    var $newItems = $(this);
		    $('#portfolio-list').isotope( 'insert', $newItems );
		}); */
		


		// filter items when filter link is clicked
		$('#portfolio-filter a').click(function(){
		  var selector = $(this).attr('data-filter');
		  $container.isotope({ filter: selector });
		  return false;
		});
		
		
		// re-rack items after the entire page loads
	    $(window).ready(function() {
	        setTimeout(function() {
				    $container.isotope('reLayout');
				}, 750);
	    });
		
		// re-rack items when a layout view is changed
		$(".portfolio-view span").click(function () {
			 setTimeout(function() {
			    $container.isotope('reLayout');
			}, 200);
		});
	    
		 
		 $(".portfolio-4 .portfolio-container .module-container:nth-child(4n+5)").addClass("clearleft");		
		 $(".portfolio-3 .portfolio-container .module-container:nth-child(3n+4)").addClass("clearleft");		
		 $(".portfolio-2 .portfolio-container .module-container:nth-child(2n+3)").addClass("clearleft");	
		 	
		 $(".hybrid-blog-4 .hybrid-holder .hybrid:nth-child(4n+5)").addClass("clearleft");		
		 $(".hybrid-blog-3 .hybrid-holder .hybrid:nth-child(3n+4)").addClass("clearleft");		
		 $(".hybrid-blog-2 .hybrid-holder .hybrid:nth-child(2n+3)").addClass("clearleft");	
		 
		 $(".breakout-row .container .columns:nth-child(4n+6)").addClass("clearleft");	
		 
		 $("a.button").click(function () {
		 	
			 $(".portfolio-4 .container .module-container").removeClass("clearleft").css('height', $(".module-container").height());
			 $(".portfolio-3 .container .module-container").removeClass("clearleft").css('height', $(".module-container").height());
			 $(".portfolio-2 .container .module-container").removeClass("clearleft").css('height', $(".module-container").height());
			
		 });		 
		
		 
		 // Four Column Buttons Actions
		 $("span.4-col-grid").click(function () {
			 $("#portfolio-list .module-container").removeClass("sixteen columns view-hybrid view-list").addClass("four columns view-grid");
			 $("#portfolio-list .module-img").removeClass("twelve columns alpha");
			 $("#portfolio-list .module-meta").fadeOut(100).removeClass("four columns alpha omega visible list");
			 $(".list_btn").css("opacity","1");
			 $(".hybrid_btn").css("opacity","1");
			 $(".grid_btn").css("opacity","0.5");
			 $("#.portfolio-4 .container .module-container").css('height', 'auto');			 
		 });
		 
		 $("span.4-col-hybrid").click(function () {
			 $("#portfolio-list .module-container").removeClass("sixteen columns view-grid view-list").addClass("four columns view-hybrid");
			 $("#portfolio-list .module-img").removeClass("twelve columns alpha");
			 $("#portfolio-list .module-meta").fadeIn(300).removeClass("omega list").addClass("four columns alpha visible");
			 $(".list_btn").css("opacity","1");
			 $(".hybrid_btn").css("opacity","0.5");
			 $(".grid_btn").css("opacity","1");
			 $("#.portfolio-4 .container .module-container").css('height', 'auto');
		 }); 
		 
		 $("span.4-col-list").click(function () {
			 $("#portfolio-list .module-container").removeClass("four columns view-grid view-hybrid").addClass("sixteen columns view-list");			 
			 $("#portfolio-list .module-img").addClass("twelve columns alpha");
			 $("#portfolio-list .module-meta").fadeIn(300).removeClass("alpha").addClass("four columns omega visible list");
			 $(".list_btn").css("opacity","0.5"); 
			 $(".hybrid_btn").css("opacity","1");
			 $(".grid_btn").css("opacity","1");
			 $("#.portfolio-4 .container .module-container").css('height', 'auto');
		 }); 
		 
		 // Three Column Buttons Actions
		 $("span.3-col-grid").click(function () {
			 $("#portfolio-list .module-container").removeClass("sixteen columns view-list view-hybrid").addClass("one-third column view-grid");
			 $("#portfolio-list .module-img").removeClass("twelve columns alpha");
			 $("#portfolio-list .module-meta").fadeOut(100).removeClass("one-third column alpha omega visible list");
			 $(".list_btn").css("opacity","1");
			 $(".hybrid_btn").css("opacity","1");
			 $(".grid_btn").css("opacity","0.5");
			 $("#.portfolio-3 .container .module-container").css('height', 'auto');
		 });
		 
		 $("span.3-col-hybrid").click(function () {
			 $("#portfolio-list .module-container").removeClass("sixteen columns view-list view-grid").addClass("one-third column columns view-hybrid");
			 $("#portfolio-list .module-img").removeClass("twelve columns alpha");
			 $("#portfolio-list .module-meta").fadeIn(300).removeClass("omega list").addClass("one-third column alpha visible");
			 $(".list_btn").css("opacity","1");
			 $(".hybrid_btn").css("opacity","0.5");
			 $(".grid_btn").css("opacity","1");
			 $("#.portfolio-3 .container .module-container").css('height', 'auto');
		 }); 
		 
		 $("span.3-col-list").click(function () {
			 $("#portfolio-list .module-container").removeClass("one-third column view-grid view-hybrid").addClass("sixteen columns view-list");			 
			 $("#portfolio-list .module-img").addClass("twelve columns alpha");
			 $("#portfolio-list .module-meta").fadeIn(300).removeClass("one-third column alpha").addClass("four columns omega visible list");
			 $(".list_btn").css("opacity","0.5"); 
			 $(".hybrid_btn").css("opacity","1");
			 $(".grid_btn").css("opacity","1");
			 $("#.portfolio-3 .container .module-container").css('height', 'auto');
		 }); 
		 		 
		 // Two Column Buttons Actions
		 $("span.2-col-grid").click(function () {
			 $("#portfolio-list .module-container").removeClass("sixteen columns view-list view-hybrid").addClass("eight columns view-grid");
			 $("#portfolio-list .module-img").removeClass("twelve columns alpha");
			 $("#portfolio-list .module-meta").fadeOut(100).removeClass("eight columns alpha omega visible list");
			 $(".list_btn").css("opacity","1");
			 $(".hybrid_btn").css("opacity","1");
			 $(".grid_btn").css("opacity","0.5");
			 $("#.portfolio-2 .container .module-container").css('height', 'auto');
		 });
		 
		 $("span.2-col-hybrid").click(function () {
			 $("#portfolio-list .module-container").removeClass("sixteen columns view-list view-grid").addClass("eight columns view-hybrid");
			 $("#portfolio-list .module-img").removeClass("twelve columns alpha");
			 $("#portfolio-list .module-meta").fadeIn(300).removeClass("four columns omega list").addClass("eight columns alpha visible");
			 $(".list_btn").css("opacity","1");
			 $(".hybrid_btn").css("opacity","0.5");  
			 $(".grid_btn").css("opacity","1");
			 $("#.portfolio-2 .container .module-container").css('height', 'auto');
		 }); 
		 
		 $("span.2-col-list").click(function () {
			 $("#portfolio-list .module-container").removeClass("eight columns view-grid").addClass("sixteen columns view-hybrid");			 
			 $("#portfolio-list .module-img").addClass("twelve columns alpha");
			 $("#portfolio-list .module-meta").fadeIn(300).removeClass("eight columns alpha").addClass("four columns omega visible list");
			 $(".list_btn").css("opacity","0.5"); 
			 $(".hybrid_btn").css("opacity","1");
			 $(".grid_btn").css("opacity","1");
			 $("#.portfolio-2 .container .module-container").css('height', 'auto');
		 }); 
		 


$("#dismissal").click(function () {
	$(".wwsgd-container").animate({opacity:0},300).animate({height:0},300); 
}); 	 



/*-----------------------------------------------------------------------------------*/
/* prettyPhoto or rLightbox - http://www.no-margin-for-errors.com/projects/prettyphoto-jquery-lightbox-clone/
/* Change this to rlightbox or prettyPhoto
/*-----------------------------------------------------------------------------------*/
		$("a[data-rel^='prettyPhoto']").prettyPhoto();
		$("a[rel^='prettyPhoto']").prettyPhoto();
			
		$(".XYZ a").prettyPhoto();
		$("a.boxLink").prettyPhoto();
		$(".gallery-item a").prettyPhoto();
		
		$("a[rel^='instagram-sc-images']").prettyPhoto();
		$("a[rel^='instagram-images']").prettyPhoto();
		
  		 
/*-----------------------------------------------------------------------------------*/
/*	DropDown Menu - http://users.tpg.com.au/j_birch/plugins/superfish/
/*-----------------------------------------------------------------------------------*/
		/*  $(".menu ul li").horizontalMenu({
			timeHide: 900
		});	 */
	
  		
		 $("ul.sf-menu").supersubs({
		 	minWidth:    14,   // minimum width of sub-menus in em units 
            maxWidth:    29,   // maximum width of sub-menus in em units 
            extraWidth:  0    // extra width can ensure lines don't sometimes turn over 
                               // due to slight rounding differences and font-family 
		 }).superfish({
		 	delay: 600,
		 	Speed: 100,
		 	animation:   {opacity:'show',height:'show'},
		 	autoArrows: true
		 }); 
		 
		 $("#responsive-nav select").change(function() {
  			window.location = $(this).find("option:selected").val();
		 });
		 
/*
$(".my-avatar").tipsy({fade: true, gravity: 's'});	
$(".social img").tipsy({fade: true, gravity: $.fn.tipsy.autoNS});
*/
	

});