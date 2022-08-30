<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h1 class="mt-3">All Users</h1>
        <hr>

        <table v-if="this.ready" class="table table-compact table-striped">
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Active</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in this.users" v-bind:key="user.id">
              <td>
                <router-link :to="`/admin/users/${user.id}`">{{user.last_name}}, {{user.first_name}}</router-link>
              </td>
              <td>{{user.email}}</td>

              <td v-if="user.active === 1">
                <span class="badge bg-success">Active</span>
              </td>
              <td v-else>
                <span class="badge bg-danger">Inactive</span>
              </td>

              <td v-if="user.token.id > 0">
                <a href="javascript:void(0)">
                  <span class="badge bg-success" @click="logUserOut(user.id)">Logged in</span>
                </a>
              </td>
              <td v-else>
                <span class="badge bg-danger">Not logged in</span>
              </td>
            </tr>
          </tbody>
        </table>

        <p v-else>Loading...</p>
      </div>
    </div>
  </div>
</template>

<script>
import Security from './security.js'
import notie from 'notie'
import { store } from './store'

export default {
  data() {
    return {
      users: [],
      ready: false,
      store
    }
  },
  beforeMount() {
    Security.requireToken()
    fetch(`${process.env.VUE_APP_API_URL}/admin/users`, Security.requestOptions(''))
      .then(response => response.json())
      .then(response => {
        if (response.error) {
          notie.alert({
            type: 'error',
            text: response.message
          })
        } else {
          this.users = response.data.users
          this.ready = true
        }
      })
      .catch(error => {
        notie.alert({
          type: 'error',
          text: error
        })
      })
  },
  methods: {
    logUserOut(id) {
      if (id !== store.user.id) {
        notie.confirm({
          text: 'Are you sure you want to log this user out?',
          submitText: 'Log out',
          submitCallback:() => {
            fetch(`${process.env.VUE_APP_API_URL}/admin/log-user-out/${id}`, Security.requestOptions(''))
            .then((response) => response.json())
            .then((data) => {
              if (data.error) {
                notie.alert({
                  type: 'error',
                  text: data.message
                })
                this.$emit('error', data.message)
              } else {
                this.$emit('success', data.message)
                this.$emit('forceUpdate')
              }
            })
            .catch(error => {
              this.$emit('error', error)
            })
          }
        })
      } else {
        this.$emit('error', 'you can\'t log youserf out')
      }
    }
  }
}
</script>