import React from "react";
import styles from "./Card.module.css";
// import { useEffect, useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import Chip from "@mui/material/Chip";

const getAlbumCard = (album) => {
  const { image, follows, title, songs } = album;
  return (
    <>
      {
        <Tooltip title={`${songs.length}songs`} placement="top" arrow>
          <div className={styles.wrapper}>
            <div className={styles.card}>
              <img src={image} alt="ima" />
              <div className={styles.banner}>
                <Chip
                  label={`${follows} follows`}
                  size="small"
                  className={styles.chip}
                ></Chip>
              </div>
              <div className={styles.titleWrapper}>
                <p className={styles.para}>{title}</p>
              </div>
            </div>
          </div>
        </Tooltip>
      }
    </>
  )
}
const getSongsCard = (album) => {
  const { image, likes, title } = album;
  return (
    <>
      {
          <div className={styles.wrapper}>
            <div className={styles.card}>
              <img src={image} alt="ima" />
              <div className={styles.banner}>
                <Chip
                  label={`${likes} Likes`}
                  size="small"
                  className={styles.chip}
                ></Chip>
              </div>
              <div className={styles.titleWrapper}>
                <p className={styles.para}>{title}</p>
              </div>
            </div>
          </div>
      }
    </>
  )
}

function Cards({ album,songs }) {
  if(!songs){
    return getAlbumCard(album)
  }
  if(songs){
    return getSongsCard(album)
  }
}
export default Cards;