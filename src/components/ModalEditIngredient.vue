<template>
  <div class="modal fade" tabindex="-1" aria-hidden="true"
       id="modal-edit-ingredient" aria-labelledby="modal-lbl-edit-ingredient">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modal-lbl-edit-ingredient">Edit Ingredient</h5>
          <button id="btn-modal-ei-close" type="button" class="btn-close" data-bs-dismiss="modal"
                  aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3 row">
            <label for="name" class="col-sm-4 col-form-label">Name</label>
            <div class="col-sm-8">
              <input type="text" class="form-control" id="name" v-model="this.ingredient.name">
            </div>
          </div>
          <div class="mb-3 row">
            <label for="article_number" class="col-sm-4 col-form-label">Article Number</label>
            <div class="col-sm-8">
              <input type="number" class="form-control" id="article_number"
                     v-model="this.ingredient.article_number">
            </div>
          </div>
          <div class="mb-3 row">
            <label for="amount" class="col-sm-4 col-form-label">Amount</label>
            <div class="col-sm-8">
              <input type="number" class="form-control" id="amount" v-model="this.ingredient.amount">
            </div>
          </div>

          <div class="mb-3 row">
            <label for="unit" class="col-sm-4 col-form-label">Unit</label>
            <div class="col-sm-8">
              <select v-model="this.ingredient.unit" id="unit" class="form-select">
                <option v-for="(u, i) in this.$units" :key="i" :value="u.id">{{ u.name }}</option>
              </select>
            </div>
          </div>

          <div class="mb-3 row">
            <label for="cost" class="col-sm-4 col-form-label">Cost</label>
            <div class="col-sm-8">
              <div class="input-group">
                <span class="input-group-text">€</span>
                <input type="number" class="form-control" id="cost" v-model="this.ingredient.cost">
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="save">
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "modal-edit-ingredient",
  data() {
    return {
      ingredient: {}
    }
  },
  methods: {
    save() {
      try {
        fetch(`http://127.0.0.1:8000/ingredients/${this.ingredient.id}/`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.ingredient),
        })
            .then(response => response.json())
            .then(data => {

              this.$emit('get-ingredients')
              console.log('Success:', data)
              document.getElementById('btn-modal-ei-close').click()
              alert(`Ingredient updated!`)
            })
            .catch((error) => {
              console.error('Error:', error);
            });
      } catch (error) {
        console.log(error);
      }
    },
    setIngredient(data) {
      this.ingredient = {...data}
    }
  },
}
</script>

<style scoped>

</style>