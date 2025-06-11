/**
* Template Name: Impact
* Template URL: https://bootstrapmade.com/impact-bootstrap-business-website-template/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });
  });

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  /**
   * WordPress Posts Fetching
   */
/**
 * WordPress Posts Fetcher for fitriches.com
 * Fetches latest posts from category 1382 and displays them
 */
(function() {
  // Configuration
  const config = {
    wordpressUrl: 'https://staging-8fad-clickbanksiva82.wpcomstaging.com/wp-json/wp/v2/posts',
    categoryId: 1382,
    postsPerPage: 3,
    defaultImage: 'assets/img/blog/default-image.jpg',
    defaultAuthorImage: 'assets/img/blog/default-author.jpg',
    containerId: 'wordpress-posts-container',
    fallbackMessage: 'Recent posts are currently unavailable. Please check back later.',
    timeout: 5000 // 5 second timeout
  };

  // Main function to fetch posts
  function fetchWordPressPosts() {
    const container = document.getElementById(config.containerId);
    if (!container) {
      console.error(`Container #${config.containerId} not found`);
      return;
    }

    // Show loading spinner
    container.innerHTML = `
      <div class="col-12 text-center py-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-2">Loading latest articles...</p>
      </div>
    `;

    // API parameters
    const params = new URLSearchParams({
      categories: config.categoryId,
      per_page: config.postsPerPage,
      _embed: true
    });

    // Fetch with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), config.timeout);

    fetch(`${config.wordpressUrl}?${params}`, { signal: controller.signal })
      .then(response => {
        clearTimeout(timeoutId);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(posts => {
        if (!posts || posts.length === 0) {
          throw new Error('No posts found in this category');
        }
        renderPosts(posts, container);
      })
      .catch(error => {
        console.error('WordPress API Error:', error);
        showError(container, error);
      });
  }

  // Render posts to HTML
  function renderPosts(posts, container) {
    container.innerHTML = '';

    posts.forEach((post, index) => {
      const postEl = createPostElement(post, index);
      container.insertAdjacentHTML('beforeend', postEl);
    });

    // Refresh animations if AOS is loaded
    if (typeof AOS !== 'undefined') {
      AOS.refresh();
    }
  }

  // Create HTML for a single post
  function createPostElement(post, index) {
    // Extract post data with fallbacks
    const category = post._embedded?.['wp:term']?.[0]?.[0]?.name || 'Uncategorized';
    const imageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || config.defaultImage;
    const author = post._embedded?.author?.[0]?.name || 'FitRiches Team';
    const authorImage = post._embedded?.author?.[0]?.avatar_urls?.['96'] || config.defaultAuthorImage;
    const postDate = new Date(post.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });

    return `
      <div class="col-xl-4 col-md-6" data-aos="fade-up" data-aos-delay="${index * 100}">
        <article class="blog-card">
          <div class="post-img">
            <img src="${imageUrl}" alt="${post.title.rendered}" class="img-fluid">
          </div>
          <p class="post-category">${category}</p>
          <h3 class="post-title">
            <a href="${post.link}">${post.title.rendered}</a>
          </h3>
          <div class="post-meta d-flex align-items-center">
            <img src="${authorImage}" alt="${author}" class="author-img rounded-circle me-2">
            <div>
              <span class="post-author">${author}</span>
              <span class="post-date mx-2">•</span>
              <time datetime="${post.date}">${postDate}</time>
            </div>
          </div>
        </article>
      </div>
    `;
  }

  // Show error message
  function showError(container, error) {
    container.innerHTML = `
      <div class="col-12">
        <div class="alert alert-warning">
          <h4>Couldn't Load Blog Posts</h4>
          <p>${config.fallbackMessage}</p>
          ${error.message ? `<p class="small text-muted mt-2">Error: ${error.message}</p>` : ''}
          <a href="https://staging-8fad-clickbanksiva82.wpcomstaging.com/blog/" class="btn btn-outline-primary mt-3">
            Visit Our Blog
          </a>
        </div>
      </div>
    `;
  }

  // Initialize when DOM loads
  if (document.readyState !== 'loading') {
    fetchWordPressPosts();
  } else {
    document.addEventListener('DOMContentLoaded', fetchWordPressPosts);
  }
})();

})();