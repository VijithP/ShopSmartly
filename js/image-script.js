$(document).ready(function(){
    let currentIndex = 0; // Keep track of the current image index
       
    // Function to show the current image
    function showImage(index) {
        // Remove active class from all images
        const images = $('.image-slider img');
        images.removeClass('active');
        // Add active class to the current image
        $(images[index]).addClass('active');
        debugger;
        var fromDate=$(images[index]).data('fromdate');
        var toDate=$(images[index]).data('todate');
       
        $("#Offer-FromDate").text(moment(fromDate).format("DD-MMM-YYYY"));
        $("#Offer-ToDate").text(moment(toDate).format("DD-MMM-YYYY"));
    }

    // Click event for next button
    $('.image-slider').on('click', '.next', function () {   
       
        if (isNaN(currentIndex)) {
            currentIndex=0;
        }      
        const images = $('.image-slider img');
        const totalImages = images.length;
        currentIndex = (currentIndex + 1) % totalImages; // Move to next image
        showImage(currentIndex);
    });

    // Click event for prev button
    $('.image-slider').on('click', '.prev', function () {   
        
        if (isNaN(currentIndex)) {
            currentIndex=0;
        } 
        const images = $('.image-slider img');
        const totalImages = images.length;
        currentIndex = (currentIndex - 1 + totalImages) % totalImages; // Move to previous image
        showImage(currentIndex);
    });
});