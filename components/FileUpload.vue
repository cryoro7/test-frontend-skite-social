<template>
  <div class="flex flex-col justify-center items-center gap-5">
    <input
      ref="fileInput"
      v-if="!preview"
      type="file"
      @change="handleFileChange"
      hidden
      id="upload-input"
    />

    <img v-if="preview" :src="preview" />
    <svg-icon class="text-blue-pattens" v-else name="image-02" />

    <button v-if="preview" type="button" @click="doSomething">
      <svg-icon class="text-blue-dodger w-5 h-5" name="trash-full" />
    </button>
    <label
      v-else
      for="upload-input"
      class="underline w-fit cursor-pointer text-blue-dodger"
    >
      Upload image here
    </label>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const fileInput = ref<HTMLInputElement | null>(null);
const preview = ref();

function handleFileChange() {
  const files = fileInput.value?.files;
  if (files) {
    var reader = new FileReader();
    reader.onload = (e) => {
      preview.value = e?.target?.result;
    };
    reader.readAsDataURL(files[0]);
  }
}

function doSomething() {
  preview.value = null;
}
</script>
