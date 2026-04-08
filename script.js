// Цены на услуги (только для коротких, средних, длинных)
const priceList = {
    oneton: { short: 3400, medium: 4100, long: 5300 },
    melirovanie: { short: 2200, medium: 3000, long: 4000 },
    airtouch: { short: 4800, medium: 5800, long: 7000 },
    shatush: { short: 4200, medium: 5000, long: 6200 }
};

const carePrices = {
    keratin: 4500,
    botox: 3800,
    none: 0
};

let selections = { length: null, service: null, care: null };

// ========== КАЛЬКУЛЯТОР ==========
function selectOption(step, value, element) {
    const options = element.parentElement.querySelectorAll('.quiz-option');
    options.forEach(opt => opt.classList.remove('selected'));
    element.classList.add('selected');
    
    if (step === 1) {
        selections.length = value;
        document.getElementById('step1').style.display = 'none';
        document.getElementById('step2').style.display = 'block';
        document.getElementById('step1-indicator').classList.remove('active');
        document.getElementById('step1-indicator').classList.add('completed');
        document.getElementById('step2-indicator').classList.add('active');
    } else if (step === 2) {
        selections.service = value;
        document.getElementById('step2').style.display = 'none';
        document.getElementById('step3').style.display = 'block';
        document.getElementById('step2-indicator').classList.remove('active');
        document.getElementById('step2-indicator').classList.add('completed');
        document.getElementById('step3-indicator').classList.add('active');
    } else if (step === 3) {
        selections.care = value;
        
        let price = 0;
        if (selections.service && selections.length) {
            price = priceList[selections.service][selections.length];
        }
        if (selections.care !== 'none') {
            price += carePrices[selections.care];
        }
        
        document.getElementById('step3').style.display = 'none';
        document.getElementById('quiz-result').style.display = 'block';
        document.getElementById('step3-indicator').classList.remove('active');
        document.getElementById('step3-indicator').classList.add('completed');
        document.getElementById('result-price').textContent = price + ' ₽';
    }
}

function resetQuiz() {
    selections = { length: null, service: null, care: null };
    document.getElementById('quiz-result').style.display = 'none';
    document.getElementById('step1').style.display = 'block';
    document.getElementById('step2').style.display = 'none';
    document.getElementById('step3').style.display = 'none';
    document.getElementById('step1-indicator').classList.remove('completed', 'active');
    document.getElementById('step2-indicator').classList.remove('completed', 'active');
    document.getElementById('step3-indicator').classList.remove('completed', 'active');
    document.getElementById('step1-indicator').classList.add('active');
    document.querySelectorAll('.quiz-option').forEach(opt => opt.classList.remove('selected'));
}

// ========== УСЛУГИ ==========
function toggleDetails(btn) {
    const serviceCard = btn.closest('.service-card');
    const detailsWrapper = serviceCard.querySelector('.service-details-wrapper');
    if (detailsWrapper.classList.contains('show')) {
        detailsWrapper.classList.remove('show');
        btn.textContent = 'Подробнее';
    } else {
        document.querySelectorAll('.service-details-wrapper.show').forEach(d => {
            d.classList.remove('show');
            const otherBtn = d.closest('.service-card').querySelector('.service-detail-btn');
            if (otherBtn) otherBtn.textContent = 'Подробнее';
        });
        detailsWrapper.classList.add('show');
        btn.textContent = 'Скрыть';
    }
}

