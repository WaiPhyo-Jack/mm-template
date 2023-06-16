document.addEventListener("DOMContentLoaded", function(event) {
    var slides = document.querySelectorAll(".slide");
    var currentSlide = 0;
  
    function showSlide(index) {
      slides[currentSlide].classList.remove("active");
      slides[index].classList.add("active");
      currentSlide = index;
    }
  
    setInterval(function() {
      var nextSlide = (currentSlide + 1) % slides.length;
      showSlide(nextSlide);
    }, 3000);
  });
  