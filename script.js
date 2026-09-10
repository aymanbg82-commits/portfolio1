const portfolioConfig = {
  formEndpoint: '',
};

const yearElement = document.getElementById('year');

if (yearElement) {
  const currentYear = new Date().getFullYear();
  yearElement.textContent = String(currentYear);
}

const menuToggle = document.querySelector('.menu-toggle');
const menuPanel = document.querySelector('.menu-panel');
const menuLinks = document.querySelectorAll('.menu-panel a[data-section]');
const navigableSections = document.querySelectorAll('main section[id]');

if (menuToggle && menuPanel) {
  const setMenuOpen = (isOpen) => {
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    menuPanel.setAttribute('aria-hidden', String(!isOpen));
    menuPanel.classList.toggle('is-open', isOpen);
  };

  menuToggle.addEventListener('click', () => {
    setMenuOpen(menuToggle.getAttribute('aria-expanded') !== 'true');
  });

  menuLinks.forEach((link) => {
    link.addEventListener('click', () => setMenuOpen(false));
  });

  document.addEventListener('click', (event) => {
    if (!menuPanel.contains(event.target) && !menuToggle.contains(event.target)) {
      setMenuOpen(false);
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      setMenuOpen(false);
      menuToggle.focus();
    }
  });

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        menuLinks.forEach((link) => {
          link.classList.toggle('active', link.dataset.section === entry.target.id);
        });
      }
    });
  }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });

  navigableSections.forEach((section) => sectionObserver.observe(section));
}

const contactForm = document.getElementById('contactForm');
const formStatus = document.querySelector('.form-status');

if (contactForm) {
  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = (formData.get('name') || '').toString().trim();
    const email = (formData.get('email') || '').toString().trim();
    const subject = (formData.get('subject') || '').toString().trim();
    const message = (formData.get('message') || '').toString().trim();

    if (!name || !email || !subject || !message) {
      formStatus.textContent = 'Please complete all fields before sending your message.';
      formStatus.style.color = '#fbbf24';
      return;
    }

    const payload = {
      name,
      email,
      subject,
      message,
    };

    const formEndpoint = portfolioConfig.formEndpoint || '';
    const isPlaceholder = formEndpoint.includes('your-form-id');

    if (!isPlaceholder) {
      try {
        const response = await fetch(formEndpoint, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          formStatus.textContent = 'Your message was sent successfully. Thank you for reaching out!';
          formStatus.style.color = '#c1e1c1';
          contactForm.reset();
          return;
        }
      } catch (error) {
        console.error('Form submission failed:', error);
      }
    }

    const to = 'aymanbaig4@gmail.com';
    const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0ASubject: ${subject}%0D%0A%0D%0AMessage:%0D%0A${message}`;
    window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${body}`;

    formStatus.textContent = 'Your message has been prepared in your email app. Thank you for reaching out!';
    formStatus.style.color = '#c1e1c1';
    contactForm.reset();
  });
}
