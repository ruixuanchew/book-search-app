<template>
  <form @submit.prevent="onSubmit" class="flex justify-center">
    <div class="relative">
      <input
        v-model="query"
        placeholder="Search..."
        class="shadow-lg w-40 sm:w-56 md:w-64 focus:border-2 focus:bg-brand-hover border-gray-300 px-5 py-3 rounded-xl transition-all focus:w-64 outline-none placeholder-brand-secondary bg-brand-accent"
        name="search"
        type="search"
      />
      <button type="submit">
        <svg
          class="size-6 absolute top-3 right-3 text-brand-secondary"
          stroke="currentColor"
          stroke-width="1.5"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            stroke-linejoin="round"
            stroke-linecap="round"
          />
        </svg>
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: "SearchBar",
  data() {
    return {
      query: ""
    }
  },
  methods: {
    onSubmit() {
      if (this.query.trim()) {
        this.$emit("search", this.query.trim())
      }
    }
  }
}
</script>
