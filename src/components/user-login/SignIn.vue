<template>
  <div class="px-6 py-6">
    <form>
      <v-row>
        <v-col cols="12" class="mt-2 py-2">
          <v-text-field
            v-model="emailAddress"
            :error-messages="vuelidate.emailAddress.$errors.map((e) => e.$message as string)"
            label="Email"
            required
            @input="vuelidate.emailAddress.$touch"
            @blur="vuelidate.emailAddress.$touch"
          />
        </v-col>
      </v-row>
      <v-row class="mt-6">
        <v-col cols="12" class="py-2">
          <v-text-field
            v-model="password"
            :error-messages="vuelidate.password.$errors.map((e) => e.$message as string)"
            label="Password"
            required
            type="password"
            @input="vuelidate.password.$touch"
            @blur="vuelidate.password.$touch"
          />
        </v-col>
      </v-row>

      <v-row class="mt-6">
        <v-col cols="12" class="py-2">
          <router-link to="#" style="color: black">
            <v-label>Forgot Password?</v-label>
          </router-link>
        </v-col>
      </v-row>

      <v-row class="mt-8">
        <v-col cols="12" class="flex-row">
          <div class="d-flex flex-row">
            <v-btn class="d-flex me-5" @click="cancel"> Cancel </v-btn>
            <v-spacer />
            <v-btn class="d-flex" color="primary" @click="signin" :loading="userLoading"> Login </v-btn>
          </div>
        </v-col>
      </v-row>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { useCVStore } from '@/stores/cv-store';
import { useUserStore } from '@/stores/user-store';
import { useVuelidate } from '@vuelidate/core';
import { email, required } from '@vuelidate/validators';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';

const emit = defineEmits(['on-close', 'on-signin']);

const userStore = useUserStore();
const cvStore = useCVStore();
const { currentUser, userLoading } = storeToRefs(userStore);
const { entryCV } = storeToRefs(cvStore);

const emailAddress = ref(entryCV.value?.email || '');
const password = ref('');

const rules = {
  emailAddress: { required, email },
  password: { required },
};

const vuelidate = useVuelidate(rules, { emailAddress, password });

watch(
  () => currentUser.value,
  () => {
    emailAddress.value = currentUser.value?.email ?? '';
  }
);

async function signin() {
  const valid = await vuelidate.value.$validate();
  if (valid) {
    emit('on-signin', {
      email: emailAddress.value,
      password: password.value,
    });
  }
}
async function cancel() {
  emit('on-close');
}
</script>
