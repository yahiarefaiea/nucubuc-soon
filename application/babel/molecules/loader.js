//  ITERATION COUNT
function iterationCount() {
  $('body').addClass('waiting')
  x= 1,
  iteration= setInterval(function() {
    x= ++x
  }, 1600)   //  (.2s * 2) * 4 = 1.6s
}

//  ITERATION CLEAR
function iterationClear() {
  if(x<2) x= 2  //  At least run twice
  $('#logo .symbol > div')
    .attr('style', 'animation-iteration-count: '+x+'; -webkit-animation-iteration-count: '+x+';')
  clearInterval(iteration)
  setTimeout(function() {
    $('body').removeClass('waiting')
    $('#logo .symbol > div').removeAttr('style')
    x= 1
  }, 1600)
}


//  DOCUMENT READY
$(document).ready(function() {
  iterationCount()
  
  // JPRELOADER INIT
  $('body').jpreLoader({
    showSplash: false,
    showPercentage: false,
    loaderVPos: 0,
    splashVPos: 0
  }, function() {
    setTimeout(function() {
      iterationClear()
      setTimeout(function() {
        $('body').removeClass('page')
        
        //  SOON.PUG
        if($('.wrapper').hasClass('soon')) {
          $('.soon').addClass('home')
          setTimeout(function() { $('body').removeClass('delay') }, 4000)
        }
        
      }, 1600)
    }, 200)
  })
})