import { ApiStatus, UserType } from '@/services/constants';
import { delay } from '@/services/util';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export interface User {
  email: string;
  password: string;
  name?: string;
  photo?: string;
  type: UserType;
}

export const useUserStore = defineStore('UserStore', () => {
  const user = ref<{ data: User | null; status: ApiStatus }>({
    data: null,
    status: ApiStatus.INIT,
  });

  const currentUser = computed(() => user.value.data);
  const isApplicant = computed(() => user.value.data?.type === UserType.APPLICANT);
  const isAgencyUser = computed(() => user.value.data?.type === UserType.AGENCY_USER);
  const loggedIn = computed(() => !!user.value.data);
  const userLoading = computed(() => user.value.status === ApiStatus.LOADING);

  const setUser = async (newUser: User) => {
    user.value.status = ApiStatus.LOADING;
    await delay(2000);
    if (newUser.email == 'anna@gmail.com') {
      user.value.data = {
        ...user.value.data,
        ...newUser,
        type: UserType.AGENCY_USER,
      };
    } else {
      user.value.data = {
        ...user.value.data,
        ...newUser,
        type: UserType.APPLICANT,
      };
    }
    user.value.status = ApiStatus.SUCCESS;
  };

  const clearUser = async () => {
    user.value.status = ApiStatus.LOADING;
    await delay(2000);
    user.value.data = null;
    user.value.status = ApiStatus.SUCCESS;
  };

  return { userLoading, currentUser, loggedIn, setUser, clearUser, isApplicant, isAgencyUser };
});
