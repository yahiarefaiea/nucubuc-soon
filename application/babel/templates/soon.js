//////  ITERATION CLEAR
////function iterationClear() {
////  $('#logo .symbol > div')
////    .attr('style', 'animation-iteration-count: '+x+'; -webkit-animation-iteration-count: '+x+';')
////  clearInterval(iteration)
////  setTimeout(function() {
////    $('body').removeClass('waiting')
////    $('#logo .symbol > div').removeAttr('style')
////    x= 1
////  }, 1600)
////}
//
//
////  DOCUMENT READY
//$(document).ready(function() {
//  
//  $('.inputs .placeholder').on('click', function() {
//    $('.soon').addClass('typing')
//  })
//  
//  $('.inputs .next').on('click', function(e) {
//    $('.soon').addClass('next').removeClass('filled')
//    e.preventDefault()
//  })
//  
//  $('.inputs .send').on('click', function(e) {
//    $('.soon').removeClass('next filled')
//    $('body').addClass('waiting')
//    
//    //  sned using ajax
//    //    $('body').remove('waiting')
//    //    maybe after a while... add the confirmation class !
//    //    $('.soon').addClass('confirmation')
//    //    timeout !
//    //      $('.soon').remove('confirmation').addClass('home')
//    
//    e.preventDefault()
//  })
//  
//  $('.inputs input').change(function() {
//    
//    //  if input #1
//    //    do this validation
//    //    $('.soon').addClass('filled')
//    
//    //  if input #2
//    //    do other validation
//    //    $('.soon').addClass('filled')
//    
//  })
//  
//})