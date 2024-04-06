import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AppLayout from "./layout/AppLayout";
import Hompage from "./pages/Homepage/Hompage";
import MoviePage from "./pages/Movies/MoviePage";
import MovieDetailPage from "./pages/MovieDetail/MovieDetailPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

//메인페이지  /
//영화 전체 보여주는 페이지(서치)  /movies?q=
//영화 디테일 페이지  /movies/:id

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Hompage />} />
          <Route path="/movies">
            <Route index element={<MoviePage />} />
            <Route path=":id" element={<MovieDetailPage />} />
          </Route>
          {/* <Route path="/movies" element={<MoviePage />} />
          <Route path="/movies/:id" element={<MovieDetailPage />} /> */}
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
