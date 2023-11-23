document.addEventListener("DOMContentLoaded", function() {
    // duplicate the oftera in the ofteras div 3 times
    var ofteras = document.getElementById("ofertas");
    var oftera = ofteras.getElementsByClassName("col-3")[0];
    for (var i = 0; i < 3; i++) {
        ofteras.appendChild(oftera.cloneNode(true));
    }
});