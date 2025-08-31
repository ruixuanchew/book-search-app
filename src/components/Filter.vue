<template>
  <div class="relative group inline-block">
    <!-- Button -->
    <div
      class="bg-brand-accent p-3 w-28 sm:w-36 md:w-48 justify-center rounded-lg shadow-md cursor-pointer hover:bg-brand-hover transition-colors flex items-center space-x-2"
    >
      <span class="font-medium text-brand-secondary">Filter</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-6 text-brand-secondary transform group-hover:rotate-180 transition-transform"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
        />
      </svg>
    </div>

    <!-- Dropdown -->
    <div
      class="absolute top-full mt-2 w-64 bg-brand-accent text-black rounded shadow-lg opacity-0 group-hover:opacity-100 group-hover:translate-y-1 transform transition max-h-96 overflow-y-auto z-10 p-4 space-y-4 custom-scrollbar"
    >
      <!-- Page Count -->
      <div>
        <h3 class="font-semibold mb-2">Pages</h3>
        <div v-for="range in pageRanges" :key="range.value" class="flex items-center">
          <input type="checkbox" :id="range.value" :value="range.value" v-model="filters.pages" 
          class="w-4 h-4 rounded border-gray-400 text-brand-primary focus:ring-brand-primary cursor-pointer"/>
          <label :for="range.value" class="ml-2">{{ range.label }}</label>
        </div>
      </div>

      <!-- Maturity -->
      <div>
        <h3 class="font-semibold mb-2">Maturity</h3>
        <div v-for="opt in maturityOptions" :key="opt" class="flex items-center">
          <input type="checkbox" :id="opt" :value="opt" v-model="filters.maturity" 
          class="w-4 h-4 rounded border-gray-400 text-brand-primary focus:ring-brand-primary cursor-pointer"/>
          <label :for="opt" class="ml-2">{{ opt }}</label>
        </div>
      </div>

      <!-- Saleability -->
      <div>
        <h3 class="font-semibold mb-2">Saleability</h3>
        <div v-for="opt in saleOptions" :key="opt" class="flex items-center">
          <input type="checkbox" :id="opt" :value="opt" v-model="filters.saleability" 
          class="w-4 h-4 rounded border-gray-400 text-brand-primary focus:ring-brand-primary cursor-pointer"/>
          <label :for="opt" class="ml-2">{{ opt }}</label>
        </div>
      </div>

      <!-- Viewability -->
      <div>
        <h3 class="font-semibold mb-2">Viewability</h3>
        <div v-for="opt in viewOptions" :key="opt" class="flex items-center">
          <input type="checkbox" :id="opt" :value="opt" v-model="filters.viewability" />
          <label :for="opt" class="ml-2">{{ opt }}</label>
        </div>
      </div>

      <!-- PDF -->
      <div>
        <h3 class="font-semibold mb-2">PDF</h3>
        <div class="flex items-center">
          <input type="checkbox" id="pdf-true" :value="true" v-model="filters.pdf" />
          <label for="pdf-true" class="ml-2">Available</label>
        </div>
        <div class="flex items-center">
          <input type="checkbox" id="pdf-false" :value="false" v-model="filters.pdf" />
          <label for="pdf-false" class="ml-2">Not Available</label>
        </div>
      </div>

      <!-- Apply Button -->
      <button
        class="mt-4 w-full bg-white text-accent py-2 rounded hover:bg-brand-hover transition"
        @click="$emit('apply-filters', filters)"
      >
        Apply Filters
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "FilterBar",
  data() {
    return {
      filters: {
        pages: [],
        maturity: [],
        saleability: [],
        viewability: [],
        pdf: []
      },
      // Define Filter options
      pageRanges: [
        { label: "< 50", value: "<50" },
        { label: "50 – 100", value: "50-100" },
        { label: "100 – 200", value: "100-200" },
        { label: "200 – 500", value: "200-500" },
        { label: "> 500", value: ">500" },
      ],
      maturityOptions: ["MATURE", "NOT_MATURE"],
      saleOptions: ["FOR_SALE", "NOT_FOR_SALE"],
      viewOptions: ["ALL_PAGES", "PARTIAL", "NO_PAGES"]
    }
  }
}
</script>
