<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";
import { useSidebar } from "./utils";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();

const { setOpen } = useSidebar();
</script>

<template>
  <div
    data-sidebar="header"
    :class="
      cn(
        'flex flex-col gap-2 bg-blue-summersky text-white text-3xl py-11',
        props.class
      )
    "
  >
    <slot />
    <Button
      variant="ghost"
      class="absolute right-0 text-white top-0 block md:hidden"
      @click="setOpen(false)"
    >
      <svg-icon name="close-lg" />
    </Button>
  </div>
</template>
