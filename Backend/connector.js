let users = [];

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

const response = await fetch("http://localhost:3000/second_form_data", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(secondFormData),
  });

  

const postUser = async () => {
    document.getElementById("userForm").style.display = "none";
    document.getElementById("message").innerText = "Thank you for contacting us, we will reach out to you!";
  };

  const postOrder = async () => {
    document.getElementById("buyForm").style.display = "none";
    document.getElementById("buyMessage").innerText = "Thank you for your order, we will reach out to you!";
  };

  
  document.addEventListener("DOMContentLoaded", () => {
  // First Form Handling
  const firstForm = document.getElementById("userForm");
  firstForm.addEventListener("submit", (e) => {
    e.preventDefault();
    postUser();
  });

  // Second Form Handling
  const secondForm = document.getElementById("buyForm");
  secondForm.addEventListener("submit", (e) => {
    e.preventDefault();
    postSecondFormData(); // Create a new function for this
  });
});



