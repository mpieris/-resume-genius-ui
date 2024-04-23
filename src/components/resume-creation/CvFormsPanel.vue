<template>
  <v-tabs v-model="tab" color="deep-purple-accent-4" align-tabs="start" class="mb-10 mx-sm-4" show-arrows>
    <v-tab :value="1">Personal Infomation</v-tab>
    <v-tab :value="2">Qualifications</v-tab>
    <v-tab :value="3">Experience</v-tab>
  </v-tabs>
  <v-window v-model="tab">
    <v-window-item :key="1" :value="1">
      <v-container fluid>
        <CvForm1 @on-next="next" />
      </v-container>
    </v-window-item>

    <v-window-item :key="2" :value="2">
      <v-container fluid>
        <CvForm2 @on-next="next" />
      </v-container>
    </v-window-item>

    <v-window-item :key="3" :value="3">
      <v-container fluid>
        <CvForm3 @on-submit="submit" />
      </v-container>
    </v-window-item>
  </v-window>
  <div class="ma-4">
    <v-alert v-model="showAlert" border="start" variant="tonal" closable close-label="Close Alert" color="error">
      {{ alertText }}
    </v-alert>
  </div>
</template>

<script lang="ts" setup>
import { delay } from '@/services/util';
import { useCVStore } from '@/stores/cv-store';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';
import CvForm1 from './CvForm1.vue';
import CvForm2 from './CvForm2.vue';
import CvForm3 from './CvForm3.vue';

const cvStore = useCVStore();
const { entryCV } = storeToRefs(cvStore);

cvStore.setCVInProgress();

const tab = ref(0);
const alertText = ref('');
const showAlert = ref(false);

watch(showAlert, async (visible) => {
  if (visible) {
    await delay(3000);
    showAlert.value = false;
  }
});

const rules = {
  email: { required },
  headline: { required },
  jobSector: { required },
  firstName: { required },
  lastName: { required },
  phone: { required },
  addressCity: { required },
  skills: { required },
  noOfGCSEPasses: { required },
  primaryEducationLevel: { required },
  experienceTotal: { required },
};
const vuelidate = useVuelidate(rules, entryCV);

async function next() {
  tab.value = tab.value + 1;
}
async function submit() {
  console.log(entryCV.value);
  const valid = await vuelidate.value.$validate();
  if (valid) {
    cvStore.submitCV();
  } else {
    showAlert.value = true;
    alertText.value = 'Please fill in all required fields in other steps';
  }
}
</script>
