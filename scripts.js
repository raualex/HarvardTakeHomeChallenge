Vue.component('art-image', {
  props: ['image'],
  template: `<img src={image.baseimageurl} alt='Image from the Harvard Art Museum' />`
})

var app = new Vue({
  el: '#app',
  data: {
    imageUrls: null
  },
  mounted: function() {
    let finalPics = []
    fetch('https://api.harvardartmuseums.org/image?apikey=5c4be6d0-12cb-11e9-90d1-473127181d8c&page=2')
      .then(response => response.json())
      .then(data => data.records.forEach((pic) => {
        finalPics.push( { fileid: pic.fileid, baseimageurl: pic.baseimageurl } )
      }))
      console.log(finalPics)
    this.imageUrls = finalPics
  }
});