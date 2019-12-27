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
		setTimeout(generate_flake,300);
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
		$('#cardwrapper').fadeIn(2000);
		$('#message1a').delay(2000).fadeIn(2000).delay(6000).fadeOut(2000);
		$('#message1b').delay(4000).fadeIn(2000).delay(4000).fadeOut(2000);
		if(!replaying)
		{
			setTimeout(makeItSnow,4500);
		}
		$('#pathlights').delay(13000).fadeOut(600);
		$('#houselights1').delay(12400).fadeOut(600);
		$('#houselights2').delay(11700).fadeOut(600);
		$('#houselights3').delay(11000).fadeOut(600);
		$('#night').delay(8000).fadeOut(11000);
		
		$('#message2').delay(12000).fadeIn(2000);
		$('#replay').delay(18000).fadeIn(1000);
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
			$('#night,#houselights2,#houselights3,#pathlights,#houselights1').show().css('opacity',1);
			$('#message2,#message1a,#message1b').hide(); 
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