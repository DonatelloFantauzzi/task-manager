<template>
  <h1>Pagina test supabase</h1>
</template>
<script setup>
const { $supabase } = useNuxtApp();

onMounted(async () => {
  const { data, error } = await $supabase.auth.getSession();
  console.log("Sessione attuale:", data, error);
});
</script>
