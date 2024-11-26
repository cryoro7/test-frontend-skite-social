<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <div :class="cn('flex', props.class)">
    <div
      class="h-14 w-14 rounded-full border-4 bg-blue-dodger border-white"
    ></div>
    <div
      class="h-5 w-5 rounded-full border-4 bg-bittersweet border-white"
    ></div>
  </div>
</template>
