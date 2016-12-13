$(function(){
/*
  Author: Chrysto Panayotov ( info@bassta.bg )
  For GreenSock forums user azuki
  License : http://bassta.bg/license/

	Modified By: Gokhan Ozdemir

	added https://github.com/ten1seven/what-input

	<div class="parallaxContainer">
		<div class="parallax" data-speed-x="-35" data-speed-y="-25">Content 1</div>
		<div class="parallax" data-speed-x="10" data-speed-y="25">Content 2</div>
	</div>
*/

		var $parallaxContainer 	  = $(".parallaxContainer"); //our container
		var $parallaxItems		    = $parallaxContainer.find(".parallax");  //elements
		var fixer				          = -0.004;		//experiment with the value
		var moveIt								= null; //
		// console.log($parallaxItems);
		$parallaxContainer.on("mousemove", function(event){
			//whatInput.ask(); // returns only direct input `mouse`, `keyboard` or `touch`
			moveIt = whatInput.ask('loose'); // returns `mouse` because mouse movement was detected

			if (moveIt === 'mouse') {
				// console.log("MOVE it baby, I got the mouse");

				var pageX =  event.pageX - ($parallaxContainer.width() * 0.5);  //get the mouseX - negative on left, positive on right
				var pageY =  event.pageY - ($parallaxContainer.height() * 0.5); //same here, get the y. use console.log(pageY) to see the values
		  } else {
		    // console.log("hey you NO MOVE you");
		  }

  //here we move each item
			$parallaxItems.each(function(){

				var item 	= $(this);
				var speedX	= item.data("speed-x");
				var speedY	= item.data("speed-y");

				TweenMax.to(item, 0.5, {
					x: (item.position().left + pageX * speedX )*fixer,    //calculate the new X & Y based on mouse position * speed
					y: (item.position().top + pageY * speedY)*fixer
				});

				//or use set - not so smooth, but better performance
				/*TweenLite.set(item, {
					x: (item.position().left + pageX * speedX )*fixer,
					y: (item.position().top + pageY * speedY)*fixer
				});*/
			});
		});

		$parallaxContainer.mouseleave(function() {
			// console.log("Good boy, now go back to your cabin");
			//here we move each item BACK to their initial places
			$parallaxItems.each(function(){
				var item 	= $(this);
				TweenMax.to(item, 0.8, {
					x: 0,
					y: 0,
					ease:Elastic.easeOut
				});
			});
		});

});
