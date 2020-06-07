<template>
  <div class="container  flex flex-col justify-between my-3">
    <h3 class="text-2xl">
      Welcome to ChatRoom: <strong>{{ chatId }}</strong>
    </h3>
    <User v-slot:user="{ user }">
      <div v-if="user" class="w-1/2">
        <ul class="h-75 mt-4 mb-2 overflow-y-auto">
          <li v-for="message of messages" :key="message.id">
            <Message
              :message="message.text"
              :owner="user.uid === message.sender"
            />
          </li>
        </ul>
        <div class="flex">
          <input
            class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            type="text"
            v-model="newMessage"
          />
          <button
            class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="button"
            :disabled="!newMessage || loading"
            :class="{ 'opacity-50 cursor-not-allowed': !newMessage || loading }"
            @click="addMessage(user.uid)"
          >
            Send
          </button>
        </div>
      </div>
    </User>
  </div>
</template>

<script>
import { reactive, ref, computed } from "@vue/composition-api";
import { db } from "@/firebase";
import User from "@/components/User";
import Message from "@/components/Message";

export default {
  computed: {
    chatId() {
      return this.$route.params.id;
    }
  },
  setup() {
    const newMessage = ref("");
    const loading = ref(false);
    const messages = reactive([]);

    const messagesCollection = computed(function() {
      return db.doc(`chats/${this.chatId}`).collection("messages");
    });

    async function addMessage(uid) {
      loading.value = true;
      const { id: messageId } = messagesCollection.value.doc();

      await this.messagesCollection.doc(messageId).set({
        text: newMessage.value,
        sender: uid,
        createdAt: Date.now()
      });

      loading.value = false;
      newMessage.value = "";
    }

    return {
      newMessage,
      loading,
      messages,
      messagesCollection,
      addMessage
    };
  },
  firestore() {
    return {
      messages: this.messagesCollection.orderBy("createdAt").limitToLast(20)
    };
  },
  components: {
    User,
    Message
  }
};
</script>