// ========== МОДАЛЬНЫЕ ОКНА ДЛЯ СОВЕТОВ С ФОТОГРАФИЯМИ ==========
function openTipModal(tipId) {
    const modal = document.getElementById('tipModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    const tipsData = {
        1: {
            title: 'Как правильно выбрать расчёску?',
            content: `
                <img class="tip-image" src="https://sun9-65.userapi.com/impg/nokpBdl9Dgwz5kPnQaL72PxHw_iviRvYDbR8dw/RiEhMfAa078.jpg?size=2160x2160&quality=96&sign=b9d33be0614fa4d4eb72bf779b512f8a&type=album" alt="Как правильно выбрать расчёску">
                <p>Далеко не все знают, что расчёску нужно подбирать исходя из типа кожи головы, длины волос, толщины и нескольким другим критериям. Самая хорошая расчёска — та, которая хорошо моется, хорошо обрабатывается и не имеет каких-либо видимых дефектов.</p>
                
                <h3>Виды расчесок:</h3>
                <ul>
                    <li><strong>Массажная щетка</strong> - выполняет две функции одновременно: качественное расчесывание и массаж. Благодаря такой щетке происходит прилив крови к голове, что благотворно сказывается для роста волос.</li>
                    <li><strong>Для длинных волос</strong> - выбирайте расческу большого размера. Форму можно выбирать, исходя из вкусовых предпочтений и ощущения комфорта.</li>
                    <li><strong>Для непослушных и густых волос</strong> - приобретайте щетку с толстыми и редкими зубчиками.</li>
                    <li><strong>Для тонких волос</strong> - подойдет щетка с тонкими и частыми зубчиками.</li>
                    <li><strong>Расческа для укладки</strong> - поможет сделать шевелюру опрятной, послушной и устойчивой к погодным условиям.</li>
                </ul>
                <p>Расческа должна быть изготовлена из качественного материала, от этого зависит, как ее воспримут ваши волосы и кожа головы.</p>
            `
        },
        2: {
            title: 'Как сохранить свои волосы?',
            content: `
                <img class="tip-image" src="https://sun9-24.userapi.com/s/v1/ig2/qPHVbC4KRKlqeuxuom7ZBcMvcyeiecXc5U5HP1FuBjULamrVv6Jrcq-xEBkDj5my1SVaXSk83YbdS_DLEeAixBCi.jpg?quality=96&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,1080x1080,1280x1280,1440x1440,2160x2160&from=bu&cs=640x0" alt="Как сохранить свои волосы">
                <p>Следуя этим простым советам, вы сможете сохранить здоровье и красоту ваших волос!</p>
                <ul>
                    <li><strong>Принимайте витамины 💊</strong> - Витаминные комплексы помогут восполнить дефицит необходимых компонентов. Самые важные витамины: А, группы В, С, Е и РР.</li>
                    <li><strong>Увлажняйте волосы и кожу головы 💦</strong> - Пейте больше чистой воды, используйте деликатные шампуни и бальзамы-кондиционеры.</li>
                    <li><strong>Используйте индивидуальный подобранный уход 🔥</strong> - Маски, бальзамы, шампуни помогут устранить сухость, сечение, тусклость и отсутствие объема.</li>
                    <li><strong>Минимизируйте стресс и уберите вредные привычки ☘️</strong> - Стресс, курение и алкоголь усугубляют проблемы с ростом волос. Отдыхайте, занимайтесь фитнесом, хорошо питайтесь.</li>
                    <li><strong>Пейте больше воды ✨</strong> - Волосам для роста необходима вода. При секущихся, выпадающих, тусклых волосах обратите внимание на количество и качество воды.</li>
                </ul>
            `
        },
        3: {
            title: 'Что повреждает наши волосы?',
            content: `
                <img class="tip-image" src="https://sun9-82.userapi.com/s/v1/ig2/bg6onWmmYGtJyBcP2KyDOJGcyqQIU5Y3zBRRFlf0-4zGztiPdo4_aT-X_S4KnnDtjSgoLMTdmnIG3OJUq27a1v9n.jpg?quality=96&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,1080x1080,1280x1280,1440x1440,2160x2160&from=bu&u=HDr-Ao4k2og8gsBnFj3iIPBkxRRnvdy33nVyMQi3Vaw&cs=2160x0" alt="Что повреждает наши волосы">
                <p>Волосы – абсолютное богатство любой девушки. Длинные волосы – это роскошь или заветная мечта многих женщин. Факторов, которые не позволяют отрастить заветную шевелюру, много.</p>
                <ul>
                    <li><strong>Механическое воздействие</strong> - «простирование» волос, скручивание волос в жгут в мокром виде, растирание волос полотенцем.</li>
                    <li><strong>Тепловое воздействие</strong> - Использование горячих инструментов (плойки, утюжки) без термозащиты.</li>
                    <li><strong>Химическое воздействие</strong> - окрашивание, осветление, косметические процедуры (кератин, ботокс, нанопластика).</li>
                    <li><strong>UV-лучи</strong> - особенно активны в летнее время, защищайте волосы головным убором.</li>
                    <li><strong>Хлорированная вода в бассейне</strong> - после купания мойте волосы с шампунем и маской.</li>
                    <li><strong>Соленая морская вода</strong> - после купания обязательно ополаскивайте волосы пресной водой.</li>
                </ul>
                <p>Берегите свои волосы и защищайте их от воздействия вредных факторов, а правильно подобранный домашний уход спасет волосы и решит проблемы повреждений.</p>
            `
        },
        4: {
            title: 'Как часто стричь волосы?',
            content: `
                <img class="tip-image" src="https://sun9-46.userapi.com/impg/oetiTCQOAE08vSEGCf-NaDVBUzX0xwbpFhHxig/Fa80VtI8brQ.jpg?size=2160x2160&quality=96&sign=dbeb6ea8542e3ff904214da1b4bd669b&type=album" alt="Как часто стричь волосы">
                <p>Без аккуратной укладки любой образ будет неполным. И короткая причёска, и длинные волосы требуют регулярной стрижки.</p>
                <ul>
                    <li><strong>Как часто нужно стричь короткие волосы?</strong><br>Короткая стрижка теряет первоначальный вид примерно через два месяца. Рекомендуется посещать парикмахера каждые 1,5-2 месяца.</li>
                    <li><strong>Как часто подстригать волосы средней длины?</strong><br>Причёски длиной до плеч требуют обновления раз в три месяца. Стрижку с ровным срезом нужно освежать чаще, чем многослойные.</li>
                    <li><strong>Как часто нужно стричь длинные волосы?</strong><br>Раз в три месяца рекомендуется подстригать кончики, чтобы причёска выглядела аккуратно и ухоженно. Секущиеся концы лечатся только стрижкой.</li>
                </ul>
            `
        }
    };
    
    const tip = tipsData[tipId];
    if (tip) {
        modalTitle.textContent = tip.title;
        modalBody.innerHTML = tip.content;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeTipModal() {
    const modal = document.getElementById('tipModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Закрытие модального окна при клике вне его
window.onclick = function(event) {
    const modal = document.getElementById('tipModal');
    if (event.target === modal) {
        closeTipModal();
    }
}

// ========== ЗВЁЗДЫ ДЛЯ ФОРМЫ ОТЗЫВА ==========
function initStarRating() {
    const starsContainer = document.getElementById('star-rating');
    if (!starsContainer) return;
    
    const stars = starsContainer.querySelectorAll('i');
    const ratingInput = document.getElementById('review-rating-premium');
    let currentRating = 0;
    
    function updateStars(rating) {
        stars.forEach((star, index) => {
            if (index < rating) {
                star.className = 'fas fa-star active';
            } else {
                star.className = 'far fa-star';
            }
        });
        if (ratingInput) ratingInput.value = rating;
        currentRating = rating;
    }
    
    stars.forEach(star => {
        star.addEventListener('click', function(e) {
            e.stopPropagation();
            const value = parseInt(this.getAttribute('data-value'));
            updateStars(value);
        });
        
        star.addEventListener('mouseenter', function() {
            const value = parseInt(this.getAttribute('data-value'));
            stars.forEach((s, idx) => {
                if (idx < value) {
                    s.className = 'fas fa-star hover';
                } else {
                    s.className = 'far fa-star hover';
                }
            });
        });
    });
    
    starsContainer.addEventListener('mouseleave', function() {
        updateStars(currentRating);
    });
}

// ========== ОТПРАВКА ФОРМЫ ОТЗЫВА ==========
function initReviewForm() {
    const reviewForm = document.getElementById('review-form-premium');
    if (!reviewForm) return;
    
    reviewForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('review-name-premium').value.trim();
        const rating = document.getElementById('review-rating-premium').value;
        const text = document.getElementById('review-text-premium').value.trim();
        const messageDiv = document.getElementById('review-message-premium');
        
        if (!name) {
            messageDiv.textContent = 'Пожалуйста, укажите ваше имя';
            messageDiv.className = 'review-message error';
            setTimeout(() => {
                messageDiv.textContent = '';
                messageDiv.className = 'review-message';
            }, 3000);
            return;
        }
        
        if (rating === '0' || rating === 0) {
            messageDiv.textContent = 'Пожалуйста, оцените нашу работу (выберите количество звезд)';
            messageDiv.className = 'review-message error';
            setTimeout(() => {
                messageDiv.textContent = '';
                messageDiv.className = 'review-message';
            }, 3000);
            return;
        }
        
        if (!text) {
            messageDiv.textContent = 'Пожалуйста, напишите ваш отзыв';
            messageDiv.className = 'review-message error';
            setTimeout(() => {
                messageDiv.textContent = '';
                messageDiv.className = 'review-message';
            }, 3000);
            return;
        }
        
        messageDiv.textContent = 'Спасибо за ваш отзыв! Он будет опубликован после модерации.';
        messageDiv.className = 'review-message success';
        
        document.getElementById('review-name-premium').value = '';
        document.getElementById('review-text-premium').value = '';
        document.querySelectorAll('#star-rating i').forEach(star => star.className = 'far fa-star');
        document.getElementById('review-rating-premium').value = '0';
        
        setTimeout(() => {
            messageDiv.textContent = '';
            messageDiv.className = 'review-message';
        }, 5000);
    });
}

// ========== ФОРМА БРОНИРОВАНИЯ ==========
function initBookingForm() {
    const bookingForm = document.getElementById('booking-form');
    if (!bookingForm) return;
    
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Спасибо! Мы скоро свяжемся с вами.');
        this.reset();
    });
}

