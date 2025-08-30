# 📚 Booker  

**Booker** is a modern, responsive web app for exploring books, discovering trending & newest releases, and searching by genre, language, or custom queries. Built with Vue 3 + TailwindCSS, it provides a clean UI, powerful filtering/sorting, and a wishlist feature powered by local storage.  

---

## ✨ Features  

- 🔎 **Search Books** – search by title, author, or keyword.  
- 📈 **Trending & Newest Books** – displayed on the homepage.  
- 🎭 **Browse by Genre** – wide variety of genres available in the navbar.  
- 🌍 **Language Filter** – filter results by multiple languages.  
- 🧹 **Filtering Options** – filter by page count, maturity rating, saleability, PDF availability, and more.  
- 🔃 **Sorting Options** – sort results by title or publication date (ascending/descending).  

## 💻 Features In Progress 
- 📖 **Book Details Modal** – click a book to view details, description, and preview link.  
- ❤️ **Wishlist** – add/remove books from wishlist (stored in `localStorage`).  
- 📱 **Responsive Design** – optimized for both desktop and mobile devices.  

---

## 🛠️ Tech Stack  

- **Frontend Framework:** Vue 3 (Composition + Options API mix)  
- **Styling:** Tailwind CSS  
- **Components:** Custom Vue components for Navbar, Book Display, Cards, Filters, Sort, and Modal  
- **Data Source:** Google Books API  

---

## 🚀 Getting Started  

### Prerequisites  
Make sure you have installed:  
- [Node.js](https://nodejs.org/) (>=16)  
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)  

### Installation  

```bash
# Clone the repository
git clone https://github.com/ruixuanchew/book-search-application.git

# Navigate into the project
cd booker

# Install dependencies
npm install
```
### 🔑 Get Google Books API Key
You’ll need a free API key from Google Books to fetch book data.  
Follow the instructions here: [Google Books API Documentation](https://developers.google.com/books)

```bash
# Add .env file in root with API key
VITE_GOOGLE_BOOKS_API_KEY=google_books_api_key_here
```

```bash
# Run Development Server
npm run dev
```

### 🗃️ Project Structure
```bash
src/
 ├── components/
 │    ├── Navbar.vue
 │    ├── BookDisplay.vue
 │    ├── CardView.vue
 │    ├── SearchBar.vue
 │    ├── Filter.vue
 │    ├── Sort.vue
 │    └── BookModal.vue
 │
 ├── services/
 │    └── booksApi.js   # Handles Google Books API calls
 │
 ├── App.vue            # Root component
 └── main.js            # Entry point
```