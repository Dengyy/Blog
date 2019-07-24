<template>
  <div>
    <router-link v-for="pathObj in paths" :key="pathObj.name" :to="pathObj.path" tag="li">{{pathObj.name}}</router-link><br>
  </div>
</template>

<script>
export default {
  name: 'RouteEntry',
  data () {
    return {
      paths: this.$router.options.routes.slice(1)
    }
  }
}
</script>

<style scoped>
</style>
