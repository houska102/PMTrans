const activeSection = window.location.hash

window.onload = () => {
  if (activeSection) {
    document.querySelector('.main-nav a[href="' + activeSection + '"]').classList.add('active');
  }
}

const toggleMenu = () => {
  document.querySelector('.nav-links').classList.toggle('open');
  document.querySelector('.hamburger').classList.toggle('active');
  document.getElementById('menu-backdrop').classList.toggle('active');
}

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', function() {
    const isBackdropActive = document.getElementById('menu-backdrop').classList.contains('active');
    document.querySelector('.nav-links a.active')?.classList.remove('active');
    this.classList.add('active');
    if (isBackdropActive) {
      toggleMenu();
    }
  });
});

document.querySelector('.main-nav .logo').addEventListener('click', () => {
  document.querySelector('.nav-links a.active')?.classList?.remove('active');
  document.querySelector('.nav-links a[href="#logistika"]')?.classList?.add('active');
})

document.getElementById('menu-backdrop').addEventListener('click', toggleMenu)

document.querySelector('.hamburger').addEventListener('click', toggleMenu)