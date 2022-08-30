import { createRouter, createWebHistory } from 'vue-router'
import Body from './../components/BodyComponent.vue'
import Login from './../components/LoginComponent.vue'
import Books from './../components/BooksComponent.vue'
import Book from './../components/BookComponent.vue'
import BooksAdmin from './../components/BooksAdminComponent.vue'
import BookEdit from './../components/BookEditComponent.vue'
import Users from './../components/UsersComponent.vue'
import User from './../components/UserEditComponent.vue'
import Security from '../components/security'

const routes = [
  { path: '/', name: 'Home', component: Body },
  { path: '/login', name: 'Login', component: Login },
  { path: '/books', name: 'Books', component: Books },
  { path: '/book/:bookName', name: 'Book', component: Book },
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
