<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
      <h1 class="text-2xl font-bold mb-2 text-center">Crea un nuovo account</h1>
      <p class="text-gray-500 mb-6 text-center">
        Entra nel tuo nuovo task manager!
      </p>

      <!-- Notifica di successo dopo la registrazione -->
      <div
        v-if="showConfirmationNotice"
        class="w-full bg-green-50 border border-green-200 rounded-xl p-4 mt-6 flex items-center space-x-3 shadow-sm"
      >
        <svg
          class="w-6 h-6 text-green-600 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 12l2 2 4-4M12 22C6.48 22 2 17.52 2 12S6.48 2 12 2s10 4.48 10 10-4.48 10-10 10z"
          />
        </svg>
        <div>
          <p class="font-semibold text-green-700">Registrazione completata!</p>
          <p class="text-green-600 text-sm mt-1">
            Ti abbiamo inviato una mail di conferma a
            <span class="font-mono">{{ email }}</span
            >.<br />
            Per completare la registrazione, clicca il link che trovi nella
            mail.<br />
            <span class="italic text-xs"
              >Controlla anche la cartella spam se non la vedi subito.</span
            >
          </p>
        </div>
        <NuxtLink
          to="/login"
          class="inline-block px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition ml-2"
        >
          Vai al login
        </NuxtLink>
      </div>

      <form @submit.prevent="register" class="space-y-4">
        <!-- Email -->
        <div>
          <label class="block text-sm font-medium mb-1" for="email"
            >Email</label
          >
          <input
            v-model="email"
            :disabled="showConfirmationNotice"
            type="email"
            id="email"
            :class="[
              'w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500',
              showConfirmationNotice
                ? 'opacity-50 cursor-not-allowed bg-gray-200'
                : '',
            ]"
          />
          <p
            v-if="emailError"
            class="mt-2 text-sm text-red-600"
            aria-live="polite"
          >
            <!-- Messaggio di errore email, da mostrare con v-if -->
            Inserisci un'email valida.
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
              :type="showPassword ? 'text' : 'password'"
              :disabled="showConfirmationNotice"
              ref="passwordInput"
              id="password"
              :class="[
                'w-full border rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500',
                showConfirmationNotice
                  ? 'opacity-50 cursor-not-allowed bg-gray-200'
                  : '',
              ]"
            />
            <!-- Icona occhio da gestire con Vue -->
            <button
              @click.prevent="switchPassword()"
              aria-label="Toggle password visibility"
              type="button"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
            >
              👁️
            </button>
          </div>
          <p
            v-if="passwordError"
            class="mt-2 text-sm text-red-600"
            aria-live="polite"
          >
            <!-- Messaggio di errore password, da mostrare con v-if -->
            La password deve avere almeno 8 caratteri una lettera maiuscola e un
            numero.
          </p>
        </div>
        <!-- Conferma Password -->
        <div>
          <label class="block text-sm font-medium mb-1" for="confirm-password"
            >Conferma password</label
          >
          <div class="relative">
            <input
              v-model="confirmPassword"
              :type="confirmShowPassword ? 'text' : 'password'"
              :disabled="showConfirmationNotice"
              ref="confirmPasswordInput"
              id="confirm-password"
              :class="[
                'w-full border rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500',
                showConfirmationNotice
                  ? 'opacity-50 cursor-not-allowed bg-gray-200'
                  : '',
              ]"
            />
            <!-- Icona occhio opzionale anche qui -->
            <button
              @click.prevent="switchConfirmPassword()"
              aria-label="Toggle password visibility"
              type="button"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
            >
              👁️
            </button>
          </div>
          <p
            v-if="confirmPasswordError"
            class="mt-2 text-sm text-red-600"
            aria-live="polite"
          >
            <!-- Messaggio di errore conferma password, da mostrare con v-if -->
            Attenzione: le password non corrispondono.
          </p>
        </div>
        <button
          :disabled="isSubmitting || showConfirmationNotice"
          type="submit"
          class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <span v-if="isSubmitting">Registrazione in corso...</span>
          <span v-else>Registrati</span>
        </button>
      </form>
      <p class="mt-6 text-center text-sm text-gray-600">
        Hai già un account?
        <NuxtLink to="/login" class="text-blue-600 hover:underline"
          >Accedi</NuxtLink
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
const password = ref("");
const passwordInput = ref(null);
const confirmPassword = ref("");
const confirmPasswordInput = ref(null);
const emailError = ref(false);
const passwordError = ref(false);
const confirmPasswordError = ref(false);
const showPassword = ref(false); // For toggling password visibility
const confirmShowPassword = ref(false);
const isSubmitting = ref(false);
const backendError = ref("");
const showConfirmationNotice = ref(false);
const { $supabase } = useNuxtApp();
const { validateEmail, validatePassword } = useValidation();

let timeout = null;
const switchPassword = () => {
  showPassword.value = !showPassword.value;
  nextTick(() => {
    passwordInput.value?.focus();
  });
};

const switchConfirmPassword = () => {
  confirmShowPassword.value = !confirmShowPassword.value;
  nextTick(() => {
    confirmPasswordInput.value?.focus();
  });
};

watch([password, confirmPassword], ([newPasswordValue, newConfirmValue]) => {
  if (timeout) clearTimeout(timeout);
  timeout = setTimeout(() => {
    if (newConfirmValue.length > 0) {
      confirmPasswordError.value = newPasswordValue !== newConfirmValue;
      console.log("Confirm password checked");
    } else {
      confirmPasswordError.value = false;
    }
  }, 500);
});

const register = async () => {
  emailError.value = !validateEmail(email.value);
  passwordError.value = !validatePassword(password.value);
  confirmPasswordError.value = false;

  if (!emailError.value && !passwordError.value) {
    isSubmitting.value = true;
    backendError.value = "";

    const { data, error } = await $supabase.auth.signUp({
      email: email.value,
      password: password.value,
    });

    if (error) {
      backendError.value = error.message; // Mostra l’errore ricevuto da Supabase
    } else {
      showConfirmationNotice.value = true;
      // navigateTo("/login");
    }

    isSubmitting.value = false;

    console.log("Logging in with", email.value, password.value);
    email.value = "";
    password.value = "";
    confirmPassword.value = "";
    confirmPasswordError.value = false;
    emailError.value = false;
    passwordError.value = false;
  }
};
</script>
