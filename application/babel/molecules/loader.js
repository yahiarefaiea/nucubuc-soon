//  ITERATION COUNT
function iterationCount() {
  $('body').addClass('waiting')
  x= 1,
  iteration= setInterval(function() {
    x= ++x
  }, 1500)   //  .5s * 3 = 1.5s
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
  }, 1500)
}


//  DOCUMENT READY
$(document).ready(function() {
  iterationCount()
  $('.wrapper').addClass('delay')
  
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
        
        //  SOON.PUG
        if($('.wrapper').hasClass('soon'))
          $('.soon').addClass('main')
        
        setTimeout(function() {
          $('body').removeClass('page')
          $('.wrapper').removeClass('delay')
        }, 4500)
        
      }, 1500)
    }, 200)
  })
})