<script setup lang="ts">
import DashboardHeader from "@/components/DashboardHeader.vue";

const menus = [
  {
    title: "Home",
    url: "/",
    icon: "house-01",
  },
  {
    title: "Products",
    url: "/products",
    icon: "folder-open",
  },
  {
    title: "Sales",
    url: "/sales",
    icon: "chart-line",
  },
  {
    title: "Settings",
    url: "/settings",
    icon: "settings",
  },
];
</script>

<template>
  <div>
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader
          class="flex flex-nowrap flex-row items-center justify-center gap-3"
        >
          <Logo />
          <span>BeLaundry</span>
        </SidebarHeader>
        <SidebarContent class="pt-5">
          <SidebarGroup class="gap-2">
            <SidebarGroupLabel>Menu</SidebarGroupLabel>
            <SidebarGroupContent class="px-8">
              <SidebarMenu class="gap-5">
                <NuxtLink
                  active-class="[&>li]:bg-white [&>li]:text-blue-active"
                  v-for="menu in menus"
                  :to="menu.url"
                  :key="menu.url"
                >
                  <SidebarMenuItem class="text-white p-5 rounded-xl">
                    <SidebarMenuButton class="text-[26px]">
                      <svg-icon class="!h-9 !w-9" :name="menu.icon" />
                      {{ menu.title }}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </NuxtLink>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <main class="w-full bg-blue-alice">
        <DashboardHeader />
        <div class="h-full pt-[117px] pb-5 px-6 md:px-8">
          <slot />
        </div>
      </main>
    </SidebarProvider>
  </div>
</template>
