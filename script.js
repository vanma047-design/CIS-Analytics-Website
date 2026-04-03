document.addEventListener('DOMContentLoaded', () => {
    // 1. Single Page Application Navigation Logic
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.page-section');
    const triggerButtons = document.querySelectorAll('.nav-trigger'); 

    function navigateTo(targetId) {
        // Hide all sections
        sections.forEach(section => {
            section.classList.remove('active');
        });

        // Show target section
        const targetSection = document.getElementById(targetId);
        if(targetSection) {
            targetSection.classList.add('active');
        }

        // Update Nav Link styling
        navLinks.forEach(link => {
            link.classList.remove('active');
            if(link.getAttribute('data-target') === targetId) {
                link.classList.add('active');
            }
        });

        // Trigger animations if navigating to home
        if(targetId === 'home') {
            runCounters();
        }
        
        // Scroll back to top smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Attach click events to navbar
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');
            navigateTo(targetId);
        });
    });

    // Attach click events to CTA buttons on homepage
    triggerButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = btn.getAttribute('data-target');
            navigateTo(targetId);
        });
    });

    // 2. Data Counter Animation Logic
    function runCounters() {
        const counters = document.querySelectorAll('.counter');
        
        counters.forEach(counter => {
            counter.innerText = '0'; // reset counter
            const updateCounter = () => {
                const target = +counter.getAttribute('data-target');
                const current = +counter.innerText;
                
                // Adjust speed: higher divisor = slower animation
                const increment = target / 30; 
                
                if (current < target) {
                    counter.innerText = `${Math.ceil(current + increment)}`;
                    setTimeout(updateCounter, 35);
                } else {
                    counter.innerText = target;
                }
            };
            updateCounter();
        });
    }

    // Run counters on initial page load
    runCounters();
});