const activeSection = window.location.hash

window.onload = () => {
  if (activeSection) {
    document.querySelector('.main-nav a[href="' + activeSection + '"]').classList.add('active');
  }
}

document.querySelectorAll('.main-nav a').forEach(link => {
  link.addEventListener('click', function() {
    document.querySelector('.main-nav a.active').classList.remove('active');
    this.classList.add('active');
  });
});