Vue.component('art-image', {
  template: `<img src={image.baseimageurl} alt='Image from the Harvard Art Museum' class='art-image' />`
})

Vue.component('main-title', {
  template: `<h1>Harvard Museum of Art</h1>`
})

var app = new Vue({
  el: '#app',
  data: {
      page: 1,
      imageUrls: null
  },
  methods: {
    changePage: function() {
      if (this.page >= 1) {
        this.page = this.page += 1
      } else {
        return
      }
    }
  },
  mounted: function() {
    let finalPics = []
    fetch(`https://api.harvardartmuseums.org/image?apikey=5c4be6d0-12cb-11e9-90d1-473127181d8c&page=${this.page}&q=height:800`)
      .then(response => response.json())
      .then(data => data.records.forEach((pic) => {
        finalPics.push( { fileid: pic.fileid, baseimageurl: pic.baseimageurl } )
      }))
      console.log(finalPics)
    this.imageUrls = finalPics
  },
  watch: {
    page: function (num) {
      console.log(num)
      let finalPics = []
      fetch(`https://api.harvardartmuseums.org/image?apikey=5c4be6d0-12cb-11e9-90d1-473127181d8c&page=${num}&q=height:800`)
        .then(response => response.json())
        .then(data => data.records.forEach((pic) => {
          finalPics.push( { fileid: pic.fileid, baseimageurl: pic.baseimageurl } )
        }))
      console.log(finalPics)
    this.imageUrls = finalPics
    }
  }
});