$(document).ready( function() {
	$(".open").click(function(e) {
		$(".content").load("howtos/" + $(this).attr("rel"));
	});

  // how to do this
  $(".panel").on('shown.bs.collapse', function(){
  	$(".plus").removeClass("glyphicon-plus");
  	$(".plus").addClass("glyphicon-minus");
  });
  $(".panel").on('hidden.bs.collapse', function(){
  	$(".plus").removeClass("glyphicon-minus");
	$(".plus").addClass("glyphicon-plus");	
  });

  $(".back").click(function(e) {
  	$(".content").load("howtos/howtos.html");
  });
});