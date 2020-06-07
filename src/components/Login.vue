<template>
  <div class="w-3/5">
    <h3>Signin annonimously</h3>
    <button
      @click="auth.signInAnonymously()"
      class="m-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
    >
      Sign In
    </button>
    <h2>OR</h2>
    <Error :error="error" class="my-3" />
    <label class="block text-gray-500 font-bold md:text-left mb-1 md:mb-0">
      Email
    </label>
    <input
      class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
      type="email"
      v-model="email"
    />
    <label class="mt-3 block text-gray-500 font-bold md:text-left mb-1 md:mb-0">
      Password
    </label>
    <input
      class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
      type="password"
      v-model="password"
    />

    <button
      @click="onSubmit"
      :disabled="loading"
      class="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 my-3 rounded"
      :class="{ 'opacity-50 cursor-not-allowed': loading }"
    >
      {{ isSignup ? "Sign Up" : "Sign In" }}
    </button>
    <p
      class="mr-2  cursor-pointer hover:text-green-600"
      @click="isSignup = !isSignup"
    >
      {{ isSignup ? "Already Registed?" : "Create Account!" }}
    </p>
  </div>
</template>

<script>
import { ref } from "@vue/composition-api";
import { auth as _auth } from "@/firebase";
import Error from "@/components/Error";

export default {
  setup() {
    const auth = ref(_auth);
    const email = ref("");
    const password = ref("");
    const isSignup = ref(false);
    const loading = ref(false);
    const error = ref("");

    async function onSubmit() {
      loading.value = true;
      error.value = "";

      try {
        if (isSignup.value) {
          await auth.value.createUserWithEmailAndPassword(
            email.value,
            password.value
          );
        } else {
          await auth.value.signInWithEmailAndPassword(
            email.value,
            password.value
          );
        }
      } catch (err) {
        error.value = err.message;
      }

      loading.value = false;
    }

    return {
      auth,
      email,
      password,
      onSubmit,
      isSignup,
      loading,
      error
    };
  },
  components: {
    Error
  }
};
</script>
