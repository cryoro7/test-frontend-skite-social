<template>
  <div class="flex flex-col gap-10 relative">
    <NuxtLink to="/mobile/" class="absolute left-3 cursor-pointer z-10 top-4">
      <svg-icon name="chevron-left" class="text-blue-summersky w-10 h-10" />
    </NuxtLink>
    <div
      class="rounded-2xl"
      :style="{
        background:
          'linear-gradient(180deg, rgba(0, 153, 238, 0) 50%, #3B97CB 100%)',
      }"
    >
      <NuxtImg
        :src="product?.image || defaultImage"
        class="h-[300px] object-cover opacity-50"
      />
    </div>
    <div class="px-5">
      <Button variant="secondary">{{ category?.label }}</Button>
      <p class="mt-3 text-[44px] font-bold text-blue-active">
        {{ product?.name }}
      </p>
      <p class="text-2xl font-medium text-blue-dodger">
        $ {{ product?.price }}/pc
      </p>
      <p class="mt-3 text-[#838383]">{{ product?.description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { $api } from "@/composable/api";
import { categories, getDefaultImage } from "@/constants/constants";
import type { IResponse } from "@/model/response";

definePageMeta({
  middleware: "auth",
  layout: "mobile",
});

const route = useRoute();

const product = ref();
const category = computed(() =>
  categories.find((category) => category.id == product.value?.category_id)
);

const defaultImage = getDefaultImage();

const getProductById = async () => {
  const res = await $api<IResponse>(`/product/${route.params.id}`, {
    method: "GET",
  });
  if (res.status) {
    product.value = res.response;
  }
};

onMounted(() => {
  getProductById();
});
</script>

<style></style>
