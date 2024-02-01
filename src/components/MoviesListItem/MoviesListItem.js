import styles from "./MoviesListItem.module.scss";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/auth.context";
import React from "react";
import { useProfile } from "../../contexts/profile.context";

function MoviesListItem({ movie }) {
  const { isLoggedIn } = useAuth();
  const { likedMovies, addLikedMovie, removeLikedMovie } = useProfile();

  // 좋아요 목록에 있는지 확인
  // some() : 조건을 만족하는 요소가 하나라도 있으면 true 반환
  const isLiked = likedMovies.some((likedMovie) => likedMovie.id === movie.id);

  const handleLike = (event) => {
    // 이미 좋아요 목록에 있다면, 영화를 목록에서 제거
    if (isLiked) {
      removeLikedMovie(movie.id);
    } else {
      // 좋아요 목록에 없다면 추가
      addLikedMovie(movie);
    }
  };

  return (
    <body className={styles.wrapper}>
      <Link to={`/movies/${movie.id}`}>
        <img
          src={"https://image.tmdb.org/t/p/w500" + movie.backdrop_path}
          alt={movie.title}
        />
      </Link>

      <section className={styles.movieContent}>
        <h6>{movie.title}</h6>
        {isLoggedIn && (
          <button className={styles.movieLikeBtn} onClick={handleLike}>
            <span className={styles.heartIcon}>{isLiked ? "❤️" : "🤍"}</span>
          </button>
        )}
      </section>
    </body>
  );
}

export default MoviesListItem;
