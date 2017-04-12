//  VALIDATE EMAIL FUNCTION
function regexEmail(email) {
  re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}
function validateEmail() {
  email = $('#form_email').val()
  if (regexEmail(email)) {
    $('.soon').addClass('filled')
    $('#next').attr('disabled', false)
  } else {
    $('.soon').removeClass('filled')
    $('#next').attr('disabled', true)
  }
  return false
}

//  VALIDATE NAME FUNCTION
function regexName(name) {
  re = /^[A-Za-z ]{2,}$/
  return re.test(name)
}
function validateName() {
  name = $('#form_name').val()
  if (regexName(name)) {
    $('.soon').addClass('filled')
    $('#send').attr('disabled', false)
  } else {
    $('.soon').removeClass('filled')
    $('#send').attr('disabled', true)
  }
  return false
}

//  TYPING FUNCTION
function typing() {
  if(!$('.soon').hasClass('typing'))
    $('.soon').addClass('typing')
  if (typeof typingTimeout !== 'undefined')
    clearTimeout(typingTimeout)
  typingTimeout= setTimeout(function() {
    $('.soon').removeClass('typing')
    $('.inputs > input').blur().attr({'disabled': true, 'required': false})
  }, 25000)
}

//   SUBMIT FORM FUNCTION
function submitForm($form) {
  $.ajax({
    type: 'GET',
    url: $form.attr('action'),
    data: $form.serialize(),
    cache: false,
    dataType: 'jsonp',
    jsonp: 'c',
    contentType: 'application/json; charset=utf-8',
    error: function(error) {},
    success: function(data) {
      
      if (data.result != 'success') {
        if (data.msg && data.msg.indexOf('already subscribed') >= 0) {
          $('.messageCase .confirmation div').html('you\'re already subscribed..')
          $('.textCase .confirmation').html('why don\'t you try something else?')
        } else {
          $('.messageCase .confirmation div').html('whoops, something went wrong..')
          $('.textCase .confirmation').html('please try again later')
        }
      } else {
        $('.messageCase .confirmation div').html('you\'re almost there..')
        $('.textCase .confirmation').html('check your email to confirm the subscription')
      }
      
      setTimeout(function() {
        $('.soon').removeClass('typing filled enterName').addClass('confirmation')
        $('.inputs > input, .click > input').val('').attr({'disabled': true, 'required': false})
        
        setTimeout(function() {
          iterationClear()
          setTimeout(function() {
            $('.soon').removeClass('confirmation')
            setTimeout(function() {
              $('.soon').addClass('main')
              setTimeout(function() { $('.wrapper').removeClass('delay') }, 3000)
            }, 100)
          }, 1400)
        }, 6000)
      }, 3000)
      
    }
  })
}


//  DOCUMENT READY
$(document).ready(function() {
  if($('.wrapper').hasClass('soon')) {
    
    //  PLACEHOLDER
    $('.placeholder').on('click', function() {
      if(!$('.wrapper').hasClass('delay')) {
        typing()
        if(!$('.soon').hasClass('enterName')) {
          $('#form_email').attr({'disabled': false, 'required': true})
          setTimeout(function() { $('#form_email').focus() }, 1000)
        } else {
          $('#form_name').attr({'disabled': false, 'required': true})
          setTimeout(function() { $('#form_name').focus() }, 1000)
        }
      }
    })
    
    //  INPUTS
    $('.inputs > input').keyup(function() {
      typing()
      if($(this).is('#form_email'))
        validateEmail()
      else if($(this).is('#form_name'))
        validateName()
    })
    
    //  NEXT
    $('#next').on('click', function(e) {
      typing()
      $('.soon').removeClass('filled').addClass('enterName')
      
      $('#form_email, #next').attr('disabled', true)
      $('#form_name').attr({'disabled': false, 'required': true})
      setTimeout(function() { $('#form_name').focus() }, 1000)
      
      e.preventDefault()
    })
    
    //  SEND
    $('#send').on('click', function() {
      clearTimeout(typingTimeout)
      iterationCount()
      $('.wrapper').addClass('delay')
      $('.soon').removeClass('main')
      $('.inputs > input').attr({'disabled': false, 'required': true})
      
      //  SUBMIT DATA
      $('#subscribeForm').submit(function(e) {
        e.preventDefault()
        submitForm($('#subscribeForm'))
      })
    })
    
  }
})