// ========== БУРГЕР-МЕНЮ ==========
function initBurgerMenu() {
    const burgerMenu = document.getElementById('burgerMenu');
    const navLinks = document.getElementById('navLinks');
    if (!burgerMenu || !navLinks) return;
    
    burgerMenu.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });
    
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            burgerMenu.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// ========== СЛАЙДЕР ОТЗЫВОВ ==========
function initReviewsSlider() {
    const track = document.getElementById('reviewsTrack');
    const prevBtn = document.getElementById('prevReviewBtn');
    const nextBtn = document.getElementById('nextReviewBtn');
    const dotsContainer = document.getElementById('reviewDots');
    if (!track || !prevBtn || !nextBtn) return;
    
    const cards = Array.from(document.querySelectorAll('.review-card'));
    let currentIdx = 0;
    let visibleCards = window.innerWidth <= 768 ? 1 : 2;
    let startX = 0, isDragging = false;
    
    function updateSlider() {
        if (cards.length === 0) return;
        const cardWidth = cards[0].offsetWidth + 25;
        track.style.transform = `translateX(${-currentIdx * cardWidth}px)`;
        const activeDot = Math.floor(currentIdx / visibleCards);
        document.querySelectorAll('.dot').forEach((dot, idx) => {
            dot.classList.toggle('active', idx === activeDot);
        });
    }
    
    function createDots() {
        if (!dotsContainer) return;
        dotsContainer.innerHTML = '';
        const totalGroups = Math.ceil(cards.length / visibleCards);
        for (let i = 0; i < totalGroups; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                currentIdx = i * visibleCards;
                if (currentIdx >= cards.length) currentIdx = Math.max(0, cards.length - visibleCards);
                updateSlider();
            });
            dotsContainer.appendChild(dot);
        }
    }
    
    function nextSlide() {
        if (currentIdx + visibleCards < cards.length) {
            currentIdx += visibleCards;
        } else {
            currentIdx = 0;
        }
        updateSlider();
    }
    
    function prevSlide() {
        if (currentIdx - visibleCards >= 0) {
            currentIdx -= visibleCards;
        } else {
            currentIdx = Math.max(0, cards.length - visibleCards);
        }
        updateSlider();
    }
    
    track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    });
    
    track.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        const diff = startX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
            diff > 0 ? nextSlide() : prevSlide();
        }
        isDragging = false;
    });
    
    function handleResize() {
        visibleCards = window.innerWidth <= 768 ? 1 : 2;
        currentIdx = 0;
        createDots();
        updateSlider();
    }
    
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    window.addEventListener('resize', handleResize);
    createDots();
    updateSlider();
}

