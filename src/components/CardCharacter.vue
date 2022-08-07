<style scoped>
.card-custom {
  margin-top: 3rem;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px !important;
  border-radius: 12px;
}

.theme--light.v-card,
.v-card__actions > .v-btn.v-btn {
  color: rgba(255, 255, 255, 0.9) !important;
  background-color: rgba(255, 255, 255, 0.1);
}

.v-card__actions {
  padding: 0.4rem 1rem 1rem 1rem;
}

.text-name {
  font-size: 17px;
}

.details {
  padding: 0 0 0.6rem 0.1rem;
}

.subtitle-card-name {
  color: rgba(255, 255, 255, 0.85) !important;
  margin-top: 0rem !important;
}

.img {
  transition: all 500ms cubic-bezier(0.19, 1, 0.22, 1);
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}

.img:hover {
  transform: scale(0.97);
  box-shadow: 0 0 5px -2px rgba(0, 0, 0, 0.3);
  background-size: 155%;
  transition: all 500ms cubic-bezier(0.19, 1, 0.22, 1);
}
</style>

<template>
  <v-card class="mx-auto card-custom" max-width="250">
    <a :href="pageCharacter">
      <v-img
        class="img"
        :src="avatar"
        height="300px"
        style="opacity: 0.85"
      ></v-img>
    </a>

    <v-card-title class="amber--text text-name">{{ name }}</v-card-title>

    <v-card-subtitle
      class="subtitle-card-name"
      v-html="world"
    ></v-card-subtitle>

    <v-card-actions>
      <v-btn color="black lighten-1" text :to="pageCharacter"> detalhes </v-btn>

      <v-spacer></v-spacer>

      <v-btn icon @click="show = !show">
        <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          <div class="details">
            <div>Gênero: {{ gender }}</div>
            <div>Nascimento: {{ birth_year }}</div>
            <div>Peso: {{ mass }} &nbsp;&nbsp;&nbsp; Altura: {{ height }}</div>
            <div>Cor dos olhos: {{ eye_color }}</div>
            <div>Cor do cabelo: {{ hair_color }}</div>
          </div>
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
import api from "@/services/api";
import helppers from "@/helppers/helppers";

export default {
  name: "CardCharacter",
  props: [
    "url",
    "name",
    "avatar",
    "gender",
    "birth_year",
    "mass",
    "height",
    "eye_color",
    "hair_color",
    "home_world",
    "page"
  ],
  data: () => ({
    show: false,
    world: "&nbsp;",
  }),
  computed: {
    pageCharacter() {
      return `/character?id=${helppers.GetId(this.url)}&page=${this.page}`;
    },
  },
  mounted() {
    api.get(`planets/${helppers.GetId(this.home_world)}`).then((response) => {
      this.world = response.data.name;
    });
  },
};
</script>