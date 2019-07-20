/* AUTOTAB ON BIRTH YEAR */

function autotab(current, to) {
    if (current.getAttribute && (current.value.length == current.getAttribute("maxlength"))) {
        to.focus();
    }
}

const verifyBtn = document.getElementById("verify-button");

verifyBtn.addEventListener("click", function (e) {
    e.preventDefault();

    const one = document.getElementById("one").value;
    const two = document.getElementById("two").value;
    const three = document.getElementById("three").value;
    const four = document.getElementById("four").value;

    const year = one + two + three + four;
    const d = new Date();
    const currentYear = d.getFullYear();
    const age = currentYear - year;

    const oldestAge = 122;

    if (age >= 18 && age <= oldestAge) {
        window.location.href = "./html/location.html";
    }

    // in the real app, save the year to the backend
    return year;
});