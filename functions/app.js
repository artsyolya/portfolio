const smoothScroll = (target,duration) =>{
    const targetSection = document.querySelector(target);
    const targetPosition = targetSection.getBoundingClientRect().top;
    const startPosition = window.pageYOffset;
    //var distance = targetPosition - startPosition;
    let startTime = null;
    

    /*if(window.innerWidth < 760) {
        startPosition = startPosition - 200;
    }*/
    console.log(startPosition, targetPosition);

    const animation = (currentTime) =>{
        if(startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition,targetPosition,duration);
        window.scrollTo(0,run);
        if(timeElapsed < duration) requestAnimationFrame(animation);

    }

    const ease = (t, b, c, d) =>{
        t /= d / 2;
        if(t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () =>{
        
        if(nav.classList.contains('nav-active') && burger.classList.contains('toggle')){
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');

        }
        else {
            //activate mobile nav
            nav.classList.add('nav-active');
            
            //animate links
            navLinks.forEach((link, index) => {
                if(link.style.animation){
                    link.style.animation = '';
                }else{
                    link.style.animation = `navLinkFadeIn 0.5s ease forwards ${index / 7 + 0.5}s`;
                }
            
            }); 
            
            //burger animation
            burger.classList.add('toggle');
            
            // close mobile nav menu upon scrolling 
            // this will ensure the menu closes when one of the nav page links is clicked
            window.addEventListener('scroll',(event) => {
                if(nav.classList.contains('nav-active') && burger.classList.contains('toggle')){
                    nav.classList.remove('nav-active');
                    burger.classList.remove('toggle');

                    //reset links animation
                    navLinks.forEach((link) => {
                        link.style.animation = '';
                    }); 
                }
            });
        }
    });   
}
navSlide();

const portfolio = document.querySelector('.nav-portfolio');
const about = document.querySelector('.nav-about');
const contact = document.querySelector('.nav-contact');

portfolio.addEventListener('click', function(){
    smoothScroll('#portfolio', 3000);
});

about.addEventListener('click', function(){
    smoothScroll('#about', 2800);
});

contact.addEventListener('click', function(){
    smoothScroll('#contact', 2800);
});