import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

class Navbar extends Component {
  logOut(e) {
    e.preventDefault();
    localStorage.removeItem("usertoken");
    this.props.history.push(`/`);
  }

  render() {
    const loginRegLink = (
      <div className="row">
        <Link to="/login" className="nav-link text-dark">
          Login
        </Link>

        <Link to="/register" className="nav-link text-dark">
          Cadastro
        </Link>
      </div>
    );

    const userLink = (
        <div className="row">
          <a href="/" onClick={this.logOut.bind(this)} className="nav-link text-dark">
            Logout
          </a>
      </div>
    );

    return <div>{localStorage.usertoken ? userLink : loginRegLink}</div>;
  }
}

export default withRouter(Navbar);
