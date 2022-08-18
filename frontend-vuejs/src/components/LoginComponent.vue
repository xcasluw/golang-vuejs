<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h1 class="mt-5">Login</h1>
        <hr>
        
        <FormTagComponent @myevent="submitHandler" name="myForm" event="myevent">
          <TextInputComponent
            v-model="email"
            label="Email"
            type="email"
            name="email"
            required="true">
          </TextInputComponent>

          <TextInputComponent
            v-model="password"
            label="Password"
            type="password"
            name="password"
            required="true">
          </TextInputComponent>
          <hr>
          <input type="submit" class="btn btn-primary" value="Login">
        </FormTagComponent>
      </div>
    </div>
  </div>
</template>

<script>
import FormTagComponent from './forms/FormTagComponent.vue'
import TextInputComponent from './forms/TextInputComponent.vue'

export default {
  name: 'LoginComponent',
  components: {
    FormTagComponent,
    TextInputComponent
  },
  data() {
    return {
      email: "",
      password: ""
    }
  },
  methods: {
    submitHandler() {
      const payload = {
        username: this.email,
        password: this.password
      }

      const requestOptions = {
        method: 'POST',
        body: JSON.stringify(payload)
      }

      fetch("http://localhost:8081/users/login", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            console.log("Error: ", data.message)
          } else {
            console.log(data)
          }
        })
    }
  }
}
</script>