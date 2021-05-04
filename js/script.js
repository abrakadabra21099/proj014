'use strict';

document.addEventListener('DOMContentLoaded', () => {
    // Tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader');

    function hideTabContent() {
        tabsContent.forEach(item => {
            // item.style.display = 'none';
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    };

    function showTabContent(i = 0) {
        // tabsContent[i].style.display = 'block';
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    };

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    // Timer

    const deadLine = '2022-04-14';
    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor(t / (1000 * 60 * 60) % 24),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) {
        if (num >=0 && num < 10) {
            return '0' + num;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);
            if (t.total <= 0) {
                clearInterval(timeInterval);
                t.days = 0;
                t.hours = 0;
                t.minutes = 0;
                t.seconds = 0;
            }

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);
        }
    }
    setClock('.timer', deadLine);

    // Modal
    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal'); //,
        // modalCloseBtns = document.querySelectorAll('[data-close]');

    modalTrigger.forEach(value => {
        value.addEventListener('click', showModal);
    });

    function showModal() {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

    function hideModal() {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            hideModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            hideModal();
        }
    });
    // ModalTimer
    const modalTimerId = setTimeout(showModal, 50000)

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            showModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
    // classes

    class DayMenuItem{
        constructor(name, img, subtitle, descr, cost, ...classes) {
            this.name = name;
            this.img = img;
            this.subtitle = subtitle;
            this.descr = descr;
            this.cost = cost;

            this.classes = classes;

            // this.container = document.querySelector('.menu').querySelector('.container');
            this.container = document.querySelector('.menu .container');
            this.transfer = 27;
            this.changeToUAH();
        }
        clear() {
            // console.log(this.container);
            this.container.querySelectorAll('.menu__item').forEach(function(e) {
                 e.remove();
            });
            this.show();
        }
        show() {
            const elem = document.createElement('div');
            elem.classList.add('menu__item');
            this.classes.forEach(className => elem.classList.add(className));
            elem.innerHTML = `
                <img src="${this.img}" alt="${this.name}">
                <h3 class="menu__item-subtitle">${this.subtitle}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.cost}</span> грн/день</div>
                </div>`;
            this.container.appendChild(elem);
        }
        changeToUAH() {
            this.cost *= this.transfer;
        }
    }

    const getResource = async (url) => {
        const res = await fetch(url);

        if (!res.ok) { 
            throw new Error(`${url}: ${res.status}: ${res.statusText}`);
        }

        return await res.json();
    };

    axios.get('http://localhost:3000/menu')
        .then(data => {
            data.data.forEach(({altimg, img, title, descr, price}) => {
                new DayMenuItem(altimg, img, title, descr, price).show();
            });
        });

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Вам скоро перезвонит наш менеджер для уточнения и подтверждения заказа.',
        failure: 'Что то пошло не так...'
    };

    forms.forEach(form => {
        bindPostData(form);
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });

        return await res.json();
    };

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries( formData.entries() ));

            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            });

        });
    }
    // Thanks modal

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        showModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class=modal__content>
                <div data-close class="modal__close">×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            hideModal();
        }, 4000)
    }

    fetch('http://localhost:3000/requests')
        .then(data => data.json())
        .then(res => console.log(res));

    //slider

    const slides = document.querySelectorAll('.offer__slide'),
        slider = document.querySelector('.offer__slider'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        current = document.querySelector('#current'),
        total = document.querySelector('#total'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        slidesField = document.querySelector('.offer__slider-inner'),
        width = window.getComputedStyle(slidesWrapper).width;
    let slideIndex = 1;
    // let offset = 0;

    function zeroAdd(value) {
        return value < 10 ? `0${value}` : value;
    }

    function plusSlides(n) {
        slideIndex += n;
        if (slideIndex > slides.length) {
            slideIndex = 1;
        } else if (slideIndex < 1) {
            slideIndex = slides.length;
        }
        current.textContent = zeroAdd(slideIndex);
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;

        // const offset = +width.slice(0, width.length - 2) * (slideIndex -1);
        const offset = +width.replace(/\D/g, '') * (slideIndex -1);
        slidesField.style.transform = `translateX(-${offset}px)`;
    }

    //slider2

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.3s all';
    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => slide.style.width = width);

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
        dots = [];

    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        // if (i == 0) {
        //     dot.style.opacity = 1;
        // }
        indicators.append(dot);
        dots.push(dot);
        dot.addEventListener('click', e => {
            const slideTo = e.target.getAttribute('data-slide-to');
            plusSlides(slideTo - slideIndex);
        });
    }

    next.addEventListener( 'click', () => plusSlides(+1) );

    prev.addEventListener( 'click', () => plusSlides(-1) );

    total.textContent = zeroAdd(slides.length);
    plusSlides(0);

});
