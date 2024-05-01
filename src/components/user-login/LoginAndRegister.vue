<template>
  <v-card width="auto">
    <template #title>
      <div v-if="showAlert" class="my-3">
        <v-alert v-model="showAlert" border="start" variant="tonal" closable close-label="Close Alert" color="error">
          <template #text>
            <span class="font-weight-medium text-body-1"> {{ props.alertText }}</span>
          </template>
        </v-alert>
      </div>
      <v-tabs v-model="tab" color="deep-purple-accent-4" grow>
        <v-tab :value="Tabs.SIGN_IN">Login</v-tab>
        <v-tab :value="Tabs.SIGN_UP">Sign Up</v-tab>
      </v-tabs>
    </template>
    <v-window v-model="tab">
      <v-window-item :key="Tabs.SIGN_IN" :value="Tabs.SIGN_IN">
        <SignIn @on-signin="signIn" @on-close="cancel" />
      </v-window-item>
      <v-window-item :key="Tabs.SIGN_UP" :value="Tabs.SIGN_UP">
        <SignUp @on-signup="signUp" @on-close="cancel" />
      </v-window-item>
    </v-window>
  </v-card>
</template>

<script lang="ts" setup>
import { User, useUserStore } from '@/stores/user-store';
import { ref, watch } from 'vue';
import SignIn from './SignIn.vue';
import SignUp from './SignUp.vue';
import { delay } from '@/services/util';

const userStore = useUserStore();

const emit = defineEmits(['on-close']);
const props = defineProps({
  alertText: {
    type: String,
    required: false,
    default: '',
  },
});

enum Tabs {
  SIGN_IN = 'sign-in',
  SIGN_UP = 'sign-up',
}

const showAlert = ref(false);
const tab = ref(Tabs.SIGN_IN);

watch(
  () => props.alertText,
  (text) => {
    showAlert.value = !!text.length;
  }
);
watch(showAlert, async (visible) => {
  if (visible) {
    await delay(3000);
    showAlert.value = false;
  }
});

async function signUp(user: User) {
  userStore.setUser(user);
}
async function signIn(user: User) {
  userStore.setUser(user);
}
async function cancel() {
  emit('on-close');
}
</script>
