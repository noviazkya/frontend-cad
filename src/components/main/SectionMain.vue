<template>
    <div class="z-30 transform translate-y-[700px] container mx-auto pb-2">
      <div class="bg-purple-600 bg-opacity-70 rounded-sm">
        <!-- Tambahkan wrapper untuk mengaktifkan overflow horizontal -->
        <div class="overflow-x-auto">
          <div class="grid grid-cols-2 md:grid-cols-4 p-2">
            <!-- Gunakan v-for untuk membuat 6 card -->
            <div v-for="index in 6" :key="index" class="group my-12 mx-4 flex w-full max-w-xs flex-col overflow-hidden hover:transition-all hover:scale-105">
              <a class="relative flex h-80 w-72 overflow-hidden" href="#">
                <img class="absolute top-0 right-0 h-full w-full object-cover" src="https://images.unsplash.com/photo-1578996953841-b187dbe4bc8a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzl8fGJsYXplcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="product image" />
                <div class="absolute bottom-0 mb-4 flex w-full justify-center space-x-4">
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  