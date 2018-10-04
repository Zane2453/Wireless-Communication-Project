$('.cube-switch .switch').click(function() {
    if ($('.cube-switch').hasClass('active')) {
        $('.cube-switch').removeClass('active');
        $('#light-bulb').attr('class', 'off');
    } else {
        $('.cube-switch').addClass('active');
        $('#light-bulb').attr('class', 'on');
    }
});