<template>
  <div
    class="w-2/4 rounded-lg py-2 my-1 px-3 text-left bg-gray-200"
    :class="{ 'ml-auto bg-purple-300': owner }"
  >
    {{ message }}
  </div>
</template>

<script>
export default {
  name: "Message",
  props: {
    message: String,
    owner: Boolean
  }
};
</script>
