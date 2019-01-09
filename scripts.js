Vue.component('art-image', {
  props: { image: Object },
  template: `<div class='image-frame'><img :src='image.baseimageurl' alt='Image from the Harvard Art Museum' class='art-image' /></div>`
})

Vue.component('main-title', {
  template: `<div class='header-box'><h1 class='main-title'>Explore the Harvard / Museum of Art</h1></div>`
})

var app = new Vue({
  el: '#app',
  data: {
      page: 1,
      imageUrls: null
  },
  methods: {
    increasePage: function() {
      if (this.page >= 1) {
        this.page = this.page += 1
      } else {
        return
      }
    },
    reducePage: function() {
      if (this.page > 1) {
        this.page = this.page -= 1
      } else {
        return
      }
    }
  },
  mounted: function() {
    let finalPics = []
    fetch(`https://api.harvardartmuseums.org/image?apikey=${key}&page=${this.page}&q=height:800`)
      .then(response => response.json())
      .then(data => data.records.forEach((pic) => {
        finalPics.push( { fileid: pic.fileid, baseimageurl: pic.baseimageurl } )
      }))
      console.log(finalPics)
    this.imageUrls = finalPics
  },
  watch: {
    page: function (num) {
      let finalPics = []
      fetch(`https://api.harvardartmuseums.org/image?apikey=${key}&page=${num}&q=height:800`)
        .then(response => response.json())
        .then(data => data.records.forEach((pic) => {
          finalPics.push( { fileid: pic.fileid, baseimageurl: pic.baseimageurl } )
        }))
      console.log(finalPics)
    this.imageUrls = finalPics
    }
  }
});