<template>
  <div
    class="min-h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8 text-center">
      <div>
        <h1 class="text-9xl font-extrabold text-blue-600">404</h1>
        <h2 class="mt-6 text-3xl font-bold text-gray-900">Page Not Found</h2>
        <p class="mt-2 text-sm text-gray-600">
          Oops! The page you're looking for doesn't exist.
        </p>
      </div>
      <div class="mt-8 space-y-6">
        <button
          class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
        >
          Go Back
        </button>
        <button
          class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { definePageMeta } from "#imports";

definePageMeta({
  middleware: "auth",
  layout: "dashboard",
});
</script>

<style></style>
