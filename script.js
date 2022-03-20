// Get Quotes from API
// an asycrounous function can run at any time independently and it won't stop the browser from completing the loading of a page
const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')



let apiQuotes = []

function quoteLoading() {
  loader.hidden = false
  quoteContainer.hidden = true
}

function quoteLoaded(){
  loader.hidden = true
  quoteContainer.hidden = false
}

// show New Quote
function newQuote() {
  // pick a random quote fro apiQuotes array
  // math floor returns largest int less than or equal to a given number
  quoteLoading()
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
  // Check if author field is null and replace with unknown
 
  if(!quote.author){
    authorText.textContent = 'Unknown'
  }
  else{
    authorText.textContent = quote.author
  }

  // Check quote length to determine styling
  if (quote.text.length > 117){
    quoteText.classList.add('long-quote')
  }
  else {
    quoteText.classList.remove('long-quote')
  }
  quoteText.textContent = quote.text
  quoteLoaded()
  
}

// Get Quotes from api
async function getQuotes(){
  quoteLoading()
  const apiUrl = 'https://type.fit/api/quotes'
  try {
    const response = await fetch(apiUrl)
    apiQuotes = await response.json()
   
  } catch (error) {
    // if api error use quotes from quotes.js
    apiQuotes = localQuotes
  }
  newQuote()
}

function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`
  // _blank allows the link to open in a new tab
  window.open(twitterUrl, '_blank')
}

newQuoteBtn.addEventListener('click', newQuote)
twitterBtn.addEventListener('click', tweetQuote)

// On Load

getQuotes()
