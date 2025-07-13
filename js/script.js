// Smooth scrolling per i link di navigazione
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll animations
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

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Header background on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(0, 0, 0, 0.95)';
    } else {
        header.style.background = 'rgba(0, 0, 0, 0.9)';
    }
});

// Animazione contatore per le statistiche
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(progress * target);
        
        if (target >= 1000) {
            element.textContent = (current / 1000).toFixed(0) + 'K+';
        } else {
            element.textContent = current + (target === 95 ? '%' : '+');
        }
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// Avvia l'animazione quando la sezione stats è visibile
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            const values = [10, 500, 50, 95];
            
            statNumbers.forEach((stat, index) => {
                setTimeout(() => {
                    animateCounter(stat, values[index]);
                }, index * 200);
            });
            
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('#stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Effetto particelle sul hero
function createParticle() {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = '4px';
    particle.style.height = '4px';
    particle.style.background = 'rgba(255, 255, 255, 0.5)';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.animation = `float ${Math.random() * 3 + 2}s linear infinite`;
    
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = '100%';
    
    document.querySelector('.hero').appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 5000);
}

// Crea particelle ogni 3 secondi
setInterval(createParticle, 3000);

// Gestione click sui video (placeholder)
document.querySelectorAll('.video-card').forEach(card => {
    card.addEventListener('click', () => {
        // Sostituisci con il link reale del video YouTube
        window.open('https://youtube.com/watch?v=EXAMPLE', '_blank');
    });
});

// Menu mobile toggle (per futuro sviluppo)
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// Gestione dei social links
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const platform = link.getAttribute('title').toLowerCase();
        
        // Sostituisci con i tuoi link reali
        const socialLinks = {
            'youtube': 'https://youtube.com/@tuocanale',
            'instagram': 'https://instagram.com/tuoprofilo',
            'twitter': 'https://twitter.com/tuoprofilo',
            'tiktok': 'https://tiktok.com/@tuoprofilo',
            'discord': 'https://discord.gg/tuoserver'
        };
        
        if (socialLinks[platform]) {
            window.open(socialLinks[platform], '_blank');
        }
    });
});

// Preloader (opzionale)
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Gestione errori immagini
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.style.display = 'none';
    });
});

// Lazy loading per le immagini (se necessario)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}