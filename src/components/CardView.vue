<template>
  <div class="bg-brand-secondary">
    <div
      v-if="book && book.volumeInfo"
      class="card shadow-[0px_4px_16px_px_#367E08] h-auto w-full max-w-[280px] md:max-w-[250px] min-h-[400px] sm:min-h-[350px] xs:min-h-[300px] group gap-[0.5em] rounded-[1.5em] relative flex justify-end flex-col p-[1.5em] z-[1] overflow-hidden"
    >
      <div class="absolute top-0 left-0 h-full w-full bg-brand-primary"></div>

      <div class="container text-white z-[2] relative font-nunito flex flex-col gap-[0.5em]">

        <!-- Thumbnail -->
        <div v-if="book.volumeInfo.imageLinks?.thumbnail" class="w-full h-48 mb-4 overflow-hidden rounded-lg">
          <img
            :src="book.volumeInfo.imageLinks.thumbnail"
            alt="Book Thumbnail"
            class="w-full h-full object-cover"
          />
        </div>

        <!-- Title and Authors -->
        <div class="h-fit w-full">
          <h1
            class="card_heading text-[1.5em] tracking-[.2em] font-extrabold text-white 
         overflow-hidden text-ellipsis line-clamp-2 min-h-[3.0em]"
            style="font-weight: 900;
                    -webkit-text-fill-color: transparent;
                    -webkit-text-stroke-width: 1px;
                    text-shadow: 0 0 7px #fff;"
          >
            {{ book.volumeInfo.title || 'No Title' }}
          </h1>
          <p
            class="text-[1.2em] overflow-hidden text-ellipsis line-clamp-1"
            style="font-weight: 900;
                    -webkit-text-fill-color: transparent;
                    -webkit-text-stroke-width: 1px;
                    text-shadow: 0 0 7px #fff;"
          >
            By {{ book.volumeInfo.authors?.join(', ') || 'Unknown Author' }}
          </p>

        </div>

        <!-- Ratings -->
        <div class="flex justify-left items-center h-fit w-full gap-[1.5em]">
          <div class="w-fit h-fit flex justify-left gap-[0.5em]">
            <template v-for="i in 5" :key="i">
              <svg
                viewBox="0 0 576 512"
                xmlns="http://www.w3.org/2000/svg"
                class="h-[1em] w-[1em]"
                :fill="i <= (book.volumeInfo.averageRating || 0) ? 'white' : '#4e2917ff'"
              >
                <path
                  d="M316.7 17.8l65.43 132.4l146.4 21.29c26.27 3.796 36.79 36.09 17.75 54.59l-105.9 102.1l25.05 145.5c4.508 26.31-23.23 45.9-46.49 33.7L288 439.6l-130.9 68.7C133.8 520.5 106.1 500.9 110.6 474.6l25.05-145.5L29.72 226.1c-19.03-18.5-8.516-50.79 17.75-54.59l146.4-21.29l65.43-132.4C271.1-6.083 305-5.786 316.7 17.8z"
                ></path>
              </svg>
            </template>
          </div>

        <div class="w-fit h-fit text-white font-nunito text-[1.2em] font-light">
          <p>{{ book.volumeInfo.averageRating ? book.volumeInfo.averageRating + '/5 stars' : 'No rating' }}</p>
        </div>
      </div>


        <!-- Categories -->
        <div class="flex flex-wrap justify-start items-center h-fit w-full gap-[0.5em]">
          <div
            v-for="(category, index) in (book.volumeInfo.categories || [])"
            :key="index"
            class="border-2 border-white rounded-[0.5em] text-white font-nunito text-[1em] font-normal px-[0.5em] py-[0.05em] hover:bg-white hover:text-[#222222] duration-300 cursor-pointer"
          >
            <p>{{ category }}</p>
          </div>
        </div>
      </div>

      <!-- Description -->
      <p
        class="font-nunito block text-white font-light relative h-[0em] group-hover:h-[7em] leading-[1.2em] duration-500 overflow-hidden"
      >
        {{ book.volumeInfo.description || 'No description available.' }}
      </p>
    </div>

    <!-- Optional: fallback UI while loading -->
    <div v-else class="p-4 text-white">
      Loading book info...
    </div>
  </div>
</template>


<script>
export default {
  name: "CardView",
  props: {
    book: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
};
</script>
