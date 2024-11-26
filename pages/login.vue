<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

import { Input } from "@/components/ui/input";
import type { IResponse } from "@/model/response";
import { $api } from "@/composable/api";

const authStore = useAuthStore();
const router = useRouter();

const isAdmin = ref(true);

const formSchema = toTypedSchema(
  z.object({
    email: z
      .string({ required_error: "Email is required" })
      .email({ message: "Invalid email" }),
    password: z.string(),
  })
);

const form = useForm({
  validationSchema: formSchema,
});

const onSubmit = form.handleSubmit(async (body) => {
  const res = await $api<IResponse>("/user/sign-in", {
    method: "POST",
    body,
  });
  if (res.status) {
    authStore.setToken(res.response);
    authStore.setIsAdmin(isAdmin.value);
    const userInfo = await $api<IResponse>("/user/info", {
      method: "GET",
      headers: {
        token: res.response,
      },
    });

    if (userInfo.status) {
      authStore.setUser(userInfo.response);
      router.push({ path: isAdmin.value ? "/" : "/mobile" });
    }
  }
});
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-950 to-blue-700 p-6"
  >
    <!-- Background Shapes -->
    <div class="absolute inset-0 overflow-hidden">
      <div
        v-for="n in 6"
        :key="n"
        class="absolute rounded-full bg-blue-400/20 backdrop-blur-3xl"
        :style="{
          width: `${Math.random() * 300 + 100}px`,
          height: `${Math.random() * 300 + 100}px`,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          transform: `translate(-50%, -50%) rotate(${Math.random() * 360}deg)`,
        }"
      ></div>
    </div>

    <!-- Login Card -->
    <div class="relative w-full max-w-md">
      <div class="bg-blue-600/30 backdrop-blur-xl rounded-3xl p-8 shadow-2xl">
        <!-- Logo -->
        <div class="mb-8 text-center item-center">
          <Logo />
          <h1 class="text-2xl font-bold text-white">BeLaundry</h1>
        </div>

        <!-- Login Form -->
        <form @submit="onSubmit" class="space-y-6">
          <div>
            <FormField v-slot="{ componentField }" name="email">
              <FormItem>
                <FormLabel class="text-white">Email</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter email"
                    v-bind="componentField"
                    class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>

          <div>
            <FormField v-slot="{ componentField }" name="password">
              <FormItem>
                <FormLabel class="text-white">Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter password"
                    v-bind="componentField"
                    class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <a
              href="#"
              class="block text-sm text-white/70 hover:text-white mt-2"
              >Forgot Password?</a
            >
          </div>
          <div class="text-white flex items-center space-x-2">
            <Switch
              id="is-admin"
              :checked="isAdmin"
              @update:checked="(e) => (isAdmin = e)"
            />
            <Label for="is-admin">{{
              `Log In as ${isAdmin ? "Admin" : "User"}`
            }}</Label>
          </div>

          <button
            type="submit"
            class="w-full py-3 px-4 bg-blue-700 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 font-medium"
          >
            Sign in
          </button>
        </form>

        <!-- Register Link -->
        <p class="mt-8 text-center text-sm text-white/70">
          Don't have an account?
          <a href="#" class="text-white hover:underline">Register for free</a>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.label-login {
  color: white;
}
.item-center {
  place-items: center;
}
</style>
