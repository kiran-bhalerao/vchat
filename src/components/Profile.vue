<template>
  <div>
    <div>
      Looged in as: <strong>{{ user.email || user.uid }}</strong>
    </div>
    <button
      @click="auth.signOut()"
      class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
    >
      Sign out
    </button>
    <br />
    <ChatList :uid="user.uid" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { ref } from "@vue/composition-api";
import { auth as _auth } from "@/firebase";
import ChatList from "@/components/Chats.vue";

export default Vue.extend({
  props: {
    user: Object
  },
  setup() {
    const auth = ref(_auth);

    return {
      auth
    };
  },
  components: {
    ChatList
  }
});
</script>
