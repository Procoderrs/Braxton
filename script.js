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

 const feedbacks = [
      {
        img: "./src/images/400x400_t01.webp",
        name: "Alex Tomato",
        pre:'Brand Manager in',
        role: " instant Design",
        
        message: "lorem ipsum dollar emit lorem ipsum dollar emitlorem ipsum dollar emitlorem ipsum dollar emitlorem ipsum dollar emitlorem ipsum dollar emit lorem ipsum dollar emitlorem ipsum dollar emitlorem ipsum dollar emitlorem ipsum dollar emit",
      },
      {
        img: "./src/images/400x400_t02.webp",
        name: "Jenny Pineapple",
        pre:'SEO in',
        role: " creative people",
       
        message: "lorem ipsum dollar emit lorem ipsum dollar emitlorem ipsum dollar emitlorem ipsum dollar emitlorem ipsum dollar emitlorem ipsum dollar emit lorem ipsum dollar emitlorem ipsum dollar emitlorem ipsum dollar emitlorem ipsum dollar emit",
      },
    ];

    const wrapper = document.getElementById("feedbackWrapper");

    feedbacks.forEach((item,index)=>{
      const slide=document.createElement('div')
      slide.className=`feedback-slide ${index===0?"active":""}`;
      slide.innerHTML=`
      <div class="p-8 bg-[#e6ebf5] dark:bg-black">
      <div class="flex gap-4 items-center mb-4">
      <img src='${item.img}' alt="${item.name}" class=" w-32 h-32 rounded-2xl" />
      <div class=" flex flex-col">  
      <p class="font-semibold text-[26px]">${item.name} </p> 
      <p class="text-sm text-gray-500"> ${item.role} </p>
      <div class=" flex items-start  gap-1">
      <i class="ri-star-s-line text-purple-500 w-3 h-3"></i>
      <i class="ri-star-s-line text-purple-500 w-3 h-3"></i>
      <i class="ri-star-s-line text-purple-500 w-3 h-3"></i>
      <i class="ri-star-s-line text-purple-500 w-3 h-3"></i>
      <i class="ri-star-s-line text-purple-500 w-3 h-3"></i>
      </div>
      </div>
      </div>
      <p class=" text-gray-700 "> ${item.message} </p>
      `;
      wrapper.appendChild(slide)
    });
    let currentIndex=0;
    const slides=document.querySelectorAll('.feedback-slide')


    function showSlide(index){
      slides.forEach ((slidee,i)=>{
     slidee.classList.toggle('active',i===index);
      })
    }

    function nextSlide(){
      currentIndex=(currentIndex+1)%slides.length;
      showSlide(currentIndex);
    }
    function prevSlide(){
      currentIndex=(currentIndex -1 +slides.length)% slides.length;
      showSlide(currentIndex);
    }
    
    document.getElementById('nextBtn').addEventListener('click',function(){
      nextSlide();
      resetAutoplay();
    })

    document.getElementById('prevBtn').addEventListener('click',function(){
      prevSlide();
      resetAutoplay()
    })
    let autoPlay=setInterval(nextSlide,2000);

    function resetAutoplay(){
      clearInterval(autoPlay);
      autoPlay=setInterval(nextSlide,2000)
    };
    
  