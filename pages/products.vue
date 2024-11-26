<script setup lang="ts">
import { definePageMeta } from "#imports";
import Label from "@/components/ui/label/Label.vue";
import { useToast } from "@/components/ui/toast";
import { $api } from "@/composable/api";
import type { IResponse } from "@/model/response";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as z from "zod";
import { categories } from "@/constants/constants";

definePageMeta({
  middleware: "auth",
  layout: "dashboard",
});

const formSchema = toTypedSchema(
  z.object({
    name: z.string(),
    description: z.string(),
    sku: z.string(),
    stock: z
      .number()
      .positive()
      .nullable()
      .transform((value) => value ?? NaN),
    category_id: z.number().nullable(),
    price: z
      .number()
      .positive()
      .nullable()
      .transform((value) => value ?? NaN),
    image: z.string().nullable(),
  })
);

const form = useForm({
  initialValues: {
    name: "",
    description: "",
    sku: "",
    stock: null,
    category_id: null,
    price: null,
    image: null,
  },
  validationSchema: formSchema,
});

const { toast } = useToast();

const selectCategory = (id: number) => {
  form.setFieldValue("category_id", id);
};

const onSubmit = form.handleSubmit(async (body) => {
  const res = await $api<IResponse>("/product", {
    method: "POST",
    body,
  });
  if (res.status) {
    form.handleReset();
    toast({
      title: "Success",
      description: res.message,
    });
  }
});
</script>

<template>
  <form @submit="onSubmit">
    <div class="flex flex-col md:flex-row w-full gap-9">
      <div class="flex-[3]">
        <h4 class="text-[40px] text-primary-dark font-bold mb-14">
          Add New Product
        </h4>
        <div class="flex flex-col gap-6">
          <FormField v-slot="{ componentField }" name="name">
            <FormItem>
              <FormLabel class="text-blue-active text-xl">
                Product Name
              </FormLabel>
              <FormControl
                class="border rounded-[10px] overflow-hidden h-14 border-blue-active"
              >
                <Input type="text" v-bind="componentField" class="h-14" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="description">
            <FormItem>
              <FormLabel class="text-blue-active text-xl">
                Description
              </FormLabel>
              <FormControl
                class="border rounded-[10px] overflow-hidden h-32 border-blue-active"
              >
                <Textarea v-bind="componentField" class="h-32 resize-none" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <div class="flex gap-10">
            <FormField v-slot="{ componentField }" name="sku">
              <FormItem>
                <FormLabel class="text-blue-active text-xl"> SKU </FormLabel>
                <FormControl
                  class="border rounded-[10px] overflow-hidden h-14 border-blue-active"
                >
                  <Input type="text" v-bind="componentField" class="h-14" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="stock">
              <FormItem>
                <FormLabel class="text-blue-active text-xl"> Stock </FormLabel>
                <FormControl
                  class="border rounded-[10px] overflow-hidden h-14 border-blue-active"
                >
                  <Input type="number" v-bind="componentField" class="h-14" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>
          <div>
            <Label class="text-blue-active text-xl">Categories</Label>
            <div class="flex gap-5 mt-2 flex-wrap">
              <Button
                size="lg"
                v-for="category in categories"
                :key="category.id"
                variant="secondary"
                type="button"
                @click="selectCategory(category.id)"
                :class="
                  form.values.category_id === category.id &&
                  'text-white bg-blue-active hover:bg-blue-active/80'
                "
              >
                {{ category.label }}
              </Button>
            </div>
          </div>
          <div class="flex items-end justify-between">
            <FormField v-slot="{ componentField }" name="price">
              <FormItem>
                <FormLabel class="text-blue-active text-xl">Price</FormLabel>
                <FormControl
                  class="border rounded-[10px] overflow-hidden h-14 border-blue-active"
                >
                  <Input type="number" v-bind="componentField" class="h-14" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <Button size="xl" class="hidden md:block" type="submit">
              Publish
            </Button>
          </div>
        </div>
      </div>
      <div class="flex-[1] flex justify-center">
        <div
          class="bg-white rounded-lg h-[270px] w-full md:w-[270px] flex justify-center items-center"
        >
          <FileUpload />
        </div>
      </div>
      <Button size="xl" class="block md:hidden" type="submit">Publish</Button>
    </div>
  </form>
</template>

<style></style>
