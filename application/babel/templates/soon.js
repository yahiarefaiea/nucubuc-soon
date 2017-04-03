//  EMAIL
function regexEmail(email) {
  re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

//  NAME
function regexName(name) {
  re = /^[a-zA-Z0-9_.+-]*(?:[a-zA-Z][a-zA-Z0-9_.+-]*){2,}$/
  return re.test(name)
}

//  VALIDATE EMAIL
function validateEmail() {
  email = $('#form_email').val()
  if (regexEmail(email)) {
    $('.soon').addClass('filled')
    $('#next').attr('disabled', false)
  }
  else {
    $('.soon').removeClass('filled')
    $('#next').attr('disabled', true)
  }
  return false
}

//  VALIDATE NAME
function validateName() {
  name = $('#form_name').val()
  if (regexName(name)) {
    $('.soon').addClass('filled')
    $('#send').attr('disabled', false)
  }
  else {
    $('.soon').removeClass('filled')
    $('#send').attr('disabled', true)
  }
  return false
}



//  TYPING FUNCTION
function typing() {
  $('.soon').addClass('typing')
  if (typeof typingTimeout !== "undefined")
    clearTimeout(typingTimeout)
  typingTimeout= setTimeout(function() {
    $('.soon').removeClass('typing')
  }, 20000)
}


//  DOCUMENT READY
$(document).ready(function() {
  if($('.wrapper').hasClass('soon')) {
    
    //  PLACEHOLDER ON CLICK
    $('.inputs .placeholder').on('click', function() {
      typing()
      $('#form_email').attr({'disabled': false, 'required': true})
      setTimeout(function() { $('#form_email').focus() }, 1600)
    })
    
    //  form_email
    $('.inputs #form_email').keyup(function() {
      typing()
      validateEmail()
    })
    
    //  next
    $('#next').on('click', function(e) {
      typing()
      $('.soon').removeClass('filled').addClass('next')
      $('#form_email').attr('disabled', true)
      $('#form_name').attr({'disabled': false, 'required': true})
      $('#next').attr('disabled', true)
      setTimeout(function() { $('#form_name').focus() }, 1600)
      e.preventDefault()
    })
    
    //  form_name
    $('.inputs #form_name').keyup(function() {
      typing()
      validateName()
    })
    
    //  send
    $('#send').on('click', function(e) {
      typing()
      $('body').addClass('waiting')
      $('.soon').removeClass('home')
      setTimeout(function() {
        $('body').removeClass('waiting')
        $('.soon').addClass('confirmation')
        
        setTimeout(function() {
          $('.soon').removeClass('confirmation').addClass('home')
        }, 3200)
      }, 1600)
      $('#form_email, #form_name').attr({'disabled': false, 'required': true})
      e.preventDefault()
    })
    
  }
})