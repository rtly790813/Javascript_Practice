/** @format */

import { qs, qsAll, $on } from './helper.js';

export class CreditCardPage {
    cardNumberTemplate = {
        amexTemp: '#### ###### #####',
        otherTemp: '#### #### #### ####',
    };
    orgBackgroundClass = {
        visa: 'bg-card-org-visa',
        amex: 'bg-card-org-amex',
        mastercard: 'bg-card-org-mastercard',
        unpay: 'bg-card-org-unpay',
        jcb: 'bg-card-org-jcb',
    };
    currentTemp = this.cardNumberTemplate.otherTemp;
    currentYear = parseInt(new Date().getFullYear().toString().slice(2, 4));
    isFront = true;

    constructor(template) {
        this.template = template;
        this.orgLogoElements = qsAll('.credit_card_organization');
        this.$cardNumberInput = qs('#cardNumber');
        this.$cardHolderInput = qs('#cardHolder');
        this.$cardCvvInput = qs('#cardCvv');
        this.$expirationMonthSelect = qs('#expirationMonth');
        this.$expirationYearSelect = qs('#expirationYear');
        this.$creditCardNumber = qs('.js-credit_card_number');
        this.$creditCardHolder = qs('.js-credit_card_holder');
        this.$creditCardCVV = qs('.js-cardit_card_cvv_input');
        this.$creditCardMonth = qs('.js-credit_card_month');
        this.$creditCardYear = qs('.js-credit_card_year');
    }

    loadCreditCardPage = () => {
        $on(this.$cardNumberInput, 'input', (event) => {
            const currentValue = event.target.value;
            const type = this.getCardType(currentValue);

            this.setCardNumberTemplate(type);
            this.setCardOrgImg(type);
            this.$creditCardNumber.innerHTML = this.template.cardNumber(
                this.getCardNumberString(currentValue)
            );
        });
        $on(this.$cardHolderInput, 'input', (event) => {
            this.$creditCardHolder.innerHTML = this.template.cardHolder(
                event.target.value
            );
        });
        $on(this.$cardCvvInput, 'input', (event) => {
            this.$creditCardCVV.innerHTML = this.template.cardCvv(
                event.target.value
            );
        });
        $on(this.$expirationMonthSelect, 'change', (event) => {
            this.$creditCardMonth.innerHTML = event.target.value;
        });
        $on(this.$expirationYearSelect, 'change', (event) => {
            this.$creditCardYear.innerHTML = event.target.value;
        });
        [
            this.$cardNumberInput,
            this.$cardHolderInput,
            this.$expirationMonthSelect,
            this.$expirationYearSelect,
        ].forEach((element) => {
            $on(element, 'focus', () => {
                this.isFront = true;
                this.rotateCreditCard();
            });
        });
        $on(this.$cardCvvInput, 'focus', () => {
            this.isFront = false;
            this.rotateCreditCard();
        });

        this.renderSelectOptions(1, 13, 'Month', 'expirationMonth');
        this.renderSelectOptions(
            this.currentYear,
            this.currentYear + 50,
            'Year',
            'expirationYear'
        );
    };
    renderSelectOptions = (start, end, defaultVal, el) => {
        const selectEl = document.getElementById(el);
        selectEl.innerHTML = this.template.selectOptions(
            start,
            end,
            defaultVal
        );
    };
    getCardType = (number) => {
        let re = new RegExp('^4');
        if (number.match(re) != null) return 'visa';

        re = new RegExp('^(34|37)');
        if (number.match(re) != null) return 'amex';

        re = new RegExp('^5[1-5]');
        if (number.match(re) != null) return 'mastercard';

        re = new RegExp('^62');
        if (number.match(re) != null) return 'unpay';

        re = new RegExp('^(352[8-9]|35[3-8][0-9])');
        if (number.match(re) != null) return 'jcb';

        return 'visa'; // default type
    };
    getCardNumberString = (val) => {
        return (
            val + this.currentTemp.slice(val.length, this.currentTemp.length)
        );
    };
    setCardNumberTemplate = (type) => {
        this.currentTemp =
            type === 'amex'
                ? this.cardNumberTemplate.amexTemp
                : this.cardNumberTemplate.otherTemp;

        this.$cardNumberInput.setAttribute('data-format', this.currentTemp);
        this.$cardNumberInput.setAttribute(
            'maxlength',
            this.currentTemp.length
        );
    };
    setCardOrgImg = (org) => {
        this.orgLogoElements.forEach((element) => {
            const currentOrgImg = Array.from(element.classList)
                .join(' ')
                .match(/bg[\-a-zA-Z0-9]+/g);
            element.classList.remove(currentOrgImg);
            element.classList.add(this.orgBackgroundClass[org]);
        });
    };
    rotateCreditCard = () => {
        const cardFrontEl = qs('.credit_card-front');
        const cardBackEl = qs('.credit_card-back');
        if (this.isFront) {
            cardFrontEl.classList.add('credit_card-active');
            cardBackEl.classList.remove('credit_card-active');
            return;
        }

        cardFrontEl.classList.remove('credit_card-active');
        cardBackEl.classList.add('credit_card-active');
    };
}
