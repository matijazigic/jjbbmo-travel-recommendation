// Dynamically load the navbar
document.addEventListener("DOMContentLoaded", () => {
    fetch('./navbar.html')
      .then(response => response.text())
      .then(html => {
        document.getElementById('navbar-container').innerHTML = html;
  
        // Highlight the active link
        const currentPath = window.location.pathname.split('/').pop();
        const navLinks = document.querySelectorAll('nav ul li a');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `./${currentPath}`) {
            link.classList.add('active');
          }
        });

        document.dispatchEvent(new Event('navbarLoaded'));
      });
    });