// ========== КАЛЬКУЛЯТОР - ИНИЦИАЛИЗАЦИЯ ==========
function initCalculator() {
    document.querySelectorAll('#step1 .quiz-option').forEach(opt => {
        opt.addEventListener('click', function() {
            selectOption(1, this.getAttribute('data-value'), this);
        });
    });
    document.querySelectorAll('#step2 .quiz-option').forEach(opt => {
        opt.addEventListener('click', function() {
            selectOption(2, this.getAttribute('data-value'), this);
        });
    });
    document.querySelectorAll('#step3 .quiz-option').forEach(opt => {
        opt.addEventListener('click', function() {
            selectOption(3, this.getAttribute('data-value'), this);
        });
    });
}

// ========== ПЛАВНАЯ ПРОКРУТКА ==========
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// ========== ДЕЛАЕМ ФУНКЦИИ ГЛОБАЛЬНЫМИ ==========
window.toggleDetails = toggleDetails;
window.resetQuiz = resetQuiz;
window.openTipModal = openTipModal;
window.closeTipModal = closeTipModal;

// ========== ЗАПУСК ВСЕХ ИНИЦИАЛИЗАЦИЙ ==========
document.addEventListener('DOMContentLoaded', function() {
    initCalculator();
    initStarRating();
    initReviewForm();
    initBookingForm();
    initBurgerMenu();
    initReviewsSlider();
    initSmoothScroll();
});