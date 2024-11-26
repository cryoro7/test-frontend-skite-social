import type { IUser } from "@/model/user";

export const useAuthStore = defineStore(
  "auth",
  () => {
    const token = ref("");
    const admin = ref(true);
    const user = ref<IUser>();
    const isAuthenticated = computed(() => Boolean(token.value));
    const isAdmin = computed(() => Boolean(admin.value));

    function setIsAdmin(value: boolean) {
      admin.value = value;
    }

    function setToken(newToken: string) {
      token.value = newToken;
    }

    function setUser(newUser: IUser) {
      user.value = newUser;
    }

    return {
      user,
      token,
      isAuthenticated,
      isAdmin,
      setIsAdmin,
      setUser,
      setToken,
    };
  },
  { persist: true }
);
