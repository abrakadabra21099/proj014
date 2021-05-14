'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const cards = require('./modules/cards'),
          tabs = require('./modules/tabs'),
          modal = require('./modules/modal'),
          timer = require('./modules/timer'),
          calc  = require('./modules/calc'),
          slider= require('./modules/slider');
    tabs();
    modal();
    timer();
    cards();
    calc();
    slider();
});
