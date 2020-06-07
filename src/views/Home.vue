<template>
  <div class="flex flex-col items-center">
    <img alt="Vue logo" src="../assets/logo.png" width="120px" class="mt-4" />
    <h1 class="text-green-500 text-3xl font-black">Welcome to VChat App</h1>
    <User v-slot:user="{ user }">
      <Profile v-if="user" :user="user" />
      <Login v-else />
    </User>
  </div>
</template>

<script>
import Login from "@/components/Login";
import User from "@/components/User";
import Profile from "@/components/Profile";

export default {
  name: "Home",
  components: {
    Login,
    User,
    Profile
  }
};
</script>
