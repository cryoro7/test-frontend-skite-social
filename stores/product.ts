export const useProductStore = defineStore(
  "product",
  () => {
    const products = ref<any[]>([]);

    const latestProduct = computed(() =>
      products.value.slice(products.value.length - 3, products.value.length - 1)
    );

    function setProduct(value: any[]) {
      products.value = value;
    }

    return {
      latestProduct,
      products,
      setProduct,
    };
  },
  { persist: true }
);
