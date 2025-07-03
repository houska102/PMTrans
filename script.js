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

document.addEventListener('DOMContentLoaded', function () {
    const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
    if (galleryItems.length === 0) return;

    let currentIndex = 0;

    // Create the HTML content for the lightbox just once
    const lightboxElem = document.createElement('div');
    lightboxElem.innerHTML = `
        <div class="lightbox-content-wrapper">
            <img class="lightbox-img" src="">
            <button class="lightbox-control lightbox-prev" style="display: none;"><</button>
            <button class="lightbox-control lightbox-next" style="display: none;">></button>
        </div>
    `;
    
    const lightboxImg = lightboxElem.querySelector('.lightbox-img');
    const prevButton = lightboxElem.querySelector('.lightbox-prev');
    const nextButton = lightboxElem.querySelector('.lightbox-next');

    const lightbox = basicLightbox.create(lightboxElem, {
        onShow: (instance) => {
            // Add keyboard navigation
            document.addEventListener('keydown', onKeyDown);
        },
        onClose: (instance) => {
            // Remove keyboard navigation
            document.removeEventListener('keydown', onKeyDown);
        }
    });
    
    // Function to update the image and buttons
    function updateLightbox(index) {
        const item = galleryItems[index];
        lightboxImg.src = item.href;
        currentIndex = index;

        // Update button visibility
        prevButton.style.display = index > 0 ? 'block' : 'none';
        nextButton.style.display = index < galleryItems.length - 1 ? 'block' : 'none';
    }

    // Keyboard navigation handler
    function onKeyDown(e) {
        if (e.key === 'ArrowLeft') {
            if(currentIndex > 0) prevButton.click();
        } else if (e.key === 'ArrowRight') {
            if(currentIndex < galleryItems.length - 1) nextButton.click();
        } else if (e.key === 'Escape') {
            lightbox.close();
        }
    }

    // Add click listeners to gallery items
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            updateLightbox(index);
            lightbox.show();
        });
    });

    // Add click listeners for the lightbox controls
    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            updateLightbox(currentIndex - 1);
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentIndex < galleryItems.length - 1) {
            updateLightbox(currentIndex + 1);
        }
    });
});