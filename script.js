// Toggle mobile nav menu
function toggleMenu() {
  const menu = document.getElementById('nav-menu');
  menu.classList.toggle('show');
}

// Simple contact form validation
function validateForm() {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (name === '' || email === '' || message === '') {
    alert('Please fill in all fields before submitting.');
    return false;
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Please enter a valid email address.');
    return false;
  }

  alert('Thank you for your message, ' + name + '!');
  return true; // Allow form submission (for now; no backend)
}