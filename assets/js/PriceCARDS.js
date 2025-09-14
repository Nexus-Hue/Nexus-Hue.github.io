function initProductSwiper() {
    var swiper = new Swiper('.nh-product-slider', {
        spaceBetween: 30,
        effect: 'fade',
        loop: false,
        navigation: {
            nextEl: '.nh-next',
            prevEl: '.nh-prev'
        },
        on: {
            init: function() {
                var index = this.activeIndex;
                var target = $('.nh-product-slider__item').eq(index).data('target');
                $('.nh-product-img__item').removeClass('active');
                $('.nh-product-img__item#' + target).addClass('active');
            },
            imagesReady: function() { // this ensures Swiper recalculates sizes after images load
                this.update();
            }
        }
    });

    swiper.on('slideChange', function() {
        var index = this.activeIndex;
        var target = $('.nh-product-slider__item').eq(index).data('target');
        $('.nh-product-img__item').removeClass('active');
        $('.nh-product-img__item#' + target).addClass('active');

        $('.nh-next').toggleClass('disabled', swiper.isEnd);
        $('.nh-prev').toggleClass('disabled', swiper.isBeginning);
    });

    $(".js-fav").on("click", function() {
        $(this).find('.heart').toggleClass("is-active");
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // slight delay to ensure all DOM images are ready
    setTimeout(initProductSwiper, 50);
});
