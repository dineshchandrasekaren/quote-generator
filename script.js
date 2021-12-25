const newQuoteBtn = document.getElementById("new-quote");
const twitterBtn = document.getElementById("twitter");
const author = document.getElementById("author");
const quoteText = document.getElementById("quote");
const quoteContainer = document.getElementById("quote-container");
const loader = document.getElementById("loader");

// global quotes array from " apiQuotes = await response.json();" in getQuotes() function
let apiQuotes = [];

// generating new random quotes
function newQuote() {
    showLoadingSpinner();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    quote.text.length > 120
        ? quoteText.classList.add("long-quote")
        : quoteText.classList.remove("long-quote");
    quoteText.textContent = quote.text;
    author.textContent = !quote.author ? "Unknown" : quote.author;
    hideLoadingSpinner();
}


function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}


function hideLoadingSpinner() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// on load
getQuotes();

// fetching the quotes from API
async function getQuotes() {
    try {
        showLoadingSpinner();
        const response = await fetch("https://type.fit/api/quotes");
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        new Error("Oops "+ error)
    }
}

// tweet the quotes on twitter
function tweet() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${author.textContent}`;
    window.open(twitterUrl, "_blank");
}

// 2 buttons EventListener
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweet);

/* 💡 Alternative but cors error 

IMPORTANT:
In this, we we use the free proxy api from CORS anywhere. It often results in http status code 429, because there is too much traffic. You can't do anything about the 429 error other than just wait.

 getQuote Method 👇
  🎯 method=getQuote — method name to invoke
  🎯 format=<format> — one of the server supported response formats
  🎯 key=<integer> — numeric key, which influences the choice of quotation, the maximum length is 6 characters
  🎯 lang=<string> — response language ("ru" or "en")
  🎯 jsonp=<string> — callback function name, used for jsonp format only

  Article:😎 https://medium.com/@dtkatz/3-ways-to-fix-the-cors-error-and-how-access-control-allow-origin-works-d97d55946d9
   👇👇👇 */
// 👇👇👇👇👇
// async function getQuotes() {
//     const proxyUrl = "https://cors-anywhere.herokuapp.com/"
//     const apiUrl = "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
// loading();
//     try {
//         const response = await fetch(proxyUrl + apiUrl);
//         apiQuotes = await response.json();
//         console.log(apiQuotes);
// apiQuotes.text.length > 120
//     ? quoteText.classList.add("long-quote")
//     : quoteText.classList.remove("long-quote");
// quoteText.innerText = apiQuotes.text;
// author.innerText = !apiQuotes.author ? "Unknown" : apiQuotes.author;
// complete();
//     } catch (error) {
// getQuotes()
//
//     }
// }
// getQuotes()