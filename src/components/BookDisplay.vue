<template>
  <div class="bg-brand-secondary min-h-screen flex flex-col items-start py-12 overflow-x-hidden">
    <div v-if="searchResults && searchResults.length">
      <h2 class="text-white text-3xl font-bold mb-6 px-4">Search Results</h2>

      <!-- Mount Sort and Filter Bar -->
      <div class="flex gap-4 mb-6 px-4">
        <SortBar @select-sort="handleSort" />
        <FilterBar @apply-filters="applyFilters"/>
        
      </div>

      <!-- If there are results than display grid view -->
      <div v-if="paginatedResults.length > 0">
        <!-- Book grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-6 px-4">
          <!-- Mount CardView Component -->
          <CardView
            v-for="book in paginatedResults"
            :key="book.id"
            :book="book"
          />
        </div>

        <!-- Pagination -->
        <div class="flex justify-center items-center gap-4 mt-8 text-white">
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="px-4 py-2 rounded bg-brand-primary disabled:opacity-50"
          >
            Prev
          </button>
          <span>Page {{ currentPage }} of {{ totalPages }}</span>
          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="px-4 py-2 rounded bg-brand-primary disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
      <div v-else class="text-white text-xl px-4">No books found.</div>
    </div>

    <!-- Trending + Newest -->
    <div v-else>
      <h2 class="text-white text-3xl font-bold mb-6 px-4">Trending</h2>
      <div class="flex gap-6 overflow-x-auto pb-4 px-4 custom-scrollbar">
        <!-- Mount CardView Component -->
        <CardView v-for="book in trendingBooks" :key="book.id" :book="book" class="flex-shrink-0 snap-start" />
      </div>

      <h2 class="text-white text-3xl font-bold mt-12 mb-6 px-4">Newest Books</h2>
      <div class="flex gap-6 overflow-x-auto pb-4 px-4 custom-scrollbar">
        <!-- Mount CardView Component -->
        <CardView v-for="book in newestBooks" :key="book.id" :book="book" class="flex-shrink-0 snap-start" />
      </div>
    </div>
  </div>
</template>

<script>
import CardView from "./CardView.vue"
import FilterBar from "./Filter.vue"
import SortBar from "./Sort.vue"
import { getTrendingBooks, getNewestBooks } from "../services/booksApi.js"

export default {
  name: "BookDisplay",
  components: { CardView, FilterBar, SortBar },
  // Props passed in from parent (App.vue)
  props: {
    searchResults: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      // Initialise Variables
      trendingBooks: [],
      newestBooks: [],
      currentPage: 1,
      resultsPerPage: 14,
      sortedResults: []
    }
  },
  computed: {
    // Total number of pages based on filtered/sorted results
    totalPages() {
      return Math.ceil(this.sortedResults.length / this.resultsPerPage)
    },
    paginatedResults() {
      // Slice the results for the current page
      const start = (this.currentPage - 1) * this.resultsPerPage
      return this.sortedResults.slice(start, start + this.resultsPerPage)
    }
  },
  watch: {
    // Watch for changes in searchResults (from parent)
    searchResults: {
      immediate: true,
      handler(newResults) {
        this.sortedResults = [...newResults] // reset sorting when new results arrive
      }
    }
  },
  methods: {
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--
    },
    // Handle sorting logic based on selected option
    handleSort(option) {
      if (!this.sortedResults.length) return

      if (option === "title-asc") {
        this.sortedResults.sort((a, b) =>
          (a.volumeInfo.title || "").localeCompare(b.volumeInfo.title || "")
        )
      } else if (option === "title-desc") {
        this.sortedResults.sort((a, b) =>
          (b.volumeInfo.title || "").localeCompare(a.volumeInfo.title || "")
        )
      } else if (option === "date-asc") {
        this.sortedResults.sort(
          (a, b) =>
            new Date(a.volumeInfo.publishedDate) -
            new Date(b.volumeInfo.publishedDate)
        )
      } else if (option === "date-desc") {
        this.sortedResults.sort(
          (a, b) =>
            new Date(b.volumeInfo.publishedDate) -
            new Date(a.volumeInfo.publishedDate)
        )
      }
       // Reset pagination back to first page after sorting
      this.currentPage = 1 
    },
    // Apply filters from FilterBar (pages, maturity, saleability, etc.)
    applyFilters(filters) {
    this.sortedResults = this.searchResults.filter(book => {
      const info = book.volumeInfo || {};
      const saleInfo = book.saleInfo || {};
      const accessInfo = book.accessInfo || {};

      // Pages filter
      if (filters.pages.length) {
        const pages = info.pageCount || 0;
        const inRange = filters.pages.some(range => {
          if (range === "<50") return pages < 50;
          if (range === "50-100") return pages >= 50 && pages <= 100;
          if (range === "100-200") return pages >= 100 && pages <= 200;
          if (range === "200-500") return pages >= 200 && pages <= 500;
          if (range === ">500") return pages > 500;
        });
        if (!inRange) return false;
      }

      // Maturity
      if (filters.maturity.length && !filters.maturity.includes(info.maturityRating)) {
        return false;
      }

      // Saleability
      if (filters.saleability.length && !filters.saleability.includes(saleInfo.saleability)) {
        return false;
      }

      // Viewability
      if (filters.viewability.length && !filters.viewability.includes(accessInfo.viewability)) {
        return false;
      }

      // PDF
      if (filters.pdf.length) {
        const pdfAvailable = !!(accessInfo.pdf && accessInfo.pdf.isAvailable);
        if (!filters.pdf.includes(pdfAvailable)) {
          return false;
        }
      }

      return true;
    });

    this.currentPage = 1; 
  }
  },
  async mounted() {
    if (!this.searchResults.length) {
      this.trendingBooks = await getTrendingBooks()
      this.newestBooks = await getNewestBooks()
    }
  }
  
}
</script>
