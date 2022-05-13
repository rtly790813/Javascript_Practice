/** @format */
import { $on, qsAll } from './helper';

export class AutoFormat {
    tokenList = {
        '#': /[^\d]/g,
        X: /[^0-9a-zA-Z]/g,
    };

    constructor(element) {
        this.elements = qsAll(element);
    }

    addEvent() {
        this.elements.forEach((element) => {
            $on(element, 'keyup', (event) => {
                const currentTarget = event.target;
                const currentValue = currentTarget.value;
                const format = currentTarget.getAttribute('data-format');
                const token = currentTarget.getAttribute('data-token');
                const newValue = this.renderFormat(currentValue, format, token);
                currentTarget.value = newValue;
            });
        });
    }

    renderFormat(value = '', format = '', token) {
        if (!format || !value) {
            return value;
        }

        const resetValue = value.replace(this.tokenList[token], '');
        const transferVals = Array.from(format)
            .map((transferVal, index) => ({ transferVal, index }))
            .filter((transferObj) => transferObj.transferVal !== token);

        return this.dynamicFormat(transferVals, resetValue);
    }

    dynamicFormat(transferVals, value) {
        return transferVals
            .reduce((stringList, transferVal) => {
                if (stringList.length >= transferVal.index) {
                    stringList.splice(
                        transferVal.index,
                        0,
                        transferVal.transferVal
                    );
                }

                return stringList;
            }, Array.from(value))
            .join('');
    }
}
