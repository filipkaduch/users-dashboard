<template>
  <div class="mb-8">
    <h1 class="text-3xl font-bold text-gray-900">{{ title }}</h1>
    <p v-if="description" class="mt-2 text-gray-600">{{ description }}</p>
    <div v-if="$slots.actions" class="mt-4">
      <slot name="actions" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  description?: string
}

defineProps<Props>()
</script> 