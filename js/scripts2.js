$(document).ready(function() {

	var cardWidth=$('#wrapper').width();
	var cardHeight=$('#wrapper').height();
	var $flakes=[];
	var $proto=$('#flake_proto');
	var counter=0;
	var wind=3;
	var replaying=false;
	function generate_flake()
	{
		var $f=$proto.clone();
		$f.appendTo('#flakeholder');
		var newx=randomBetween(-100,cardWidth);
		$f.css({left:newx});
		$f.attr('id','flake'+counter++);
		//give flake its size
		var size=randomBetween(2,8);
		$f.css({width:size,height:size});
		$f.addClass('clone');
		//give flake its data values
		$f.data('speed', randomBetween(2,5));
		
		$flakes.push($f);
		setTimeout(generate_flake,400);
	}
	
	function doSnow()
	{
		for(var i = 0; i < $flakes.length; i++) {
		  var $f=$($flakes[i]);
		  if(parseInt($f.css('top'))>cardHeight || parseInt($f.css('left'))>cardWidth)
			{
				//console.log('out');
				//console.log($flakes);
				$f.remove();
				$flakes.splice(i,1);
			}
			else
			{
			
			//console.log(cardHeight);
			var data=$f.data();
			$f.css( 'top', '+='+data.speed+'px' );
			$f.css( 'left', '+='+wind/data.speed+'px' );
			}
		}
		setTimeout(doSnow,35);
	}
	
	function makeItSnow() 
	{
		generate_flake();
		doSnow();
	}
	
	function start()
	{	
		$('#cardwrapper').fadeIn(700);
		
		$('#message1a').delay(2000).fadeIn(2000).delay(6000).fadeOut(2000);
		$('#message1b').delay(4000).fadeIn(2000).delay(4000).fadeOut(2000);
		if(!replaying)
		{
			setTimeout(makeItSnow,4500);
		}
		$('#night').delay(9000).fadeIn(8000);
		$('#pathlights').delay(12000).fadeIn(1000);
		$('#houselights1').delay(12500).fadeIn(1000);
		$('#houselights2').delay(13900).fadeIn(1000);
		$('#houselights3').delay(14500).fadeIn(1000);
		$('#message2').delay(14000).fadeIn(3000);
		$('#replay').delay(19000).fadeIn(2000);
	}
	
	start();
	
	$('#replay').click(
		function()
		{
			replaying=true;
			$('#replay').fadeOut(700);
			$('#cardwrapper').fadeOut(700);
			setTimeout(
			function()
			{
			$('#houselights1,#night,#houselights2,#houselights3,#pathlights,#message1a,#message1b,#message2').hide(); 
			$('.clone').remove(); 
			$flakes=[];
			counter=0;
			start();
			},
			700
			);
		}
	);
	
}); //document ready

function randomBetween(to,from)
{
	 return Math.random()*(to-from+1)+from;
}