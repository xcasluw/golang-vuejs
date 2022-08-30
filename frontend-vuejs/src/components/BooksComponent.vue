<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h1 class="mt-3">Books</h1>
      </div>

      <hr>

      <div class="filters text-center">
        <span class="filter me-1" v-bind:class="{ active: currentFilter === 0 }" v-on:click="setFilter(0)">ALL</span>
        <span class="filter me-1" v-bind:class="{ active: currentFilter === 7 }" v-on:click="setFilter(7)">CLASSIC</span>
        <span class="filter me-1" v-bind:class="{ active: currentFilter === 2 }" v-on:click="setFilter(2)">FANTASY</span>
        <span class="filter me-1" v-bind:class="{ active: currentFilter === 6 }" v-on:click="setFilter(6)">HORROR</span>
        <span class="filter me-1" v-bind:class="{ active: currentFilter === 4 }" v-on:click="setFilter(4)">THRILLER</span>
        <span class="filter me-1" v-bind:class="{ active: currentFilter === 1 }" v-on:click="setFilter(1)">SCIENCE FICTION</span>
      </div>

      <hr>

      <div>
        <div class="card-group">
          <div class="p-3 d-flex flex-wrap">
            <div v-for="book in this.books" :key="book.id">

              <br>  

              <div class="card me-2 ms-1 mb-3" style="width: 10rem;" v-if="book.genres.find(item => item.id === currentFilter) || currentFilter === 0">
                <img :src="`${this.imgPath}/covers/${book.slug}.jpg`" class="card-img-top" :alt="`cover for ${book.title}`">
                
                <div class="card-body text-center">
                  <h6 class="card-title">{{book.title}}</h6>
                  <span class="book-author">{{book.author.author_name}}</span><br>
                  <small class="text-muted book-genre" v-for="(genre, index) in book.genres" v-bind:key="genre.id">
                    <em class="me-1">{{genre.genre_name}}
                      <template v-if="index !== (book.genres.length -1)">,</template>
                    </em>
                  </small>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { store } from '@/components/store'

export default {
  data() {
    return {
      store,
      ready: false,
      imgPath: process.env.VUE_APP_IMAGE_URL,
      books: {},
      currentFilter: 0
    }
  },
  emits: ['error'],
  beforeMount() {
    fetch(`${process.env.VUE_APP_API_URL}/books`)
      .then((response) => response.json())
      .then((data) => {
        if (this.error) {
          this.$emit('error', data.message)
        } else {
          this.books = data.data.books
          this.ready = true
        }
      })
      .catch((error) => {
        this.$emit('error', error)
      })
  },
  methods: {
    setFilter: function(filter) {
      this.currentFilter = filter
    }
  }
}
</script>

<style scoped>
.filters {
    height: 2.5em;
}

.filter {
    padding: 6px 6px;
    cursor: pointer;
    border-radius: 6px;
    transition: all 0.35s;
    border: 1px solid silver;
}

.filter.active {
    background: lightgreen;
}

.filter:hover {
    background: lightgray;
}


.book-author, .book-genre {
    font-size: 0.8em;
}
</style>