<template>
  <v-card class="mx-auto" max-width="344">
    <v-img class="align-end text-white" :src="`${props.cv?.image}`" height="150px" cover>
      <v-card-title v-text="props.cv?.name"></v-card-title>
    </v-img>

    <v-card-text class="py-1">
      <div class="pb-2">{{ props.cv?.headline }}</div>
      <div>
        <span class="font-weight-bold">{{ props.cv?.experience }}</span> of experience
      </div>
      <div>
        with <span class="font-weight-bold">{{ props.cv?.edu }}</span>
      </div>
    </v-card-text>

    <v-card-actions class="py-1">
      <v-spacer></v-spacer>
      <v-btn size="small" color="surface-variant" variant="text" icon="mdi-share-variant"></v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
const props = defineProps({
  cv: { type: Object },
});
</script>

<style scoped lang="scss">
.v-card-title {
  text-shadow: 0 2px 1px #1e1e1e;
  background: linear-gradient(to top, rgb(14 14 14 / 51%) 0%, rgba(0, 0, 0, 0) 100%);
}
</style>
