<template>
  <v-row>
    <v-col cols="12" md="6" class="py-2">
      <v-select v-model="entryFilter.jobSector" :items="categories" autofocus label="Job Sector"> </v-select>
    </v-col>
    <v-col cols="12" md="6" class="py-2">
      <v-select v-model="entryFilter.experienceTotal" :items="experienceYears">
        <template #label>Minimum Experience (in years)</template>
      </v-select>
    </v-col>
    <v-col cols="12" md="6" class="py-2">
      <v-select v-model="entryFilter.educationLevel" :items="eduLevels">
        <template #label> Minimum Education Level</template>
      </v-select>
    </v-col>
    <v-col cols="12" md="6" class="py-2">
      <v-select v-model="entryFilter.noOfGCSEPasses" :items="gcsePasses">
        <template #label> Minimum GCSE passes </template>
      </v-select>
    </v-col>
    <v-col cols="12" md="6" class="py-2">
      <v-select v-model="entryFilter.educationalQualifications" :items="eduQls">
        <template #label> Education Qualification </template>
      </v-select>
    </v-col>

    <v-col cols="12" md="6" class="py-2">
      <v-select v-model="entryFilter.professionalQualifications" :items="profQls">
        <template #label> Professional Qualification </template>
      </v-select>
    </v-col>

    <v-col cols="12" md="6" class="py-2">
      <v-select v-model="entryFilter.skills" :items="skills">
        <template #label> Specific Skill </template>
      </v-select>
    </v-col>
    <v-col cols="12" md="6" class="py-2"></v-col>

    <v-col cols="12" md="6" class="py-2">
      <v-btn @click="searchCv" v-model="entryFilter.isSearch" color="primary"> Search </v-btn>

      <v-btn @click="clearFilters" color="grey" style="margin-left: 5%"> Reset </v-btn>
    </v-col>

    <v-col cols="12" v-if="entryFilter.isSearch">
      <v-sheet max-height="75vh" class="overflow-y-auto overflow-x-hidden">
        <v-row>
          <v-col v-for="user in users" cols="12" sm="4" md="3" xl="2">
            <c-v-preview
              :cv="{
                id: user.id,
                name: user.name,
                image: user.image,
                headline: user.headline,
                experience: user.experience,
                edu: user.edu,
              }"
            />
          </v-col>
          <v-col v-for="user in users" cols="12" sm="4" md="3" xl="2">
            <c-v-preview
              :cv="{
                id: user.id,
                name: user.name,
                image: user.image,
                headline: user.headline,
                experience: user.experience,
                edu: user.edu,
              }"
            />
          </v-col>
          <v-col v-for="user in users" cols="12" sm="4" md="3" xl="2">
            <c-v-preview
              :cv="{
                id: user.id,
                name: user.name,
                image: user.image,
                headline: user.headline,
                experience: user.experience,
                edu: user.edu,
              }"
            />
          </v-col>
        </v-row>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import { useCvfilterStore } from '@/stores/cv-filter-store';
import { storeToRefs } from 'pinia';
import CVPreview from './CVPreview.vue';
import { range } from 'lodash';

const store = useCvfilterStore();
const { entryFilter } = storeToRefs(store);

function searchCv() {
  store.search();
}
function clearFilters() {
  store.clearSearch();
}

const categories = [
  'Technology',
  'Human Resources',
  'Healthcare',
  'Finance & Accounting',
  'Sales & Marketing',
  'Education',
  'Legal',
  'Other',
];

const skills = [
  'Java',
  'NodeJs',
  'Python',
  'AWS',
  'C++',
  'SQL',
  'PowerBI',
  'HTML',
  'CSS',
  'JavaScript',
  'ReactJs',
  'VueJs',
  'Excel',
];

const eduLevels = [
  'GCSE',
  'Bachelors Degree',
  'Masters Degree',
  'Associate Degree',
  'Professional Certification',
  'Vocational',
  'Doctor of Philosophy',
];
const eduQls = [
  'Bachelor of Software Engineering (Honours)',
  'Bachelor of Science (BSc) Computer Science',
  'Master of Science Degree in Information Technology',
  'Master of Arts (MA) English Literature',
  'NVQ Level 3 Business Administration',
  'GCSE Mathematics',
];

const profQls = [
  'AWS Certified Solutions Architect - Associate',
  'Oracle Certified Professional, Java SE 11 Developer  (OCPJD 11)',
  'W3C Front End Web Developer Certification ',
  'Certified Associate in Software Testing (CAST)',
  'ISTQB (International Software Testing Qualifications Board)',
  'Certified Associate in Project Management (CAPM)',
];
const experienceYears = range(0, 50);
const gcsePasses = range(0, 20);

const users = [
  {
    id: 1,
    name: 'Anne Roger',
    headline: 'JavaScript, Frontend Developer',
    image: 'https://i.ibb.co/G9QnLg8/female1.png',
    experience: '1 year',
    edu: 'BSc in Computer Science',
  },
  {
    id: 2,
    name: 'Devin Cooray',
    headline: 'Java, Backend Developer',
    image: 'https://randomuser.me/api/portraits/men/4.jpg',
    experience: '3 year',
    edu: 'BSc in Software Engineering',
  },
  {
    id: 3,
    name: 'Rachel Devin',
    headline: 'JavaScript, Frontend Developer',
    image: 'https://randomuser.me/api/portraits/women/2.jpg',
    experience: '2 year',
    edu: 'BSc in Software Engineering',
  },
  {
    id: 4,
    name: 'Sherley Shawn',
    headline: 'Java, Frontend Developer',
    image: 'https://i.ibb.co/s9ffsjZ/male1.png',
    experience: '3 year',
    edu: 'BSc in Computer Science',
  },
  {
    id: 5,
    name: 'John Doe',
    headline: 'Java, Backend Developer',
    image: 'https://randomuser.me/api/portraits/men/7.jpg',
    experience: '4 year',
    edu: 'BSc in Software Engineering',
  },
];
</script>
