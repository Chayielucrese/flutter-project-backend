const music = require('../Models/music')
const {empty} = require('php-in-js/cjs')
const axios = require('axios')
const { response } = require('express')

//get music API

exports.musicApiSearch = async (req, res) => {
    try {
      const { singer, title } = req.body;
  
      if (empty(singer) &&  empty(title)) {
        return res.status(422).json({ message: "Please provide either the artist name or the music title for the search" });
      }
  
      let query = "";
      if (singer) {
        query += `artist:"${singer}"`;
      }
      if (title) {
        if (query) {
          query += " ";
        }
        query += `track:"${title}"`;
      }
  
      const response = await axios.get(`https://api.deezer.com/search?q=${query}&limit=10`);
      const tracks = response.data.data;
      const formattedTracks = tracks.map((track) => ({
        artistName: track.artist.name,
        title: track.title,
        cover: track.album.cover,
        link: track.link,
      }));
      if(empty(formattedTracks)){
        return res .status(404).json({message: "No Music Found For This Musician"});
      }
      console.log(formattedTracks, "tracks");
     return res .status(200).json(formattedTracks);
    } catch (error) {
      console.error('Error retrieving tracks:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };