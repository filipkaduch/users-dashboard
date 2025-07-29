<template>
  <svg
    :class="iconClasses"
    :width="size"
    :height="size"
    :viewBox="viewBox"
    :fill="fill"
    :stroke="stroke"
    :stroke-width="strokeWidth"
    :aria-hidden="ariaHidden"
    :role="role"
    xmlns="http://www.w3.org/2000/svg"
  >
    <slot />
  </svg>
</template>

<script setup lang="ts">
interface Props {
  size?: string | number
  viewBox?: string
  fill?: string
  stroke?: string
  strokeWidth?: string | number
  ariaHidden?: boolean
  role?: string
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  ariaHidden: true,
  role: 'img'
})

const iconClasses = computed(() => {
  const baseClasses = 'inline-block'
  
  return props.class ? `${baseClasses} ${props.class}` : baseClasses
})
</script> 