<template>
  <div class="modal fade" tabindex="-1" aria-hidden="true"
       id="modal-edit-recipe" aria-labelledby="modal-lbl-edit-recipe">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modal-lbl-edit-recipe">Edit Recipe</h5>
          <button id="btn-modal-er-close" type="button" class="btn-close" data-bs-dismiss="modal"
                  aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3 row">
            <label for="name" class="col-sm-4 col-form-label">Name</label>
            <div class="col-sm-8">
              <input type="text" class="form-control" id="name" v-model="editing_recipe.name">
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
  name: "modal-edit-recipe",
  data() {
    return {
      editing_recipe: {}
    }
  },
  methods: {
    setEditingRecipe(recipe) {
      this.editing_recipe = {...recipe}
    },
    save() {
      try {
        fetch(`${this.$rootUrl}/recipes/recipes/`, {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(this.editing_recipe)
        })
            .then(res => res.json())
            .then(data => {
              console.log('Success:', data)
              this.$emit('get-recipes')
              document.getElementById('btn-modal-er-close').click()
            })
            .catch(err => {
              console.log('Error:', err)
            });
        this.name = ''
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style scoped>

</style>