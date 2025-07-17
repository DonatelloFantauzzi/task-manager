export default defineNuxtRouteMiddleware(async (to, from) => {
  if (import.meta.server) return;
  const { $supabase } = useNuxtApp();
  const { data } = await $supabase.auth.getSession();
  if (data.session) {
    return navigateTo("/dashboard");
  }
});
