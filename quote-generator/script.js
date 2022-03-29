// DOM section
const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')


// data
let apiQuotes = []

const loading = () => {
  loader.style.visibility = 'visible'
  quoteContainer.hidden = true
}

const complete = () => {
  quoteContainer.hidden = false
  loader.style.visibility = 'hidden'
}

// show New Quote
const newQuote = () => {
  loading()
  // pick a number to random a quote
  const randomNumber = Math.random() * apiQuotes.length
  const quote = apiQuotes[Math.floor(randomNumber)]

  // check if author field is blank and replace it with unknown
  if (!quote.author) {
    authorText.textContent = 'unknown'
  } else {
    authorText.textContent = quote.author
  }

  // check quote length to determine styling
  if (quote.text.length > 120) {
    quoteText.classList.add('long-quote')
  } else {
    quoteText.classList.remove('long-quote')
  }

  quoteText.textContent = quote.text
  complete()
}

const wait = (msec = 1000) => {
  new Promise((resolve) => setTimeout(resolve, msec))
}

// Get Quotes From API
const getQuotes = async () => {
  loading()
  const apiUrl = 'https://type.fit/api/quotes'
  try {
    const response = await fetch(apiUrl)
    apiQuotes = await response.json()
    newQuote()
  } catch (error) {
    
  }
}

// Tweet Quote
const tweetQuote = () => {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`

  window.open(twitterUrl, '_blank')
}

// Event Listener
newQuoteBtn.addEventListener('click', newQuote)
twitterBtn.addEventListener('click', tweetQuote)

getQuotes()
