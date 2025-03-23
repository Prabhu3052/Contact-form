document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault(); 
  
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
  
    
    if (!name || !email || !message) {
      document.getElementById('errorMessage').classList.remove('hidden');
      document.getElementById('successMessage').classList.add('hidden');
      return;
    }
  
    
    document.getElementById('errorMessage').classList.add('hidden');
  
    
    const formData = {
      name: name,
      email: email,
      message: message,
    };
  
    
    fetch('http://localhost:3000/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          
          document.getElementById('successMessage').classList.remove('hidden');
          document.getElementById('contactForm').reset(); 
        } else {
          throw new Error('Network response was not ok.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('There was a problem with your submission. Please try again.');
      });
  });