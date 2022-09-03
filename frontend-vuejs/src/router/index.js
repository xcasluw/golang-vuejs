import { createRouter, createWebHistory } from 'vue-router'
import Body from './../components/BodyComponent.vue'
import Login from './../components/LoginComponent.vue'
import BooksComposition from './../components/BooksComposition.vue'
import BookComposition from './../components/BookComposition.vue'
import BooksAdmin from './../components/BooksAdminComponent.vue'
import BookEdit from './../components/BookEditComponent.vue'
import Users from './../components/UsersComponent.vue'
import User from './../components/UserEditComponent.vue'
import Security from '../components/security'

const routes = [
  { path: '/', name: 'Home', component: Body },
  { path: '/login', name: 'Login', component: Login },
  { path: '/books', name: 'BooksComposition', component: BooksComposition },
  { path: '/book/:bookName', name: 'BookComposition', component: BookComposition },
  { path: '/admin/books', name: 'BooksAdmin', component: BooksAdmin },
  { path: '/admin/books/:bookId', name: 'BookEdit', component: BookEdit },
  { path: '/admin/users', name: 'Users', component: Users },
  { path: '/admin/users/:userId', name: 'User', component: User }
]

const router = createRouter({ history: createWebHistory(), routes })
router.beforeEach(() => {
  Security.checkToken()
})
export default router
