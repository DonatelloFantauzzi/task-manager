<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
      <h1 class="text-2xl font-bold mb-2 text-center">Accedi al tuo account</h1>
      <p class="text-gray-500 mb-6 text-center">Gestisci i tuoi task ovunque</p>

      <p
        v-if="backendError"
        class="mt-2 text-red-600 text-center"
        aria-live="polite"
      >
        {{ backendError }}
      </p>

      <form @submit.prevent="login" class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1" for="email"
            >Email</label
          >
          <input
            v-model="email"
            type="email"
            id="email"
            class="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p
            v-if="emailError"
            class="mt-2 text-sm text-red-600"
            aria-live="polite"
          >
            Inserisci un'email valida.
          </p>
        </div>

        <div>
          <label class="block text-sm font-medium mb-1" for="password"
            >Password</label
          >
          <input
            v-model="password"
            type="password"
            id="password"
            class="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p
            v-if="passwordError"
            class="mt-2 text-sm text-red-600"
            aria-live="polite"
          >
            La password deve avere almeno 8 caratteri una lettera maiuscola e un
            numero.
          </p>
        </div>

        <button
          type="submit"
          :disabled="isSubmitting"
          class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
        >
          <span v-if="isSubmitting">Accesso in corso...</span>
          <span v-else>Accedi</span>
        </button>
        <button
          type="button"
          class="w-full flex items-center justify-center border border-gray-300 bg-white rounded-lg py-2 hover:bg-gray-50 cursor-pointer"
          @click="loginWithGoogle"
        >
          <!-- <img src="/google.svg" class="w-5 h-5 mr-2" /> -->
          Entra con Google
        </button>
      </form>

      <p class="mt-6 text-center text-sm text-gray-600">
        Non hai un account?
        <NuxtLink to="/register" class="text-blue-600 hover:underline"
          >Registrati</NuxtLink
        >
      </p>
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  middleware: "guest",
});
import { useValidation } from "@/composables/useValidation";
const email = ref("");
const emailError = ref(false);
const password = ref("");
const passwordError = ref(false);
const backendError = ref("");
const isSubmitting = ref(false);
const { $supabase } = useNuxtApp();
const { validateEmail, validatePassword } = useValidation();

const loginWithGoogle = async () => {
  console.log("Logging in with Google");
  const { error } = await $supabase.auth.signInWithOAuth({
    provider: "google",
  });

  if (error) {
    backendError.value = error.message;
  }
};

const login = async () => {
  emailError.value = !validateEmail(email.value);
  passwordError.value = !validatePassword(password.value);

  if (emailError.value || passwordError.value) {
    return;
  }

  isSubmitting.value = true;
  const { data, error } = await $supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });

  if (error) {
    backendError.value = error.message;
  } else {
    console.log("Sessione attuale:", data);
    navigateTo("/dashboard");
  }

  if (!emailError.value && !passwordError.value) {
    // Proceed with login logic
    console.log("Logging in with", email.value, password.value);
    // Reset fields after login
    email.value = "";
    password.value = "";
  }

  isSubmitting.value = false;
};
</script>
