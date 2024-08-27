 // Simulate a data fetch and hide the spinner after the data is loaded
 document.addEventListener("DOMContentLoaded", function() {
    // Simulate a delay for data fetching
    setTimeout(function() {
        document.getElementById('loadingSpinner').style.display = 'none';
    }, 2000); // Hide spinner after 2 seconds
});