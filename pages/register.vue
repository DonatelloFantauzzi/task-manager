<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
      <h1 class="text-2xl font-bold mb-2 text-center">Crea un nuovo account</h1>
      <p class="text-gray-500 mb-6 text-center">
        Entra nel tuo nuovo task manager!
      </p>
      <form class="space-y-4">
        <!-- Email -->
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
          <p class="mt-2 text-sm text-red-600">
            <!-- Messaggio di errore email, da mostrare con v-if -->
          </p>
        </div>
        <!-- Password -->
        <div>
          <label class="block text-sm font-medium mb-1" for="password"
            >Password</label
          >
          <div class="relative">
            <input
              v-model="password"
              type="password"
              id="password"
              class="w-full border rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <!-- Icona occhio da gestire con Vue -->
            <button
              type="button"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              👁️
            </button>
          </div>
          <p class="mt-2 text-sm text-red-600">
            <!-- Messaggio di errore password, da mostrare con v-if -->
          </p>
        </div>
        <!-- Conferma Password -->
        <div>
          <label class="block text-sm font-medium mb-1" for="confirm-password"
            >Conferma password</label
          >
          <div class="relative">
            <input
              type="password"
              id="confirm-password"
              class="w-full border rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <!-- Icona occhio opzionale anche qui -->
          </div>
          <p class="mt-2 text-sm text-red-600">
            <!-- Messaggio di errore conferma password, da mostrare con v-if -->
          </p>
        </div>
        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Registrati
        </button>
      </form>
      <p class="mt-6 text-center text-sm text-gray-600">
        Hai già un account?
        <a href="/login" class="text-blue-600 hover:underline">Accedi</a>
      </p>
    </div>
  </div>
</template>
<script setup>
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const emailError = ref(false);
const passwordError = ref(false);

const validateEmail = (email) => {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
};

const validatePassword = (password) => {
  return /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/.test(password);
};

const register = () => {
  emailError.value = !validateEmail(email.value);
  passwordError.value = !validatePassword(password.value);

  if (!emailError.value && !passwordError.value) {
    // Proceed with login logic
    console.log("Logging in with", email.value, password.value);
    // Reset fields after login
    email.value = "";
    password.value = "";
    confirmPassword.value = "";
  }
};
</script>
