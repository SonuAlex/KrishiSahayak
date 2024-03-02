const track = document.querySelector('.carousel__track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel__button--right');
const prevButton = document.querySelector('.carousel__button--left');
const dotsNav = document.querySelector('.carousel__nav');
const dots = Array.from(dotsNav);

const slideWidth = slides[0].getBoundingClientRect().width;
// console.log(slideWidth);

// 1. Arrange the slide next to each other
const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
}
slides.forEach(setSlidePosition);

nextButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextSibling;
    const amountToMove = nextSlide.style.left;

    track.style.transform = 'translateX(-' + amountToMove + ')';
});