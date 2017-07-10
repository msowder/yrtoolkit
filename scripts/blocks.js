$(document).ready( function() {
  $(".open").click(function(e) {
    $(".howto").load($(this).attr("rel"));
  });

});
