<template>
  <div class="d-flex justify-center">
    <v-row>
      <v-col cols="12" px="8" class="py-5">
        <div class="d-flex justify-center" id="root">
          <div class="v-row">
            <div class="v-col v-col-12">
              <div class="v-card v-theme--light v-card--density-default v-card--variant-elevated">
                <div class="v-card__loader">
                  <div
                    class="v-progress-linear v-theme--light v-locale--is-ltr"
                    role="progressbar"
                    aria-hidden="true"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style="
                      top: 0px;
                      height: 0px;
                      --v-progress-linear-height: 2px;
                      left: 50%;
                      transform: translateX(-50%);
                    "
                  >
                    <div class="v-progress-linear__background" style="width: 100%"></div>
                    <div class="v-progress-linear__indeterminate">
                      <div class="v-progress-linear__indeterminate long"></div>
                      <div class="v-progress-linear__indeterminate short"></div>
                    </div>
                  </div>
                </div>

                <div class="d-flex flex-column flex-sm-row flex-no-wrap justify-space-between">
                  <div
                    class="v-avatar v-theme--light v-avatar--density-default rounded-0 v-avatar--variant-flat ma-3 order-1 order-sm-1"
                    style="width: 170px; height: 170px"
                  >
                    <div class="v-responsive v-img" style="border-radius: 50%">
                      <div class="v-responsive__sizer" style="padding-bottom: 100%"></div>
                      <v-img cover src="@/assets/users/female1.png" />
                    </div>
                    <span class="v-avatar__underlay"></span>
                  </div>

                  <div class="order-2 order-sm-2">
                    <v-card-title class="text-h6 text-md-h5 text-lg-h4">{{
                      cv?.firstName + ' ' + cv?.lastName
                    }}</v-card-title>
                    <div class="v-card-text">
                      <div>
                        <div class="my-1">{{ cv?.headline }}</div>
                        <div class="my-1">Email: {{ cv?.email }}</div>
                        <div class="my-1">Phone: {{ cv?.phone }}</div>
                      </div>
                    </div>
                    <v-card-actions v-if="!downloading">
                      <v-btn
                        size="small"
                        color="surface-variant"
                        variant="text"
                        icon="mdi-download"
                        title="Download"
                        @click="download"
                      />
                      <v-btn
                        size="small"
                        color="surface-variant"
                        variant="text"
                        icon="mdi-pencil"
                        title="Edit"
                        @click="edit"
                      />
                      <v-btn
                        size="small"
                        color="surface-variant"
                        variant="text"
                        icon="mdi-delete"
                        title="Delete"
                      ></v-btn>
                    </v-card-actions>
                  </div>
                </div>
                <span class="v-card__underlay"></span>
              </div>
            </div>
            <div class="v-col v-col-12">
              <div class="v-card v-theme--light v-card--density-default v-card--variant-elevated">
                <div class="v-card__loader">
                  <div
                    class="v-progress-linear v-theme--light v-locale--is-ltr"
                    role="progressbar"
                    aria-hidden="true"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style="
                      top: 0px;
                      height: 0px;
                      --v-progress-linear-height: 2px;
                      left: 50%;
                      transform: translateX(-50%);
                    "
                  >
                    <div class="v-progress-linear__background" style="width: 100%"></div>
                    <div class="v-progress-linear__indeterminate">
                      <div class="v-progress-linear__indeterminate long"></div>
                      <div class="v-progress-linear__indeterminate short"></div>
                    </div>
                  </div>
                </div>

                <div class="v-card-text">
                  <div class="v-row">
                    <div class="v-col-sm-6 v-col-12">
                      <div>Address:</div>
                      <div>{{ cv?.addressLine1 }} <span>,</span></div>
                      <div>{{ cv?.addressLine2 }},</div>
                      <div>{{ cv?.addressCity }}</div>
                    </div>
                    <div class="v-col-sm-6 v-col-12">
                      <div>Age: 26-30</div>
                      <div>Gender: {{ cv?.gender }}</div>
                    </div>
                  </div>
                </div>
                <span class="v-card__underlay"></span>
              </div>
            </div>
            <div class="v-col v-col-12">
              <div class="v-card v-theme--light v-card--density-default v-card--variant-elevated">
                <div class="v-card__loader">
                  <div
                    class="v-progress-linear v-theme--light v-locale--is-ltr"
                    role="progressbar"
                    aria-hidden="true"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style="
                      top: 0px;
                      height: 0px;
                      --v-progress-linear-height: 2px;
                      left: 50%;
                      transform: translateX(-50%);
                    "
                  >
                    <div class="v-progress-linear__background" style="width: 100%"></div>
                    <div class="v-progress-linear__indeterminate">
                      <div class="v-progress-linear__indeterminate long"></div>
                      <div class="v-progress-linear__indeterminate short"></div>
                    </div>
                  </div>
                </div>

                <div class="v-card-title text-subtitle-2">Qualifications</div>
                <div class="v-card-text">
                  <div class="v-row">
                    <div class="v-col-sm-6 v-col-12">
                      <div>No of GCSE passes: {{ cv?.noOfGCSEPasses }}</div>
                    </div>
                    <div class="v-col-sm-6 v-col-12">
                      <div>Primary education: {{ cv?.primaryEducationLevel }}</div>
                      <div>Secondary education: {{ cv?.secondaryEducationLevel }}</div>
                      <div>Higher education: {{ cv?.higherEducationLevel }}</div>
                    </div>
                    <div class="v-col-sm-6 v-col-12">
                      <div>Professional qualifications</div>
                      <div>{{ cv?.professionalQualifications[0] }}</div>
                      <div>{{ cv?.professionalQualifications[1] }}</div>
                      <div>{{ cv?.professionalQualifications[2] }}</div>
                    </div>
                  </div>
                </div>
                <span class="v-card__underlay"></span>
              </div>
            </div>
            <div class="v-col v-col-12">
              <div class="v-card v-theme--light v-card--density-default v-card--variant-elevated">
                <div class="v-card__loader">
                  <div
                    class="v-progress-linear v-theme--light v-locale--is-ltr"
                    role="progressbar"
                    aria-hidden="true"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style="
                      top: 0px;
                      height: 0px;
                      --v-progress-linear-height: 2px;
                      left: 50%;
                      transform: translateX(-50%);
                    "
                  >
                    <div class="v-progress-linear__background" style="width: 100%"></div>
                    <div class="v-progress-linear__indeterminate">
                      <div class="v-progress-linear__indeterminate long"></div>
                      <div class="v-progress-linear__indeterminate short"></div>
                    </div>
                  </div>
                </div>

                <div class="v-card-title text-subtitle-2">Experience</div>
                <div class="v-card-text">
                  <div class="v-row">
                    <div class="v-col-sm-6 v-col-12">
                      <div>Total experience (years): {{ cv?.experienceTotal }}</div>
                    </div>
                    <div class="v-col-sm-6 v-col-12">
                      <div>Details</div>
                      <div>{{ cv?.experiences[0] }}</div>
                      <div>{{ cv?.experiences[1] }}</div>
                      <div>{{ cv?.experiences[2] }}</div>
                    </div>
                  </div>
                </div>
                <span class="v-card__underlay"></span>
              </div>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts" setup>
import { useCVStore } from '@/stores/cv-store';
import { storeToRefs } from 'pinia';
import html2pdf from 'html2pdf.js';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const store = useCVStore();
const { cv } = storeToRefs(store);

const downloading = ref(false);
function edit() {
  store.editCV();
  router.push({ name: 'cv-entry' });
}
function download() {
  downloading.value = true;
  const element = document.getElementById('root');
  const opt = {
    margin: 1,
    filename: `${cv.value?.firstName}-${cv.value?.lastName}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
  };
  html2pdf()
    .set(opt)
    .from(element)
    .then(() => {
      downloading.value = false;
    })
    .save();
}
</script>
