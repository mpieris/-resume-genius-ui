import { defineStore } from 'pinia';
import { Ref, computed, ref } from 'vue';

export const useCvfilterStore = defineStore('search', () => {
  const initialFilter = {
    jobSector: '',
    gender: '',
    skills: '',
    noOfGCSEPasses: 0,
    educationLevel: '',
    educationalQualifications: '',
    professionalQualifications: '',
    experienceTotal: 0,
    experiences: '',
    isSearch: '',
  };

  const entryCVFilterInternal = ref({ data: { ...initialFilter } });
  const currentFilters: Ref<{ data: typeof initialFilter | null }> = ref({
    data: null,
  });

  const entryFilter = computed(() => entryCVFilterInternal.value.data);
  let isSearch = ref(false);

  const search = async () => {
    entryFilter.value.isSearch = 'true';
    currentFilters.value.data = entryFilter.value;
    entryCVFilterInternal.value.data = entryFilter.value;

    isSearch = ref(true);
  };

  const clearSearch = async () => {
    entryCVFilterInternal.value.data = { ...initialFilter };
  };

  return { search, clearSearch, entryFilter, entryCVFilterInternal };
});
