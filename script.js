document.addEventListener('DOMContentLoaded',function(){

setTimeout(() => {
    let preAnimationDiv=document.getElementById('pre').classList.add('hidden')
    let main_content=document.getElementById('main-content').classList.remove('hidden')
}, 500);
})


// jump animation for icon
document.querySelectorAll('.icon-container').forEach(container => {
    const svg = container.querySelector('.icon-svg');
 
    container.addEventListener('mouseenter', () => {
        svg.classList.remove('bounce-reverse');
        void svg.offsetWidth; // Reset animation
        svg.classList.add('bounce');
    });
 
    container.addEventListener('mouseleave', () => {
        svg.classList.remove('bounce');
        void svg.offsetWidth; // Reset animation
        svg.classList.add('bounce-reverse');
    });
});

/* checking dark and light theme */

let themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
let themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

// Change the icons inside the button based on previous settings
if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    themeToggleLightIcon.classList.remove('hidden');
} else {
    themeToggleDarkIcon.classList.remove('hidden');
}

let themeToggleBtn = document.getElementById('theme-toggle');

themeToggleBtn.addEventListener('click', function() {

    // toggle icons inside button
    themeToggleDarkIcon.classList.toggle('hidden');
    themeToggleLightIcon.classList.toggle('hidden');

    // if set via local storage previously
    if (localStorage.getItem('color-theme')) {
        if (localStorage.getItem('color-theme') === 'light') {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        }

    // if NOT set via local storage previously
    } else {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        }
    }
    
});

const svgs = document.querySelectorAll("[data-speed]");
let ticking = false;

function updateParallax() {
  const scrollY = window.scrollY;

  svgs.forEach((el) => {
    const speed = parseFloat(el.dataset.speed) || 0.5;
    el.style.transform = `translateY(${scrollY * speed}px)`; // <-- FIXED!
  });

  ticking = false;
}

window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(updateParallax);
    ticking = true;
  }
});


