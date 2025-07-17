<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center bg-gray-100"
  >
    <div class="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-md">
      <h1 class="text-2xl font-bold mb-4 text-center">I tuoi Task</h1>

      <!-- Form aggiunta nuovo task -->
      <form @submit.prevent="addTask" class="flex gap-2 mb-6">
        <input
          v-model="newTask"
          type="text"
          placeholder="Aggiungi un nuovo task..."
          class="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          :disabled="isAdding"
          class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
        >
          <span v-if="isAdding">Aggiunta in corso...</span>
          <span v-else>Aggiungi</span>
        </button>
      </form>

      <!-- Lista task -->
      <ul v-for="task in tasks" :key="task.id" class="space-y-3">
        <!-- Esempio di task statico, togli/duplica tu quando metti la logica -->
        <li
          class="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3 shadow-sm"
        >
          <input
            v-if="editTaskId === task.id"
            v-model="editedTitle"
            :ref="setEditInputRef"
            type="text"
          />
          <span v-else class="text-gray-800 flex-1 text-left">
            {{ task.title }}
          </span>
          <div v-if="editTaskId === task.id" class="flex gap-2">
            <button
              @click="saveEditTask(task)"
              class="text-blue-600 hover:text-blue-800 text-sm font-medium cursor-pointer"
            >
              Salva
            </button>
            <button
              @click="cancelEdit"
              class="text-gray-500 hover:text-gray-700 text-sm font-medium cursor-pointer"
              type="button"
            >
              Annulla
            </button>
          </div>
          <div v-else class="flex gap-2">
            <button
              @click="editTask(task)"
              class="text-blue-600 hover:text-blue-800 text-sm font-medium cursor-pointer"
            >
              Modifica
            </button>
            <button
              @click="deleteTask(task.id)"
              class="text-red-600 hover:text-red-800 text-sm font-medium cursor-pointer"
            >
              Elimina
            </button>
          </div>
        </li>
      </ul>

      <!-- Placeholder se nessun task -->
      <div v-if="tasks.length === 0" class="text-gray-400 text-center py-10">
        Nessun task ancora. <br />
        Aggiungine uno!
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
  layout: "dashboard",
});

const tasks = ref([]);
const newTask = ref("");
const isAdding = ref(false);
const isLoading = ref(false);
const error = ref("");
const editTaskId = ref(null);
const editedTitle = ref(null);
const editInputEl = ref(null);
const { $supabase } = useNuxtApp();

const getUser = async () => {
  const { data: userData } = await $supabase.auth.getUser();
  console.log(userData);
  const user = userData.user;
  console.log(user);
  if (!user) {
    error.value = "Utente non trovato";
    isLoading.value = false;
    return;
  }
  return user;
};

const loadTasks = async () => {
  const user = await getUser();
  const { data, error: dbError } = await $supabase
    .from("tasks")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });
  if (dbError) {
    error.value = dbError.message;
    tasks.value = [];
  } else {
    tasks.value = data;
    isLoading.value = false;
  }
};
onMounted(async () => {
  isLoading.value = true;
  loadTasks();
});

const addTask = async () => {
  console.log("addtask function");

  isAdding.value = true;
  const user = await getUser();
  const { data: insertedTask, error: dbError } = await $supabase
    .from("tasks")
    .insert([
      {
        user_id: user.id,
        title: newTask.value,
        status: "pending",
      },
    ])
    .select();
  if (dbError) {
    console.log("errore");
    error.value = dbError.message;
  } else if (insertedTask && insertedTask.length > 0) {
    tasks.value.unshift(insertedTask[0]);
    newTask.value = "";
  }
  isAdding.value = false;
};

const deleteTask = async (id) => {
  const { error: dbError } = await $supabase
    .from("tasks")
    .delete()
    .eq("id", id);
  if (dbError) {
    error.value = dbError.message;
  } else {
    tasks.value = tasks.value.filter((task) => task.id !== id);
  }
};

const editTask = (task) => {
  editTaskId.value = task.id;
  editedTitle.value = task.title;
  console.log(task);
};
function setEditInputRef(el) {
  if (el) {
    editInputEl.value = el;
    nextTick(() => {
      editInputEl.value?.focus();
    });
  }
}

const saveEditTask = async (task) => {
  const { error: dbError } = await $supabase
    .from("tasks")
    .update({ title: editedTitle.value })
    .eq("id", task.id);

  if (dbError) {
    error.value = dbError.message;
    return;
  }

  const index = tasks.value.findIndex((t) => t.id === task.id);
  if (index !== -1) {
    tasks.value[index].title = editedTitle.value;
  }

  editTaskId.value = null;
};

const cancelEdit = () => {
  editTaskId.value = null;
  editedTitle.value = null;
};
</script>
