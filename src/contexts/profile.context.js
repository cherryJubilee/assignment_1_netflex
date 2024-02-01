import React, { createContext, useContext, useState } from "react";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  // 사용자 닉네임  관리
  const [nickname, setNickname] = useState("");
  // 좋아하는 영화목록 관리
  const [likedMovies, setLikedMovies] = useState([]);

  // 영화 좋아요- prevLikedMovies(기존 영화목록)에 새 영화 추가
  const addLikedMovie = (movie) => {
    setLikedMovies((prevLikedMovies) => [...prevLikedMovies, movie]);
  };

  // 영화 좋아요 취소 - movie.id 기준으로 삭제, 제거하려는 영화 id(movieId)
  const removeLikedMovie = (movieId) => {
    setLikedMovies((prevLikedMovies) =>
      prevLikedMovies.filter((movie) => movie.id !== movieId)
    );
  };

  const value = {
    nickname,
    setNickname,
    likedMovies,
    addLikedMovie,
    removeLikedMovie,
  };

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};

// 커스텀 훅 생성 - ProfileContext에서 쉽게 값을 가져오도록
export const useProfile = () => useContext(ProfileContext);

export default ProfileContext;
