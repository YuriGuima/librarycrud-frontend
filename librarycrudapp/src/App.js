/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import AuthorList from "./pages/author/index";
import GenreList from "./pages/genre/index";
import PublisherList from "./pages/publisher/index";
import BookList from "./pages/book/index";
import Logo from "./assets/book.png";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <div className="jumbotron text-center m-0 pt-2 pb-2">
          <img src={Logo} width="11%" height="auto" />
        </div>
        <nav className="navbar navbar-dark bg-dark p-0">
          <div className="nav">
            <Link className="nav-link btn-dark" to="/">
              Home
            </Link>

            <Link className="nav-link btn-dark" to={"/author"}>
              Autores
            </Link>

            <Link className="nav-link btn-dark" to={"/publisher"}>
              Editoras
            </Link>

            <Link className="nav-link btn-dark" to={"/genre"}>
              Gêneros
            </Link>

            <Link className="nav-link btn-dark" to={"/book"}>
              Livros
            </Link>
          </div>

          <div className="nav">
            <Link className="nav-link btn-dark" to={"/author"}>
              Sign Up
            </Link>
            <Link className="nav-link btn-dark" to={"/author"}>
              Login
            </Link>
          </div>
        </nav>
      </div>

      <div>
        <Switch>

          <Route path="/author">
            <AuthorList />
          </Route>
          <Route path="/publisher">
            <PublisherList />
          </Route>
          <Route path="/genre">
            <GenreList />
          </Route>
          <Route path="/book">
            <BookList />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>

      <footer className="jumbotron bg-dark rounded-0 mb-0 p-1 fixed-bottom">
        <a
          href="https://github.com/YuriGuima?tab=repositories"
          className="text-light text-decoration-none"
        >
          GitHub - LibraryCrud
        </a>
      </footer>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

export default App;
