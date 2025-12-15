import React from "react";
import axios from "axios";
// export const BACKEND_ENDPOINT = "https://qtify-backend-labs.crio.do";
export const fetchTopAlbums = async () => {
  try {
    const res = await axios.get("https://qtify-backend.labs.crio.do/albums/top");
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
export const fetchNewAlbums = async () => {
    try {
      const res = await axios.get("https://qtify-backend.labs.crio.do/albums/new");
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

export const fetchSongsData = async () => {
  try {
    const res = await axios.get("https://qtify-backend.labs.crio.do/songs");
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const fetchGenre = async() =>{
  try {
    const res = await axios.get("https://qtify-backend.labs.crio.do/genres");
    return res.data;
  } catch (err) {
    console.log(err);
  }
}