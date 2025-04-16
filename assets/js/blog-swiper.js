document.addEventListener("DOMContentLoaded", function() {
    new Swiper(".blog-swiper", {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true
        },
        breakpoints: {
            768: { slidesPerView: 2 },
            1200: { slidesPerView: 3 }
        }
    });
});
