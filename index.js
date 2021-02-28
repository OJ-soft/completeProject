const redditimage = require("reddit.images")
const download = require('image-downloader')
const { TIMEOUT } = require("dns")
const { memeSubreddit } = require("reddit.images/config/config")

let temp1 = 10
let temp2 = 0
const array = new Array()

const options = {
  url: ' ',
  //insert path of folder for downloaded images to go to
  dest: '/Users/ANowak/Desktop/saved'
}

const rnd = async () => {
  AOIG: while (temp2 < temp1) {
    const result = await redditimage.fetch({
      type: "custom",
      total: temp1.valueOf(),
      subreddit: ["polandball"],
    })
    
    for (let i = 0; i < temp1; i++) {
      console.log(result[i].upvotes)

      if(result[i].upvotes > 500 && !array.includes(result[i].image)){
        options.url = result[i].image
  
      download.image(options)
        .then(({ filename }) => {
          console.log('Saved to', filename)
        })
        .catch((err) => console.error(err))

      temp2++

      array.push(options.url)
      
      if (temp2 === temp1) {
        break AOIG
      }
      }

    }

  } 
}

rnd() 