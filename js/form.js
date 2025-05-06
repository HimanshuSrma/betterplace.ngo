document.getElementById("contactForm").addEventListener("submit", function(event) {
    debugger
    event.preventDefault(); // Prevent form from submitting the traditional way
    // Get form values
    const name = document.getElementById("name").value;
    const occupation = document.getElementById("occupation").value;
    const number = document.getElementById("number").value;
    const amount = document.getElementById("amount").value;

    // Check if any field is empty
    if (!name || !occupation || !amount || !number) {
      document.getElementById("messageStatus").innerHTML =
        "<p style='color:red;'>Please fill out all fields.</p>";
      return;
    }

    // Prepare data to be sent
    let data = {
        "Name": name,
        "Occupation": occupation,
        "Mobile Number": number,
        "Amount": amount,
    };
    // Use Fetch API to submit the form asynchronously (AJAX)
    fetch("https://formspree.io/f/myzwzpvj", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        if (data.ok) {
          // Success message
          document.getElementById("messageStatus").innerHTML =
            "<p style='color:green;'>Your message has been sent successfully!</p>";
          // Clear form after submission
          document.getElementById("contactForm").reset();
        } else {
          // Error message if submission failed
          document.getElementById("messageStatus").innerHTML =
            "<p style='color:red;'>There was an issue sending your message. Please try again later.</p>";
        }
      })
      .catch(error => {
        // Handle errors (like network issues)
        document.getElementById("messageStatus").innerHTML =
          "<p style='color:red;'>There was an error submitting the form. Please try again later.</p>";
      });
  });