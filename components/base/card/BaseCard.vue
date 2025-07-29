<template>
  <NuxtLink
    v-if="to"
    :to="to"
    class="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
  >
    <div>
      <span
        class="rounded-lg inline-flex p-3 bg-blue-50 text-blue-700 ring-4 ring-white"
      >
        <slot name="icon">
          <IconsUsers
            class="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            :aria-hidden="true"
          />
        </slot>
      </span>
    </div>
    <div class="mt-8">
      <h3 class="text-lg font-medium">
        <span class="absolute inset-0" aria-hidden="true"></span>
        {{ title }}
      </h3>
      <p class="mt-2 text-sm text-gray-500">
        {{ description }}
      </p>
    </div>
    <span
      class="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
      :aria-hidden="true"
    >
      <IconsArrowRight
        class="h-6 w-6"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
        :aria-hidden="true"
      />
    </span>
  </NuxtLink>

  <div
    v-else
    class="relative group bg-gray-50 p-6 rounded-lg border border-gray-200"
  >
    <div>
      <span
        class="rounded-lg inline-flex p-3 bg-gray-100 text-gray-600 ring-4 ring-white"
      >
        <slot name="icon">
          <IconsChartBar
            class="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            :aria-hidden="true"
          />
        </slot>
      </span>
    </div>
    <div class="mt-8">
      <h3 class="text-lg font-medium text-gray-900">
        {{ title }}
      </h3>
      <p class="mt-2 text-sm text-gray-500">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
  interface Props {
    title: string
    description: string
    to?: string
  }

  defineProps<Props>()
</script>
