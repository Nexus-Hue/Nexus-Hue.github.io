document.addEventListener("DOMContentLoaded", function() {
	const brandSlider = document.querySelector(".brand-slider");
	if (brandSlider) {
		new Swiper(".brand-slider", {
			lazy: { loadPrevNext: !0, loadPrevNextAmount: !0 },
			loop: !0,
			breakpoints: {
				390: { slidesPerView: 1, spaceBetween: 15 },
				640: { slidesPerView: 2, spaceBetween: 20 },
				768: { slidesPerView: 2, spaceBetween: 50 },
				1024: { slidesPerView: 3, spaceBetween: 88 },
				1920: { slidesPerView: 4, spaceBetween: 127 }
			},
			navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }
		});
	}
});