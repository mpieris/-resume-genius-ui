<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="auto">
        <v-card class="mx-auto" max-width="344">
          <v-card-item>
            <div>
              <div style="height: 240px; width: 344px">
                <v-img src="@/assets/template1.webp" />
              </div>
              <div class="text-caption" style="padding-bottom: 2%">Modern Resume</div>
            </div>
            <v-btn color="bg-grey-lighten-3" variant="outlined" to="/create-resume"> Select </v-btn>
          </v-card-item>
        </v-card>
      </v-col>

      <v-col cols="auto">
        <v-card class="mx-auto" max-width="344">
          <v-card-item>
            <div>
              <div style="height: 240px; width: 344px">
                <v-img src="@/assets/template2.webp" />
              </div>
              <div class="text-caption" style="padding-top: 2%; padding-bottom: 2%">Creative Resume</div>
            </div>
            <v-btn color="bg-grey-lighten-3" variant="outlined" to="/create-resume"> Select </v-btn>
          </v-card-item>
        </v-card>
      </v-col>

      <v-col cols="auto">
        <v-card class="mx-auto" max-width="344">
          <v-card-item>
            <div>
              <div style="height: 240px; width: 344px">
                <v-img src="@/assets/template3.webp" />
              </div>
              <div class="text-caption" style="padding-top: 2%; padding-bottom: 2%">Professional Resume</div>
            </div>
            <v-btn color="bg-grey-lighten-3" variant="outlined" to="/create-resume"> Select </v-btn>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <div class="d-flex justify-center mt-7">
    <v-btn color="bg-grey-lighten-3" variant="outlined" to="/create-resume"> Get Started </v-btn>
  </div>
  <div class="text-caption" style="padding-top: 10%; text-align: center">
    <p>Privacy Policy Terms and Conditions Contact Us</p>
  </div>
</template>

<script lang="ts" setup></script>
