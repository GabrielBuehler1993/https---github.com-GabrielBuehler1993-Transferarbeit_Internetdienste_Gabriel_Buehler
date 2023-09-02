// Add your emailjs initialization code here (replace 'YOUR_PUBLIC_KEY' with your actual public key)

(function() {
  emailjs.init('5FPdGhihxSarzG625');
})();
//Sending the E-Mails
function SendMail(){
  var params = {
    fname: document.getElementById("fname").value,
    email: document.getElementById("email").value,
    woodcheckbox: document.getElementById("woodCheckbox").value,
    metalDiceCheckbox: document.getElementById("metalDiceCheckbox").value,
    woodcheckbox: document.getElementById("diceBagCheckbox").value
  }
  emailjs.send("service_pqk0ket", "template_aw7f345", params).then(function(res) {
    alert("Your E-Mail has been sent, thank you for choosing D20 Shop! We will answer you shortly with the delivery details ");
  });
}
// Function to toggle the navigation on burger button click
const burgerButton = document.getElementById('burgerButton');
const navigation = document.getElementById('navigation');

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

  if (slides.length === 0 || dots.length === 0) {
      return;
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

// Function to handle form submission
document.getElementById('contact-form').addEventListener('submit', function(event) {
  event.preventDefault();
  // Generate a random number for the contact_number variable
  this.contact_number.value = Math.random() * 100000 | 0;
  // Send the form using emailjs
  emailjs.sendForm('contact_service', 'contact_form', this)
      .then(function() {
          console.log('SUCCESS!');
      }, function(error) {
          console.log('FAILED...', error);
      });
});

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