$(document).ready(function(){
    // show popup when you click on the link
    $('.show-popup').click(function(event){
        event.preventDefault(); // disable normal link function so that it doesn't refresh the page
        var docHeight = $(document).height(); //grab the height of the page
        var scrollTop = $(window).scrollTop(); //grab the px value from the top of the page to where you're scrolling
        var selectedPopup = $(this).data('showpopup'); //get the corresponding popup to show

        $('.overlay-bg').show().css({'height' : docHeight}); //display your popup and set height to the page height
        $('.popup'+selectedPopup).show(); // show the appropriate popup
        $('.overlay-content').css({'top': scrollTop+50+'px'}); //set the content 50px from the window top
    });
 
    // hide popup when user clicks on close button
    $('.close-btn_span').click(function(){
    window.location = 'http://www.prizelabs.com/atupasion/redeem/pin/esp.php' + this.id;
        $('.overlay-bg, .overlay-content').hide(); // hide the overlay
    });
    
    $('.close-btn_eng').click(function(){
    window.location = 'http://www.prizelabs.com/atupasion/redeem/pin/index.php' + this.id;
        $('.overlay-bg, .overlay-content').hide(); // hide the overlay
    });
 
    // hides the popup if user clicks anywhere outside the container
    $('.overlay-bg').click(function(){
        $('.overlay-bg, .overlay-content').hide();
    })
    // prevents the overlay from closing if user clicks inside the popup overlay
    $('.overlay-content').click(function(){
        return false;
    });
 
});



