document.addEventListener("DOMContentLoaded", function() {
    const brandSlider = document.querySelector(".brand-slider");
    
    if (brandSlider) {
        new Swiper(".brand-slider", {
            // lazy loading logic removed for native browser performance
            loop: true, 
            breakpoints: {
                390: { slidesPerView: 1, spaceBetween: 10 },
                640: { slidesPerView: 2, spaceBetween: 20 },
                768: { slidesPerView: 2, spaceBetween: 50 },
                1024: { slidesPerView: 3, spaceBetween: 50 },
                1920: { slidesPerView: 4, spaceBetween: 50 },
                2000: { slidesPerView: 7, spaceBetween: 57 }
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev"
            }
        });
    }
});