<template>
  <nav class="bg-transparent fixed w-full z-50">
    <div class="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-4 relative">
      <!-- Logo Flowbite and Brand Name -->
      <div class="flex items-center space-x-3 rtl:space-x-reverse">
        <button data-collapse-toggle="navbar-hamburger" type="button" class="flex flex-col items-center space-y-2">
          <span class="sr-only">Open main menu</span>
          <img src="https://flowbite.com/docs/images/logo.svg" class="h-20" alt="Flowbite Logo" />
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-chevron-double-down text-gray-600" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1.646 6.646a.5.5 0 0 1 .708 0L8 12.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
            <path fill-rule="evenodd" d="M1.646 2.646a.5.5 0 0 1 .708 0L8 8.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
          </svg>
        </button>
      </div>

      <div class="relative">
        <button
          type="button"
          @click="toggleSearch"
          :class="{ 'search-open': isSearchOpen }"
          class="inline-flex items-center justify-center p-2 text-sm text-gray-500 rounded-lg"
        >
          <span class="sr-only">Open search</span>
          <svg class="w-5 h-5 transition-transform" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 10-14 0 7 7 0 0014 0z"></path>
          </svg>
        </button>
    
        <!-- Search Input -->
        <input
          v-show="isSearchOpen"
          type="text"
          placeholder="Search"
          class="absolute -left-40 -top-1 w-32 border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 ml-2 transition-transform"
        />
      </div>

      <!-- Menu Items -->
      <div class="hidden w-full h-screen  top-16 left-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 animate-menu" id="navbar-hamburger">
        <ul class="flex flex-col font-medium mt-4 rounded-lg">
          <li class="menu-item">
            <a href="#" class="block py-2 px-3 text-white bg-blue-700 rounded dark:bg-blue-600" aria-current="page">Home</a>
          </li>
          <li class="menu-item">
            <a href="#" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Services</a>
          </li>
          <li class="menu-item">
            <a href="#" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white">Pricing</a>
          </li>
          <li class="menu-item">
            <a href="#" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Contact</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>

export default {
  data() {
    return {
      isSearchOpen: false,
    };
  },
  methods: {
    toggleSearch() {
      this.isSearchOpen = !this.isSearchOpen;
    },
    // ... (your existing code)
  },

};
</script>
<style scoped>
@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.search-open svg {
  transform: translateX(-20px); /* Adjust the value based on your design */
}

.animate-menu {
  animation: fadeIn 0.5s ease-out, fadeOut 0.5s ease-out;
}

@keyframes fadeOut {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-10px);
  }
}

.menu-item {
  animation: fadeIn 0.5s ease-out;
  animation-fill-mode: both;
}

.menu-item:nth-child(1) {
  animation-delay: 0.1s;
}

.menu-item:nth-child(2) {
  animation-delay: 0.2s;
}

.menu-item:nth-child(3) {
  animation-delay: 0.3s;
}

.menu-item:nth-child(4) {
  animation-delay: 0.4s;
}
</style>