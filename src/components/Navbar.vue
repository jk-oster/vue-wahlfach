<script setup>
import {useLogin} from "@/useLogin.js";
import {getFileUrl} from "@/pocketbase.js";

const {currentUser, logout} = useLogin();
</script>

<template>
  <!-- https://daisyui.com/components/navbar/ -->
  <div class="navbar bg-base-100 shadow-sm">
    <div class="flex-1">
      <RouterLink to="/chat" class="btn btn-ghost text-xl">
        {{ currentUser?.name ? 'Hi ' + currentUser?.name : 'KWM Chat' }}
      </RouterLink>
    </div>
    <div class="flex gap-2">
      <input type="text" placeholder="Search" class="input input-bordered w-24 md:w-auto" />
      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img
                alt="Tailwind CSS Navbar component"
                :src="getFileUrl('users', currentUser?.id, currentUser?.avatar)" />
          </div>
        </div>
        <ul
            tabindex="0"
            class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
          <li>
            <a class="justify-between">
              Profile
              <span class="badge">New</span>
            </a>
          </li>
          <li><a>Settings</a></li>
          <li><a>Preferences</a></li>
        </ul>
      </div>
      <RouterLink @click="logout" to="/" class="btn bg-warning">Logout</RouterLink>
    </div>
  </div>
</template>

<style scoped>

</style>