const animationElements = document.querySelectorAll(".animation");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const element = entry.target;
      const animations = element.getAttribute("data-animations").split(",");
      let animationRules = "";

      animations.forEach((animation) => {
        const [name, duration, timing, delay] = animation.trim().split(" ");
        const rule = `${name} ${duration} ${timing} ${delay} forwards`;

        if (animationRules) {
          animationRules += ", ";
        }

        animationRules += rule;
      });

      element.style.animation = animationRules;
      observer.unobserve(element);

      element.addEventListener("animationend", function (event) {
        if (event.animationName === "fade-out") {
          element.remove();
        }
      });
    }
  });
});

animationElements.forEach((element) => {
  observer.observe(element);
});
// end

// Get all the "li" elements
const liElements = document.querySelectorAll("li");

// Add click event listener to each "li" element
liElements.forEach((li) => {
  li.addEventListener("click", () => {
    // Remove the "active" class from all "li" elements
    liElements.forEach((li) => {
      li.classList.remove("active");
    });

    // Add the "active" class to the clicked "li" element
    li.classList.add("active");
  });
});

// carousel ------------------------------------------------

function initCarousel() {
  const productsList = document.querySelector(".carousel-wrapper");
  const prevButton = document.querySelector(".prev-button");
  const nextButton = document.querySelector(".next-button");
  const productWidth = productsList.querySelector(".product").offsetWidth;

  let scrollPosition = 0;
  let animationRequestId = null;

  nextButton.addEventListener("click", () => {
    scrollPosition += productWidth;

    if (scrollPosition > productsList.scrollWidth - productsList.offsetWidth) {
      scrollPosition = 0;
    }

    if (animationRequestId) {
      cancelAnimationFrame(animationRequestId);
    }

    const start = productsList.scrollLeft;
    const end = scrollPosition;
    const duration = 500;
    let startTime = null;

    function step(timestamp) {
      if (!startTime) {
        startTime = timestamp;
      }

      const timeElapsed = timestamp - startTime;
      const nextScrollPosition = Math.round(
        easeInOutQuad(timeElapsed, start, end - start, duration)
      );

      productsList.scrollTo({ left: nextScrollPosition });

      if (timeElapsed < duration) {
        animationRequestId = requestAnimationFrame(step);
      } else {
        productsList.scrollTo({ left: end });
      }
    }

    animationRequestId = requestAnimationFrame(step);
  });

  prevButton.addEventListener("click", () => {
    scrollPosition -= productWidth;

    if (scrollPosition < 0) {
      scrollPosition = productsList.scrollWidth - productsList.offsetWidth;
    }

    if (animationRequestId) {
      cancelAnimationFrame(animationRequestId);
    }

    const start = productsList.scrollLeft;
    const end = scrollPosition;
    const duration = 500;
    let startTime = null;

    function step(timestamp) {
      if (!startTime) {
        startTime = timestamp;
      }

      const timeElapsed = timestamp - startTime;
      const nextScrollPosition = Math.round(
        easeInOutQuad(timeElapsed, start, end - start, duration)
      );

      productsList.scrollTo({ left: nextScrollPosition });

      if (timeElapsed < duration) {
        animationRequestId = requestAnimationFrame(step);
      } else {
        productsList.scrollTo({ left: end });
      }
    }

    animationRequestId = requestAnimationFrame(step);
  });

  function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) {
      return (c / 2) * t * t + b;
    }
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }
}
initCarousel(); // Initialize the carousel on page load
// Change

const change1pageBtn = document.getElementById("change-1page-btn");
change1pageBtn.addEventListener("click", revertContent);

