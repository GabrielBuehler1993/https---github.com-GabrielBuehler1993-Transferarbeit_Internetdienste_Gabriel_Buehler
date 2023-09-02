const users = [];

// Function to fetch and display users from an API
const getUsers = async () => {
  // Fetch user data from the API
  const response = await fetch("http://localhost:3000/users");
  users = await response.json();

  // Get the usersList element from the DOM
  const usersList = document.getElementById("usersList");
  usersList.innerHTML = "";

  // Populate the usersList with user information
  for (const user of users) {
    const li = document.createElement("li");
    li.innerHTML = `${user.id} - ${user.username} - ${user.active}`;
    usersList.appendChild(li);
  }
};

// Function to handle the submission of a contact form
const postContact = async () => {
  // Hide the contact form
  const contactForm = document.getElementById("contactForm");
  contactForm.style.display = "none";

  // Show a thank you message
  const contactMessage = document.getElementById("contactMessage");
  contactMessage.innerText = "Thank you for contacting us, we will reach out to you!";
  contactMessage.style.display = "block";

  return false; // Prevent default form submission
};

// Function to validate form fields and show a popup if required fields are empty
const validateForm = () => {
  // Check if any required fields are empty
  const requiredFields = document.querySelectorAll('[required]');
  for (const field of requiredFields) {
    if (!field.value.trim()) {
      // Display a popup
      const popup = document.getElementById('popup');
      popup.style.display = 'block';
      setTimeout(() => {
        popup.style.display = 'none';
      }, 2000); // Hide the popup after 2 seconds
      return false; // Prevent form submission
    }
  }
  return true; // Allow form submission if all fields are filled
};

// Function to handle the submission of an order form
const postOrder = async (e) => {
  e.preventDefault();
  console.log('postOrder function called');

  // Gather selected items from checkboxes
  const selectedItems = [];
  const woodCheckbox = document.querySelector('input[name="woodCheckbox"]');
  const metalDiceCheckbox = document.querySelector('input[name="metalDiceCheckbox"]');
  const diceBagCheckbox = document.querySelector('input[name="diceBagCheckbox"]');

  if (woodCheckbox.checked) {
    selectedItems.push("Wood (150.00$)");
  }

  if (metalDiceCheckbox.checked) {
    selectedItems.push("Metal Dice (200.00$)");
  }

  if (diceBagCheckbox.checked) {
    selectedItems.push("Dice Bag (50.00$)");
  }

  // Create an object with order data
  const OrderData = {
    selectedItems: selectedItems.join(', '), // Convert the array to a comma-separated string
    fullName: document.getElementById("fname").value,
    Email: document.getElementById("email").value,
    Address: document.getElementById("adr").value,
    City: document.getElementById("city").value,
    State: document.getElementById("state").value,
    Zip: document.getElementById("zip").value,
    Country: document.getElementById("Country").value,
    // Add other form data as needed
  };

  try {
    // Send order data to the backend
    const response = await fetch("http://localhost:3000/buyForm_data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(OrderData),
    });

    if (response.ok) {
      // Order was successful, show a success message
      const buyMessage = document.getElementById("buyMessage");
      buyMessage.style.display = "block";
      document.getElementById("buyForm").style.display = "none";
    } else {
      console.error("Error sending data to the backend.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

// Event listener for DOMContentLoaded to set up form handling
document.addEventListener("DOMContentLoaded", () => {
  // Check if the buyForm exists on this page
  const buyForm = document.getElementById("buyForm");
  if (buyForm) {
    buyForm.addEventListener("submit", (e) => {
      if (!validateForm()) {
        e.preventDefault(); // Prevent form submission if validation fails
      } else {
        postOrder(e);
      }
    });
  }

  // Check if the contactForm exists on this page
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault(); // Prevent the default form submission

      // Get the contactMessage element
      const contactMessage = document.getElementById("contactMessage");

      // Show the message
      contactMessage.style.display = "contactMessage";

      // Optionally, you can reset the form after displaying the message
      contactForm.reset();
    });
  }
});