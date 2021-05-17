function calc() {
    // Calc

    const result = document.querySelector('.calculating__result span');
    let sex = localStorage.getItem('sex') ? localStorage.getItem('sex') : 'female', 
    height = localStorage.getItem('height'), 
    weight = localStorage.getItem('weight'), 
    age = localStorage.getItem('age'), 
    ratio = localStorage.getItem('ratio') ? localStorage.getItem('ratio') : 1.375;

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '____';
            return;
        }

        if (sex === 'female') {
            result.textContent = Math.round( (447.6 + ( 9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio );
        } else {
            result.textContent = Math.round( (88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio );
        }
    }
    calcTotal();

    function getStaticInfo(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {

            if (elem.getAttribute('data-ratio')) {
                if (elem.getAttribute('data-ratio') != ratio) {
                    elem.classList.remove(activeClass);
                } else {
                    elem.classList.add(activeClass);
                }

                elem.addEventListener('click', e => {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', ratio);
                });
            } else {
                if (elem.getAttribute('id') != sex) {
                    elem.classList.remove(activeClass);
                } else {
                    elem.classList.add(activeClass);
                }

                elem.addEventListener('click', e => {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', sex);
                });
            }

            elem.addEventListener('click', e => {
                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });
                e.target.classList.add(activeClass);

                calcTotal();
            });
        });
    }

    getStaticInfo('#gender div', 'calculating__choose-item_active');
    getStaticInfo('.calculating__choose_big div', 'calculating__choose-item_active');

    function getDynamicInfo(selector) {
        const input = document.querySelector(selector);

        input.value = localStorage.getItem(input.getAttribute('id'));

        input.addEventListener('input', () => {
            if (input.value.match(/\D/g)) {
                input.style.border = '5px solid red';
                return;
            } 
            input.style.border = 'none';
    
            localStorage.setItem(input.getAttribute('id'), +input.value);
            const obj = {};
            obj[input.getAttribute('id')] = +input.value;
            height = obj.height ? obj.height : height;
            weight = obj.weight ? obj.weight : weight;
            age = obj.age ? obj.age : age;
            calcTotal();
        });
    }

    getDynamicInfo('#height');
    getDynamicInfo('#weight');
    getDynamicInfo('#age');

}

// module.exports = calc;
export default calc;
