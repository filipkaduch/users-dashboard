<template>
  <IconsWrapper v-bind="$attrs">
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M6 18L18 6M6 6l12 12"
    />
  </IconsWrapper>
</template>

<script setup lang="ts">
  defineOptions({
    inheritAttrs: false,
  })
</script>
