<template>
  <div class="container flex justify-center">
    <slot name="user" :user="user" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { ref, onUnmounted } from "@vue/composition-api";
import { auth } from "@/firebase";
import { User } from "firebase";

export default Vue.extend({
  setup() {
    const user = ref<User>(null);
    const unsubscribe = auth.onAuthStateChanged(U => (user.value = U));

    onUnmounted(unsubscribe);

    return {
      user
    };
  }
});
</script>
