<template>
  <IconsWrapper v-bind="$attrs">
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M4 6h16M4 12h16M4 18h16"
    />
  </IconsWrapper>
</template>

<script setup lang="ts">
  defineOptions({
    inheritAttrs: false,
  })
</script>
