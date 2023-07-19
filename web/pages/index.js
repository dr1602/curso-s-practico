import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import React, {useEffect, useState} from "react";

export default function Home() {
  const [movies, setMovies] = useState([]);

  const MOVIES = ["https://bit.ly/3Jb3ae2", "https://bit.ly/3NOj69w", 'https://media.tenor.com/k-0k1y0P_IQAAAAC/spiderman-spider-man.gif', 'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExcTVyNDEwYTR5dG5ncHBpa2kxOXNpZG1tbTE5bWFndGJuNGFmdGtqYSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/LC9iArEoJuayRH8Pkt/giphy.gif', 'https://blenderartists.org/uploads/default/original/4X/3/6/6/3666a89984b2a03304a80c7d729fd9651ed96b3a.gif', 'https://cdn.dailyshorts.io/DailyNewsletter/daily_newsletter_1874_1671533438.gif'];

  useEffect(() => {
    setMovies(MOVIES);
  });

  return (
    <div className="flex justify-center mt-6 pb-6">
      <div className="px-4" style={{ maxWidth: "1600px" }}>
        <div className="grid grid-cols-3 sm:grdi-cols-3 lg:grdi-cols-6 gap-6">
          {movies.map((movie, i) => (
            <div lkey={i} className="border shadow rounded-xl overflow-hidden">
              <img style={{ height: "20rem"}} src={movie} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
