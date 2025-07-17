<template>
  <div class="min-h-screen bg-gray-100 px-4 py-8">
    <!-- Navbar -->
    <Navbar />

    <!-- Dashboard content -->
    <main class="max-w-3xl mx-auto">
      <!-- Qui va il contenuto delle pagine -->
      <slot />
    </main>
  </div>
</template>
