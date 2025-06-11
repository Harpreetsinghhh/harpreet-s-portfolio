  
        // Form submission handler
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const button = this.querySelector('.submit-button');
            const originalText = button.innerHTML;
            
            // Show loading state
            button.innerHTML = 'Sending... <span class="arrow-icon">⏳</span>';
            button.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                button.innerHTML = 'Message Sent! <span class="arrow-icon">✓</span>';
                button.style.background = '#28a745';
                
                setTimeout(() => {
                    button.innerHTML = originalText;
                    button.style.background = '#ff4444';
                    button.disabled = false;
                    this.reset();
                }, 2000);
            }, 1500);
        });

        // Input focus effects
        const inputs = document.querySelectorAll('.form-input, .form-textarea');
        
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.style.transform = 'scale(1.02)';
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.style.transform = 'scale(1)';
            });
        });

        // Form validation
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.value.trim() === '' && this.hasAttribute('required')) {
                    this.style.borderColor = '#ff4444';
                } else {
                    this.style.borderColor = '#333';
                }
            });
            
            input.addEventListener('input', function() {
                if (this.style.borderColor === 'rgb(255, 68, 68)') {
                    this.style.borderColor = '#333';
                }
            });
        });

        // Floating animation for the section
        setInterval(() => {
            const section = document.querySelector('.contact-section');
            section.style.transform = 'translateY(-5px)';
            setTimeout(() => {
                section.style.transform = 'translateY(0px)';
            }, 2000);
        }, 4000);
     
     
        document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Only handle internal anchor links
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

        // Animate skill bars on scroll
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillFills = entry.target.querySelectorAll('.skill-fill');
                    skillFills.forEach(fill => {
                        const width = fill.style.width;
                        fill.style.width = '0%';
                        setTimeout(() => {
                            fill.style.width = width;
                        }, 200);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const skillsSection = document.querySelector('.skills-section');
        if (skillsSection) {
            observer.observe(skillsSection);
        }

        // Animate stats counters
        const statsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statNumbers = entry.target.querySelectorAll('.stat-number');
                    statNumbers.forEach(stat => {
                        const text = stat.textContent;
                        const number = parseInt(text.replace(/[^\d]/g, ''));
                        const suffix = text.replace(/[\d,]/g, '');
                        
                        let currentNumber = 0;
                        const increment = number / 50;
                        
                        const timer = setInterval(() => {
                            currentNumber += increment;
                            if (currentNumber >= number) {
                                currentNumber = number;
                                clearInterval(timer);
                            }
                            
                            let displayNumber = Math.floor(currentNumber);
                            if (displayNumber >= 1000) {
                                displayNumber = (displayNumber / 1000).toFixed(displayNumber % 1000 === 0 ? 0 : 1) + 'k';
                            }
                            stat.textContent = displayNumber + suffix.replace('k', '');
                        }, 30);
                    });
                    statsObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const experienceSection = document.querySelector('.experience-section');
        if (experienceSection) {
            statsObserver.observe(experienceSection);
        }
     
    
     
        const hamburger = document.getElementById('hamburger');
        const sideMenu = document.getElementById('sideMenu');
        const overlay = document.getElementById('overlay');

        function toggleMenu() {
            hamburger.classList.toggle('active');
            sideMenu.classList.toggle('active');
            overlay.classList.toggle('active');
            document.body.style.overflow = sideMenu.classList.contains('active') ? 'hidden' : 'auto';
        }

        function closeMenu() {
            hamburger.classList.remove('active');
            sideMenu.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        function toggleSubmenu(button) {
            const submenu = button.nextElementSibling;
            const isActive = button.classList.contains('active');
            
            // Close all other submenus
            document.querySelectorAll('.nav-item.has-submenu').forEach(item => {
                if (item !== button) {
                    item.classList.remove('active');
                    item.nextElementSibling.classList.remove('active');
                }
            });
            
            // Toggle current submenu
            button.classList.toggle('active');
            submenu.classList.toggle('active');
        }

        // Event listeners
        hamburger.addEventListener('click', toggleMenu);
        overlay.addEventListener('click', closeMenu);

        // Close menu when clicking menu links
        document.querySelectorAll('.nav-item:not(.has-submenu)').forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && sideMenu.classList.contains('active')) {
                closeMenu();
            }
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && sideMenu.classList.contains('active')) {
                closeMenu();
            }
        });
     

//contact us

// Contact Form Handler - Simple Implementation
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                subject: formData.get('subject'),
                message: formData.get('message')
            };

            // Get submit button
            const submitBtn = contactForm.querySelector('button[type="submit"]') || 
                             contactForm.querySelector('input[type="submit"]');
            
            // Show loading state
            const originalText = submitBtn.textContent || submitBtn.value;
            updateButtonState(submitBtn, 'Sending...', true);

            try {
                // Send to your PHP backend
                const response = await fetch('send-email.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                const result = await response.json();

                if (result.success) {
                    showAlert('✅ Email sent successfully!', 'success');
                    contactForm.reset();
                } else {
                    showAlert('❌ Failed to send email: ' + result.message, 'error');
                }

            } catch (error) {
                console.error('Error:', error);
                showAlert('❌ Network error. Please try again.', 'error');
            } finally {
                // Restore button
                updateButtonState(submitBtn, originalText, false);
            }
        });
    }
});

// Helper functions
function updateButtonState(button, text, disabled) {
    if (button.textContent !== undefined) {
        button.textContent = text;
    } else {
        button.value = text;
    }
    button.disabled = disabled;
}

function showAlert(message, type) {
    // Remove existing alerts
    const existing = document.querySelector('.alert-message');
    if (existing) existing.remove();

    // Create alert
    const alert = document.createElement('div');
    alert.className = 'alert-message';
    alert.textContent = message;
    alert.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        font-weight: bold;
        z-index: 9999;
        animation: slideIn 0.3s ease;
        ${type === 'success' ? 'background: #28a745;' : 'background: #dc3545;'}
    `;

    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);

    document.body.appendChild(alert);

    // Auto remove after 4 seconds
    setTimeout(() => {
        if (alert.parentNode) {
            alert.style.animation = 'slideIn 0.3s ease reverse';
            setTimeout(() => alert.remove(), 300);
        }
    }, 4000);
}