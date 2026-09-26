
document.addEventListener('DOMContentLoaded', () => {
    /* Logika untuk membuka dan menutup menu navigasi pada tampilan mobile */
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        menuToggle.classList.toggle('toggle-active');
    });

    /* Fungsi Smooth Scrolling untuk navigasi antar section */
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

    /* Efek perubahan tampilan Navbar saat halaman di-scroll */
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.background = 'rgba(0,0,0,0.95)';
        } else {
            header.style.padding = '20px 0';
            header.style.background = 'rgba(0,0,0,0.8)';
        }
    });


    /* Contact Form Handler (Point 5) */
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');

            if (name && email && message) {
                const subject = `Collaboration Inquiry from ${name}`;
                const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
                window.location.href = `mailto:muhamad.idris4357@smp.belajar.id?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                contactForm.reset();
            } else {
                alert('Please fill in all fields.');
            }
        });
    }


    /* bikin tampilan 3d di bagian tools dan lain-lain agar bisa gerak */
    const revealElements = document.querySelectorAll('.about-item, .skill-entry, .project-item, .section-header, .tool-item');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => { entry.target.classList.add('reveal-active'); }, index * 100);
            }
        });
    }, { threshold: 0.1 });
    revealElements.forEach(el => revealObserver.observe(el));

    // ini untuk bikin tampilan 3d 
    const toolCards = document.querySelectorAll('.tool-card');
    toolCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top;
            const rotateX = (y - rect.height/2) / 10;
            const rotateY = (rect.width/2 - x) / 10;
            card.style.transition = 'none';
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transition = 'transform 0.4s ease';
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)`;
        });
    });

});