function cards() {
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

    getResource('http://localhost:3000/menu')
    .then(data => {
        data.data.forEach(({altimg, img, title, descr, price}) => {
            new DayMenuItem(altimg, img, title, descr, price).show();
        });
    });


}

module.exports = cards;