<template>
  <div class="modal fade" tabindex="-1" aria-hidden="true"
       id="modal-new-ingredient" aria-labelledby="modal-lbl-new-ingredient">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modal-lbl-new-ingredient">New Ingredient</h5>
          <button id="btn-modal-ni-close" type="button" class="btn-close" data-bs-dismiss="modal"
                  aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3 row">
            <label for="name" class="col-sm-4 col-form-label">Name</label>
            <div class="col-sm-8">
              <input type="text" class="form-control" id="name" v-model="name">
            </div>
          </div>
          <div class="mb-3 row">
            <label for="article_number" class="col-sm-4 col-form-label">Article Number</label>
            <div class="col-sm-8">
              <input type="number" class="form-control" id="article_number" v-model="article_number">
            </div>
          </div>
          <div class="mb-3 row">
            <label for="amount" class="col-sm-4 col-form-label">Amount</label>
            <div class="col-sm-8">
              <input type="number" class="form-control" id="amount" v-model="amount">
            </div>
          </div>

          <div class="mb-3 row">
            <label for="unit" class="col-sm-4 col-form-label">Unit</label>
            <div class="col-sm-8">
              <select v-model="unit" id="unit" class="form-select">
                <option v-for="(u, i) in this.$units" :key="i" :value="u.id">{{ u.name }}</option>
              </select>
            </div>
          </div>

          <div class="mb-3 row">
            <label for="cost" class="col-sm-4 col-form-label">Cost</label>
            <div class="col-sm-8">
              <div class="input-group">
                <span class="input-group-text">€</span>
                <input type="number" class="form-control" id="cost" v-model="cost">
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
  name: "modal-new-ingredient",
  data() {
    return {
      name: '',
      article_number: 0,
      unit: {},
      amount: 0,
      cost: 0.00
    }
  },
  methods: {
    save() {
      try {
        let body = {
          name: this.name,
          article_number: this.article_number,
          unit: this.unit,
          amount: this.amount,
          cost: this.cost
        }
        fetch('http://127.0.0.1:8000/ingredients/', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(data => {
              console.log('Success:', data)
              this.$emit('get-ingredients')
              document.getElementById('btn-modal-ni-close').click()
            })
            .catch(err => {
              console.log('Error:', err)
            })
        this.name = ''
        this.article_number = ''
        this.unit = ''
        this.amount = 0
        this.cost = 0
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style scoped>

</style>