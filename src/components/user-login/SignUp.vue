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
        <v-col cols="12" sm="6" class="py-2">
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
        <v-col cols="12" sm="6" class="py-2">
          <v-text-field
            v-model="confirmPassword"
            :error-messages="vuelidate.confirmPassword.$errors.map((e) => e.$message as string)"
            label="Confirm Password"
            required
            type="password"
            @input="vuelidate.confirmPassword.$touch"
            @blur="vuelidate.confirmPassword.$touch"
          />
        </v-col>
      </v-row>

      <v-row class="mt-8">
        <v-col cols="12" class="flex-row">
          <div class="d-flex flex-row">
            <v-btn class="d-flex me-5" @click="cancel"> Cancel </v-btn>
            <v-spacer />
            <v-btn class="d-flex" color="primary" @click="signup" :loading="userLoading"> Sign Up </v-btn>
          </div>
        </v-col>
      </v-row>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/stores/user-store';
import { useVuelidate } from '@vuelidate/core';
import { email, helpers, maxLength, minLength, required, sameAs } from '@vuelidate/validators';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';

const emit = defineEmits(['on-close', 'on-signup']);

const userStore = useUserStore();
const { currentUser, userLoading } = storeToRefs(userStore);

const emailAddress = ref('');
const password = ref('');
const confirmPassword = ref('');

const rules = {
  emailAddress: { required, email },
  password: {
    required,
    valid: helpers.withMessage(
      'Password must contains at least one uppercase, one lowercase, one number and one special character',
      function (value: string) {
        const containsUppercase = /[A-Z]/.test(value);
        const containsLowercase = /[a-z]/.test(value);
        const containsNumber = /\d/.test(value);
        const containsSpecial = /[#?!@$%^&*-]/.test(value);
        return containsUppercase && containsLowercase && containsNumber && containsSpecial;
      }
    ),
    minLength: minLength(9),
    maxLength: maxLength(32),
  },
  confirmPassword: {
    required,
    sameAsPassword: sameAs(password),
  },
};

const vuelidate = useVuelidate(rules, { emailAddress, password, confirmPassword });

watch(
  () => currentUser.value,
  () => {
    emailAddress.value = currentUser.value?.email || '';
  }
);

async function signup() {
  const valid = await vuelidate.value.$validate();
  if (valid) {
    emit('on-signup', {
      email: emailAddress.value,
      password: password.value,
    });
  }
}
async function cancel() {
  emit('on-close');
}
</script>
