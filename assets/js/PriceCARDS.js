var swiper = new Swiper('.nh-product-slider', {
    spaceBetween: 30,
    effect: 'fade',
    // initialSlide: 2,
    loop: false,
    navigation: {
        nextEl: '.nh-next',
        prevEl: '.nh-prev'
    },
    // mousewheel: {
    //     // invert: false
    // },
    on: {
        init: function(){
            var index = this.activeIndex;

            var target = $('.nh-product-slider__item').eq(index).data('target');

            console.log(target);

            $('.nh-product-img__item').removeClass('active');
            $('.nh-product-img__item#'+ target).addClass('active');
        }
    }
});

swiper.on('slideChange', function () {
    var index = this.activeIndex;

    var target = $('.nh-product-slider__item').eq(index).data('target');

    console.log(target);

    $('.nh-product-img__item').removeClass('active');
    $('.nh-product-img__item#'+ target).addClass('active');

    if(swiper.isEnd) {
        $('.nh-prev').removeClass('disabled');
        $('.nh-next').addClass('disabled');
    } else {
        $('.nh-next').removeClass('disabled');
    }

    if(swiper.isBeginning) {
        $('.nh-prev').addClass('disabled');
    } else {
        $('.nh-prev').removeClass('disabled');
    }
});

$(".js-fav").on("click", function() {
    $(this).find('.heart').toggleClass("is-active");
});
