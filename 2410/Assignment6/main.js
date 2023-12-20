async function randomQuote() {
    const randQuote = document.getElementById("opening-quote");
    const result = await fetch("https://usu-quotes-mimic.vercel.app/api/random");
    const random = await result.json();
    subElement = document.createElement("div");
    subElement.innerHTML = `-${random.author}`;
    randQuote.innerHTML = random.content;
    randQuote.append(subElement);
    searchBar.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            randQuote.innerHTML = "";
        }
    })
}

async function search(value) {
    const result = await fetch(`https://usu-quotes-mimic.vercel.app/api/search?query=${value}`);
    const testing = await result.json();
    testing.results.forEach(addElement)
    return testing.results;
}

const error = document.getElementById("error-container");
const searchBar = document.getElementById("search-bar");
searchBar.addEventListener("keypress", (e) => {
    if ((e.key === "Enter")){
        if (searchBar.value === "") {
            error.innerHTML = "must enter a search value";
        } else {
            search(searchBar.value);
            searchBar.value = "";
            error.innerHTML = "";
            document.getElementById("container").dataset.search = true;
        }
    }
})

searchBar.addEventListener("focus", () => {
    searchBar.value = "";
})

function addElement(result) {
    let pinned = false;
    const newElement = document.createElement("div");
    const subElement = document.createElement("div");
    subElement.className = "author";
    subElement.innerHTML = `-${result.author}`;
    newElement.className = `quote`;
    newElement.value = result.content;
    newElement.innerHTML = result.content;
    newElement.ariaLabel = "Press space to pin quote";
    document.querySelector(`div[class="quote-container"]`).append(newElement);
    newElement.append(subElement)
    newElement.tabIndex = "0";
    searchBar.addEventListener("keypress", (e) => {
        if ((e.key === "Enter") && (error.innerHTML !== "must enter a search value")) {
            document.querySelector(`.quote-container .quote`).remove();
        }
    })
    newElement.addEventListener("click", () => {
        pinned = !pinned;
        newElement.dataset.pinned = pinned;
        newElement.ariaLabel = "Press space to un-pin quote";
        if (pinned) {
            document.querySelector(`div[class="pinned-quote-container"]`).append(newElement);
        } else {
            document.querySelector(`div[class="quote-container"]`).prepend(newElement);
        }
    })

    newElement.addEventListener("keypress", (e) => {
        if (e.key === " ") {
            e.preventDefault();
            pinned = !pinned;
            newElement.dataset.pinned = pinned;
            if (pinned) {
                document.querySelector(`div[class="pinned-quote-container"]`).append(newElement);
            } else {
                document.querySelector(`div[class="quote-container"]`).prepend(newElement);
            }
        }
    })
}

randomQuote();