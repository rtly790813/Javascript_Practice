/** @format */

import './index.css';
import { AutoFormat } from './js/autoFormat.js';
import { Template } from './js/template.js';
import { CreditCardPage } from './js/creditCardPage';
import { $on } from './js/helper';

const autoFormat = new AutoFormat('[data-format]');
const template = new Template();
const creditCardPage = new CreditCardPage(template);
const initialEvent = () => {
    autoFormat.addEvent();
    creditCardPage.loadCreditCardPage();
};

$on(window, 'load', initialEvent);
