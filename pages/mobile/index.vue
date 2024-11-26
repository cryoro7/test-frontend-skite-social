<template>
  <div class="relative overflow-hidden">
    <div
      class="bg-bittersweet w-[567px] z-0 h-[404px] absolute -top-[20%] -left-1/3 rounded-full"
    ></div>
    <div class="h-full px-9 pt-20 pb-5 flex flex-col gap-10 no-scrollbar">
      <div class="flex flex-col gap-4 z-10 relative">
        <h4 class="text-white font-medium text-lg">
          Welcome, {{ authStore.user?.name }}
        </h4>
        <div
          class="p-4 bg-white rounded-xl h-40 flex justify-end items-end relative overflow-hidden"
        >
          <Logo
            class="absolute -top-1/4 -left-[20%] [&>div:first-child]:w-36 [&>div:first-child]:h-36 [&>div:last-child]:w-7 [&>div:last-child]:h-7 [&>div:last-child]:mt-20"
          />
          <div class="flex flex-col justify-end items-end">
            <span class="text-[#535353] text-lg"> Your Balance </span>
            <span class="text-4xl text-blue-dodger font-bold"> $ 200.00 </span>
          </div>
        </div>
      </div>
      <div>
        <span class="text-blue-active font-bold">PREVIOUS ORDER</span>
        <NuxtLink to="/mobile/invoice">
          <div class="flex flex-row bg-white rounded-lg h-24 mt-3 gap-2">
            <div
              class="flex-[2] flex flex-row justify-center items-center gap-2"
            >
              <NuxtImg class="h-16 w-15" src="/laundry.png" />
              <div class="flex flex-col">
                <span> Bag of Laundry </span>
                <span class="text-xs mt-3"> Total Order </span>
                <span class="text-blue-dodger"> $ 180.00 </span>
              </div>
            </div>
            <div
              class="flex-1 uppercase gap-3 text-xs flex justify-center items-center flex-col bg-blue-dodger rounded-e-lg text-white"
            >
              <svg-icon name="note" class="w-9 h-9" />
              Invoice
            </div>
          </div>
        </NuxtLink>
      </div>
      <div>
        <span class="text-blue-active font-bold">YOUR MOST ORDERED</span>
        <div class="mt-3">
          <div
            class="rounded-md w-full h-48 flex flex-col justify-end items-start relative text-white"
            :style="{
              background:
                'linear-gradient(180deg, rgba(0, 153, 238, 0) 50%, #3B97CB 100%)',
            }"
          >
            <NuxtImg
              src="/mostordered.png"
              class="absolute object-cover w-full left-0 top-0"
            />
          </div>
        </div>
      </div>
      <div>
        <span class="text-blue-active font-bold">OUR LATEST PRODUCT</span>
        <div class="overflow-auto mt-3 no-scrollbar">
          <div class="inline-flex gap-3">
            <NuxtLink
              v-for="product in productStore.latestProduct"
              :key="product.id"
              :to="`/mobile/product/${product.id}`"
            >
              <div
                class="rounded-md w-44 h-56 flex flex-col justify-end items-start relative text-white p-2"
                :style="{
                  background:
                    'linear-gradient(180deg, rgba(0, 153, 238, 0) 50%, #3B97CB 100%)',
                }"
              >
                <NuxtImg
                  :src="product?.image || defaultImage"
                  class="absolute h-full opacity-50 object-cover left-0 top-0"
                />
                <p>
                  {{ product.name }}
                </p>
                <p>$ {{ product.price }}/pc</p>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { definePageMeta } from "#imports";
import banner from "@/assets/img/mostordered.png";
import { $api } from "@/composable/api";
import { getDefaultImage } from "@/constants/constants";
import type { IResponse } from "@/model/response";

definePageMeta({
  middleware: "auth",
  layout: "mobile",
});

const defaultImage = getDefaultImage();

const authStore = useAuthStore();
const productStore = useProductStore();

const getProducts = async () => {
  const res = await $api<IResponse>("/product", { method: "GET" });
  if (res.status) {
    productStore.setProduct(res.response);
  }
};

onMounted(() => {
  getProducts();
});
</script>

<style></style>
