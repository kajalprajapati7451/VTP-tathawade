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
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect + back-to-top visibility
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    const backToTop = document.querySelector('.back-to-top');
    if (window.scrollY > 300) {
        backToTop.classList.add('active');
    } else {
        backToTop.classList.remove('active');
    }
});

// Back to top
document.querySelector('.back-to-top').addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ── Math Captcha ──
let captchaCorrectAnswer = 0;

function generateCaptcha() {
    const a = Math.floor(Math.random() * 9) + 1;
    const b = Math.floor(Math.random() * 9) + 1;
    captchaCorrectAnswer = a + b;
    document.getElementById('captchaQuestion').textContent = a + ' + ' + b;
    const answerInput = document.getElementById('captchaAnswer');
    if (answerInput) {
        answerInput.value = '';
        answerInput.style.borderColor = '#e9ecef';
    }
}

generateCaptcha();

document.getElementById('refreshCaptcha').addEventListener('click', generateCaptcha);

// ── Contact Form Submission ──
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name         = document.getElementById('fullName');
    const email        = document.getElementById('email');
    const phone        = document.getElementById('phone');
    const bhk          = document.getElementById('bhkType');
    const captchaInput = document.getElementById('captchaAnswer');
    const formMessage  = document.getElementById('formMessage');

    // Reset field borders
    [name, email, phone, bhk, captchaInput].forEach(el => {
        el.style.borderColor = '#e9ecef';
    });

    let isValid = true;
    const errors = [];

    if (!name.value.trim()) {
        name.style.borderColor = '#dc3545';
        isValid = false;
        errors.push('name');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim() || !emailRegex.test(email.value.trim())) {
        email.style.borderColor = '#dc3545';
        isValid = false;
        errors.push('email');
    }

    if (!phone.value.trim()) {
        phone.style.borderColor = '#dc3545';
        isValid = false;
        errors.push('phone');
    }

    if (!bhk.value) {
        bhk.style.borderColor = '#dc3545';
        isValid = false;
        errors.push('bhk');
    }

    const userAnswer = parseInt(captchaInput.value, 10);
    if (isNaN(userAnswer) || userAnswer !== captchaCorrectAnswer) {
        captchaInput.style.borderColor = '#dc3545';
        isValid = false;
        errors.push('captcha');
    }

    if (!isValid) {
        const captchaWrong = errors.includes('captcha') && errors.length === 1;
        formMessage.className = 'form-message error';
        formMessage.textContent = captchaWrong
            ? 'Incorrect security answer. Please try again.'
            : 'Please fill in all required fields and answer the security question correctly.';
        formMessage.classList.remove('d-none');
        return;
    }

    formMessage.classList.add('d-none');

    const button = this.querySelector('.btn-primary-custom');
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
    button.disabled = true;

    setTimeout(() => {
        button.innerHTML = '<i class="fas fa-check me-2"></i>Message Sent!';
        button.style.background = 'linear-gradient(45deg, #28a745, #20c997)';

        formMessage.className = 'form-message success';
        formMessage.textContent = 'Thank you! Our team will get in touch with you shortly.';
        formMessage.classList.remove('d-none');

        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
            button.style.background = '';
            this.reset();
            generateCaptcha();
            formMessage.classList.add('d-none');
        }, 3500);
    }, 1500);
});
