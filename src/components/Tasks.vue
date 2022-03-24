<template>
  <div class="tasks_container">
    <div class="add_task">
      <form v-on:submit.prevent="submitForm">
        <div class="form-group">
          <label for="title">Title</label>
          <input type="text" class="form-control" id="title" v-model="title">
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <textarea class="form-control" id="description" v-model="description"></textarea>
        </div>
        <div class="form-group">
          <button type="submit">Add Task</button>
        </div>
      </form>
    </div>

    <div class="tasks_content">
      <h1>Tasks</h1>
      <ul class="tasks_list">
        <li v-for="task in tasks" :key="task.id">
          <h2>{{ task.title }}</h2>
          <p>{{ task.description }}</p>
          <button @click="toggleTask(task)">
            {{ task.completed ? 'Undo' : 'Complete' }}
          </button>
          <button @click="deleteTask(task)">Delete</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'task-component',
  data() {
    return {
      tasks: [],
      title: '',
      description: ''
    }
  },
  methods: {
    getData() {
      try {
        fetch('http://127.0.0.1:8000/api/tasks/')
            .then(response => response.json())
            .then(data => this.tasks = data);
      } catch (error) {
        console.log(error);
      }
    },
    submitForm() {
      try {
        let body = {
          title: this.title,
          description: this.description,
          completed: false
        };
        fetch('http://localhost:8000/api/tasks/', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(data => {
              this.tasks.push(data);
              console.log('Success:', data);
            })
            .catch(err => {
              console.log('Error:', err);
            });
        this.title = '';
        this.description = '';
      } catch (error) {
        console.log(error);
      }
    },
    toggleTask(task) {
      try {
        let body = {
          completed: !task.completed,
          title: task.title,
          description: task.description
        };
        fetch(`http://localhost:8000/api/tasks/${task.id}/`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        })
            .then(response => response.json())
            .then(data => {

              let taskIndex = this.tasks.findIndex(t => t.id === task.id);
              this.tasks = this.tasks.map((task) => {
                if (this.tasks.findIndex(t => t.id === task.id) === taskIndex) {
                  return data;
                }
                return task;
              });
              console.log('Success:', data);
            })
            .catch((error) => {
              console.error('Error:', error);
            });
      } catch (error) {
        console.log(error);
      }
    },
    deleteTask(task) {
      let confirmation = confirm("Do you want to delete this task?");
      if (confirmation) {
        try {
          fetch(`http://localhost:8000/api/tasks/${task.id}`, {
            method: 'DELETE'
          }).then(() => this.getData());
        } catch (error) {
          console.log(error)
        }
      }
    }
  },
  created() {
    this.getData();
  }
}
</script>