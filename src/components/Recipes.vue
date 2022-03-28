<template>
  <div class="row">
    <div class="col-4">
      <button type="button"
              data-bs-toggle="modal"
              data-bs-target="#modal-new-recipe"
              class="btn btn-outline-success m-2">
        Create New Recipe
      </button>
      <hr>
      <div class="list-group" id="list-tab" role="tablist">
        <a v-for="(recipe, index) in recipes" :key="recipe.id"
           class="list-group-item list-group-item-action" :class="{active: index === 0}"
           :id="'list-'+recipe.id+'-list'"
           data-bs-toggle="list"
           :href="'#list-'+recipe.id"
           role="tab"
           :aria-controls="'list-'+recipe.id"
           @click="setSelectedRecipe(recipe)"
        >
          {{ recipe.name }}
          <button class="btn btn-danger btn-sm float-end" @click="deleteRecipe(recipe.id)">Delete</button>
          <button class="btn btn-warning btn-sm float-end mx-1"
                  data-bs-toggle="modal"
                  data-bs-target="#modal-edit-recipe"
                  @click="setEditingRecipe(recipe)">
            Edit
          </button>
        </a>
      </div>
    </div>

    <div class="col-8">
      <div class="tab-content" id="nav-tabContent">
        <div v-for="(item, index) in recipes" :key="item.id"
             class="tab-pane fade show" :class="{active: index === 0}"
             :id="'list-'+item.id" role="tabpanel"
             :aria-labelledby="'list-'+item.id+'-list'">

          <RecipeIngredients :ref="(el)=>{ri_refs['ref-ri-'+item.id] = el}"
                             :recipe="item"/>
        </div>
      </div>
    </div>
  </div>

  <modal-new-recipe @get-recipes="getRecipes"/>
  <modal-edit-recipe @get-recipes="getRecipes" :ref="(el) => {this.recipe_ref = el}"/>
  <modal-add-recipe-ingredient @add-recipe-ingredients="addRecipeIngredients"
                               :recipe="this.selected_recipe"/>
</template>

<script>
import RecipeIngredients from "@/components/RecipeIngredients";
import ModalAddRecipeIngredient from "@/components/ModalAddRecipeIngredient";
import ModalNewRecipe from "@/components/ModalNewRecipe";
import ModalEditRecipe from "@/components/ModalEditRecipe";

export default {
  name: "recipes-comp",
  components: {
    RecipeIngredients, ModalAddRecipeIngredient, ModalNewRecipe, ModalEditRecipe
  },
  data() {
    return {
      ri_refs: {},
      recipe_ref: {},
      recipes: [],
      selected_recipe: {},
    }
  },
  methods: {
    setEditingRecipe(recipe) {
      this.recipe_ref.setEditingRecipe(recipe)
    },
    deleteRecipe(id) {
      if (confirm("Are you sure to delete the recipe?")) {
        console.log(id)
        try {
          fetch(`https://receipe-manager.herokuapp.com/recipes/recipe/${id}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
          })
              .then(response => response)
              .then(data => {
                console.log(data)
                this.getRecipes()
              });
        } catch (error) {
          console.log('error: ', error);
        }
      }
    },
    addRecipeIngredients(ingredient) {
      this.ri_refs['ref-ri-' + this.selected_recipe.id].addIngredient(ingredient)
    },
    setSelectedRecipe(obj) {
      this.selected_recipe = obj
    },
    getRecipes() {
      try {
        fetch('https://receipe-manager.herokuapp.com/recipes/recipes/')
            .then(response => response.json())
            .then(data => {
              this.recipes = data
              // initialize selected recipe
              this.setSelectedRecipe(data[0])
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