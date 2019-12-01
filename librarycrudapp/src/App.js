import React from "react";
import AuthorList from "./components/author/AuthorList";
import AuthorCreate from "./components/author/AuthorCreate";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="pos-f-t h-10">
        <div className="jumbotron text-center m-0 pt-3 pb-1">
          <h3>Teste Técnico</h3>
          <p>Sistema para estoque de Biblioteca.</p>
        </div>
        <nav className="navbar navbar-dark bg-dark p-0">
          <div className="nav">
            <Link className="nav-link btn-dark" to="/">
              Home
            </Link>

            <Link className="nav-link btn-dark" to={"/author"}>
              Autores
            </Link>

            <Link className="nav-link btn-dark" to={"/author"}>
              Editoras
            </Link>

            <Link className="nav-link btn-dark" to={"/author"}>
              Gêneros
            </Link>

            <Link className="nav-link btn-dark" to={"/author"}>
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
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/author/create">
            <AuthorCreate />
          </Route>
          <Route path="/author/update" component={AuthorCreate}>
            <AuthorCreate />
          </Route>
          <Route path="/author">
            <AuthorList />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
      <br></br>
      <br></br>
      <footer className="jumbotron bg-dark rounded-0 mb-0 pt-5 pb-3 pl-3 navbar-fixed-bottom">
        <a
          href="https://github.com/YuriGuima?tab=repositories"
          className="text-light text-decoration-none"
        >
          {" "}
          GitHub - Librarycrud
        </a>
      </footer>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

export default App;
