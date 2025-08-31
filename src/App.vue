<template>
  <Navbar 
    @select-genre="handleGenreSelect" 
    @select-language="handleLanguage" 
    @go-home="resetToHome"
    @login="showLoginModal = true"
    @logout="handleLogout"
    :is-logged-in="isLoggedIn"
  />
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

  <LoginModal 
    v-if="showLoginModal" 
    @close="showLoginModal = false"
    @logged-in="handleLoggedIn"
    @show-signup="showSignupModal = true; showLoginModal = false"
  />
  <SignupModal 
    v-if="showSignupModal" 
    @close="showSignupModal = false" 
    @show-login="showSignupModal = false; showLoginModal = true"
    @signup-success="showSignupModal = false; showLoginModal = true"
  />
</template>

<script>
import Navbar from "./components/Navbar.vue"
import SearchBar from "./components/SearchBar.vue"
import BookDisplay from "./components/BookDisplay.vue"
import LoginModal from "./components/LoginModal.vue"
import SignupModal from "./components/SignupModal.vue"
import { searchBooks, getBooksByCategory, getBooksByLanguage } from "./services/booksApi.js"

export default {
  name: "App",
  components: { Navbar, SearchBar, BookDisplay, LoginModal, SignupModal },
  data() {
    return {
      searchResults: [],
      showLoginModal: false,
      showSignupModal: false,
      isLoggedIn: !!localStorage.getItem("token"),
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
    },
     handleLoggedIn() {
      this.isLoggedIn = true
      this.showLoginModal = false
    },
    handleLogout() {
      localStorage.removeItem("token")
      this.isLoggedIn = false
    } 
  }
}
</script>
