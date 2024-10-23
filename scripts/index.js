//for the carousel
// Common Elements
const slider = document.querySelector('.img-contain'); // container for the imgs
const items = document.querySelectorAll('.img-slide'); // class for each image
const contents = document.querySelectorAll('.content'); // content associated with each slide
const next = document.getElementById('next');
const prev = document.getElementById('prev');
const dots = document.querySelectorAll('.nav-btn'); // dot indicators
const btns = dots; // assign dots to btns as in the first script for consistency

let lengthItems = items.length - 1;
let active = 0;
let isTransitioning = false; // Prevent multiple transitions at once

// Function to handle smooth slider transitions
function sliderNav(manual) {
    if (isTransitioning) return; // Prevent slide change if already transitioning
    isTransitioning = true; // Lock transitions until complete

    // Remove active classes
    btns.forEach((btn) => btn.classList.remove('active'));
    items.forEach((item) => item.classList.remove('active'));
    contents.forEach((content) => content.classList.remove('active'));

    // Add active classes
    btns[manual].classList.add('active');
    items[manual].classList.add('active');
    contents[manual].classList.add('active');

    // Update slider position with smooth transition
    slider.style.transition = 'left 0.5s ease'; // Smooth transition effect
    slider.style.left = -items[manual].offsetLeft + 'px';

    // Clear interval and reset
    clearInterval(refreshInterval); // Stop auto-sliding temporarily
    refreshInterval = setInterval(() => { next.click() }, 6000); // Reset auto-slide after a delay

    // Unlock transitions after the animation completes
    setTimeout(() => {
        isTransitioning = false;
    }, 500); // Match the CSS transition duration (0.5s)
}

// Next and Previous Button Controls
next.onclick = function () {
    if (isTransitioning) return; // Prevent multiple clicks during transition
    active = active + 1 <= lengthItems ? active + 1 : 0; // Increment or loop
    sliderNav(active); // Call the sliderNav function to animate
};
prev.onclick = function () {
    if (isTransitioning) return; // Prevent multiple clicks during transition
    active = active - 1 >= 0 ? active - 1 : lengthItems; // Decrement or loop
    sliderNav(active); // Call the sliderNav function to animate
};

// Dot/Btn Click Event
dots.forEach((li, key) => {
    li.addEventListener('click', () => {
        if (isTransitioning) return; // Prevent multiple clicks during transition
        active = key; // Set the clicked dot as the active one
        sliderNav(active); // Call the sliderNav function to animate
    });
});

// Handle window resize
window.onresize = function () {
    sliderNav(active); // Adjust the position based on window size
};

// Auto-slide Interval
let refreshInterval = setInterval(() => { next.click() }, 4000); // Adjust interval to avoid skipping

//============ advanced marquee===========\\\
const copymarq = document.querySelector(".infinite-scroll ").cloneNode(true);
document.querySelector(".loop-scroll").appendChild(copymarq);