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

          Email: {{ email }}

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
import { store } from './store.js'
import router from './../router/index.js'
import notie from 'notie'

export default {
  name: 'LoginComponent',
  components: {
    FormTagComponent,
    TextInputComponent
  },
  data() {
    return {
      email: "",
      password: "",
      store
    }
  },
  methods: {
    submitHandler() {
      const payload = {
        email: this.email,
        password: this.password
      }

      const requestOptions = {
        method: 'POST',
        body: JSON.stringify(payload)
      }

      fetch(`${process.env.VUE_APP_API_URL}/users/login`, requestOptions)
        .then((response) => response.json())
        .then((response) => {
          if (response.error) {
            console.log("Error: ", response.message)
            notie.alert({
              type: 'error',
              text: response.message
            })
          } else {
            store.token = response.data.token.token

            store.user = {
              id: response.data.user.id,
              first_name: response.data.user.first_name,
              last_name: response.data.user.last_name,
              email: response.data.user.email
            }

            // save info to cookie
            let date = new Date() 
            let expDays = 1
            date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000))
            const expires = "expires=" + date.toUTCString()

            // set the cookie
            document.cookie = "_site_data="
            + JSON.stringify(response.data)
            + "; "
            + expires
            + "; path=/; SameSite=strict; Secure;"

            router.push("/")
          }
        })
    }
  }
}
</script>