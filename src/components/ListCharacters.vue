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
  margin: 0 1.57rem 0 1.57rem;
}

.loading {
  margin: 0 auto;
  margin-top: 10rem;
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

.v-pagination__navigation {
  background-color: rgba(255, 255, 255, 0.1) !important;
}

.v-pagination__navigation > i {
  color: #ffc107 !important;
}

.text-field-custom {
  margin: 0 5.5rem 0 5.5rem;
  width: 96%;
}

.v-card__subtitle,
.v-card__text,
.v-card__title {
  padding: 12px 16px 4px 16px;
}

.v-btn__content {
  font-size: 11px !important;
}

.v-pagination__item {
  color: rgba(255, 255, 255, 0.9) !important;
  background-color: rgba(255, 255, 255, 0.1) !important;
}

.theme--light.v-text-field > .v-input__control > .v-input__slot:before {
  color: #ffc107 !important;
}

.v-pagination__item--active {
  color: rgba(0, 0, 0, 0.85) !important;
}

.text-results{
  color:#fff;
  margin-bottom:1rem;
  font-size:14px;
}

@media (max-width: 1024px) {
  body {
    overflow-x: hidden !important;
  }
  .cards-characters {
    display: block;
  }

  .theme--light.v-pagination .v-pagination__item,
  .v-pagination__navigation {
    min-width: 1.5rem !important;
    width: 1.5rem !important;
    height: 1.5rem !important;
    font-size: 0.75rem;
  }

  .v-pagination__navigation {
    margin: 0.2rem;
  }
}
</style>

<template>
  <div class="main-list-characters">
    <v-text-field
      class="text-field-custom"
      v-model="search"
      append-icon="mdi-magnify"
      label="Pesquisar"
      color="amber"
      single-line
      hide-details
      autofocus
      dark
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
        v-for="character in characters"
        :key="character.name"
      >
        <CardCharacter
          :name="character.name"
          :url="character.url"
          :avatar="avatar(character.url)"
          :gender="character.gender"
          :birth_year="character.birth_year"
          :eye_color="character.eye_color"
          :hair_color="character.hair_color"
          :mass="character.mass"
          :skin_color="character.skin_color"
          :home_world="character.homeworld"
          :height="character.height"
          :page="currentPage"
        ></CardCharacter>
      </div>
    </div>

    <div class="pagination text-center" v-show="!loading" v-if="characters.length">
      <div class="text-results" v-if=" characters.length > 1">Foram encontrados {{search  ? characters.length : totalCharacters}} resultados</div>
      <div class="text-results" v-else>Foi encontrado 1 resultado</div>
      <v-pagination
        v-model="currentPage"
        :length="search  ? 1 : totalPages"
        circle
        color="amber darken-2"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
import CardCharacter from "./CardCharacter.vue";
import api from "@/services/api";
import helppers from "@/helppers/helppers";

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
          if (this.search) {
            if (item.name.toLowerCase().includes(this.search.toLowerCase())) {
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
  
    avatar(url) {
      return helppers.GetAvatar(url);
    },
  },

  watch: {
    currentPage() {
      this.page = `?page=${this.currentPage}`;
      history.pushState({}, null, `?page=${this.currentPage}`);
      helppers.ScrollToTop();
      
    },
    page() {
      this.ReturnCharacters();
    },
    search() {
      this.ReturnCharacters();
    },
  },
  mounted() {
    this.currentPage = parseInt(window.location.search.split("=")[1]);
    this.page = `?page=${this.currentPage}`;
    this.ReturnCharacters();
  },
};
</script>