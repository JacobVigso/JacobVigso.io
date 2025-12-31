// ========================
// PROJECT SWITCHING
// ========================

const projectTabs = document.querySelectorAll('.project-tab');
const projectDisplay = document.getElementById('project-display');

// Project content templates
const projectContent = {
  visconti: `
    <div class="visconti-demo">
      <nav class="visconti-nav">
        <div class="visconti-logo">Visconti</div>
        <div class="visconti-nav-links">
          <a href="#">Collections</a>
          <a href="#">Skincare</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </div>
        <div class="visconti-cart">
          <i class='bx bx-shopping-bag'></i>
          <span class="cart-count">0</span>
        </div>
      </nav>
      
      <div class="visconti-hero">
        <img src="/Images/beauty-background.jpg" alt="Luxury Beauty">
        <div class="visconti-hero-overlay">
          <div class="visconti-hero-content">
            <h1>Timeless Beauty, Elevated</h1>
            <p>Discover our curated collection of premium skincare and beauty essentials, crafted for those who appreciate the finer things.</p>
            <button class="visconti-btn">Explore Collection</button>
          </div>
        </div>
      </div>
      
      <div class="visconti-section-title">
        <h2>Bestsellers</h2>
        <p>Our most loved products, chosen by you</p>
      </div>
      
      <div class="visconti-products">
        <div class="visconti-product">
          <img src="/Images/Products/product (1).jpg" alt="Radiant Glow Serum">
          <button class="add-to-cart">Add to Bag</button>
          <div class="visconti-product-info">
            <h3>Radiant Glow Serum</h3>
            <span class="price">$89</span>
          </div>
        </div>
        <div class="visconti-product">
          <img src="/Images/Products/product (2).jpg" alt="Dreamy Hair Oil">
          <button class="add-to-cart">Add to Bag</button>
          <div class="visconti-product-info">
            <h3>Dreamy Hair Oil</h3>
            <span class="price">$65</span>
          </div>
        </div>
        <div class="visconti-product">
          <img src="/Images/Products/product (3).jpg" alt="Fresh Face Cleanser">
          <button class="add-to-cart">Add to Bag</button>
          <div class="visconti-product-info">
            <h3>Fresh Face Cleanser</h3>
            <span class="price">$48</span>
          </div>
        </div>
        <div class="visconti-product">
          <img src="/Images/Products/product (4).jpg" alt="Plumping Lip Gloss">
          <button class="add-to-cart">Add to Bag</button>
          <div class="visconti-product-info">
            <h3>Plumping Lip Gloss</h3>
            <span class="price">$32</span>
          </div>
        </div>
      </div>
      
      <div class="visconti-reviews">
        <h2>What They're Saying</h2>
        <div class="visconti-reviews-grid">
          <div class="visconti-review">
            <img src="/Images/users/userAvatar01.svg" alt="Sarah L.">
            <p>"The Radiant Glow Serum has completely transformed my skin. I've never felt more confident."</p>
            <h4>Sarah L.</h4>
          </div>
          <div class="visconti-review">
            <img src="/Images/users/userAvatar02.svg" alt="Emily T.">
            <p>"Visconti products are the only ones I trust. Luxurious feel, real results."</p>
            <h4>Emily T.</h4>
          </div>
          <div class="visconti-review">
            <img src="/Images/users/userAvatar05.svg" alt="Isabella C.">
            <p>"Finally found a brand that understands what premium skincare should be."</p>
            <h4>Isabella C.</h4>
          </div>
        </div>
      </div>
      
      <div id="popup-message">Added to your bag</div>
    </div>
  `,

  vast: `
    <div class="vast-demo">
      <div class="vast-hero">
        <div class="vast-hero-content">
          <h1 class="vast-logo">VAST</h1>
          <p class="vast-tagline">Where Sound Meets Soul</p>
          <div class="vast-date">June 21-24, 2024</div>
        </div>
      </div>
      
      <div class="vast-lineup">
        <h2>Featured Artists</h2>
        <div class="vast-artists">
          <div class="vast-artist">
            <img src="https://www.roskilde-festival.dk/media/4909/kendrick-lamar-new.jpg?quality=88&width=576&height=700&mode=crop" alt="Kendrick Lamar">
            <div class="vast-artist-overlay">
              <h3>Kendrick Lamar</h3>
              <p>Headliner • Saturday Night</p>
            </div>
          </div>
          <div class="vast-artist">
            <img src="https://www.mordeo.org/files/uploads/2021/08/Billie-Eilish-In-Black-Dress-Vogue-Photoshoot-4K-Ultra-HD-Mobile-Wallpaper.jpg" alt="Billie Eilish">
            <div class="vast-artist-overlay">
              <h3>Billie Eilish</h3>
              <p>Headliner • Friday Night</p>
            </div>
          </div>
          <div class="vast-artist">
            <img src="https://images.pexels.com/photos/4572204/pexels-photo-4572204.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Community Camping">
            <div class="vast-artist-overlay">
              <h3>Community Camp</h3>
              <p>Live The Experience</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="vast-cta">
        <h3>Ready to experience VAST?</h3>
        <button class="vast-cta-btn">Get Your Pass</button>
      </div>
    </div>
  `,

  blog: `
    <div class="blog-demo">
      <div class="blog-hero">
        <img src="/Images/header-Blog.jpg" alt="Travel Adventure">
        <div class="blog-hero-overlay">
          <div class="blog-hero-content">
            <span class="blog-category">Featured Story</span>
            <h1>The Wonders of Exploring Off the Beaten Path</h1>
            <p>Discover the magic that happens when you venture beyond the tourist trails and find your own adventure.</p>
            <a href="#" class="blog-read-btn">Read Story</a>
          </div>
        </div>
      </div>
      
      <div class="blog-articles">
        <h2>Recent Stories</h2>
        <div class="blog-grid">
          <div class="blog-article">
            <div class="blog-article-img">
              <img src="/Images/spotlight02.jpg" alt="Hidden Gems">
            </div>
            <div class="blog-article-content">
              <h3>Discovering Hidden Gems: Off the Beaten Path</h3>
              <p>From remote islands to tiny villages, discover natural wonders and fascinating histories in places you never knew existed.</p>
            </div>
          </div>
          <div class="blog-article">
            <div class="blog-article-img">
              <img src="/Images/spotlight03.jpg" alt="Rewards of Travel">
            </div>
            <div class="blog-article-content">
              <h3>The Rewards of Traveling Without a Plan</h3>
              <p>Sometimes the best adventures come when you let go of the itinerary and embrace the unexpected.</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="blog-destinations">
        <h2>Dream Destinations</h2>
        <div class="blog-dest-grid">
          <div class="blog-dest">
            <h3>Amalfi Coast</h3>
            <p>Dramatic cliffs, turquoise waters, and charming villages.</p>
          </div>
          <div class="blog-dest">
            <h3>Santorini</h3>
            <p>White-washed buildings and breathtaking sunsets.</p>
          </div>
          <div class="blog-dest">
            <h3>Ubud, Bali</h3>
            <p>Lush forests, rice paddies, and ancient temples.</p>
          </div>
          <div class="blog-dest">
            <h3>Banff</h3>
            <p>Majestic mountains and crystal-clear lakes.</p>
          </div>
        </div>
      </div>
    </div>
  `
};

