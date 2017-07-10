$(document).ready( function() {
  if ($(".tab").hasClass("active"))   {
    $(".content").load($(".tab").attr("rel"));
  } else {
    $(".content").load("tutorials/tutorials.html");
    $(".tab").addClass("active");
  }
  
  $(".tab").click(function(e) {
    $(".content").load($(this).attr("rel"));
    $(".tab").addClass("active");
  });
});
