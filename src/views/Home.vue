<template>
  <v-app id="inspire">
    <v-app-bar app flat scroll-behavior="elevate" scroll-threshold="0" color="grey">
      <h2 style="padding: 1%; color: #000; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif">
        Resume Genius
      </h2>
    </v-app-bar>
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
