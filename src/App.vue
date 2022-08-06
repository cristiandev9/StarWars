<style scoped>
  *{
    padding:0;
    margin:0;
    font-family: sans-serif;
  }
  
  main{
    width:85%;
  }

  .main{
    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
  }

  body{
    background: red;
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
