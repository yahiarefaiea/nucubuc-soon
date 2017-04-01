$(document).ready(function() {
  
  // JPRELOADER INIT
  $('body').jpreLoader({
    showSplash: true,
    showPercentage: false,
    loaderVPos: 0,
    splashVPos: 0
  }, function() {
    
    setTimeout(function() {
//      $('body').removeClass('loading');
    }, 1200);
    
  });
  
});