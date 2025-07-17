export default defineNuxtRouteMiddleware(async (to, from) => {
  // Previeni l'esecuzione lato server (solo client)
  if (import.meta.server) return;
  const { $supabase } = useNuxtApp();
  const { data } = await $supabase.auth.getSession();
  console.log(data);
  if (!data.session) {
    return navigateTo("/login");
  }
});
