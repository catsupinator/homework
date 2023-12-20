const madlibGenerator = document.getElementById("madlib-button");
const noun1 = document.getElementById("noun-1");
const noun2 = document.getElementById("noun-2");
const verb = document.getElementById("verb");
const properNoun = document.getElementById("proper-noun");
const adjective = document.getElementById("adjective");
const output = document.getElementById("madlib-output");

function generate() {
    if (noun1.value == "") {
        output.innerHTML = "You must provide the first noun";
    }
    else if (verb.value == "") {
        output.innerHTML = "You must provide a verb";
    }
    else if (properNoun.value == "") {
        output.innerHTML = "You must provide a proper noun";
    }
    else if (adjective.value == "") {
        output.innerHTML = "You must provide an adjective";
    }
    else if (noun2.value == "") {
        output.innerHTML = "You must provide a second noun";
    }
    else {
        output.innerHTML = `There once was a ${noun1.value} named ${properNoun.value}. One day ${properNoun.value} went for a ${adjective.value} ${verb.value} and encountered a ${adjective.value} ${noun2.value}, they became fast friends`;
    }
}

madlibGenerator.addEventListener("click", generate);