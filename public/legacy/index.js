let trendingList = document.querySelectorAll('.trending_section > div > ul > li')
for (let i = 0; i < trendingList.length; i++) {
    trendingList[i].onclick = () => {

    }
}
const categoryButtons = document.querySelectorAll('.trending_section > div > ul button');
const productList = document.querySelector('.trending_section > ul');
const productItems = Array.from(document.querySelectorAll('.trending_section > ul > li'));

const productOrders = [
    [0, 1, 2, 3, 4],
    [1, 2, 3, 4, 0],
    [2, 3, 4, 0, 1],
    [3, 4, 0, 1, 2],
    [4, 0, 1, 2, 3],
    [1, 3, 0, 4, 2],
    [2, 0, 4, 1, 3],
    [4, 2, 1, 3, 0]
];

categoryButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        categoryButtons.forEach((item) => {
            item.classList.remove('active');
        });

        button.classList.add('active');

        productOrders[index].forEach((productIndex) => {
            productList.appendChild(productItems[productIndex]);
        });
    });
});

const lookCards = document.querySelectorAll('.information4_section .slide_container li');
const modalContainer = document.querySelector('.modal_container');
const modalCloseButton = document.querySelector('.modal_container .close_btn');

lookCards.forEach((card) => {
    card.addEventListener('click', () => {
        modalContainer.classList.add('active');
    });
});

modalCloseButton.addEventListener('click', () => {
    modalContainer.classList.remove('active');
});

modalContainer.addEventListener('click', (event) => {
    if (event.target === modalContainer) {
        modalContainer.classList.remove('active');
    }
});

const heroVideos = [
    '//www.fila.co.kr/cdn/shop/videos/c/vp/b47fff7214de44db819510485c6c93ab/b47fff7214de44db819510485c6c93ab.HD-1080p-7.2Mbps-83467571.mp4?v=0',
    '//www.fila.co.kr/cdn/shop/videos/c/vp/2d2319ff42ad47578bfdc01800606d5f/2d2319ff42ad47578bfdc01800606d5f.HD-1080p-7.2Mbps-84613462.mp4?v=0',
    '//www.fila.co.kr/cdn/shop/videos/c/vp/c3aa65635a1d4ef3b623ce94cf4b9d36/c3aa65635a1d4ef3b623ce94cf4b9d36.HD-1080p-7.2Mbps-83547078.mp4?v=0'
];

const heroVideo = document.querySelector('.hero_video');
const heroPrevButton = document.querySelector('.hero_prev_btn');
const heroNextButton = document.querySelector('.hero_next_btn');

let heroVideoIndex = 0;

function changeHeroVideo(index) {
    heroVideoIndex = index;

    if (heroVideoIndex < 0) {
        heroVideoIndex = heroVideos.length - 1;
    }

    if (heroVideoIndex >= heroVideos.length) {
        heroVideoIndex = 0;
    }

    heroVideo.src = heroVideos[heroVideoIndex];
    heroVideo.load();
    heroVideo.play();
}

changeHeroVideo(0);

heroPrevButton.addEventListener('click', () => {
    changeHeroVideo(heroVideoIndex - 1);
});

heroNextButton.addEventListener('click', () => {
    changeHeroVideo(heroVideoIndex + 1);
});

const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
        header.classList.add('hide');
    } else {
        header.classList.remove('hide');
    }
});

const editSection = document.querySelector('.edit_section');

const editObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            editSection.classList.add('show');
        } else {
            editSection.classList.remove('show');
        }
    });
}, {
    threshold: 0.35
});

editObserver.observe(editSection);

const information3Section = document.querySelector('.information3_section');

const information3Observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            information3Section.classList.add('show');
        } else {
            information3Section.classList.remove('show');
        }
    });
}, {
    threshold: 0.15
});

information3Observer.observe(information3Section);
