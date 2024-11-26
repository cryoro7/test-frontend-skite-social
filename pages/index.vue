<script setup lang="ts">
import { definePageMeta } from "#imports";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { $api } from "@/composable/api";
import type { IResponse } from "@/model/response";

definePageMeta({
  middleware: "auth",
  layout: "dashboard",
});

const authStore = useAuthStore();
const data = ref<any[]>([]);

const topSelling = [
  {
    name: "Item A",
    value: "$120.00",
  },
  {
    name: "Item B",
    value: "$80.00",
  },
  {
    name: "Item C",
    value: "$76.00",
  },
];

const getReports = async () => {
  const report = await $api<any[]>("/product/report", { method: "GET" });
  data.value = report.map((i) => ({
    created_at: i.created_at,
    total: i.total,
  }));
};

onMounted(() => {
  getReports();
});
</script>

<template>
  <div class="flex gap-9 flex-col">
    <Card>
      <CardHeader class="flex justify-between flex-row items-center gap-2">
        <CardTitle class="text-sm md:text-lg">Product Sold</CardTitle>
        <Select>
          <SelectTrigger class="w-[180px]">
            <SelectValue placeholder="Select filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="last-week"> Last Week </SelectItem>
              <SelectItem value="this-week"> This Week </SelectItem>
              <SelectItem value="last-month"> Last Month </SelectItem>
              <SelectItem value="this-month"> This Month </SelectItem>
              <SelectItem value="last-year"> Last Year </SelectItem>
              <SelectItem value="this-year"> This Year </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <BarChart
          :data="data"
          index="created_at"
          :show-grid-line="false"
          :show-legend="false"
          :show-x-axis="true"
          :categories="['total']"
          :colors="['#B2C5D4']"
          :rounded-corners="5"
          :y-formatter="
            (tick, i) => {
              return typeof tick === 'number'
                ? `$ ${new Intl.NumberFormat('us').format(tick).toString()}`
                : '';
            }
          "
        />
      </CardContent>
    </Card>
    <Card class="w-fit">
      <CardHeader class="flex flex-row gap-10 justify-center items-center">
        <CardTitle class="text-sm md:text-lg">Top selling product</CardTitle>
        <Select>
          <SelectTrigger class="w-[180px]">
            <SelectValue placeholder="Select filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="last-week"> Last Week </SelectItem>
              <SelectItem value="this-week"> This Week </SelectItem>
              <SelectItem value="last-month"> Last Month </SelectItem>
              <SelectItem value="this-month"> This Month </SelectItem>
              <SelectItem value="last-year"> Last Year </SelectItem>
              <SelectItem value="this-year"> This Year </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead class="w-full"> Name </TableHead>
              <TableHead>Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="item in topSelling" :key="item.name">
              <TableCell class="font-medium">
                {{ item.name }}
              </TableCell>
              <TableCell>{{ item.value }}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </div>
</template>

<style></style>