document.addEventListener("DOMContentLoaded", () => {
  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('section[data-section]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;

        navItems.forEach((item) => {
          if (item.dataset.link === id) {
            // First, remove all previously added classes
            item.classList.remove('active', 'active-1');

            const width = window.innerWidth;

            if (width < 992) {
              item.classList.add('bg-black', 'p-1', );
            } else if (width >= 992 && width < 1200) {
              item.classList.add('active-1');
            } else {
              item.classList.add('active');
            }

          } else {
            item.classList.remove('active', 'active-1', 'bg-black', 'p-1', 'border', 'border-white', 'rounded-2xl');
          }
        });
      }
    });
  }, {
    threshold: 0
  });

  sections.forEach(section => observer.observe(section));
});




   

   const testimonials = [
          {
            name: "Alex Tomato",
            position: "Brand Manager",
            company: "Instant Design",
            stars: 5,
            text: "lorem ipsum dollar sit amet lorem ipsum dollar sit amet lorem ipsum dollar sit amet lorem ipsum dollar sit amet lorem ipsum dollar sit amet lorem ipsum dollar sit ametlorem ipsum dollar sit amet lorem ipsum dollar sit amet lorem ipsum dollar sit amet",
            img: "./src/images/400x400_t01.webp"
          },
          {
            name: "Jenny Pineapple",
            position: "SEO Specialist",
            company: "Creative People",
            stars: 5,
           text: "lorem ipsum dollar sit amet lorem ipsum dollar sit amet lorem ipsum dollar sit amet lorem ipsum dollar sit amet lorem ipsum dollar sit amet lorem ipsum dollar sit ametlorem ipsum dollar sit amet lorem ipsum dollar sit amet lorem ipsum dollar sit amet",  
          img: "./src/images/400x400_t02.webp"
          },
         
        ];

        const feedbackWrapper = document.getElementById('feedbackWrapper');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');

        let currentIndex = 0;
        let autoPlayInterval;
        const slideDuration = 5000;

        function initSlider() {
          testimonials.forEach((t) => {
            const slide = document.createElement('div');
            slide.className = 'flex-shrink-0 w-full  flex flex-col justify-center';
            slide.innerHTML = `
              <div class=" rounded-2xl md:p-8 p-6 border-1 border-border-dark ">
                <div class="flex flex-row md:flex-row items-start gap-5 mb-6 ">
                  <img src="${t.img}" alt="${t.name}" class="md:w-[100px] md:h-[100px] w-[50px] h-auto object-cover rounded-2xl " />
                  <div class="flex-1 text-left">
                    <h3 class="text-xl text-black dark:text-[#c7c6d3]  font-bold">${t.name}</h3>
                    <p class="text-[#424550] dark:text-[#c7c6d3]  text-base"> <span class="font-thin dark:text-[#c7c6d3] text-[#424550]">${t.position}</span> in <span class="font-semibold dark:text-[#c7c6d3] text-black">${t.company}</span></p>
                    <div class="flex justify-start gap-1 mt-2">
                      ${'<i class="ri-star-fill text-transparent bg-clip-text bg-gradient-to-br from-[#aa70e0] to-[#7059e2] dark:from-[#e4b8bf] dark:to-[#cec4ef] text-lg"></i>'.repeat(t.stars)}
                    </div>
                  </div>
                </div>
                <p class="text-[#424550] dark:text-[#c7c6d3] text-lg leading-relaxed">${t.text}</p>
                <div class=" mt-4"><span class="text-xl text-[#424550] font-bold">  <a href="/">Project Page</a> </span>  <span class="text-xl text-[#424550] font-bold"> <i class="ri-arrow-right-line"></i> </span></div>
              </div>
            `;
            feedbackWrapper.appendChild(slide);
          });

          startAutoPlay();
        }

        function updateSlider() {
          feedbackWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        function nextSlide() {
          currentIndex = (currentIndex + 1) % testimonials.length;
          updateSlider();
        }

        function prevSlide() {
          currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
          updateSlider();
        }

        function startAutoPlay() {
          clearInterval(autoPlayInterval);
          autoPlayInterval = setInterval(nextSlide, slideDuration);
        }

        prevBtn.addEventListener('click', () => {
          prevSlide();
          startAutoPlay();
        });

        nextBtn.addEventListener('click', () => {
          nextSlide();
          startAutoPlay();
        });

        initSlider();

function getVisibleSpinText() {
  return window.innerWidth >= 992
    ? document.getElementById("spinTextLg")
    : document.getElementById("spinTextSm");
}

let rotation = 0;
let lastScrollY = window.scrollY;
let isScrolling;
let spinning = false;
let direction = 1;

function startSpinning() {
  if (spinning) return;
  spinning = true;

  function rotate() {
    if (!spinning) return;

    rotation += 4 * direction;

    const spinText = getVisibleSpinText();
    if (spinText) {
      spinText.style.transform = `rotate(${rotation}deg)`;
    }

    requestAnimationFrame(rotate);
  }

  rotate();
}

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;
  direction = currentScrollY > lastScrollY ? 1 : -1;
  lastScrollY = currentScrollY;

  startSpinning();

  clearTimeout(isScrolling);
  isScrolling = setTimeout(() => {
    spinning = false;
  }, 150);
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const el = entry.target;

      if (entry.isIntersecting) {
        el.classList.add('opacity-100', 'translate-y-0');
        el.classList.remove('opacity-0', 'translate-y-10');
      } else {
        el.classList.remove('opacity-100', 'translate-y-0');
        el.classList.add('opacity-0', 'translate-y-10');
      }
    });
  },
  { threshold: 0.1 }
);

// Setup transition class if not present
document.querySelectorAll('.fade-up').forEach((el) => {
  if (!el.classList.contains('transition-all')) {
    el.classList.add('transition-all', 'duration-700', 'ease-in-out');
  }
  observer.observe(el);
});






