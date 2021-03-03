const redditimage = require("reddit.images")
const download = require('image-downloader')
const prompt = require('prompt-sync')()
const { memeSubreddit } = require("reddit.images/config/config");
const tables = require('./tables.js')

let temp2 = 0
const array = new Array()

let subredditPicked = prompt("What subreddit:")
if(subredditPicked === 'sSubreddits'){
  subredditPicked = tables.sSubreddits
}
let amountPicked = parseInt(prompt("How many posts(max50):"))
let upvoteLimitPicked = parseInt(prompt("Minimum upvotes:"))

const options = {
  url: ' ',
  //input your path here
  dest: 'C:/Users/ANowak/Desktop/saved'
}

const rnd = async () => {
  AOIG: while (temp2 < amountPicked) {
    const result = await redditimage.fetch({
      type: "custom",
      total: amountPicked,
      subreddit: [subredditPicked],
    })
    
    for (let i = 0; i < amountPicked; i++) {

      if(result[i].upvotes > upvoteLimitPicked && !array.includes(result[i].image)){
        options.url = result[i].image
  
      download.image(options)
        .then(({ filename }) => {
          console.log('Saved to', filename)
        })
        .catch((err) => console.error(err))

      temp2++

      array.push(options.url)
      
      if (temp2 === amountPicked) {
        break AOIG
      }
      }

    }

  } 
}

rnd() 