<style>
.main-list-characters {
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  flex-direction: column;
  margin-bottom: 2rem;
}

.item-card-character {
  margin: 0 1rem 0 1rem;
}

.loading {
  margin: 0 auto;
  margin-top:10rem;
}
.pagination {
  margin: 2rem 0 1rem 0;
}

.cards-characters {
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
}

.theme--light.v-pagination .v-pagination__item,
.v-pagination__navigation {
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
}

.text-field-custom{
  margin: 0 5.5rem 0 5.5rem; 
  width: 88.5%;
}
</style>

<template>
  <div class="main-list-characters">

    <v-text-field
        class="text-field-custom"
        v-model="search"
        append-icon="mdi-magnify"
        label="Pesquisar"
        single-line
        hide-details
      ></v-text-field>

    
    <v-progress-circular
      class="loading"
      :size="50"
      color="amber"
      indeterminate
      v-show="loading"
    ></v-progress-circular>


    <div class="cards-characters">
      <div
        class="item-card-character"
        v-for="(character, index) in characters"
        :key="index"
      >
        <CardCharacter
          :name="character.name"
          :avatar="avatar(index)"
        ></CardCharacter>
      </div>
    </div>

    <div class="pagination text-center" v-show="!loading">
      <v-pagination
        v-model="currentPage"
        :length="totalPages"
        circle
        color="#F5D530"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
import CardCharacter from "./CardCharacter.vue";
import api from "@/services/api";

export default {
  components: { CardCharacter },
  data() {
    return {
      search: null,
      characters: [],
      totalCharacters: 0,
      loading: true,
      page: "",
      currentPage: 1,
      totalPages: null,
      charactersPerPage: 10,
    };
  },
  methods: {
    ReturnCharacters() {
      this.loading = true;
      api.get(`people/${this.page}`).then((response) => {
        this.totalCharacters = response.data.count;
        this.totalPages = Math.ceil(
          this.totalCharacters / this.charactersPerPage
        );
        let pers = response.data.results.filter((item) => {
          console.log(this.search)
          if (this.search){
            if (item.name.toLowerCase().includes(this.search.toLowerCase())){
              return true;
            } 
          } else {
            return true;
          }
        });

        this.characters = [...pers];
        this.loading = false;
      });
    },
    avatar(index) {

      let itemAvatar;
      if (index + ((this.currentPage - 1) * this.charactersPerPage+1) >= 17){
        itemAvatar = (index + ((this.currentPage - 1) * this.charactersPerPage+1)) + 1;
      } else if (index + ((this.currentPage - 1) * this.charactersPerPage+1) >= 11){
        itemAvatar = (index + ((this.currentPage - 1) * this.charactersPerPage+1));
      } else {
        itemAvatar = index + 1;
      }
     
      return `https://starwars-visualguide.com/assets/img/characters/${itemAvatar}.jpg`;
    },
  },

  mounted() {
    this.ReturnCharacters();
  },
  watch: {
    currentPage() {
      this.page = `?page=${this.currentPage}`;
    },
    page() {
      this.ReturnCharacters();
    },
    search() {
      this.ReturnCharacters();
    },
  },
};
</script>