<template>
  <IconsWrapper v-bind="$attrs">
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
    />
  </IconsWrapper>
</template>

<script setup lang="ts">
  defineOptions({
    inheritAttrs: false,
  })
</script>
