<template>
  <v-list-item
    color="black"
    lines="two"
    :prepend-avatar="currentUser?.photo"
    :title="currentUser?.email || currentUser?.name"
    :subtitle="props.drawerVisible ? 'Logged in' : ''"
    :class="{ 'ps-3 pe-1': !props.drawerVisible }"
  >
    <template #append>
      <v-btn icon flat @click="onLogout" :loading="userLoading">
        <v-icon color="black">mdi-logout</v-icon>
        <v-tooltip activator="parent">Logout</v-tooltip>
      </v-btn>
    </template>
  </v-list-item>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/stores/user-store';
import { storeToRefs } from 'pinia';

const emit = defineEmits(['on-logout']);
const props = defineProps({
  drawerVisible: {
    type: Boolean,
  },
});

const userStore = useUserStore();
const { currentUser, userLoading } = storeToRefs(userStore);

async function onLogout() {
  emit('on-logout');
}
</script>
