const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.primary-navigation');

if (menuToggle && navigation) {
  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
    navigation.classList.toggle('is-open', !isOpen);
  });

  navigation.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open navigation');
      navigation.classList.remove('is-open');
    }
  });
}

document.querySelectorAll('[data-placeholder-link]').forEach((link) => {
  link.addEventListener('click', (event) => {
    if (link.getAttribute('href') === '#') event.preventDefault();
  });
});

document.querySelectorAll('[data-work-upload]').forEach((input) => {
  input.addEventListener('change', () => {
    const fileList = input.closest('.work-folder').querySelector('.uploaded-files');
    const files = Array.from(input.files || []);

    for (const file of files) {
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.href = URL.createObjectURL(file);
      link.download = file.name;
      link.textContent = file.name;
      link.title = 'Open or download ' + file.name;
      item.append(link);
      fileList.append(item);
    }

    input.value = '';
  });
});

const yearElement = document.querySelector('#current-year');
if (yearElement) yearElement.textContent = String(new Date().getFullYear());

const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.primary-navigation a');

if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      navLinks.forEach((link) => {
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.setAttribute('aria-current', 'location');
        } else {
          link.removeAttribute('aria-current');
        }
      });
    }
  }, { rootMargin: '-35% 0px -55% 0px' });

  sections.forEach((section) => sectionObserver.observe(section));
}
