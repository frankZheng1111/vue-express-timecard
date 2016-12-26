<template lang="jade">
.panel.panel-default
  .panel-heading
    h1.text-center 已有时长

  .panel-body
    h1.text-center {{ time }}小时
</template>

<script>
export default {
  name: 'Sidebar',
  props: ['time']
}
</script>
