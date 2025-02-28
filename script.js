document.addEventListener('DOMContentLoaded', function() {
    // Apply configuration
    applyConfig();
    
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mainNav.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.main-nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuToggle.classList.remove('active');
                mainNav.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            if (!targetId) return;
            
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Simple animation for traits
    const traitElements = document.querySelectorAll('.trait');
    let currentTraitIndex = 0;
    
    // Only run the animation if there are trait elements and traits in config
    if (traitElements.length > 0 && config.traits && config.traits.length > 0) {
        // Initialize with the first trait
        traitElements.forEach(element => {
            element.textContent = config.traits[0];
        });
        
        // Change traits every 3 seconds
        setInterval(() => {
            currentTraitIndex = (currentTraitIndex + 1) % config.traits.length;
            
            traitElements.forEach(element => {
                // Fade out
                element.style.opacity = 0;
                
                // Change text and fade in after a short delay
                setTimeout(() => {
                    element.textContent = config.traits[currentTraitIndex];
                    element.style.opacity = 1;
                }, 300);
            });
        }, 3000);
    }

    // Rainbow button animation
    const rainbowBtn = document.querySelector('.rainbow-btn');
    rainbowBtn.addEventListener('click', () => {
        rainbowBtn.classList.remove('animate');
        // Trigger reflow
        void rainbowBtn.offsetWidth;
        rainbowBtn.classList.add('animate');
    });

    document.querySelectorAll('.rainbow-btn').forEach(button => {
        button.addEventListener('click', () => {
            button.style.background = 'linear-gradient(45deg, violet, indigo, blue, green, yellow, orange, red)';
            button.style.backgroundSize = '400% 400%';
            button.classList.add('rainbow-active');
            
            setTimeout(() => {
                button.style.background = '';
                button.classList.remove('rainbow-active');
            }, 2000);
        });
    });
});

// Function to apply configuration from config.js
function applyConfig() {
    if (typeof config === 'undefined') {
        console.error('Configuration not found. Make sure config.js is loaded before script.js');
        return;
    }
    
    // Set page title
    document.title = config.name + ' - Personal Website';
    
    // Update name in all instances
    const nameElements = document.querySelectorAll('.name');
    if (nameElements.length > 0 && config.name) {
        nameElements.forEach(element => {
            element.textContent = config.name;
        });
    }
    
    // Hero section
    if (config.hero) {
        const expertiseElement = document.getElementById('expertise');
        if (expertiseElement && config.hero.expertise) {
            expertiseElement.textContent = config.hero.expertise;
        }
        
        const subtitleElement = document.getElementById('subtitle');
        if (subtitleElement && config.hero.subtitle) {
            subtitleElement.textContent = config.hero.subtitle;
        }
        
        // Hero tags
        const heroTagsElement = document.getElementById('hero-tags');
        if (heroTagsElement && config.hero.tags && config.hero.tags.length > 0) {
            heroTagsElement.innerHTML = '';
            config.hero.tags.forEach(tag => {
                const tagElement = document.createElement('span');
                tagElement.className = 'tag';
                tagElement.textContent = tag;
                heroTagsElement.appendChild(tagElement);
            });
        }
    }
    
    // Skills section
    if (config.skills) {
        const skillsDescriptionElement = document.getElementById('skills-description');
        if (skillsDescriptionElement && config.skills.description) {
            skillsDescriptionElement.textContent = config.skills.description;
        }
        
        // Skills tags
        const skillsTagsElement = document.getElementById('skills-tags');
        if (skillsTagsElement && config.skills.tags && config.skills.tags.length > 0) {
            skillsTagsElement.innerHTML = '';
            config.skills.tags.forEach(tag => {
                const tagElement = document.createElement('span');
                tagElement.className = 'tag';
                tagElement.textContent = tag;
                skillsTagsElement.appendChild(tagElement);
            });
        }
    }
    
    // About section
    if (config.about) {
        const agencyLinkElement = document.getElementById('agency-link');
        if (agencyLinkElement && config.about.agency) {
            agencyLinkElement.textContent = config.about.agency.name;
            agencyLinkElement.href = config.about.agency.url;
        }
        
        const agencyDescriptionElement = document.getElementById('agency-description');
        if (agencyDescriptionElement && config.about.description) {
            agencyDescriptionElement.textContent = config.about.description;
        }
        
        // About tags
        const aboutTagsElement = document.getElementById('about-tags');
        if (aboutTagsElement && config.about.tags && config.about.tags.length > 0) {
            aboutTagsElement.innerHTML = '';
            config.about.tags.forEach(tag => {
                const tagElement = document.createElement('span');
                tagElement.className = 'tag';
                tagElement.textContent = tag;
                aboutTagsElement.appendChild(tagElement);
            });
        }
    }
    
    // Contact section
    if (config.contact) {
        // Contact links
        const contactLinksElement = document.getElementById('contact-links');
        if (contactLinksElement && config.contact.links && config.contact.links.length > 0) {
            contactLinksElement.innerHTML = '';
            config.contact.links.forEach(link => {
                const linkElement = document.createElement('a');
                linkElement.className = 'contact-link';
                linkElement.textContent = link.name;
                linkElement.href = link.url;
                contactLinksElement.appendChild(linkElement);
            });
        }
        
        // Contact info
        const contactInfoElement = document.getElementById('contact-info');
        if (contactInfoElement && config.contact.info && config.contact.info.length > 0) {
            contactInfoElement.innerHTML = '';
            config.contact.info.forEach(info => {
                const infoElement = document.createElement('p');
                infoElement.textContent = info;
                contactInfoElement.appendChild(infoElement);
            });
        }
        
        // Footer
        if (config.contact.footer) {
            const footerTextElement = document.getElementById('footer-text');
            if (footerTextElement && config.contact.footer.text) {
                footerTextElement.textContent = config.contact.footer.text;
            }
            
            const footerLinkElement = document.getElementById('footer-link');
            if (footerLinkElement && config.contact.footer.agency) {
                footerLinkElement.textContent = config.contact.footer.agency.name;
                footerLinkElement.href = config.contact.footer.agency.url;
            }
        }
    }
}