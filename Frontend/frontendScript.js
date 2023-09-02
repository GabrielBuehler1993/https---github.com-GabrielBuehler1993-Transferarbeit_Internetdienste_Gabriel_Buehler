// Add your emailjs initialization code here (replace 'YOUR_PUBLIC_KEY' with your actual public key)

(function() {
  emailjs.init('5FPdGhihxSarzG625');
})();
//Sending the E-Mails
function SendMail(){
  // Create an array to store the descriptions of selected checkboxes
  const selectedItems = [];

  // Check each checkbox and add its description to the array if it's checked
  const woodCheckbox = document.getElementById("woodCheckbox");
  const metalDiceCheckbox = document.getElementById("metalDiceCheckbox");
  const diceBagCheckbox = document.getElementById("diceBagCheckbox");

  if (woodCheckbox.checked) {
    selectedItems.push("Wood (150.00$)");
  }

  if (metalDiceCheckbox.checked) {
    selectedItems.push("Metal Dice (200.00$)");
  }

  if (diceBagCheckbox.checked) {
    selectedItems.push("Dice Bag (50.00$)");
  }

  // Include the selected items in the email parameters
  var params = {
    fname: document.getElementById("fname").value,
    email: document.getElementById("email").value,
    selectedItems: selectedItems.join(', ') // Convert the array to a comma-separated string
  }

  // Send the email
  emailjs.send("service_pqk0ket", "template_aw7f345", params).then(function(res) {
    alert("Thank you for ordering at D20 Shop. We will send you a confirmation E-Mail soon!");
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