// DOM Elements
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contactForm');
const projectCards = document.querySelectorAll('.project-card');
const modal = document.getElementById('projectModal');
const modalContent = document.getElementById('modalContent');
const closeModal = document.querySelector('.close');

// Project data for modal
const projectData = {
    'submission-reminder': {
        title: 'Submission Reminder App',
        description: 'A comprehensive student assignment management system built with Shell scripting. This application helps students track their academic deadlines and monitor submission status in real-time.',
        features: [
            'Automated deadline tracking and notifications',
            'Student submission status monitoring',
            'Interactive command-line interface',
            'Data persistence and reporting',
            'Multi-user support with individual tracking'
        ],
        technologies: ['Shell Scripting', 'Bash', 'Linux', 'File System Management'],
        github: 'https://github.com/sahraomar1/submission_reminder_app_Sahraomar1',
        image: 'fas fa-calendar-check'
    },
    'python-projects': {
        title: 'Python Programming Portfolio',
        description: 'A comprehensive collection of Python projects demonstrating proficiency in various programming concepts and paradigms.',
        features: [
            'Object-Oriented Programming implementations',
            'Data structures and algorithms',
            'Network programming and API integration',
            'File handling and data processing',
            'Advanced Python concepts and best practices'
        ],
        technologies: ['Python', 'OOP', 'Data Structures', 'Networking', 'File I/O'],
        github: 'https://github.com/sahraomar1/alu-higher_level_programming',
        image: 'fab fa-python'
    }
};

// Navigation functionality
function toggleNav() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

function closeNav() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}

// Navbar scroll effect
function handleScroll() {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    }
}

// Smooth scrolling for navigation links
function smoothScroll(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
        const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
    
    closeNav();
}

// Form validation and submission
function validateForm(formData) {
    const errors = [];
    
    // Name validation
    if (!formData.get('name').trim()) {
        errors.push('Name is required');
    } else if (formData.get('name').trim().length < 2) {
        errors.push('Name must be at least 2 characters long');
    }
    
    // Email validation
    const email = formData.get('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        errors.push('Email is required');
    } else if (!emailRegex.test(email)) {
        errors.push('Please enter a valid email address');
    }
    
    // Subject validation
    if (!formData.get('subject').trim()) {
        errors.push('Subject is required');
    } else if (formData.get('subject').trim().length < 5) {
        errors.push('Subject must be at least 5 characters long');
    }
    
    // Message validation
    if (!formData.get('message').trim()) {
        errors.push('Message is required');
    } else if (formData.get('message').trim().length < 10) {
        errors.push('Message must be at least 10 characters long');
    }
    
    return errors;
}

function showFormErrors(errors) {
    // Remove existing error messages
    const existingErrors = document.querySelectorAll('.error-message');
    existingErrors.forEach(error => error.remove());
    
    // Create error container
    const errorContainer = document.createElement('div');
    errorContainer.className = 'error-container';
    errorContainer.style.cssText = `
        background: #fef2f2;
        border: 1px solid #fecaca;
        color: #dc2626;
        padding: 1rem;
        border-radius: 8px;
        margin-bottom: 1rem;
        font-size: 0.9rem;
    `;
    
    const errorTitle = document.createElement('h4');
    errorTitle.textContent = 'Please fix the following errors:';
    errorTitle.style.marginBottom = '0.5rem';
    errorContainer.appendChild(errorTitle);
    
    const errorList = document.createElement('ul');
    errorList.style.margin = '0';
    errorList.style.paddingLeft = '1.5rem';
    
    errors.forEach(error => {
        const li = document.createElement('li');
        li.textContent = error;
        errorList.appendChild(li);
    });
    
    errorContainer.appendChild(errorList);
    
    // Insert error container before the form
    contactForm.parentNode.insertBefore(errorContainer, contactForm);
    
    // Scroll to error container
    errorContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function showSuccessMessage() {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.error-container, .success-message');
    existingMessages.forEach(msg => msg.remove());
    
    const successContainer = document.createElement('div');
    successContainer.className = 'success-message';
    successContainer.style.cssText = `
        background: #f0fdf4;
        border: 1px solid #bbf7d0;
        color: #166534;
        padding: 1rem;
        border-radius: 8px;
        margin-bottom: 1rem;
        font-size: 0.9rem;
        text-align: center;
    `;
    
    successContainer.innerHTML = `
        <h4 style="margin-bottom: 0.5rem;">Message Sent Successfully!</h4>
        <p style="margin: 0;">Thank you for your message. I'll get back to you soon!</p>
    `;
    
    contactForm.parentNode.insertBefore(successContainer, contactForm);
    
    // Reset form
    contactForm.reset();
    
    // Scroll to success message
    successContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const errors = validateForm(formData);
    
    if (errors.length > 0) {
        showFormErrors(errors);
        return;
    }
    
    // Simulate form submission (in real implementation, this would send to a server)
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
        showSuccessMessage();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 2000);
}

