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