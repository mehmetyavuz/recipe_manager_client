<template>
  <div class="row">
    <button type="button" class="btn btn-outline-success mx-1 col-3 mx-2"
            data-bs-toggle="modal" data-bs-target="#modal-new-ingredient">
      Create Ingredient
    </button>
    <div class="col-5">
      <input type="text" v-model="search" id="" class="form-control"
             placeholder="search by name or article number..." @keyup="searchIngredients">
    </div>
  </div>
  <modal-new-ingredient @get-ingredients="getIngredients"/>
  <hr>
  <div class="row">
    <div v-for="ingredient in (search.length > 0 ? search_result : ingredients)" :key="ingredient.id"
         class="col-sm-3 card m-2">
      <div class="card-body">
        <h5 class="card-title">{{ ingredient.name }}</h5>
        <h6 class="card-subtitle mb-2 text-muted">Article number : {{ ingredient.article_number }}</h6>
        <p class="card-text">{{ ingredient.amount }} {{ this.getUnit(ingredient.unit) }} € {{ ingredient.cost }}</p>
        <a href="#" class="card-link" @click="this.setSelectedIngredient(ingredient)"
           data-bs-toggle="modal" data-bs-target="#modal-edit-ingredient">
          Edit
        </a>
        <a href="#" class="card-link" @click="deleteIngredient(ingredient)">Remove</a>
      </div>
    </div>
  </div>

  <modal-edit-ingredient @get-ingredients="getIngredients"
                         ref="modalEditIngredient"/>
</template>

<script>
import ModalNewIngredient from '@/components/ModalNewIngredient'
import ModalEditIngredient from '@/components/ModalEditIngredient'

export default {
  components: {
    ModalNewIngredient, ModalEditIngredient
  },
  name: "ingredients-comp",
  data() {
    return {
      ingredients: [],
      search: '',
      search_result: []
    }
  },
  methods: {
    searchIngredients() {
      this.search_result = isNaN(this.search)
          ? this.ingredients.filter(i => i.name.toLowerCase().includes(this.search.toLowerCase()))
          : this.ingredients.filter(i => i.article_number == this.search)
    },
    setSelectedIngredient(obj) {
      this.$refs.modalEditIngredient.setIngredient(obj)
    },
    getUnit(id) {
      return this.$units.find(u => u.id === id).name
    },
    getIngredients() {
      try {
        fetch('https://receipe-manager.herokuapp.com/ingredients/')
            .then(response => response.json())
            .then(data => {
              this.ingredients = data
              this.searchIngredients()
            });
      } catch (error) {
        console.log(error);
      }
    },
    saveIngredient(ingredient) {
      try {
        let body = {
          name: ingredient.name,
          article_number: ingredient.article_number,
          unit: ingredient.unit,
          amount: ingredient.amount,
          cost: ingredient.cost,
        };
        fetch(`https://receipe-manager.herokuapp.com/ingredients/${ingredient.id}/`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        })
            .then(response => response.json())
            .then(data => {

              this.getIngredients()
              console.log('Success:', data)
              alert(`${body.name} updated!`)
            })
            .catch((error) => {
              console.error('Error:', error);
            });
      } catch (error) {
        console.log(error);
      }
    },
    deleteIngredient(ingredient) {
      let confirmation = confirm("Do you want to delete this ingredient?");
      if (confirmation) {
        try {
          fetch(`https://receipe-manager.herokuapp.com/ingredients/${ingredient.id}`, {
            method: 'DELETE'
          }).then(() =>
              this.getIngredients()
          );
        } catch (error) {
          console.log(error)
        }
      }
    }
  },
  created() {
    this.getIngredients()
  }
}
</script>

<style scoped>

</style>