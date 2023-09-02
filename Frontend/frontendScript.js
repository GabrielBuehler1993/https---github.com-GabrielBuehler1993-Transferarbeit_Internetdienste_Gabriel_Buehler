const burgerButton = document.getElementById('burgerButton');
const navigation = document.getElementById('navigation');

// Toggle the 'active' class on the navigation element when the burger button is clicked
burgerButton.addEventListener('click', () => {
  navigation.classList.toggle('active');
});

let slideIndex = 1;
showSlides(slideIndex);

// Function to navigate to the next or previous slide
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Function to navigate to a specific slide
function currentSlide(n) {
  showSlides(slideIndex = n);
}

// Function to display the current slide and update the slide index
function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");

  // Check if slideshow elements exist on the current page
  if (slides.length === 0 || dots.length === 0) {
    return; // Exit the function if the elements are not found
  }

  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}

// Initialize an Owl Carousel for testimonials when the document is ready
$(document).ready(function() {
  $('.testi.owl-carousel').owlCarousel({
    items: 2,
    margin: 10,
    lazyLoad: true,
    dots: true,
    autoplay: true,
    autoplayTimeout: 3000,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 2,
      }
    }
  });
});