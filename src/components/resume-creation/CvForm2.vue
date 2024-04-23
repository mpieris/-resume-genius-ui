<template>
  <v-form validate-on="submit" @submit.prevent="next">
    <v-row class="mt-sm-2">
      <v-col cols="12" class="py-2">
        <v-combobox
          v-model="skillsList"
          autofocus
          chips
          :multiple="(true as any)"
          required
          :error-messages="vuelidate.skills.$errors.map((e) => e.$message as string)"
        >
          <template #label> What are you skills? <span class="font-weight-medium text-red">*</span> </template>
        </v-combobox>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6" class="py-2">
        <v-select
          v-model="entryCV.noOfGCSEPasses"
          :items="gcsePasses"
          required
          :error-messages="vuelidate.noOfGCSEPasses.$errors.map((e) => e.$message as string)"
        >
          <template #label> Numer of GCSE passes<span class="font-weight-medium text-red">*</span> </template>
        </v-select>
      </v-col>
      <v-col cols="12" md="6" class="py-2">
        <v-text-field
          v-model="entryCV.primaryEducationLevel"
          :error-messages="vuelidate.primaryEducationLevel.$errors.map((e) => e.$message as string)"
        >
          <template #label> Primary education level <span class="font-weight-medium text-red">*</span> </template>
        </v-text-field>
      </v-col>
      <v-col cols="12" md="6" class="py-2">
        <v-text-field v-model="entryCV.secondaryEducationLevel" label="Secondary Education Level" />
      </v-col>
      <v-col cols="12" md="6" class="py-2">
        <v-text-field v-model="entryCV.higherEducationLevel" label="Higher Education Level" />
      </v-col>
    </v-row>

    <v-row class="mt-10">
      <v-col cols="12" class="py-2">
        <v-text-field v-model="professionalQualifications1" label="Professional Qualifications - 1" />
      </v-col>
      <v-col cols="12" class="py-2">
        <v-text-field v-model="professionalQualifications2" label="Professional Qualifications - 2" />
      </v-col>
      <v-col cols="12" class="py-2">
        <v-text-field v-model="professionalQualifications3" label="Professional Qualifications - 3" />
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
import { required } from '@vuelidate/validators';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';
import { range } from 'lodash';

const emit = defineEmits(['on-next', 'on-submit']);

const store = useCVStore();
const { entryCV } = storeToRefs(store);

const gcsePasses = range(0, 20);

const skillsList = ref(entryCV.value.skills.length ? entryCV.value.skills.split(',') : []);
const professionalQualifications1 = ref(entryCV.value.professionalQualifications[0]);
const professionalQualifications2 = ref(entryCV.value.professionalQualifications[1]);
const professionalQualifications3 = ref(entryCV.value.professionalQualifications[2]);

watch(skillsList, () => {
  const skills = skillsList.value.join(',');
  store.updateCV({ skills });
});

watch([professionalQualifications1, professionalQualifications2, professionalQualifications3], () => {
  const professionalQualifications = [];
  if (professionalQualifications1.value) {
    professionalQualifications.push(professionalQualifications1.value);
  }
  if (professionalQualifications2.value) {
    professionalQualifications.push(professionalQualifications2.value);
  }
  if (professionalQualifications3.value) {
    professionalQualifications.push(professionalQualifications3.value);
  }

  store.updateCV({ professionalQualifications });
});

const rules = {
  skills: { required },
  noOfGCSEPasses: { required },
  primaryEducationLevel: { required },
};
const vuelidate = useVuelidate(rules, entryCV);

function clear() {
  vuelidate.value.$reset();
  store.resetCV([
    'primaryEducationLevel',
    'secondaryEducationLevel',
    'higherEducationLevel',
    'professionalQualifications',
  ]);
}
async function next() {
  const valid = await vuelidate.value.$validate();
  if (valid) {
    emit('on-next');
  }
}
</script>
