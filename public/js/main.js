$(document).ready(function(){
  $('#customer-data-text-field').on('focus', function(){
    $(this).parent('.form-group').removeClass('has-error');
  });

  $('#customer-data-form-submit-btn').on('click', function(e){
    var errors = {
      empty: 'Please paste your customer data in the field provided.'
    }
    e.preventDefault();
    if($('#customer-data-text-field').val()){
      $('#customer-data-form').submit();
    } else {
      $('.error-modal-content').text(errors.empty);
      $('#error-modal').modal();
      $('#customer-data-text-field').parent('.form-group').addClass('has-error');
    }
  });
});
