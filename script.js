   // Initialize AOS
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });

        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Form submission
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const inputs = this.querySelectorAll('input, textarea');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#dc3545';
                } else {
                    input.style.borderColor = '#e9ecef';
                }
            });
            
            if (!isValid) {
                alert('Please fill in all required fields');
                return;
            }
            
            const button = this.querySelector('.btn-primary-custom');
            const originalText = button.innerHTML;
            
            button.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
            button.disabled = true;
            
            setTimeout(() => {
                button.innerHTML = '<i class="fas fa-check me-2"></i>Message Sent!';
                button.style.background = 'linear-gradient(45deg, #28a745, #20c997)';
                
                setTimeout(() => {
                    button.innerHTML = originalText;
                    button.disabled = false;
                    button.style.background = 'var(--primary-gradient)';
                    this.reset();
                }, 3000);
            }, 2000);
        });

        // Navbar scroll effect
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            // Back to top button
            const backToTop = document.querySelector('.back-to-top');
            if (window.scrollY > 300) {
                backToTop.classList.add('active');
            } else {
                backToTop.classList.remove('active');
            }
        });

        // Back to top functionality
        document.querySelector('.back-to-top').addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Newsletter signup
        document.querySelector('.newsletter-form button').addEventListener('click', function() {
            const emailInput = document.querySelector('.newsletter-form input');
            if (emailInput.value && emailInput.value.includes('@')) {
                const button = this;
                const originalText = button.innerHTML;
                
                button.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Subscribing...';
                button.disabled = true;
                
                setTimeout(() => {
                    button.innerHTML = '<i class="fas fa-check me-2"></i>Subscribed!';
                    button.style.background = 'linear-gradient(45deg, #28a745, #20c997)';
                    
                    setTimeout(() => {
                        button.innerHTML = originalText;
                        button.disabled = false;
                        button.style.background = 'var(--primary-gradient)';
                        emailInput.value = '';
                    }, 3000);
                }, 2000);
            } else {
                emailInput.style.borderColor = '#dc3545';
                setTimeout(() => {
                    emailInput.style.borderColor = '#e9ecef';
                }, 2000);
            }
        });

        // Loading screen
        window.addEventListener('load', function() {
            const loadingScreen = document.querySelector('.loading-screen');
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
            }, 1000);
        });