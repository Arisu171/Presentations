//banner
let currentBanner = 5;
let isTransitioning = false;
const totalBanners = document.querySelectorAll('.bannerimg').length;
let autoSlideInterval;

document.addEventListener('DOMContentLoaded', () => {
    console.log("Document is ready. Total banners:", totalBanners);
    updateDots();
    document.querySelectorAll('.bannerimg').forEach((banner, index) => {
        banner.classList.add(`bannerimg${index + 1}`);
    });
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 1000);
    startAutoSlide();
});

function startAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(next, 5000);
}

function updateDots() {
    let dots = document.querySelectorAll('.bannercurrent div i');
    console.log("Updating dots:", dots);
    dots.forEach((dot, index) => {
        if (index + 1 === currentBanner) {
            dot.classList.remove('fa-regular');
            dot.classList.add('fa-solid');
        } else {
            dot.classList.remove('fa-solid');
            dot.classList.add('fa-regular');
        }
    });
}

function next() {
    if (isTransitioning) return;
    isTransitioning = true;
    let banners = document.querySelectorAll('.bannerimg');
    banners.forEach((banner) => {
        let currentClass = banner.classList[1];
        let currentNumber = parseInt(currentClass.replace('bannerimg', ''));
        let newNumber = currentNumber < totalBanners ? currentNumber + 1 : 1;
        banner.classList.replace(currentClass, `bannerimg${newNumber}`);
    });
    currentBanner = currentBanner < totalBanners ? currentBanner + 1 : 1;
    updateDots();
    setTimeout(() => {
        isTransitioning = false;
    }, 1000);
}

function prev() {
    if (isTransitioning) return;
    isTransitioning = true;

    let banners = document.querySelectorAll('.bannerimg');
    banners.forEach((banner) => {
        let currentClass = banner.classList[1];
        let currentNumber = parseInt(currentClass.replace('bannerimg', ''));
        let newNumber = currentNumber > 1 ? currentNumber - 1 : totalBanners;
        banner.classList.replace(currentClass, `bannerimg${newNumber}`);
    });
    currentBanner = currentBanner > 1 ? currentBanner - 1 : totalBanners;
    updateDots();
    setTimeout(() => {
        isTransitioning = false;
    }, 1000);
}

function goToBanner(index) {
    if (isTransitioning) return;
    isTransitioning = true;
    console.log("Navigating to banner:", index);

    let banners = document.querySelectorAll('.bannerimg');
    let difference = currentBanner - index;
    banners.forEach((banner) => {
        let currentClass = banner.classList[1];
        let currentNumber = parseInt(currentClass.replace('bannerimg', ''));
        let newNumber = (currentNumber - difference + totalBanners) % totalBanners || totalBanners;
        banner.classList.replace(currentClass, `bannerimg${newNumber}`);
    });

    currentBanner = index;
    updateDots();

    setTimeout(() => {
        isTransitioning = false;
    }, 1000);
}

document.querySelectorAll('.bannercurrent div').forEach((dot, index) => {
    dot.addEventListener('click', () => {
        goToBanner(index + 1);
        startAutoSlide();
    });
});

updateDots();
setTimeout(() => {
    next();
    startAutoSlide();
}, 500);
//banner


const texts = ["Welcome to my presentation!", "Let's explore the topic together!", "Thank you for joining!"]; // Replace with your lines
const finalText = "Vietnam Travel";
const typingSpeed = 40;
const deletingSpeed = 40;
const delayBetweenLines = 1000;
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typedTextElement = document.getElementById("line1");

function typeAndDelete() {

    if (textIndex >= texts.length) {
        let finalText = "Vietnam Travel";
        let finalCharIndex = 0;

        function typeFinalLine() {
            if (finalCharIndex <= finalText.length) {
                document.getElementById('line2').innerHTML = finalText.substring(0, finalCharIndex);
                finalCharIndex++;
                setTimeout(typeFinalLine, typingSpeed);
            }
        }

        typeFinalLine();
        return;
    }


    const currentText = texts[textIndex];

    if (isDeleting) {
        typedTextElement.textContent = currentText.substring(0, charIndex);
        charIndex--;
        if (charIndex < 0) {
            isDeleting = false;
            textIndex++;
            setTimeout(typeAndDelete, delayBetweenLines);
            return;
        }
    } else {
        typedTextElement.textContent = currentText.substring(0, charIndex);
        charIndex++;
        if (charIndex > currentText.length) {
            isDeleting = true;
            setTimeout(typeAndDelete, delayBetweenLines);
            return;
        }
    }

    const speed = isDeleting ? deletingSpeed : typingSpeed;
    setTimeout(typeAndDelete, speed);
}

window.onload = () => {
    typeAndDelete();
};
