<template>
  <v-app id="inspire">
    <v-app-bar app flat scroll-behavior="elevate" scroll-threshold="0" color="grey">
      <h2 style="padding: 1%; color: #000; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif">
        Resume Genius
      </h2>
      <v-spacer />
      <v-toolbar-items class="hidden-sm-and-down me-4">
        <user-info v-if="currentUser" @on-logout="logout" />
      </v-toolbar-items>
      <v-btn v-if="!currentUser" class="hidden-sm-and-down me-4" icon>
        <v-btn variant="elevated" style="padding: 1%; color: #000"> Login </v-btn>

        <v-dialog v-model="showLogin" activator="parent" persistent width="720">
          <user-login
            :alert-text="loginAlertText"
            @on-close="
              loginAlertText = '';
              showLogin = !showLogin;
            "
          />
        </v-dialog>

        <v-menu v-if="currentUser" activator="parent" open-on-hover :close-on-content-click="false">
          <user-info @on-logout="logout" />
        </v-menu>
      </v-btn>
      <v-app-bar-nav-icon class="hidden-md-and-up" @click.stop="showDrawer = !showDrawer" />
    </v-app-bar>

    <v-navigation-drawer v-model="showDrawer" temporary location="right" class="hidden-md-and-up">
      <template v-slot:prepend>
        <v-list-item
          v-if="currentUser"
          lines="two"
          :prepend-avatar="currentUser?.photo"
          :title="currentUser?.email || currentUser?.name"
          subtitle="Logged in"
        >
          <template #append>
            <v-btn icon flat @click="logout" :loading="userLoading">
              <v-icon>mdi-logout</v-icon>
              <v-tooltip activator="parent">Logout</v-tooltip>
            </v-btn>
          </template>
        </v-list-item>
      </template>

      <v-list class="py-1" density="compact" nav>
        <v-list-item v-if="!currentUser" :active="false" prepend-icon="mdi-account" title="Login" value="login">
          <v-dialog v-model="showLoginMobile" activator="parent" persistent width="720">
            <user-login
              :alert-text="loginAlertText"
              @on-close="
                loginAlertText = '';
                showLoginMobile = !showLoginMobile;
              "
            />
          </v-dialog>
        </v-list-item>
        <v-divider class="my-1"></v-divider>
        <v-list-item v-if="isAgencyUser" prepend-icon="mdi-file-search" title="Search" value="search" to="search" />
      </v-list>
    </v-navigation-drawer>

    <v-main class="bg-grey-lighten-3">
      <v-container>
        <v-sheet class="my-5" min-height="70vh" rounded="lg">
          <v-row>
            <v-col class="px-8 py-5" cols="12">
              <router-view />
            </v-col>
          </v-row>
        </v-sheet>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import UserInfo from '@/components/UserInfo.vue';
import UserLogin from '@/components/user-login/LoginAndRegister.vue';
import { useUserStore } from '@/stores/user-store';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const userStore = useUserStore();
const { currentUser, userLoading, isAgencyUser } = storeToRefs(userStore);

const showDrawer = ref(false);
const showLogin = ref(false);
const showLoginMobile = ref(false);
const loginAlertText = ref('');

async function logout() {
  showLogin.value = false;
  showLoginMobile.value = false;
  userStore.clearUser();
}
</script>
