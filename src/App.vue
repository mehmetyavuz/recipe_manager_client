<template>
  <div class="container my-5">
<!--    <h3 class="display-3">Recipe Management</h3>-->
    <div class="d-flex align-items-start">
      <div class="nav flex-column nav-pills me-3" id="v-tab" role="tablist" aria-orientation="vertical">
        <button class="btn btn-outline-primary my-1 active" id="v-ingredient-tab" data-bs-toggle="pill" data-bs-target="#v-ingredient"
                type="button" role="tab" aria-controls="v-ingredient" aria-selected="true">Ingredients
        </button>
        <button class="btn btn-outline-primary my-1" id="v-recipe-tab" data-bs-toggle="pill" data-bs-target="#v-recipe"
                type="button" role="tab" aria-controls="v-recipe" aria-selected="false">Recipes
        </button>
      </div>
      <div class="tab-content" id="v-tabContent">
        <div class="tab-pane fade show active" id="v-ingredient" role="tabpanel" aria-labelledby="v-ingredient-tab">
          <Ingredients />
        </div>
        <div class="tab-pane fade" id="v-recipe" role="tabpanel" aria-labelledby="v-profile-tab">
          <Recipes />
        </div>
      </div>
    </div>

    <!--    <ul class="nav nav-tabs justify-content-center" id="myTab" role="tablist">-->
    <!--      <li class="nav-item" role="presentation">-->
    <!--        <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button"-->
    <!--                role="tab"-->
    <!--                aria-controls="home" aria-selected="true">Ingredients-->
    <!--        </button>-->
    <!--      </li>-->
    <!--      <li class="nav-item" role="presentation">-->
    <!--        <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button"-->
    <!--                role="tab"-->
    <!--                aria-controls="profile" aria-selected="false">Recipes-->
    <!--        </button>-->
    <!--      </li>-->
    <!--    </ul>-->
    <!--    <div class="tab-content" id="myTabContent">-->
    <!--      <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">-->
    <!--        <div class="container">-->
    <!--          <Ingredients/>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--      <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">-->
    <!--        <div class="container">-->
    <!--          <Recipes/>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </div>-->
  </div>
</template>

<script>
import Ingredients from '@/components/Ingredients'
import Recipes from '@/components/Recipes'

export default {
  name: 'App',
  components: {
    Ingredients, Recipes
  }
}
</script>

<style>
</style>