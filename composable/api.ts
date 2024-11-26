import { useToast } from "@/components/ui/toast";
import type { IResponse } from "@/model/response";

export function $api<T>(
  request: Parameters<typeof $fetch<T>>[0],
  opts?: Parameters<typeof $fetch<T>>[1]
) {
  const { token, isAuthenticated } = useAuthStore();
  const { toast } = useToast();

  const fetch = $fetch<T>(request, {
    baseURL: "https://belaundry-api.sebaris.link/platform",
    ...opts,
    headers: {
      token: isAuthenticated ? token : "",
      ...opts?.headers,
    },
  });

  fetch.then((res: any) => {
    if (!res.message) return;
    if (!res?.status) {
      toast({
        title: "Error",
        description: res.message,
        variant: "destructive",
      });
    }
  });

  return fetch;
}
