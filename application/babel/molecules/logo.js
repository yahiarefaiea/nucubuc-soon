$(document).ready(function() {
  
  //  ITERATION COUNT
  var x= 1
  var iterationCount=setInterval(function() {
    x= ++x
  }, 1600)   //  (.2s * 2) * 4 = 1.6s
  
  
  // JPRELOADER INIT
  $('body').jpreLoader({
    showSplash: true,
    showPercentage: false,
    loaderVPos: 0,
    splashVPos: 0
  }, function() {
    
    setTimeout(function() {
      $('body #logo .symbol > div')
        .attr('style', 'animation-iteration-count:'+x+'; -webkit-animation-iteration-count:'+x)
      clearInterval(iterationCount)
      
      setTimeout(function() {
        $('body').removeClass('loading')
        $('#logo .symbol > div').removeAttr('style')
        
        if($('.wrapper').hasClass('soon'))
          $('.soon').addClass('home')
      }, 1600)
      
    }, 200)
    
  })
  
})