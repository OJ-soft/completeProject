const redditimage = require("reddit.images")
const download = require('image-downloader')
const prompt = require('prompt-sync')()
const { memeSubreddit } = require("reddit.images/config/config");
const tables = require('./tables.js')

let counter = 0
const array = new Array()

const subredditPicked = prompt("What subreddit:")
if(subredditPicked === 'sSubreddits'){
  subredditPicked = tables.sSubreddits
}
const amountPicked = parseInt(prompt("How many posts(max50):"))
const upvoteLimitPicked = parseInt(prompt("Minimum upvotes:"))

const options = {
  url: ' ',
  //input your path here
  dest: 'C:/Users/ANowak/Desktop/saved'
}

const rnd = async () => {
  AOIG: while (counter < amountPicked) {
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

      counter++

      array.push(options.url)
      
      if (counter === amountPicked) {
        break AOIG
      }
      }

    }

  } 
}

rnd() 