let newQuoteBtn = document.getElementById("new-quote");

let apiQuotes = [];
let currentQuote = {};

function newQuote() {
    currentQuote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
}

getQuotes();
async function getQuotes() {
    try {
        const response = await fetch("https://type.fit/api/quotes");
        apiQuotes = await response.json();
        setQuote();
    } catch (error) {
        alert(error);
    }
}



function setQuote() {

    newQuote();
    if (currentQuote.text.length > 10) {
        document.getElementById("quote").classList.toggle("long-quote");
        document.getElementById("quote").classList.toggle("long-quote");
    }
    document.getElementById("quote").classList.remove("long-quote");
    document.getElementById("quote").textContent = currentQuote.text;
    document.getElementById("author").textContent = currentQuote.author;

}

newQuoteBtn.addEventListener('click', setQuote)