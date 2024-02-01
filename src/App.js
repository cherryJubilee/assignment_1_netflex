import { Routes, Route } from "react-router-dom";
import HomePage from "./components/Pages/HomePage";
import SignInPage from "./components/Pages/SignInPage";
import DefaultLayout from "./layouts/DefaultLayout";
import MoviesDetailPage from "./components/Pages/MoviesDetailPage";
import { AuthProvider } from "./contexts/auth.context";
import MyPage from "./components/Pages/MyPage";
import { ProfileProvider } from "./contexts/profile.context";

function App() {
  return (
    <AuthProvider>
      <ProfileProvider>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/movies/:movieId" element={<MoviesDetailPage />} />
          </Route>
        </Routes>
      </ProfileProvider>
    </AuthProvider>
  );
}

export default App;
