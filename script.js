document.addEventListener('DOMContentLoaded',function(){

setTimeout(() => {
    let preAnimationDiv=document.getElementById('pre').classList.add('hidden')
    let main_content=document.getElementById('main-content').classList.remove('hidden')
}, 500);
})


/* checking dark and light theme */

var themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
var themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

// Change the icons inside the button based on previous settings
if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    themeToggleLightIcon.classList.remove('hidden');
} else {
    themeToggleDarkIcon.classList.remove('hidden');
}

var themeToggleBtn = document.getElementById('theme-toggle');

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
 

/* interaction observer to observer  every section comes into view and  */
document.addEventListener("DOMContentLoaded", () => {
  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('section[data-section]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;

        navItems.forEach((item) => {
          if (item.dataset.link === id) {
            item.classList.add('active');   // Add border
          } else {
            item.classList.remove('active'); // Remove border
          }
        });
      }
    });
  }, {
    threshold: 0 // section should be 40% visible
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
              <div class=" rounded-2xl md:p-8 p-4 border-1 border-[#d1d5e0] ">
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