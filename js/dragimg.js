/*******************************************************
 *      drag img inside container
 *******************************************************/
$.fn.dragImg = function( options ) {    
    var settings = {
           onmousemove:false,
           inertial:true,
           inertialDuration:1000,
           inertialRatio:10,
		   centerInitially:true,
	   cursor: "move"
    }    
    
    var initdrag = false;
    var prevX,prevY;
    return this.each(function() {
		if ($(this)[0].complete) {
			initImg
		}
		else	
			$(this).load(initImg);
		
		function initImg(){
		
		if ( options ) 
            $.extend( settings, options );
        //apply styles to parent
		$(this).parent().css({
			"position":"relative",
			"overflow":"hidden"
		})
			
        var min = getLimits(this, true);
        //$(this).off().unbind();
        $(this).css({
            "cursor":settings.cursor,
            "position":"absolute",
            "left":min.x+"px",
            "top":min.y+"px"
        }).on({
            "mousedown":function(e){
                initdrag=true;
                
                prevX = e.pageX;
                prevY = e.pageY; 
                var newPos = getNewPos(e, this);
                 
                 $(this).stop(true, true).css({
                     "left":newPos.x+"px",
                     "top":newPos.y+"px"
                 });
                 
                return false;
            },
            "mousemove":function(e){
                 if (!initdrag&&!settings.onmousemove) return false;

		 var newPos = getNewPos(e, this);
                 
                 $(this).stop(true, true).css({
                     "left":newPos.x+"px",
                     "top":newPos.y+"px"
                 });
                 
                 prevX = e.pageX;
                 prevY = e.pageY; 
                 
                  
            },            
            "mouseup":function(e){
                if (settings.inertial){
                    
                   var newPos = getNewPos(e, this, true);
                   $(this).stop(true, true).animate({
                        "left":newPos.x+"px",
                        "top":newPos.y+"px"
                    }, settings.inertialDuration, function(){                     
                    });
                                       
                }
                initdrag=false;                
            }
        });
		
		}
        
    });
    
    function getNewPos(event, elem, inertial){
        
                 if (inertial!==true) {
                     inertial=false;
                     inertRatio = 1;
                 }
                 else
                     inertRatio = settings.inertialRatio;
                 
                 var thisx = parseInt($(elem).css("left")),
                     thisy = parseInt($(elem).css("top"));
                 
		 var kx = $(elem).width()/$(elem).parent().width(),
                     ky = $(elem).height()/$(elem).parent().height();
                 
		 if (typeof prevX == "undefined") prevX = event.pageX;
		 if (typeof prevY == "undefined") prevY = event.pageY;
		 
                 var deltax = (event.pageX-prevX)*kx*inertRatio,
                     deltay = (event.pageY-prevY)*ky*inertRatio;
                 
		 var min = getLimits(elem);
		 
                 var newx,newy;
                 
                 //if onmousemove moving image in opposite direction
                 if (settings.onmousemove){
                  newx = ((thisx-deltax)<0)?(thisx-deltax):0;
                  newy = ((thisy-deltay)<0)?(thisy-deltay):0;
                 }
                 else{
                  newx = ((thisx+deltax)<0)?(thisx+deltax):0;
                  newy = ((thisy+deltay)<0)?(thisy+deltay):0;   
                 }
                 newx = (newx>min.x)?newx:min.x;
                 newy = (newy>min.y)?newy:min.y;
                 
                 return {x:newx,y:newy};
    }       
    function getLimits(elem, centerInitially){
		if (typeof centerInitially == "undefined") centerInitially = false;
		var minx,miny;  
		 //if image width smaller than wrapper - center it
                 if ($(elem).parent().width()>$(elem).width())
		    minx = ($(elem).parent().width()-$(elem).width())/2;
		 else if (centerInitially)
		     minx = ($(elem).parent().width()-$(elem).width())/2;
		 else
		    minx = 0 - ($(elem).width()-$(elem).parent().width());
		 //if image height smaller than wrapper - center it   
		 if ($(elem).parent().height()>$(elem).height())
		    miny = ($(elem).parent().height()-$(elem).height())/2;
		 else if (centerInitially)
		    miny = 0 - ($(elem).height()-$(elem).parent().height())/2;
		 else
		    miny = 0 - ($(elem).height()-$(elem).parent().height());
		return {x:minx,y:miny};
    }    
}    

