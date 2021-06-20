<template>
  <div class="container mx-auto">
    <h1 class="text-2xl text-center mb-10">Cadastro de pessoas</h1>
    <register-form v-if="!isUpdating" @submit:new_entity="saveData" />
    <update-form
      v-if="isUpdating"
      :entity="entity"
      @submit:update_entity="updateData"
    />
    <index-table
      :entities="entities"
      v-if="entities.length > 0 && !isUpdating"
      @delete:entity="deleteEntity"
      @update:entity="showUpdateForm"
    />
  </div>
</template>

<script>
import RegisterForm from "./components/forms/RegisterForm.vue";
import IndexTable from "./components/IndexTable.vue";
import UpdateForm from "./components/forms/UpdateForm.vue";
import Entity from "./models/Entity";
import axios from "axios";


// MUDE PARA TRUE PARA USAR A INTEGRAÇÃO COM O LARAVEL
const useAPI = false;



const http = axios.create({
  baseURL: "http://127.0.0.1:8000/",
  withCredentials: false,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
});


export default {
  components: { RegisterForm, IndexTable, UpdateForm },

  data() {
    return {
      entities: [],
      entity: Entity,
      isUpdating: false,
    };
  },

  mounted() {
    if (useAPI) {
      http
        .get("/api/pessoas")
        .then((result) => {
          this.entities = result.data;
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
  },

  methods: {
    saveData(form) {
      console.log(form);
      if (useAPI) {
        return http
          .post("/api/pessoas", form)
          .then((result) => {
            this.entities = result.data;
          })
          .catch((error) => {
            console.log(error.response);
          });
      }

      this.entities.push(form);
    },

    updateData(entity) {
      if (useAPI) {
        return http
          .put(`/api/pessoas/${entity.id}`, entity)
          .then(result => {
            this.entities = result.data;
            this.isUpdating = false;
          })
          .catch(error => {
            console.log(error.response);
          })
      }
      this.entities[entity.index] = entity;
      this.isUpdating = false;
    },

    deleteEntity(entity) {
      if (useAPI) {
        return http
          .delete(`/api/pessoas/${entity.id}`, entity)
          .then(result => {
            this.entities = result.data;
          })
          .catch(error => {
            console.log(error.response);
          })
      }
      this.entities = this.entities.filter((entity) => entity !== entity);
    },

    showUpdateForm(index) {
      this.entity = this.entities[index];
      this.entity.index = index;
      this.isUpdating = true;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
