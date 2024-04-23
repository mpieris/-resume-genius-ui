<template>
  <v-form validate-on="submit" @submit.prevent="submit">
    <v-row class="mt-sm-2">
      <v-col cols="12" class="py-2">
        <v-text-field
          v-model="entryCV.experienceTotal"
          :error-messages="vuelidate.experienceTotal.$errors.map((e) => e.$message as string)"
          label="Total Experience (in years)"
          type="number"
          autofocus
          required
          @input="vuelidate.experienceTotal.$touch"
          @blur="vuelidate.experienceTotal.$touch"
        />
      </v-col>
    </v-row>

    <v-row class="mt-10">
      <v-col cols="12" class="py-2">
        <v-text-field v-model="experiences1" label="Experiences - 1" />
      </v-col>
      <v-col cols="12" class="py-2">
        <v-text-field v-model="experiences2" label="Experiences - 2" />
      </v-col>
      <v-col cols="12" class="py-2">
        <v-text-field v-model="experiences3" label="Experiences - 3" />
      </v-col>
    </v-row>

    <v-row class="mt-10">
      <v-col cols="12" class="flex-row">
        <div class="d-flex flex-row">
          <v-btn class="d-flex" @click="clear"> clear </v-btn>
          <v-spacer />
          <v-btn
            type="submit"
            class="d-flex"
            color="primary"
            :loading="cvStatus === CVStatus.LOADING"
            :disabled="cvEntryStatus === CVEntryStatus.SUBMITTED"
          >
            submit
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-form>
</template>

<script lang="ts" setup>
import { CVEntryStatus, CVStatus } from '@/services/constants';
import { useCVStore } from '@/stores/cv-store';
import { useVuelidate } from '@vuelidate/core';
import { between, required, numeric } from '@vuelidate/validators';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';

const emit = defineEmits(['on-next', 'on-submit']);

const store = useCVStore();
const { entryCV, cvEntryStatus, cvStatus } = storeToRefs(store);

const rules = {
  experienceTotal: { required, between: between(0, 50), numeric },
};
const vuelidate = useVuelidate(rules, entryCV);

const experiences1 = ref(entryCV.value.experiences[0]);
const experiences2 = ref(entryCV.value.experiences[1]);
const experiences3 = ref(entryCV.value.experiences[2]);

watch([experiences1, experiences2, experiences3], () => {
  const experiences = [];
  if (experiences1.value) {
    experiences.push(experiences1.value);
  }
  if (experiences2.value) {
    experiences.push(experiences2.value);
  }
  if (experiences3.value) {
    experiences.push(experiences3.value);
  }

  store.updateCV({ experiences });
});

function clear() {
  vuelidate.value.$reset();
  store.resetCV([
    'primaryEducationLevel',
    'secondaryEducationLevel',
    'higherEducationLevel',
    'professionalQualifications',
  ]);
}
async function submit() {
  const valid = await vuelidate.value.$validate();
  if (valid) {
    emit('on-submit');
  }
}
</script>
