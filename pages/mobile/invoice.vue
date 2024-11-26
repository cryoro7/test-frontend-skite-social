<template>
  <div
    class="relative px-5 flex flex-col gap-6 justify-center items-center h-full"
  >
    <NuxtLink to="/mobile/" class="absolute left-3 cursor-pointer z-10 top-4">
      <svg-icon name="chevron-left" class="text-blue-summersky w-10 h-10" />
    </NuxtLink>
    <Card class="w-full bg-blue-dodger text-white">
      <CardHeader class="text-center p-4">ORDER SUMMARY</CardHeader>
      <CardContent class="bg-white text-black p-0 flex flex-col">
        <div class="flex flex-col gap-4 p-5 py-3">
          <p class="self-end text-blue-dodger">ORDER #21340</p>
          <div>
            <p class="font-bold mb-1">{{ user?.name }}</p>
            <p class="max-w-32 text-[#535353] text-sm">
              123 Pasir Ris, 13810, Singapore
            </p>
          </div>
        </div>
        <div>
          <div
            class="flex flex-row bg-white h-14 gap-2 border-b border-blue-active"
            v-for="invoice in dummyInvoice"
            :key="invoice.id"
          >
            <div
              class="flex-[2] flex flex-row justify-center items-center gap-2"
            >
              <NuxtImg class="h-12 w-10" src="/laundry.png" />
              <div class="flex flex-col">
                <span> Bag of Laundry </span>
                <span class="text-blue-dodger"> Qty:2 </span>
              </div>
            </div>
            <div
              class="flex-1 uppercase gap-3 text-xs flex justify-center items-center flex-col rounded-e-lg"
            >
              <p>Total</p>
              <p>$ 180.00</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter class="flex justify-between items-center py-4">
        <p>TOTAL ORDER</p>
        <p class="font-bold">$ 204.00</p>
      </CardFooter>
    </Card>
    <Button size="xl" class="w-full uppercase">
      <svg-icon name="chat-alt" class="w-9 h-9" />
      whatsapp us
    </Button>
  </div>
</template>

<script setup lang="ts">
import { definePageMeta } from "#imports";

definePageMeta({
  middleware: "auth",
  layout: "mobile",
});

const { user } = useAuthStore();

const dummyInvoice = [
  {
    id: 1,
    title: "Bag of Laundry",
    qty: 2,
    total: "$ 180.00",
  },
  {
    id: 2,
    title: "Dry Cleaning",
    qty: 3,
    total: "$ 10.00",
  },
  {
    id: 3,
    title: "Rug",
    qty: 1,
    total: "$ 14.00",
  },
];
</script>

<style></style>
