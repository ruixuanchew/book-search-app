const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

export async function searchBooks(query, startIndex = 0, maxResults = 20) {
  const res = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
      query
    )}&startIndex=${startIndex}&maxResults=${maxResults}&key=${API_KEY}`
  )
  const data = await res.json()
  const items = data.items || []

  // Filter out results that don't match the query in the title or authors
  const filtered = items.filter(book => {
    const title = book.volumeInfo.title || ""
    const authors = (book.volumeInfo.authors || []).join(" ")
    const lowerQuery = query.toLowerCase()
    return title.toLowerCase().includes(lowerQuery) || authors.toLowerCase().includes(lowerQuery)
  })

  return filtered
}

// Get Trending Books
export async function getTrendingBooks() {
  let ratedBooks = [];
  let startIndex = 0;

  // Keep fetching in batches until we have at least 8 rated books or reach 100 total
  while (ratedBooks.length < 7 && startIndex < 100) {
    const res = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=subject:fiction&maxResults=40&startIndex=${startIndex}&orderBy=relevance&key=${API_KEY}`
    );
    const data = await res.json();

    if (!data.items) break;

    // Filter books that have a rating
    ratedBooks.push(
      ...data.items.filter(
        (book) => book.volumeInfo && book.volumeInfo.averageRating
      )
    );

    startIndex += 40;
  }

  // Shuffle the array for randomness
  for (let i = ratedBooks.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [ratedBooks[i], ratedBooks[j]] = [ratedBooks[j], ratedBooks[i]];
  }

  return ratedBooks.slice(0, 10);
}

// Get Newest Books
export async function getNewestBooks() {
  const res = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=a&orderBy=newest&maxResults=7&key=${API_KEY}`
  );
  const data = await res.json();
  return data.items || [];
}

// Get books by category (genre)
export async function getBooksByCategory(category, maxResults = 20) {
  const res = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=subject:${encodeURIComponent(
      category
    )}&maxResults=${maxResults}&key=${API_KEY}`
  )
  const data = await res.json()
  return data.items || []
}

// Get books by language
export async function getBooksByLanguage(langCode, maxResults = 20) {
  if (!langCode) return [];

  const code = String(langCode).toLowerCase();
  const results = [];
  const batchSize = 40; 
  let startIndex = 0;
  const maxAttempts = 6;      

  for (let attempt = 0; attempt < maxAttempts && results.length < maxResults; attempt++) {
    const pageSize = Math.min(batchSize, maxResults);
    const url = `https://www.googleapis.com/books/v1/volumes?q=a&printType=books&langRestrict=${encodeURIComponent(
      code
    )}&startIndex=${startIndex}&maxResults=${pageSize}&key=${API_KEY}`;

    const res = await fetch(url);
    const data = await res.json();
    if (!data || !data.items || data.items.length === 0) break;

    // Keep only items that explicitly declare the language and match ISO code
    const matched = data.items.filter(
      (it) =>
        it.volumeInfo &&
        it.volumeInfo.language &&
        it.volumeInfo.language.toLowerCase().startsWith(code)
    );

    results.push(...matched);

    startIndex += pageSize;
  }

  // Due to nature of Google Books API, filtering by language is hard to pinpoint exact accurate results.
  // If above query does not result in any books, remove langRestrict for a looser query
  if (results.length === 0) {
    const fallbackRes = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=a&printType=books&maxResults=${Math.min(
        40,
        maxResults
      )}&key=${API_KEY}`
    );
    const fallbackData = await fallbackRes.json();
    const fallbackItems = (fallbackData.items || []).filter(
      (it) =>
        it.volumeInfo &&
        it.volumeInfo.language &&
        it.volumeInfo.language.toLowerCase().startsWith(code)
    );
    results.push(...fallbackItems);
  }

  return results.slice(0, maxResults);
}

