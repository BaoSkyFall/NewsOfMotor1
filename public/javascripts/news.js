$(document).ready(function()
{
    $('#send').click(function() {
        var value = CKEDITOR.instances['editor1'].getData()
        console.log(value);
    });
    $('.owl-carousel').owlCarousel({
        animateOut: 'bounceOut',
        animateIn: 'zoomIn',
        items:1,
        margin:30,
        stagePadding:30,
        smartSpeed:450
    });
})