<style scoped>
.main-box-content {
  width: 100%;
  margin: 2rem 0 2rem 0;
}

.box-content {
  color: rgba(255, 255, 255, 0.9) !important;
  background-color: rgba(255, 255, 255, 0.1);
  width: 80%;
  margin: 0 auto;
  min-height: 5rem;
  padding: 2rem;
  border-radius: 1rem;
}

.button-home {
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1) !important;
  text-transform: capitalize;
  font-family: sans-serif;
  font-size: 0.88rem !important;
}

.flex {
  display: flex;
  align-items: center;
}

.name-character {
  margin-left: 3rem;
  font-weight: 600;
  font-size: 20px;
}

.text-amber {
  color: #e29b2f;
}

.box-content-informations {
  display: flex;
  margin-top: 2rem;
}

.box-content-informations > .image-information > img {
  border-radius: 8px;
}

.others-informations {
  margin-left: 2rem;
  width: 100%;
  text-align: center;
}

.starship {
  background-color: rgba(255, 255, 255, 0.2);
  padding: 1.5rem;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  width: 100%;
  text-align: left;
}

.starship:nth-child(n + 3) {
  margin-top: 2rem;
}

.flex-center {
  display: flex;
  align-items: center;
}

.div-two-flex {
  margin-left: 6rem;
  width: 50%;
}

.div-one-flex {
  width: 50%;
}

.loading {
  margin-top: 5rem;
}

.messageNoStarshipFound {
  margin-top: 0.5rem;
}

@media (max-width: 1024px) {
  .box-content {
    width: 95%;
  }

  .v-btn:not(.v-btn--round).v-size--default {
    height: 1.5rem;
  }

  .name-character {
    font-size: 18px;
  }

  .image-information > img {
    width: 100%;
  }

  .box-content-informations {
    display: block;
  }

  .flex {
    justify-content: space-between;
  }

  .others-informations {
    margin-top: 2rem;
  }

  .others-informations {
    margin-left: 0;
  }

  .display-block-mobile {
    display: block;
  }

  .div-two-flex {
    margin-left: 0rem;
    width: 100%;
  }

  .div-one-flex {
    width: 100%;
  }
}
</style>

<template>
  <div class="main-box-content">
    <div class="box-content">
      <div class="flex">
        <v-btn class="button-home text-amber" :to="`/?page=${currentPage}`">
          Voltar
        </v-btn>
        <div class="name-character text-amber">{{ name }}</div>
      </div>
      <div class="box-content-informations">
        <div class="image-information">
          <img :src="avatar" alt="Image profile character." />
        </div>

        <div class="others-informations">
          <v-progress-circular
            class="loading"
            :size="50"
            color="amber"
            indeterminate
            v-show="loading"
          ></v-progress-circular>

          <div class="messageNoStarshipFound" v-if="messageNoStarshipFound">
            Nenhuma starship encontrada para {{ name }}
          </div>

          <div
            class="starship"
            v-for="(starship, index) in starships"
            :key="index"
          >
            <div class="text-amber">Starship - {{ starship.name }}</div>

            <div class="flex-center display-block-mobile">
              <div class="div-one-flex">Modelo: {{ starship.model }}</div>
              <div class="div-two-flex">
                Fabricante: {{ starship.manufacturer }}
              </div>
            </div>

            <div class="flex-center display-block-mobile">
              <div class="div-one-flex">
                Valor: {{ starship.cost_in_credits }}
              </div>
              <div class="div-two-flex">
                Velocidade máxima: {{ starship.max_atmosphering_speed }}
              </div>
            </div>

            <div class="flex-center display-block-mobile">
              <div class="div-one-flex">
                Equipe técnica: {{ starship.crew }}
              </div>
              <div class="div-two-flex">
                Passageiros: {{ starship.passengers }}
              </div>
            </div>

            <div class="flex-center display-block-mobile">
              <div class="div-one-flex">
                Carga máxima: {{ starship.cargo_capacity }}
              </div>
              <div class="div-two-flex">
                Consumíveis: {{ starship.consumables }}
              </div>
            </div>

            <div class="flex-center display-block-mobile">
              <div class="div-one-flex">
                Classificação do hiperdrive: {{ starship.hyperdrive_rating }}
              </div>
              <div class="div-two-flex">MGLT: {{ starship.MGLT }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/services/api";
import helppers from "@/helppers/helppers";

export default {
  props: ["id"],
  data() {
    return {
      name: null,
      url: null,
      starships: [],
      urlStarships: [],
      loading: true,
      messageNoStarshipFound: false,
      currentPage: 1,
    };
  },
  methods: {
    ReturnStarships() {
      if (this.urlStarships) {
        this.urlStarships.map((starshipUrl) => {
          api.get(starshipUrl).then((response) => {
            this.starships.push(response.data);
            this.loading = false;
          });
        });
      } else {
        this.messageNoStarshipFound = true;
        this.loading = false;
      }
    },
  },
  computed: {
    avatar() {
      return helppers.GetAvatar(this.url);
    },
  },
  mounted() {
    api.get(`people/${this.id}`).then((response) => {
      this.name = response.data.name;
      this.url = response.data.url;
      let searchCharacter = response.data.starships.filter((item) => {
        this.urlStarships.push(item);
        return true;
      });

      this.ReturnStarships();

      if (searchCharacter.length === 0) {
        this.messageNoStarshipFound = true;
        this.loading = false;
      }
    });

    this.currentPage = this.$route.query.page ? parseInt(this.$route.query.page) : 1;
  },
};
</script>
