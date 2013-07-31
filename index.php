<!DOCTYPE html>
<html>
    <head>
        
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link href="css/main.css" rel="stylesheet" type="text/css" />
        <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script type="text/javascript" src="js/jquery-1.8.0.min.js">\x3C/script>');</script>                
        <script type="text/javascript" src="js/dragimg.js"></script>
		<script>
			$(function(){
				$("#img_container img").dragImg();
			})
		</script>
        <title>drag Img inside container</title>
    </head>
    <body>
		<h2>Example of dragging image inside container</h2>
        <div id="img_container" style="width:300px;height:200px;border: 2px solid red;"><img src="sample.jpg" style="cursor: move; position: absolute; left: -393px; top: -5px;"></div>     
    </body>
</html>
