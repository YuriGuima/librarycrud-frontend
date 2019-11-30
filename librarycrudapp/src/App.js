import React from "react";
import AuthorList from "./components/author/AuthorList";
import AuthorCreate from "./components/author/AuthorCreate";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="pos-f-t">
        <nav className="navbar navbar-dark bg-dark">
          <ul className="nav">
            <li className="nav-item">
              <Link className="nav-link text-light" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" to={"/author"}>
                Autores
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" to={"/author"}>
                Editoras
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" to={"/author"}>
                Gêneros
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" to={"/author"}>
                Livros
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" to={"/author"}>
                Sign Up
              </Link>
            </li>
            <li className="nav-item text-right">
              <Link className="nav-link text-light" to={"/author"}>
                Login
              </Link>
            </li>
          </ul>
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
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

export default App;
