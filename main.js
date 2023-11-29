let quote_data = null;
let CURR_QUO_INDEX = 0,
  MAX_QUOTES_NUM = 0,
  quote_text;
let next_quote_btn = document.querySelector(".next_quote_btn");
let copy_quote_btn = document.querySelector(".copy_quote_btn");
let quote_tv = document.querySelector("#quote_tv");
let author_tv = document.querySelector("#author_tv");

// getting all quotes from api
function GetAllQuotes() {
  fetch('https://type.fit/api/quotes')
    .then((response) => response.json())
    .then((data) => {
      quote_data = data;
      GetQuoteData();
    }).catch((error) => {
      quote_tv.innerHTML = "Oops! Failed to load new quote.";
    });
}

function GetQuoteData() {
  MAX_QUOTES_NUM = quote_data.length;
  CURR_QUO_INDEX = GenerateRandNum(0, MAX_QUOTES_NUM);
  if (MAX_QUOTES_NUM >= CURR_QUO_INDEX) {
    quote_text = quote_data[CURR_QUO_INDEX]['text'];
    author_tv.innerHTML = "-" + quote_data[CURR_QUO_INDEX]['author'];
    quote_tv.innerHTML = quote_text;
  }
}

next_quote_btn.addEventListener("click", () => {
  GetQuoteData();
});

copy_quote_btn.addEventListener("click", () => {
  if (quote_text != "") {
    CopyQuote();
  }
});

function GenerateRandNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function CopyQuote() {
  var input_quote = document.createElement("textarea");
  input_quote.value = quote_text;
  input_quote.select();
  input_quote.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(input_quote.value);
  alert("Quote Copied!");
}

GetAllQuotes();