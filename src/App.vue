<template>
  <v-app>
    <v-main>
      <WelcomePage/>
    </v-main>
  </v-app>
</template>

<script>
import WelcomePage from './components/WelcomePage.vue'

export default {
  name: 'App',

  components: {
    WelcomePage,
  },

  data: () => ({
    //
  }),
}
</script>
