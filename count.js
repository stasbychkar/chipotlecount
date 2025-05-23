document.addEventListener('DOMContentLoaded', () => {

    if (document.querySelector('form')) {
        // count total cash
        document.querySelector('form').onsubmit = () => {
            let cash_sum = 0;
            document.querySelectorAll('.count').forEach((input) => {
                cash_sum += count(input.value) * parseFloat(input.dataset.coin);
            });
            let total = document.querySelector('#total');
            let result = document.querySelector('#result');
            totalNum = cash_sum;
            let resultNum = totalNum;
            // which drawer we are using
            if (document.querySelector("#checkbox_toggle").checked) {
                resultNum -= 300;
            } else {
                resultNum -= 200;
            }

            result.innerHTML = resultNum.toFixed(2);
            total.innerHTML = totalNum.toFixed(2);

            return false;
        
        }
    }
        
    // sync count -> amount
    document.querySelectorAll('[data-count]').forEach((inputField) => {
        inputField.addEventListener('change', () => {
            let amount = count(inputField.value) * parseFloat(inputField.dataset.coin);
            let inputClass = inputField.className.split(' ')[1];
            document.querySelectorAll("." + inputClass)[1].value = amount.toFixed(2);
        });
    });
    
    // sync amount -> count
    document.querySelectorAll('[data-amount]').forEach((inputField) => {
        inputField.addEventListener('change', () => {
            let inputClass = inputField.className.split(' ')[1];
            let countField = document.querySelectorAll("." + inputClass)[0];
            let amount = count(inputField.value) / parseFloat(countField.dataset.coin);
            document.querySelectorAll("." + inputClass)[0].value = amount;
        });
    });

    // --CI Count--
    
    document.querySelectorAll('.input-of-two').forEach((inputField) => {
        let total_lb = 0;
        // getting item's name
        inputField.addEventListener('keyup', () => {
            let inputClass = inputField.className.split(' ')[1];
            total_lb = 0;
            document.querySelectorAll(`.${inputClass}`).forEach(input => {
                total_lb += count(input.value) * parseFloat(input.dataset.lb);
            });
            console.log(total_lb);
            let total_html = document.querySelector(`.${inputClass}-total`);
            total_html.innerHTML = total_lb.toFixed(1);
        });
    });
})

// helper functions

// dealing with a single input
function count(input) {
    if (!input) {
        return 0;
    }
    if (!isNaN(input)) {
        return parseFloat(input);
    } else {
        if (input.indexOf('+') !== -1) {
            var sum = 0;
            input.split('+').forEach(part => {
                var num = parseFloat(part.trim());
                sum += num;
            });
            return parseInt(sum);
        } else {
            return 0;
        }
    }
}