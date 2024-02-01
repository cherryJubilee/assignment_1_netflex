import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../api/api";
import getTMDBImgSrc from "../../../utils/getTMDBImgSrc";
import styles from "./MoviesDetailPage.module.scss";
import { useAuth } from "../../../contexts/auth.context";
import { useProfile } from "../../../contexts/profile.context";

function MoviesDetailPage() {
  // 영화 고유의 id
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const { isLoggedIn } = useAuth();
  const { likedMovies, addLikedMovie, removeLikedMovie } = useProfile();
  // 현재 영화가 좋아요 목록에 있는지 여부 확인
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    if (isLiked) {
      // 이미 좋아요 된 영화 -> 목록에서 제거
      removeLikedMovie(movie.id);
    } else {
      // 좋아요 된 영화가 아니라면 -> 목록에 추가
      addLikedMovie(movie);
    }
    // isLiked 상태를 반전 (true -> false, false -> true).
    setIsLiked(!isLiked);
  };

  // 영화데이터 로드
  useEffect(() => {
    api.movies.getMovie(movieId).then((movieData) => {
      setMovie(movieData);
      // 현재 영화가 좋아하는 영화 목록에 있는지 여부확인 -> isLiked 상태를 설정
      setIsLiked(
        likedMovies.some((likedMovie) => likedMovie.id === movieData.id)
      );
    });
  }, [movieId, likedMovies]);

  // 영화데이터가 없다면  null
  if (movie === null) return null;

  console.log("movie", movie);

  return (
    <div className={styles.wrapper}>
      <section className={styles.mainInfo}>
        <img
          className={styles.posterImg}
          src={getTMDBImgSrc(movie.poster_path)}
          alt={movie.title}
        />

        <div className={styles.mainInfoRight}>
          <h1 className={styles.title}>{movie.title}</h1>
          <p className={styles.overview}>{movie.overview}</p>
          <ul className={styles.genres}>
            {movie.genres.map((genre) => (
              <li key={genre.id}># {genre.name}</li>
            ))}
          </ul>
          <strong>👑 평점 {movie.vote_average}</strong>
          {/* 로그인 확인, isLiked 상태에 따라 버튼의 아이콘 달라지도록 하기 */}
          {isLoggedIn && (
            <button className={styles.movieLikeBtn} onClick={handleLike}>
              <span className={styles.heartIcon}>{isLiked ? "❤️" : "🤍"}</span>
            </button>
          )}{" "}
        </div>
      </section>
    </div>
  );
}

export default MoviesDetailPage;
