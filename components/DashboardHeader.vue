<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const router = useRouter();
const { user, setToken, setUser } = useAuthStore();

const handleLogout = () => {
  setToken("");
  setUser({});
  router.push({ path: "/login" });
};
</script>

<template>
  <div
    class="h-[68px] md:h-[97px] bg-white flex justify-between items-center px-4 absolute w-full md:w-[calc(100%-20rem)] top-0"
  >
    <h2 v-if="$route.path === '/'" class="hidden md:block text-4xl font-bold">
      Home
    </h2>
    <SidebarTrigger class="w-auto h-auto">
      <Logo
        class="[&>div:first-child]:w-8 [&>div:first-child]:h-8 [&>div:last-child]:w-3 [&>div:last-child]:h-3 md:hidden"
      />
    </SidebarTrigger>
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div class="flex items-center gap-2">
          <svg-icon name="user-01" class="w-9 h-9" />
          <span class="underline text-blue-dodger md:text-2xl">{{
            user?.name
          }}</span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem @click="handleLogout">Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>

<style></style>
