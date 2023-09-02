const users = [];

const getUsers = async () => {
  // API Stuff
  const response = await fetch("http://localhost:3000/users");
  users = await response.json();
  // UI stuff
  const usersList = document.getElementById("usersList");
  usersList.innerHTML = "";
  for (const user of users) {
    const li = document.createElement("li");
    li.innerHTML = `${user.id} - ${user.username} - ${user.active}`;
    usersList.appendChild(li);
  }
};

const postContact = async () => {
    const contactForm = document.getElementById("contactForm");
    contactForm.style.display = "none"; // Hide the form inputs

    const contactMessage = document.getElementById("contactMessage");
    contactMessage.innerText = "Thank you for contacting us, we will reach out to you!";
    contactMessage.style.display = "block"; // Show the message

    return false; // Prevent default form submission
};

const validateForm = () => {
  // Check if any required fields are empty
  const requiredFields = document.querySelectorAll('[required]');
  for (const field of requiredFields) {
    if (!field.value.trim()) {
      // Display the popup
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

const postOrder = async (e) => { 
    e.preventDefault(); 
    console.log('postOrder function called')
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
  
    const OrderData = {
      selectedItems: selectedItems.join(', '), // Convert the array to a comma-separated string
  
      // Add the rest of the form fields
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
        const response = await fetch("http://localhost:3000/buyForm_data", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(OrderData),
        });
    
        if (response.ok) {
          // Order was successful, show the message
          const buyMessage = document.getElementById("buyMessage");
          buyMessage.style.display = "block"; // Show the message
          document.getElementById("buyForm").style.display = "none";
        } else {
          console.error("Error sending data to the backend.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

 
    
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
            const contactForm = document.getElementById("contactForm");
            contactForm.style.display = "none"; // Hide the form inputs
      
            const contactMessage = document.getElementById("contactMessage");
            contactMessage.innerText = "Thank you for contacting us, we will reach out to you!";
            contactMessage.style.display = "block"; // Show the message
          });
        }
      });