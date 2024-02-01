import React, { useState } from "react";
import styles from "./MyPage.module.scss";
import { useProfile } from "../../../contexts/profile.context";
import { Link } from "react-router-dom";
import { useAuth } from "../../../contexts/auth.context";

function MyPage() {
  const {
    nickname,
    setNickname,
    likedMovies,
    addLikedMovie,
    removeLikedMovie,
  } = useProfile(); // likedMovies: 좋아요 영화목록
  const [newNickname, setNewNickname] = useState(nickname);
  const { isLoggedIn } = useAuth();

  const handleNicknameChange = (event) => {
    setNewNickname(event.target.value);
  };

  const handleNicknameSave = () => {
    setNickname(newNickname);
    return alert("닉네임이 설정 되었습니다");
  };

  // 좋아요 상태 확인 함수
  const isLiked = (movieId) => {
    return likedMovies.some((movie) => movie.id === movieId);
  };

  const handleLike = (event, currentMovie) => {
    event.stopPropagation(); // 링크 이동 방지
    if (isLiked(currentMovie.id)) {
      removeLikedMovie(currentMovie.id); // 이미 좋아요 된 영화 -> 목록에서 제거
    } else {
      addLikedMovie(currentMovie); // 좋아요 된 영화가 아니라면 -> 목록에 추가
    }
  };

  return (
    <div className={styles.wrapper}>
      <h1>MY PAGE</h1>
      <section className={styles.header}>
        <h3>⭐️ 닉네임</h3>
        <div className={styles.nicknameForm}>
          <input
            className={styles.nickname}
            type="text"
            value={newNickname}
            onChange={handleNicknameChange}
            placeholder="닉네임을 설정해 주세요"
          />
          <button className={styles.nicknameBtn} onClick={handleNicknameSave}>
            저장하기
          </button>
        </div>
      </section>

      <section className={styles.header}>
        <h3>📌 내가 찜한 리스트</h3>
        <ul>
          {likedMovies.map((movie) => (
            <li key={movie.id}>
              <Link className={styles.link} to={`/movies/${movie.id}`}>
                <img
                  src={"https://image.tmdb.org/t/p/w500" + movie.backdrop_path}
                  alt={movie.title}
                />
                <h4>{movie.title}</h4>
              </Link>
              {isLoggedIn && (
                <button
                  className={styles.movieLikeBtn}
                  onClick={(e) => handleLike(e, movie)} // 이벤트와 현재 영화 객체 전달
                >
                  <span className={styles.heartIcon}>
                    {isLiked(movie.id) ? "❤️" : "🤍"}
                  </span>
                </button>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
export default MyPage;