function revertContent() {
  const brandingDiv = document.querySelector(".main-content");
  brandingDiv.innerHTML = `
  <div class="main-content">

  <header>
    <nav class="navbar navbar-expand-lg navbar-light bg-white">
      <div class="container">
        <!-- Logo -->
        <a class="navbar-brand" href="#">
          <h2>VISCONTI</h2>
        </a>
        <!-- Toggle Button for Mobile -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <!-- Navigation Links -->
        <div class="collapse navbar-collapse justify-content-start" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" href="#">Shop</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">About Us</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Contact Us</a>
            </li>
          </ul>
        </div>
        <!-- Search Bar -->
        <form class="d-flex ms-auto">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
          <button class="btn btn-outline-dark" type="submit">Search</button>
        </form>
        <i class='bx bx-cart'><sup class="cart-count">0</sup></i>
      </div>
    </nav>
    <!-- Banner -->
    <div class="container-fluid p-0">
      <img src="/Images/beauty-background.jpg" class="img-fluid" alt="Exclusive Beauty Products">
      <div class="overlay-text">
        <h1>Discover Our Exclusive Beauty Products</h1>
        <a href="#" class="btn btn-primary btn-lg">Discover Now</a>
      </div>
    </div>
  </header>
  <h3 style="margin-top: 40px">Most popular products</h3>
  <div class="carousel-container">
    <div class="carousel-wrapper">
      <div class="carousel">
        <div class="product">
          <img class="lozad" src="/Images/Products/product (1).jpg" alt="Product 1" width="300"
            height="200">
          <div class="overlay">
            <h3>Radiant Glow Serum</h3>
            <p>Reduces lines, wrinkles, dark spots and improves radiance.</p>
            <p class="h4 font-weight-bold mt-4">$19.99</p>
            <button class="add-to-cart btn btn-primary btn-lg mt-4">Add to Cart</button>
          </div>
        </div>
        <div class="product">
          <img class="lozad" src="/Images/Products/product (2).jpg" alt="Product 2" width="300"
            height="200">
          <div class="overlay">
            <h3>Dreamy Hair Oil</h3>
            <p>Nourishes, strengthens, and adds shine to hair.</p>
            <p class="h4 font-weight-bold mt-4">$19.99</p>
            <button class="add-to-cart btn btn-primary btn-lg mt-4">Add to Cart</button>
          </div>
        </div>
        <div class="product">
          <img class="lozad" src="/Images/Products/product (3).jpg" alt="Product 3" width="300"
            height="200">
          <div class="overlay">
            <h3>Fresh Face Cleanser</h3>
            <p>Gently removes impurities and makeup without drying skin.</p>
            <p class="h4 font-weight-bold mt-4">$19.99</p>
            <button class="add-to-cart btn btn-primary btn-lg mt-4">Add to Cart</button>
          </div>
        </div>
        <div class="product">
          <img class="lozad" src="/Images/Products/product (4).jpg" alt="Product 4" width="300"
            height="200">
          <div class="overlay">
            <h3>Plumping Lip Gloss</h3>
            <p>Hydrates and volumizes lips for a fuller look.</p>
            <p class="h4 font-weight-bold mt-4">$19.99</p>
            <button class="add-to-cart btn btn-primary btn-lg mt-4">Add to Cart</button>
          </div>
        </div>
        <div class="product">
          <img class="lozad" src="/Images/Products/product (5).jpg" alt="Product 5" width="300"
            height="200">
          <div class="overlay">
            <h3>Intensive Hand Cream</h3>
            <p> Reduces puffiness, dark circles, and fine lines around the eyes.</p>
            <p class="h4 font-weight-bold mt-4">$19.99</p>
            <button class="add-to-cart btn btn-primary btn-lg mt-4">Add to Cart</button>
          </div>
        </div>
        <div class="product">
          <img class="lozad" src="/Images/Products/product (6).jpg" alt="Product 6" width="300"
            height="200">
          <div class="overlay">
            <h3>Soothing Body Lotion</h3>
            <p> Hydrates and soothes dry, sensitive skin.</p>
            <p class="h4 font-weight-bold mt-4">$19.99</p>
            <button class="add-to-cart btn btn-primary btn-lg mt-4">Add to Cart</button>
          </div>
        </div>
        <!-- add more products as needed -->
        <div class="product">
          <img class="lozad" src="/Images/Products/product (7).jpg" alt="Product 7" width="300"
            height="200">
          <div class="overlay">
            <h3>Hydrating Facial Mist</h3>
            <p>Refreshes and hydrates skin for a dewy look.</p>
            <p class="h4 font-weight-bold mt-4">$19.99</p>
            <button class="add-to-cart btn btn-primary btn-lg mt-4">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
    <button class="prev-button">&#8249;</button>
    <button class="next-button">&#8250;</button>

  </div>
  <div id="popup-message">Product added to cart!</div>
  <!--Carouesl-->

  <div class="product-reviews">
    <h2>What our customers say</h2>
    <div class="flex">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Review by Sarah L.</h5>
          <p class="card-text">"I'm in love with the new line of skincare from Visconti! My skin has never
            felt so smooth and hydrated. Thank you, Visconti!"</p>
        </div>
      </div>
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Review by Emily T.</h5>
          <p class="card-text">"I've been using the mascara from Visconti for the past month and I'm
            obsessed!
            It gives my lashes length and volume without clumping. Highly recommend!"</p>
        </div>
      </div>
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Review by Isabella C.</h5>
          <p class="card-text">"The lipsticks from Visconti are my go-to! They have a great selection of
            shades and the formula is so moisturizing. 10/10!"</p>
        </div>
      </div>
    </div>
  </div>
  <h2 class="awards">Our award winning products</h2>
  <ul>
    <li><span class="bold">Best</span> Skincare Brand of the Year - Visconti</li>
    <li>Most <span class="bold">Innovative</span> Beauty Product - Visconti's Mascara</li>
    <li><span class="bold">Best</span> Lipstick Collection - Visconti</li>
  </ul>
</div>
  `;
  initCarousel(); // Initialize the carousel on page load
  initCardCount();
}

