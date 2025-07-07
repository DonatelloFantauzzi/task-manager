<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
      <h1 class="text-2xl font-bold mb-2 text-center">Accedi al tuo account</h1>
      <p class="text-gray-500 mb-6 text-center">Gestisci i tuoi task ovunque</p>

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
          class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Accedi
        </button>
      </form>

      <p class="mt-6 text-center text-sm text-gray-600">
        Non hai un account?
        <a href="/register" class="text-blue-600 hover:underline">Registrati</a>
      </p>
    </div>
  </div>
</template>
<script setup>
const email = ref("");
const emailError = ref(false);
const password = ref("");
const passwordError = ref(false);
const validateEmail = (email) => {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
};

const validatePassword = (password) => {
  return /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/.test(password);
};

const login = () => {
  emailError.value = !validateEmail(email.value);
  passwordError.value = !validatePassword(password.value);
  if (!emailError.value && !passwordError.value) {
    // Proceed with login logic
    console.log("Logging in with", email.value, password.value);
    // Reset fields after login
    email.value = "";
    password.value = "";
  }
};
</script>
