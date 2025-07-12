export default defineNuxtRouteMiddleware(async (to, from) => {
  const { $supabase } = useNuxtApp();
  const { data } = await $supabase.auth.getSession();
  console.log(data);
  if (!data.session) {
    return navigateTo("/login");
  }
});
