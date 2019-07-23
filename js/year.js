/* AUTOTAB ON BIRTH YEAR */

function autotab(current, to) {
    if (current.getAttribute && (current.value.length === 1)) {
        to.focus();
    }
}

/* VERIFY MINIMUM AGE */
const verifyBtn = document.getElementById('verify-button');
const warning = document.getElementById('warning');

function toggleInputNumbers() {
    const numberInput = Array.from(document.getElementsByClassName('number-input'));

    numberInput.forEach(function (el) {
        el.classList.toggle('number-input--warning');
    });
}

verifyBtn.addEventListener('click', function (e) {
    e.preventDefault();

    const one = document.getElementById('one').value;
    const two = document.getElementById('two').value;
    const three = document.getElementById('three').value;
    const four = document.getElementById('four').value;

    const year = one + two + three + four;
    const d = new Date();
    const currentYear = d.getFullYear();
    const age = currentYear - year;

    const oldestAge = 122;

    if (age >= 18 && age <= oldestAge) {
        window.location.href = './html/location.html';
    } else {
        verifyBtn.classList.toggle('invisible');
        warning.classList.toggle('invisible');
        toggleInputNumbers();
    }

    // in the real app, save the year to the backend
    return year;
});

/* SHOW VERIFY BUTTON AGAIN */

function revert() {
    if (!warning.classList.contains('invisible')) {
        verifyBtn.classList.toggle('invisible');
        warning.classList.toggle('invisible');
        toggleInputNumbers();
    }
}