import { CVEntryStatus, CVStatus } from '@/services/constants';
import { delay } from '@/services/util';
import { defineStore } from 'pinia';
import { Ref, computed, ref } from 'vue';

export const useCVStore = defineStore('resume-creation', () => {
  const initialCV = {
    jobSector: null,
    email: '',
    headline: '',
    firstName: '',
    lastName: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    addressCity: '',
    dob: null,
    gender: null,
    skills: '',
    noOfGCSEPasses: null,
    primaryEducationLevel: null,
    secondaryEducationLevel: null,
    higherEducationLevel: null,
    professionalQualifications: [] as string[],
    experienceTotal: null,
    experiences: [] as string[],
  };

  const entryCVInternal = ref({ data: { ...initialCV }, status: CVEntryStatus.INIT });
  const currentUserCV: Ref<{ data: typeof initialCV | null; status: CVStatus }> = ref({
    data: null,
    status: CVStatus.INIT,
  });

  const entryCV = computed(() => entryCVInternal.value.data);
  const cvEntryStatus = computed(() => entryCVInternal.value.status);
  const cv = computed(() => currentUserCV.value.data);
  const cvStatus = computed(() => currentUserCV.value.status);
  const cvAvailable = computed(() => currentUserCV.value.status === CVStatus.SUCCESS && !!currentUserCV.value.data);

  const resetCV = (fields?: Array<keyof typeof initialCV>) => {
    if (fields) {
      entryCVInternal.value.data = {
        ...entryCV.value,
        ...fields.reduce((acc: object, field: string) => ({ ...acc, [field]: (<any>initialCV)[field] }), {}),
      };
    } else {
      entryCVInternal.value.data = { ...initialCV };
    }
  };

  const updateCV = (newValues: Partial<typeof initialCV>) => {
    entryCVInternal.value.data = {
      ...entryCV.value,
      ...newValues,
    };
  };

  const setCVInProgress = () => {
    entryCVInternal.value.status = CVEntryStatus.IN_PROGRESS;
  };

  const submitCV = async () => {
    currentUserCV.value.status = CVStatus.LOADING;
    await delay(2000);
    currentUserCV.value.data = entryCV.value;
    entryCVInternal.value.status = CVEntryStatus.SUBMITTED;
    currentUserCV.value.status = CVStatus.SUCCESS;
  };

  const editCV = async () => {
    entryCVInternal.value.data = cv.value as any;
    entryCVInternal.value.status = CVEntryStatus.IN_PROGRESS;
  };

  return {
    initialCV,
    entryCV,
    cvEntryStatus,
    setCVInProgress,
    resetCV,
    updateCV,
    submitCV,
    editCV,
    cv,
    cvStatus,
    cvAvailable,
  };
});
