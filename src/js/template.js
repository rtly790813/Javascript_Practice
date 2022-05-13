/** @format */

export class Template {
    cardNumber(val) {
        return val.split('').reduce((htmlStr, str) => {
            htmlStr +=
                str === ' '
                    ? '<span class="mr-2 xs:mr-3.5"></span>'
                    : `<span>${str}</span>`;

            return htmlStr;
        }, '');
    }
    cardHolder(val) {
        return val === '' ? 'FULL NAME' : val;
    }
    cardCvv(val) {
        return val === '' ? '**' : val;
    }
    selectOptions(start, end, defaultVal) {
        let htmlString = `<option value="${defaultVal}" disabled selected>${defaultVal}</option>`;
        for (let i = start; i < end; i += 1) {
            const val = i.toString().length < 2 ? '0' + i : i;
            const template = `<option value="${val}">${val}</option>`;
            htmlString += template;
        }
        return htmlString;
    }
}