// Modal functionality
function openModal(projectId) {
    const project = projectData[projectId];
    if (!project) return;
    
    modalContent.innerHTML = `
        <div style="text-align: center; margin-bottom: 2rem;">
            <i class="${project.image}" style="font-size: 4rem; color: #dc2626; margin-bottom: 1rem;"></i>
            <h2 style="color: #1f2937; margin-bottom: 1rem;">${project.title}</h2>
            <p style="color: #6b7280; line-height: 1.6;">${project.description}</p>
        </div>
        
        <div style="margin-bottom: 2rem;">
            <h3 style="color: #1f2937; margin-bottom: 1rem;">Key Features:</h3>
            <ul style="color: #6b7280; line-height: 1.6; padding-left: 1.5rem;">
                ${project.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
        </div>
        
        <div style="margin-bottom: 2rem;">
            <h3 style="color: #1f2937; margin-bottom: 1rem;">Technologies Used:</h3>
            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                ${project.technologies.map(tech => 
                    `<span style="background: #f3f4f6; color: #6b7280; padding: 0.3rem 0.8rem; border-radius: 15px; font-size: 0.9rem;">${tech}</span>`
                ).join('')}
            </div>
        </div>
        
        <div style="text-align: center;">
            <a href="${project.github}" target="_blank" style="
                background: #dc2626; 
                color: white; 
                padding: 12px 24px; 
                text-decoration: none; 
                border-radius: 8px; 
                font-weight: 600;
                display: inline-block;
                transition: all 0.3s ease;
            " onmouseover="this.style.background='#b91c1c'" onmouseout="this.style.background='#dc2626'">
                <i class="fab fa-github" style="margin-right: 0.5rem;"></i>
                View on GitHub
            </a>
        </div>
    `;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModalFunc() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Intersection Observer for animations
function createIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.about, .skills, .education, .experience, .projects, .contact');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
function initTypingAnimation() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 150);
    }
}

// Skill progress animation
function animateSkills() {
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            item.style.transition = 'all 0.5s ease';
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, 100);
        }, index * 100);
    });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Navigation events
    hamburger.addEventListener('click', toggleNav);
    navLinks.forEach(link => link.addEventListener('click', smoothScroll));
    
    // Form events
    contactForm.addEventListener('submit', handleFormSubmit);
    
    // Project card events
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project');
            openModal(projectId);
        });
    });
    
    // Modal events
    closeModal.addEventListener('click', closeModalFunc);
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModalFunc();
        }
    });
    
    // Scroll events
    window.addEventListener('scroll', handleScroll);
    
    // Initialize animations
    createIntersectionObserver();
    
    // Initialize typing animation after a short delay
    setTimeout(initTypingAnimation, 500);
    
    // Animate skills when skills section comes into view
    const skillsSection = document.querySelector('.skills');
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }
});

// Keyboard navigation for modal
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        closeModalFunc();
    }
});

// Smooth scroll for anchor links
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll handler
window.addEventListener('scroll', debounce(handleScroll, 10)); 