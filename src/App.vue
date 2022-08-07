<style scoped>
  *{
    padding:0;
    margin:0;
    font-family: sans-serif;
    background-image: url('https://images8.alphacoders.com/102/thumbbig-1020793.webp') !important;
  }
  
  main{
    width:95%;
  }

  .main{
    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    
    
  }
  .logo{
    margin:1rem 0 -1.5rem 0;
  }

   
</style>

<template>
  <v-app>
    <div class="main">
      <img class="logo" src="./assets/logo.png" width="125px" height="125px" alt="Star Wars">

      <v-main>
        <router-view/>
      </v-main>
    </div>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
  }),
};
</script>
