/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import "./App.css";

import Navbar from "./components/navbar";
import Register from "./components/register";
import Login from "./components/login";
import Home from "./pages/main/index";
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
        <div className="jumbotron text-center m-0 pt-2 pb-2 navbar align-middle col-md-12">
          <div className="col-md-2" />
          <div className="col-md-8">
            <img src={Logo} width="17%" height="auto" />
          </div>
          <div className="col-md-2">
            <Navbar className="w-25" />
          </div>
        </div>
        
        <nav className="navbar navbar-dark bg-dark p-0 justify-content-center">
          <div className="nav">
            <Link className="nav-link linknavbar" to="/">
              Home
            </Link>

            <Link className="nav-link linknavbar" to={"/author"}>
              Autores
            </Link>

            <Link className="nav-link linknavbar" to={"/publisher"}>
              Editoras
            </Link>

            <Link className="nav-link linknavbar" to={"/genre"}>
              Gêneros
            </Link>

            <Link className="nav-link linknavbar" to={"/book"}>
              Livros
            </Link>
           
          </div>
          
        </nav>
      </div>

      <div>
        <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
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

export default App;
