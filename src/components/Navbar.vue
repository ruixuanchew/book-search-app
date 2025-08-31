<template>
  <nav class="bg-brand-primary text-brand-secondary px-6 py-4 flex justify-between items-center shadow-lg sticky top-0 z-50">
    <div class="text-xl font-bold cursor-pointer" @click="$emit('go-home')">Booker</div>

    <!-- Dropdowns -->
    <ul class="hidden md:flex space-x-64 mx-auto">
      <!-- Genre Dropdown -->
      <li class="relative group">
        <button class="flex items-center space-x-1 hover:text-gray-300">
          <span>Genre</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 transform group-hover:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
          </svg>
        </button>
        <ul class="absolute left-0 mt-2 w-52 bg-brand-accent text-black rounded shadow-lg opacity-0 group-hover:opacity-100 group-hover:translate-y-1 transform transition max-h-48 overflow-y-auto custom-scrollbar">
          <li v-for="genre in genres" :key="genre" class="px-4 py-2 hover:bg-brand-hover cursor-pointer" @click="$emit('select-genre', genre)">
            {{ genre }}
          </li>
        </ul>
      </li>

      <!-- Language Dropdown -->
      <li class="relative group">
        <button class="flex items-center space-x-1 hover:text-gray-300">
          <span>Language</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 transform group-hover:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
          </svg>
        </button>
        <ul class="absolute left-0 mt-2 w-40 bg-brand-accent text-black rounded shadow-lg opacity-0 group-hover:opacity-100 group-hover:translate-y-1 transform transition max-h-48 overflow-y-auto custom-scrollbar">
          <li v-for="lang in languages" :key="lang.code" class="px-4 py-2 hover:bg-brand-hover cursor-pointer" @click="$emit('select-language', lang.code)">
            {{ lang.label }}
          </li>
        </ul>
      </li>
    </ul>

    <!-- Login / Logout Button -->
    <button
      class="hidden md:inline-block bg-brand-accent text-white px-4 py-2 rounded-lg font-semibold hover:bg-brand-hover transition"
      @click="isLoggedIn ? $emit('logout') : $emit('login')"
    >
      {{ isLoggedIn ? "Logout" : "Login" }}
    </button>

    <!-- Mobile Menu Button -->
    <button class="md:hidden text-gray-300 hover:text-white focus:outline-none">
      ☰
    </button>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  props: {
    isLoggedIn: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      genres: [
        "ART", "BIOGRAPHY & AUTOBIOGRAPHY", "BUSINESS & ECONOMICS", "COMICS & GRAPHIC NOVELS",
        "COMPUTERS", "CRAFTS & HOBBIES", "DESIGN", "DRAMA", "EDUCATION", "FICTION",
        "GAMES & ACTIVITIES", "HEALTH & FITNESS", "HISTORY", "HUMOR",
        "LANGUAGE ARTS & DISCIPLINES", "LAW", "LITERARY COLLECTIONS", "MATHEMATICS",
        "MEDICAL", "MUSIC", "NATURE", "PERFORMING ARTS", "PETS", "PHILOSOPHY",
        "POETRY", "POLITICAL SCIENCE", "PSYCHOLOGY", "RELIGION", "SCIENCE",
        "SELF-HELP", "SPORTS & RECREATION", "STUDY AIDS", "TECHNOLOGY & ENGINEERING",
        "TRANSPORTATION", "TRAVEL", "TRUE CRIME",
      ],
      languages: [
        { label: "ENGLISH", code: "en" },
        { label: "ITALIAN", code: "it" },
        { label: "HINDI", code: "hi" },
        { label: "FRENCH", code: "fr" },
        { label: "JAPANESE", code: "ja" },
        { label: "SPANISH", code: "es" },
        { label: "GERMAN", code: "de" },
        { label: "RUSSIAN", code: "ru" },
        { label: "KOREAN", code: "ko" },
      ]
    }
  }
}
</script>
