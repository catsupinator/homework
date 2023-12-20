const loanAmount = document.getElementById("loan-amount");
const interest = document.getElementById("interest");
const years = document.getElementById("years");
const mortgageOutput = document.getElementById("mortgage-output");
const calculator = document.getElementById("pee");

function calculateMortgage() {
    if (Number.isNaN(parseFloat(loanAmount.value))) {
        if (loanAmount.value == "") {
            loanAmount.value = "340000";
            calculateMortgage();
        }
        else {
            mortgageOutput.innerHTML = "Loan Amount entered is not a number";
        }
    }
    else if (Number.isNaN(parseFloat(interest.value))) {
        if (interest.value == "") {
            interest.value = "5.5";
            calculateMortgage();
        }
        else {
            mortgageOutput.innerHTML = "Interest rate entered is not a number";
        }
    }
    else if (Number.isNaN(parseFloat(years.value))) {
        if (years.value == "") {
            years.value = "30";
            calculateMortgage();
        }
        else {
            mortgageOutput.innerHTML = "Number of years entered is not a number";
        }
    }
    else {
        const principal = parseFloat(loanAmount.value);
        const monthlyInterest = parseFloat(interest.value) / 1200;
        const numPayments = parseFloat(years.value) * 12;
        const monthlyMortgage = principal * ((monthlyInterest * Math.pow(1 + monthlyInterest, numPayments)) / (Math.pow(1 + monthlyInterest, numPayments) - 1));
        mortgageOutput.innerHTML = `Monthly Payment: $${monthlyMortgage.toFixed(2)}`;
    }
}

calculateMortgage();

loanAmount.addEventListener("blur", calculateMortgage);
interest.addEventListener("blur", calculateMortgage);
years.addEventListener("blur", calculateMortgage);