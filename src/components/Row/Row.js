import React from "react";
import { useState, useEffect } from "react";
import axios from "../../axios";
import "./Row.css";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";
import "../Card/Card.css";

function Row({ title, fetchUrl, isLargeRow }) {
const base_url = "https://image.tmdb.org/t/p/original/";

  const [movies, setmovies] = useState([]);
  const [trailerUrl, settrailerUrl] = useState("");
  const handleClick = movie => {
    console.log("clicked")
    if (trailerUrl) {
      settrailerUrl("");
    } else {
      movieTrailer(movie?.name || "").then(url =>{
        const urlParams= new URLSearchParams(new URL(url).search);
        settrailerUrl(urlParams.get('v'))
      }).catch(err=>{
        console.log(err)
      });
    }
  };
  useEffect(
    () => {
      async function fetchData() {
        const res = await axios.get(fetchUrl);
        setmovies(res.data.results);
        return res;
      }
      fetchData();
    },
    [fetchUrl]
  );
  return (
    <div className="row" style={{ marginInline: "15px" }}>
      <h2
        style={{
          textTransform: "uppercase",
          marginTop: "1rem"
        }}
      >
        {title}
      </h2>

      <div className="row_posters">
        {movies.map(movie => {
          return (
            <img
      className={`row-poster ${isLargeRow && "row-posterLarge"}`}
      src={`${base_url}${isLargeRow ? movie?.poster_path : movie?.backdrop_path}`}
      alt={movie.name}
      onClick={() => handleClick(movie)}
              key={movie.id}
      

    />
            
          );
        })}
      </div>
      {trailerUrl &&
        <Youtube
          videoId={trailerUrl}
          opts={{
            height: "390",
            width: "100%",
            playerVars: {
              autoplay: 1
            }
          }}
        />}
    </div>
  );
}

export default Row;
