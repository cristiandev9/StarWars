<style scoped>
.card-custom {
  margin-top: 3rem;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px !important;
  max-width:15rem;
}
</style>

<template>
  <v-card class="mx-auto card-custom">
    <v-img :src="avatar"></v-img>

    <v-card-title>{{ name }}</v-card-title>

    <!-- <v-card-subtitle> 1,000 miles of wonder </v-card-subtitle> -->

    <v-card-actions>
      <v-btn color="black lighten-1" text> detalhes </v-btn>

      <v-spacer></v-spacer>

      <v-btn icon @click="show = !show">
        <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          I'm a thing. But, like most politicians, he promised more than he
          could deliver. You won't have time for sleeping, soldier, not with all
          the bed making you'll be doing. Then we'll go with that data file!
          Hey, you add a one and two zeros to that or we walk! You're going to
          do his laundry? I've got to find a way to escape.
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
// import apiGoogleImages from "@/services/apiGoogleImages";

export default {
  name: "CardCharacter",
  props: ["name", "avatar"],
  data: () => ({
    show: false
  })
};
</script>