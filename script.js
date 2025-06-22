const activeSection = window.location.hash

window.onload = () => {
  const navLinks = document.querySelectorAll('.nav-links a');

  const selectMenuItem = (sectionId) => {
    navLinks.forEach(link => {
      if (link.getAttribute('href') === sectionId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    })
  }

  if (activeSection) {
    selectMenuItem(activeSection);
  }
  

  const toggleMenu = () => {
    document.querySelector('.nav-links').classList.toggle('open');
    document.querySelector('.hamburger').classList.toggle('active');
    document.getElementById('menu-backdrop').classList.toggle('active');
  }

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function() {
      const isBackdropActive = document.getElementById('menu-backdrop').classList.contains('active');
      if (isBackdropActive) {
        toggleMenu();
      }
    });
  });

  document.getElementById('menu-backdrop').addEventListener('click', toggleMenu)

  document.querySelector('.hamburger').addEventListener('click', toggleMenu)


  const sections = document.querySelectorAll('#main-content>section');
  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    for (let section of sections) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop - 100 && scrollPosition < sectionTop + sectionHeight) {
        selectMenuItem(`#${sectionId}`);
      }
    }
  });

}
