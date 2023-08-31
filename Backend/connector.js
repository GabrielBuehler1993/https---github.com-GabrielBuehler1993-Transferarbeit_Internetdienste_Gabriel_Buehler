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

const postUser = async () => {
    document.getElementById("userForm").style.display = "none";
    document.getElementById("message").innerText = "Thank you for contacting us, we will reach out to you!";
  };
  
  document.addEventListener("DOMContentLoaded", () => {
    const userForm = document.getElementById("userForm");
    userForm.addEventListener("submit", (e) => {
      e.preventDefault();
      postUser();
    });
  });
  
document.addEventListener("DOMContentLoaded", () => {
  const userForm = document.getElementById("userForm");
  userForm.addEventListener("submit", (e) => {
    e.preventDefault();
    postUser();
  });
});

