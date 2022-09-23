import React from "react";
import { useState, useEffect } from "react";
import axios from "../../axios";
import request from "../../requests";
import "./Banner.css";
function Banner() {
  const base_url = "https://image.tmdb.org/t/p/original/";

  const [movie, setmovie] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(request.fetchNetflixOriginals);
      let rand = Math.floor(Math.random() * res.data.results.length);
      setmovie(res.data.results[rand]);
    }
    fetchData();
  }, []);
  console.log(movie);
  return (
    <header
      className="banner"
      style={{
        backgroundImage: ` url(${base_url}${movie?.backdrop_path})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat"
      }}
    >
      <div className="container">
       <div className="row">
       <h2>
          {movie?.title || movie?.name || movie?.original_name}
        </h2>
        <div>
          <button>Play</button>
          <button>My List</button>
        </div>
        <p>
          {movie?.overview}
        </p>
       </div>
      </div>
      <div className="overlay "/>
    </header>
  );
}

export default Banner;
