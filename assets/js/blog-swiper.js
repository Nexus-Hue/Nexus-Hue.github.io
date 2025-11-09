document.addEventListener("DOMContentLoaded", function() {
    new Swiper(".blog-swiper", {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: false,
       preloadImages: false,          // important for lazy loading
        lazy: {
            loadPrevNext: true,        // loads adjacent slides
            loadPrevNextAmount: 1
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true
        },
       grabCursor: true,               // Cursor grabbing Jutsu! On hover
        simulateTouch: true,            // Enables swiping with mouse/touch
        touchStartPreventDefault: false,// Interactions inside slide content
        touchReleaseOnEdges: true,      // Prevents getting stuck on edges
        breakpoints: {
            0: {                          // mobile
                slidesPerView: 1,
                lazy: { loadPrevNextAmount: 0 } // only load current slide
            },
            768: {                        // tablet
                slidesPerView: 2,
                lazy: { loadPrevNextAmount: 1 } // preload 1 adjacent slide
            },
            1200: {                       // desktop
                slidesPerView: 3,
                lazy: { loadPrevNextAmount: 2 } // preload 2 adjacent slides
            }
        }
    });
});