// Switch project with smooth transition
function switchProject(projectId) {
  // Update active tab
  projectTabs.forEach(tab => {
    tab.classList.remove('active');
    if (tab.dataset.project === projectId) {
      tab.classList.add('active');
    }
  });

  // Fade out current content
  projectDisplay.style.opacity = '0';
  projectDisplay.style.transform = 'translateY(30px)';

  setTimeout(() => {
    // Update content
    projectDisplay.innerHTML = projectContent[projectId];

    // Fade in new content
    requestAnimationFrame(() => {
      projectDisplay.style.opacity = '1';
      projectDisplay.style.transform = 'translateY(0)';
    });

    // Reinitialize components
    if (projectId === 'visconti') {
      initCartCount();
    }
  }, 350);
}

// Add click handlers to tabs
projectTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const projectId = tab.dataset.project;
    switchProject(projectId);
  });
});

// Add transition styles to project display
if (projectDisplay) {
  projectDisplay.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
}

// ========================
// CART FUNCTIONALITY
// ========================

function initCartCount() {
  const addToCartButtons = document.getElementsByClassName('add-to-cart');
  const cartCountTag = document.querySelector('.cart-count');
  const popupMessage = document.getElementById('popup-message');

  if (!cartCountTag) return;

  let cartCount = parseInt(localStorage.getItem('cartCount')) || 0;
  cartCountTag.textContent = cartCount;

  for (let i = 0; i < addToCartButtons.length; i++) {
    addToCartButtons[i].addEventListener('click', () => {
      cartCount++;
      cartCountTag.textContent = cartCount;
      localStorage.setItem('cartCount', cartCount);

      if (popupMessage) {
        popupMessage.classList.add('show');
        setTimeout(() => {
          popupMessage.classList.remove('show');
        }, 2000);
      }

      addToCartButtons[i].classList.add('clicked');
      setTimeout(() => {
        addToCartButtons[i].classList.remove('clicked');
      }, 500);
    });
  }
}

// ========================
// INITIALIZATION
// ========================

document.addEventListener('DOMContentLoaded', function () {
  initCartCount();
});
