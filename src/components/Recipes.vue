<template>
  <div class="d-flex align-items-start">
    <div class="nav flex-column nav-pills me-3 my-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
      <button v-for="(recipe, index) in recipes" :key="recipe.id"
              class="btn btn-outline-primary my-1" :class="{active: index === 0}"
              :id="'v-pills-'+recipe.id+'-tab'" @click="setSelectedRecipeId(recipe.id)"
              data-bs-toggle="pill" :data-bs-target="'#v-pills-'+recipe.id"
              type="button" role="tab" :aria-controls="'v-pills-'+recipe.id" aria-selected="true">
        {{ recipe.name }}
      </button>
    </div>
    <div class="tab-content" id="v-pills-tabContent">
      <div v-for="(item, index) in recipes" :key="item.id"
           class="tab-pane fade show " :class="{active: index === 0}" :id="'v-pills-'+item.id" role="tabpanel"
           :aria-labelledby="'v-pills-'+item.id+'-tab'">

        <RecipeIngredients :ref="(el)=>{ri_refs['ref-ri-'+item.id] = el}"
                           :recipe="item"/>
      </div>
    </div>
  </div>

  <modal-add-recipe-ingredient @update-recipe-ingredients="updateRecipeIngredients"
                               :recipe_id="this.selected_recipe_id"/>
</template>

<script>
import RecipeIngredients from "@/components/RecipeIngredients";
import ModalAddRecipeIngredient from "@/components/ModalAddRecipeIngredient";

export default {
  name: "recipes-comp",
  components: {
    RecipeIngredients, ModalAddRecipeIngredient
  },
  data() {
    return {
      ri_refs: {},
      recipes: [],
      selected_recipe_id: 0
    }
  },
  methods: {
    updateRecipeIngredients() {
      this.ri_refs['ref-ri-' + this.selected_recipe_id].getData()
    },
    setSelectedRecipeId(id) {
      this.selected_recipe_id = id
    },
    getRecipes() {
      try {
        fetch('http://127.0.0.1:8000/recipes/recipes/')
            .then(response => response.json())
            .then(data => {
              this.recipes = data
              this.setSelectedRecipeId(data[0].id)
            });
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.getRecipes();
  }
}
</script>

<style scoped>
</style>