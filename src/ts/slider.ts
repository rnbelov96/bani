export {};

const descSwiper = new Swiper('.desc__slider', {
  slidesPerView: 1,
  spaceBetween: 25,
  enabled: true,
  pagination: {
    el: '.desc__slider-pagination',
  },
  breakpoints: {
    650: {
      slidesPerView: 3,
      enabled: false,
      spaceBetween: 0,
    },
  },
});

const thanksSwiper = new Swiper('.thanks__slider', {
  slidesPerView: 1,
  spaceBetween: 10,
  loop: true,
  navigation: {
    nextEl: '.thanks__slider-btn_next',
    prevEl: '.thanks__slider-btn_prev',
  },
});
