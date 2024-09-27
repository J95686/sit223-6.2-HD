document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Here you can add code to handle form submission, like sending an email or saving to a database
    alert('Thank you for your message!');
    
    // Reset the form
    this.reset();
});
