// 'use strict';
require('es6-promise').polyfill();
import 'nodelist-foreach-polyfill';

import cards  from './modules/cards';
import tabs   from './modules/tabs';
import modal  from './modules/modal';
import timer  from './modules/timer';
import calc   from './modules/calc';
import forms  from './modules/forms';
import slider from './modules/slider';
import {showModal} from './modules/modal';


document.addEventListener('DOMContentLoaded', () => {
    // const cards = require('./modules/cards'),
    //       tabs = require('./modules/tabs'),
    //       modal = require('./modules/modal'),
    //       timer = require('./modules/timer'),
    //       calc  = require('./modules/calc'),
    //       slider= require('./modules/slider');
    const modalTimerId = setTimeout(() => showModal('.modal', modalTimerId), 50000);
    tabs('.tabheader__item', '.tabcontent', '.tabheader', 'tabheader__item_active');
    modal('[data-modal]', '.modal', modalTimerId);
    timer('.timer', '2022-04-14');
    cards();
    calc();
    forms('form', modalTimerId);
    slider({
        container: '.offer__slider',
        slide: '.offer__slide',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
});
