$(document).ready( function() {

  $(".tutorials").click(function(e) {
    $(".content").load("tutorials/" + $(this).attr("rel"));
  });

  $(".back").click(function(e) {
    $(".content").load("tutorials.html");
  });

  // if ($(".step" > div).attr("id") == "intro") {
  //   alert("hey hey");
  //   $(".previous").addClass("disabled");
  // }
});
