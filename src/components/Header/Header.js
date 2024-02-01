import React from "react";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/auth.context";
import { useProfile } from "../../contexts/profile.context";

function Header() {
  const { isLoggedIn, logOut } = useAuth();
  const { nickname } = useProfile();

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        NETFLEX
      </Link>

      <nav>
        {isLoggedIn && (
          <ul>
            {nickname && (
              <li>
                <span>안녕하세요, {nickname}님!</span>
              </li>
            )}
            <li>
              <Link to="/mypage">마이페이지</Link>
            </li>
            <li>
              <button onClick={logOut}>로그아웃</button>
            </li>
          </ul>
        )}
        {!isLoggedIn && (
          <ul>
            <li>
              <Link to="/sign-in">로그인</Link>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
}

export default Header;