const change2pageBtn = document.getElementById("change-2page-btn");

change2pageBtn.addEventListener("click", changeContent);

function changeContent() {
  const brandingDiv = document.querySelector(".main-content");
  brandingDiv.innerHTML = `
  <div class="page2">
              
   <div class="header">
      <div class="grid">
        <div class="grid1">
          <h2>VAST Festival</h2>
         <p>
        VAST is an annual festival that brings together people 
        from all walks of life to celebrate the joy of living. 
        This vibrant event is a true feast for the senses, 
        featuring an array of music, art, food, 
        and cultural experiences that are sure to delight and inspire.
        </p>
      </div>
      <div class="grid1">
        <img src="/Images/pexels-wendy-wei-1540406.jpg">
      </div>
  </div>
  <div class="card-section">
  <div class="card-own card-big"> 
  
  <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-narrow-right" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <line x1="5" y1="12" x2="19" y2="12" />
  <line x1="15" y1="16" x2="19" y2="12" />
  <line x1="15" y1="8" x2="19" y2="12" />
  </svg>

    <img src="https://www.roskilde-festival.dk/media/4909/kendrick-lamar-new.jpg?quality=88&width=576&height=324&mode=crop&center=0.5%2C0.5" alt="">
    <h2>Experience the unique event, with Kendrick Lamar</h2>
    <p>Exciting news for music lovers! Kendrick Lamar, the Grammy-winning rapper and songwriter, has just
      announced that he will be joining the lineup at the upcoming festival. Known for his socially conscious
      lyrics and innovative sound, Kendrick Lamar is sure to bring an unforgettable performance to the stage.</p>
  </div>
  <div class="card-own card-small">

  <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-narrow-right" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <line x1="5" y1="12" x2="19" y2="12" />
  <line x1="15" y1="16" x2="19" y2="12" />
  <line x1="15" y1="8" x2="19" y2="12" />
</svg>

    <img src="https://www.mordeo.org/files/uploads/2021/08/Billie-Eilish-In-Black-Dress-Vogue-Photoshoot-4K-Ultra-HD-Mobile-Wallpaper.jpg" alt="">
    <h2>Fans of alternative pop, we call to you</h2>
    <p>Billie Eilish is set to perform at the festival. The young singer-songwriter has taken the music world by
      storm with her unique sound and captivating stage presence.</p>
  </div>
  <div class="card-own card-medium">
  <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-narrow-right" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <line x1="5" y1="12" x2="19" y2="12" />
  <line x1="15" y1="16" x2="19" y2="12" />
  <line x1="15" y1="8" x2="19" y2="12" />
</svg>
    <img src="https://images.pexels.com/photos/4572204/pexels-photo-4572204.jpeg?auto=compress&cs=tinysrgb&w=400" alt="">
    <h2>Get ready for camping and community camping</h2>
    <p>The sales start at 04/20/2023!</p>
  </div>
</div>
  
</div>
  `;
  initCarousel(); // Initialize the carousel on page load
  initCardCount();
}

