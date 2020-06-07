<template>
  <div>
    <button
      @click="createChatRoom()"
      class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 my-3 rounded"
    >
      Create ChatRoom
    </button>
    <br />
    <div v-for="chat of chats" :key="chat.id" class="text-center py-1 lg:px-4">
      <router-link :to="{ name: 'ChatRoom', params: { id: chat.id } }"
        ><div
          class="p-2 bg-indigo-800 hover:shadow-md cursor-pointer items-center text-indigo-100 leading-none rounded-full flex"
          role="alert"
        >
          <span
            class="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3"
            >Room ID</span
          >
          <span class="font-semibold mr-2 text-left flex-auto">{{
            chat.id
          }}</span>
          <svg
            class="fill-current opacity-75 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z"
            />
          </svg></div
      ></router-link>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/composition-api";
import { db } from "@/firebase";

export default {
  name: "Chats",
  props: {
    uid: String
  },
  firestore() {
    return {
      chats: db.collection("chats").where("owner", "==", this.uid)
    };
  },
  setup() {
    const chats = ref([]);

    async function createChatRoom() {
      await db.collection("chats").add({
        createdAt: Date.now(),
        owner: this.uid,
        members: [this.uid]
      });
    }

    return {
      createChatRoom,
      chats
    };
  }
};
</script>
