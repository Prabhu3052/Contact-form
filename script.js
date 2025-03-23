document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission
  
    // Get form data
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
  
    // Validate inputs
    if (!name || !email || !message) {
      document.getElementById('errorMessage').classList.remove('hidden');
      document.getElementById('successMessage').classList.add('hidden');
      return;
    }
  
    // Hide error message if previously shown
    document.getElementById('errorMessage').classList.add('hidden');
  
    // Prepare data for submission
    const formData = {
      name: name,
      email: email,
      message: message,
    };
  
    // Send data using Fetch API
    fetch('http://localhost:3000/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          // Display success message
          document.getElementById('successMessage').classList.remove('hidden');
          document.getElementById('contactForm').reset(); // Clear the form
        } else {
          throw new Error('Network response was not ok.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('There was a problem with your submission. Please try again.');
      });
  });