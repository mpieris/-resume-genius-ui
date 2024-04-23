<template>
  <v-form validate-on="submit" @submit.prevent="next">
    <v-row class="mt-sm-2">
      <v-col cols="12" md="6" class="py-2">
        <v-select
          v-model="entryCV.jobSector"
          :items="jobSectors"
          :error-messages="vuelidate.jobSector.$errors.map((e) => e.$message as string)"
          required
          @input="vuelidate.jobSector.$touch"
          @blur="vuelidate.jobSector.$touch"
        >
          <template #label> What's you career field <span class="font-weight-medium text-red">*</span> </template>
        </v-select>
      </v-col>
      <v-col cols="12" md="6" class="py-2">
        <v-text-field
          v-model="entryCV.headline"
          :error-messages="vuelidate.headline.$errors.map((e) => e.$message as string)"
          required
          @input="vuelidate.headline.$touch"
          @blur="vuelidate.headline.$touch"
        >
          <template #label> CV Headline <span class="font-weight-medium text-red">*</span> </template>
        </v-text-field>
        <!-- <image-upload
          action="create"
          :image_style="{
            border: 'rounded-circle',
            height: '100',
            width: '100',
          }"
        /> -->
      </v-col>
      <v-col cols="12" md="6" class="py-2">
        <v-text-field
          v-model="entryCV.firstName"
          :error-messages="vuelidate.firstName.$errors.map((e) => e.$message as string)"
          label="First Name"
          required
          @input="vuelidate.firstName.$touch"
          @blur="vuelidate.firstName.$touch"
        >
          <template #label> First name <span class="font-weight-medium text-red">*</span> </template>
        </v-text-field>
      </v-col>
      <v-col cols="12" md="6" class="py-2">
        <v-text-field
          v-model="entryCV.lastName"
          :error-messages="vuelidate.lastName.$errors.map((e) => e.$message as string)"
          required
          @input="vuelidate.lastName.$touch"
          @blur="vuelidate.lastName.$touch"
        >
          <template #label> Last name <span class="font-weight-medium text-red">*</span> </template>
        </v-text-field>
      </v-col>
      <v-col cols="12" md="6" class="py-2">
        <v-text-field v-model="entryCV.dob" label="Date of Birth">
          <template #label>Date of Birth </template>
        </v-text-field>
      </v-col>
      <v-col cols="12" md="6" class="py-2">
        <v-select v-model="entryCV.gender" :items="genders" label="Gender" />
      </v-col>
    </v-row>

    <v-row class="mt-10">
      <v-col cols="12" md="6" class="py-2">
        <v-text-field
          v-model="entryCV.email"
          :error-messages="vuelidate.email.$errors.map((e) => e.$message as string)"
          label="Email"
          required
          @input="vuelidate.email.$touch"
          @blur="vuelidate.email.$touch"
        >
          <template #label> Email address <span class="font-weight-medium text-red">*</span> </template>
        </v-text-field>
      </v-col>
      <v-col cols="12" md="6" class="py-2">
        <v-text-field
          v-model="entryCV.phone"
          :error-messages="vuelidate.phone.$errors.map((e) => e.$message as string)"
          required
          @input="vuelidate.phone.$touch"
          @blur="vuelidate.phone.$touch"
        >
          <template #label> Phone number <span class="font-weight-medium text-red">*</span> </template>
        </v-text-field>
      </v-col>
    </v-row>

    <v-row class="mt-10">
      <v-col cols="12" class="py-2">
        <v-text-field v-model="entryCV.addressLine1" label="Address line 1" />
      </v-col>
      <v-col cols="12" class="py-2">
        <v-text-field v-model="entryCV.addressLine2" label="Address line 2" />
      </v-col>
      <v-col cols="12" class="py-2">
        <v-text-field
          v-model="entryCV.addressCity"
          :error-messages="vuelidate.addressCity.$errors.map((e) => e.$message as string)"
          required
          @input="vuelidate.addressCity.$touch"
          @blur="vuelidate.addressCity.$touch"
        >
          <template #label> City <span class="font-weight-medium text-red"> *</span> </template>
        </v-text-field>
      </v-col>
    </v-row>

    <v-row class="mt-10">
      <v-col cols="12" class="flex-row">
        <div class="d-flex flex-row">
          <v-btn class="d-flex" @click="clear"> clear </v-btn>
          <v-spacer />
          <v-btn type="submit" class="d-flex" color="primary"> next </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-form>
</template>

<script lang="ts" setup>
import { useCVStore } from '@/stores/cv-store';
import { useVuelidate } from '@vuelidate/core';
import { email, required, numeric, maxLength } from '@vuelidate/validators';
import { storeToRefs } from 'pinia';
// import { ImageUpload } from 'image-upload-vue';

const emit = defineEmits(['on-next', 'on-submit']);

const store = useCVStore();
const { entryCV } = storeToRefs(store);

const jobSectors = ['IT', 'HR', 'Finance', 'Marketing', 'Sales', 'Other'];
const genders = ['Prefer not to say', 'Male', 'Female', 'Other'];

const rules = {
  jobSector: { required },
  headline: { required },
  email: { required, email },
  firstName: { required },
  lastName: { required },
  phone: { required, numeric, maxLength: maxLength(10) },
  addressCity: { required },
};

const vuelidate = useVuelidate(rules, entryCV);

function clear() {
  vuelidate.value.$reset();
  store.resetCV([
    'jobSector',
    'headline',
    'firstName',
    'lastName',
    'dob',
    'gender',
    'phone',
    'addressLine1',
    'addressLine2',
    'addressCity',
  ]);
}
async function next() {
  const valid = await vuelidate.value.$validate();
  if (valid) {
    emit('on-next');
  }
}
</script>
