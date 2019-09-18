require('dotenv').config()
const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

const port = process.env.port || 3000

const streams = {}

/*
const Tiwt = require('twit')
const T = new Tiwt({
    consumer_key: process.env.consumer_key,
    consumer_secret: process.env.consumer_secret,
    access_token: process.env.access_token,
    access_token_secret: process.env.access_token_secret,
    timeout_ms: 60 * 1000
})
*/

io.on('connection', socket => {
    console.log(socket.id)
    console.log(io.sockets.adapter.rooms)
    socket.on('startStream', term => {
        if (!(term in streams)) {
            streams[term] = ''
        }
        console.log('startStream', term, streams)
    })
})

/*
const stream = T.stream('statuses/filter', { track: '#apple' })
stream.on('error', req => console.log(req))
stream.on('tweet', tweet => {
    console.log(tweet.user.name, tweet.text)
    io.emit('tweet', {
        username: tweet.user.name,
        text: tweet.text
    })
})
*/

app.set('view engine', 'ejs')
app.get('/', (req, res) => res.render('home'))

http.listen(port, (err) => {
    if (err)
        console.log(err)
    else
        console.log('Server Running')
})