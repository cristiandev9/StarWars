<style scoped>
  .box-table{
    box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px; 
    border-radius:8px;
  }
</style>

<template>
  <div class="box-table">
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Pesquisa"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="characters"
      :search="search"
      :loading="loading"
      :server-items-length="totalCharacters"
      :footer-props="footerProps"
      loading-text="Carregando..."
      @pagination="updatePagination"
    ></v-data-table>
  </div>
</template>

<script>
import api from "@/services/api";

export default {
  data() {
    return {
      search: null,
      headers: [
        {
          text: "Nome",
          value: "name",
        },
        {
          text: "Gênero",
          value: "gender",
        },
        {
          text: "Ano de nascimento",
          value: "birth_year",
        },
        {
          text: "Altura",
          value: "height",
        },
        {
          text: "Massa",
          value: "mass",
        },
        
        {
          text: "Cor da pele",
          value: "skin_color",
        },
        {
          text: "Cor dos olhos",
          value: "eye_color",
        },
      ],
      characters: [],
      totalCharacters: 0,
      loading: true,
      page: "",
      currentPage: 1,
      footerProps: {
        "items-per-page-options": [10],
        "disable-items-per-page": true,
      },
    };
  },
  methods: {
    updatePagination(pagination) {
      if (pagination) {
        this.currentPage = pagination.page;
        this.page = `?page=${this.currentPage}`;
      }
    },
    ReturnCharacters(filter = false) {
      this.loading = true;
      this.characters = [];
      api.get(`people/${this.page}`).then((response) => {
        this.totalCharacters = response.data.count;
        response.data.results.filter((item) => {
            if (filter && !item.name.toLowerCase().includes(this.search.toLowerCase())){
                return false;
            } 
            this.characters.push(item);
          
          this.loading = false;
        });
      });
    },
  },
  watch: {
    page() {
      this.ReturnCharacters(false);
    },
    search() {
      this.ReturnCharacters(this.search);
    },
  },
};
</script>