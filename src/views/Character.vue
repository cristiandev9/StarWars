<template>
  <CharacterDetails :id="id"> </CharacterDetails>
</template>

<script>
import CharacterDetails from "@/components/CharacterDetails";

export default {
  components: { CharacterDetails },
  name: "CharacterSw",
  computed : {
    id(){ 
      return this.$route.query.id;
    }
  },
};
</script>
