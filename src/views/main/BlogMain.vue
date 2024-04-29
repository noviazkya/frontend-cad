<template>
  <!-- component -->
  <button @click="goBack" class="absolute mt-4 flex items-center ml-14 text-gray-600 hover:text-gray-900">
        <svg class="w-6 h-6 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
        </svg>
        Kembali
      </button>
<div class="py-16 bg-white">  
  <div class="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
      <div class="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
        <div class="md:5/12 lg:w-5/12">
          <img src="https://i.pinimg.com/564x/6b/a8/a6/6ba8a66d96eaa139449b49d49bb40237.jpg" alt="image" loading="lazy" width="500" height="400">
        </div>
        <div class="md:7/12 lg:w-6/12">
          <h2 class="text-2xl text-gray-900 font-bold md:text-4xl">Profil ContemporaryArt</h2>
          <p class="mt-7 text-lg text-gray-600">ContemporaryArt adalah sebuah platform daring yang menghadirkan keindahan seni kontemporer dari berbagai sudut pandang dan gaya. Kami menyajikan karya-karya seni yang menginspirasi, memikat, dan mencerahkan, mempersembahkan ruang bagi para seniman untuk berekspresi secara bebas dan penikmat seni untuk menjelajahi dunia yang kaya dan beragam ini.</p>
          <p class="mt-4 text-lg text-gray-600">ContemporaryArt berkomitmen untuk menjadi sumber yang dapat diandalkan bagi semua orang yang tertarik dalam seni kontemporer. Kami berupaya untuk menjaga keberagaman seni dan meningkatkan apresiasi terhadap nilai-nilai artistik, kreativitas, dan keunikan setiap karya seni.</p>
        </div>
      </div>
  </div>
</div>
</template>
<script>
export default {
  methods:{
    goBack() {
      this.$router.go(-1); // Kembali ke halaman sebelumnya dalam riwayat navigasi
    },
  }
}
</script>