<template>
  <Header />
  <Body />
  <Footer />
</template>

<script>
import Header from './components/HeaderComponent.vue'
import Body from './components/BodyComponent.vue'
import Footer from './components/FooterComponent.vue'

export default {
  name: 'App',
  components: {
    Header,
    Body,
    Footer
  }
}
</script>

<style>

</style>