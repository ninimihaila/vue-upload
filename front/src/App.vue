<template>
  <div id="app">
    <Upload />
  </div>
</template>

<script>
import 'bulma/css/bulma.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import Upload from './components/Upload.vue'

export default {
  name: 'app',
  components: {
    Upload
  }
}
</script>

<style>
</style>
