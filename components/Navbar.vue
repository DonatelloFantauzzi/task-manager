<template>
  <nav
    class="bg-white shadow p-4 flex items-center justify-between rounded-2xl mb-6"
  >
    <!-- Left: Logo o titolo -->
    <div class="flex items-center gap-3">
      <span class="text-2xl font-bold text-gray-800 tracking-tight"
        >TaskManager</span
      >
    </div>

    <!-- Right: User + logout -->
    <div class="flex items-center gap-4">
      <span class="text-base font-medium text-gray-600">Ciao, NomeUtente</span>
      <button
        class="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition"
      >
        Logout
      </button>
    </div>
  </nav>
</template>
