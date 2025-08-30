<template>
  <Navbar @select-genre="handleGenreSelect" 
          @select-language="handleLanguage" 
          @go-home="resetToHome"/>
  <section
    class="relative w-full h-[400px] bg-cover bg-center"
    style="background-image: url('../public/brown_books.jpg')"
  >
    <div class="absolute inset-0 bg-black/15"></div>

    <div
      class="relative flex flex-col justify-start items-center gap-6 h-full pt-24 md:pt-52 px-4"
    >
      <h1 class="text-white text-2xl md:text-4xl font-bold text-center drop-shadow-lg">
        Your Next Book Awaits...
      </h1>

      <!-- Controls -->
      <div class="flex flex-wrap justify-center items-start gap-4 md:gap-10 w-full">
        <SearchBar @search="handleSearch" />
      </div>
    </div>

    <!-- Pass searchResults to BookDisplay -->
    <BookDisplay :searchResults="searchResults" />
  </section>
</template>

<script>
import Navbar from "./components/Navbar.vue"
import SearchBar from "./components/SearchBar.vue"
import BookDisplay from "./components/BookDisplay.vue"
import { searchBooks, getBooksByCategory, getBooksByLanguage } from "./services/booksApi.js"

export default {
  name: "App",
  components: { Navbar, SearchBar, BookDisplay },
  data() {
    return {
      searchResults: []
    }
  },
  methods: {
    async handleSearch(query) {
      this.searchResults = await searchBooks(query)
    },
    async handleGenreSelect(genre) {
      this.searchResults = await getBooksByCategory(genre, 20)
    },
    async handleLanguage(langCode) {
      this.searchResults = await getBooksByLanguage(langCode, 20)
    },
    resetToHome() {
    this.searchResults = [] 
  }
}
}
</script>
