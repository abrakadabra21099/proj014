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

    // modalCloseBtns.forEach(value => {
    //     value.addEventListener('click', hideModal);
    // });

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            hideModal();
            // modal.classList.toggle('show');
            // document.body.style.overflow = '';
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
            // console.log(this.classes);

            // if (this.classes.length === 0) {
            //     this.elem = 'menu__item';
            //     elem.classList.add(this.elem);
                elem.classList.add('menu__item');
            // } else {
                this.classes.forEach(className => elem.classList.add(className));
            // }
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

    getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({altimg, img, title, descr, price}) => {
                new DayMenuItem(altimg, img, title, descr, price).show();
            });
        });

    // new DayMenuItem(
    //         'vegy', 
    //         'img/tabs/vegy.jpg', 
    //         'Меню "Фитнес"', 
    //         'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 
    //         9,              
    //         'big').clear();
    // new DayMenuItem(
    //           'elite', 
    //           'img/tabs/elite.jpg', 
    //           'Меню “Премиум”', 
    //           'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!', 
    //           14, 
    //           ).show();
    // new DayMenuItem(
    //           'post', 
    //           'img/tabs/post.jpg', 
    //           'Меню "Постное"', 
    //           'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.', 
    //           21, 
    //           ).show();

              // const log = function(a, b, ...cdef) {
    //     console.log(a, b, cdef);
    // };
    // log('basic', 'rest', 'operator', 'usage');

    // function calcOrDouble(number, basis = 2) {
    //     // basis = basis || 2;
    //     console.log(number * basis);
    // };
    // calcOrDouble(3);

    // Forms

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

            // const statusMessage = document.createElement('div');
            const statusMessage = document.createElement('img');
            // statusMessage.classList.add('status');
            statusMessage.src = message.loading;
            // statusMessage.textContent = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            // form.append( statusMessage );
            form.insertAdjacentElement('afterend', statusMessage);

            // const r = new XMLHttpRequest();
            // r.open('POST', 'server.php');


            // r.setRequestHeader('Content-type', 'multipart/form-data');
            // r.setRequestHeader('Content-type', 'application/json');

            const formData = new FormData(form);

            // const obj = {};
            // formData.forEach(function(value, key) {
            //     obj[key] = value;
            // });

            const json = JSON.stringify(Object.fromEntries( formData.entries() ));

            // const json = JSON.stringify(obj);

            // fetch('server.php', {
            //     method: 'POST',
            //     headers: {
            //         'Content-type': 'application/json'
            //     },
            //     body: JSON.stringify(obj)
            // })

            // postData('http://localhost:3000/requests', JSON.stringify(obj))
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

            // r.send(formData);
            // r.send(json);

            // r.addEventListener('load', () => {
            //     if (r.status === 200) {
            //         console.log(r.response);
            //         showThanksModal(message.success);
            //         form.reset();
            //         // setTimeout(() => {
            //             statusMessage.remove();
            //         // },2000);
            //     } else {
            //         showThanksModal(message.failure);
            //     }
            // });
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

    // fetch('https://jsonplaceholder.typicode.com/posts', {
    //     method: 'POST',
    //     body: JSON.stringify({name: 'Alex'}),
    //     headers: {
    //         'Content-type': 'applications/json'
    //     }
    // })
    // .then(response => response.json())
    // .then(json => console.log(json));

    fetch('http://localhost:3000/requests')
        .then(data => data.json())
        .then(res => console.log(res));

});
