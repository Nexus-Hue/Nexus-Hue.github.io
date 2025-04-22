document.addEventListener("DOMContentLoaded", function() {
    new Swiper(".blog-swiper", {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: false,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true
        },
        grabCursor: true, // Cursor grabbing Jutsu! On hover
        simulateTouch: true, // Enables swiping with mouse/touch
        touchStartPreventDefault: false, // Interactions inside slide content
        touchReleaseOnEdges: true, // Prevents getting stuck on edges
        breakpoints: {
            768: { slidesPerView: 2 },
            1200: { slidesPerView: 3 }
        }
    });
});

