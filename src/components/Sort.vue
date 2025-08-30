<template>
  <div class="flex justify-center relative group">
    <!-- Button -->
    <div
      class="bg-brand-accent w-28 sm:w-36 md:w-48 justify-center p-3 rounded-lg shadow-md cursor-pointer hover:bg-brand-hover transition-colors flex items-center space-x-2"
    >
      <span class="font-medium text-brand-secondary">Sort</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6 text-brand-secondary transform group-hover:rotate-180 transition-transform"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
      </svg>
    </div>

    <!-- Dropdown -->
    <ul
      class="absolute top-full mt-2 w-48 bg-brand-accent text-black rounded shadow-lg opacity-0 group-hover:opacity-100 group-hover:translate-y-1 transform transition max-h-60 overflow-y-auto z-10"
    >
    
      <li
        v-for="option in sortOptions"
        :key="option.value"
        class="px-4 py-2 hover:bg-brand-hover cursor-pointer"
        @click="$emit('select-sort', option.value)"
      >
        {{ option.label }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "SortBar",
  data() {
    return {
      sortOptions: [
        { label: "Title (A → Z)", value: "title-asc" },
        { label: "Title (Z → A)", value: "title-desc" },
        { label: "Date (Newest)", value: "date-desc" },
        { label: "Date (Oldest)", value: "date-asc" },
      ],
    };
  },
};
</script>
