<template>
  <Header />
  <div>
    <router-view></router-view>
  </div>
  <Footer />
</template>

<script>
import Header from './components/HeaderComponent.vue'
import Footer from './components/FooterComponent.vue'
import { store } from './components/store.js'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  data() {
    return {
      store
    }
  }
}
</script>

<style>

</style>