const change3pageBtn = document.getElementById("change-3page-btn");

change3pageBtn.addEventListener("click", Page3Content);

function Page3Content() {
  const brandingDiv = document.querySelector(".main-content");
  brandingDiv.innerHTML = `
  <div class="page3">
              
  <div class="branding">
    <h1>Products</h1>
    <div class="grid">
      <div class="grid1">
        <h2>Branding</h2>
        <p>Need a powerful brand for your product? We're here to create the image you need
        </p>
      </div>
      <div class="grid1">
        <h2>Branding</h2>
        <p>Need a powerful brand for your product? We're here to create the image you need
        </p>
      </div>
      <div class="grid1">
        <h2>Branding</h2>
        <p>Need a powerful brand for your product? We're here to create the image you need
        </p>
      </div>
      <div class="grid1">
        <h2>Branding</h2>
        <p>Need a powerful brand for your product? We're here to create the image you need
        </p>
      </div>
    </div>
  </div>
  <div id="product-carousel" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <div class="row">
        <div class="col-md-3">
          <div class="product-item">
            <img src="product1.jpg" alt="Product 1">
            <div class="overlay">
              <h3>Product 1</h3>
              <p>A short description of Product 1.</p>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="product-item">
            <img src="product2.jpg" alt="Product 2">
            <div class="overlay">
              <h3>Product 2</h3>
              <p>A short description of Product 2.</p>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="product-item">
            <img src="product3.jpg" alt="Product 3">
            <div class="overlay">
              <h3>Product 3</h3>
              <p>A short description of Product 3.</p>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="product-item">
            <img src="product4.jpg" alt="Product 4">
            <div class="overlay">
              <h3>Product 4</h3>
              <p>A short description of Product 4.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#product-carousel" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#product-carousel" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>

  <!--Carouesl-->


</div>
  `;
  initCarousel(); // Initialize the carousel on page load
  initCardCount();
}

function initCardCount() {
  const addToCartButtons = document.getElementsByClassName("add-to-cart");
  const cartCountTag = document.querySelector(".cart-count");
  let cartCount = localStorage.getItem("cartCount") || 0; // Load cart count value from local storage, default to 0

  const popupMessage = document.getElementById("popup-message");

  cartCountTag.textContent = cartCount; // Update cart count tag with the loaded value

  for (let i = 0; i < addToCartButtons.length; i++) {
    addToCartButtons[i].addEventListener("click", () => {
      cartCount++;
      cartCountTag.textContent = cartCount;

      localStorage.setItem("cartCount", cartCount); // Save updated cart count value to local storage

      popupMessage.classList.add("show");
      setTimeout(() => {
        popupMessage.classList.remove("show");
      }, 2000);

      addToCartButtons[i].classList.add("clicked");
      setTimeout(() => {
        addToCartButtons[i].classList.remove("clicked");
      }, 500);
    });
  }
}

initCardCount();
