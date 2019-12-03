import React, { Component } from "react";
import { login } from "../routes";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password
    };

    login(user).then(res => {
        document.location.href = "/home";
    });
  }

  render() {
    return (
      <div className="container">
        <div className="col-md-12">
          <form
            onSubmit={this.onSubmit}
            className="mt-4 mb-5 border shadow p-5 rounded needs-validation"
          >
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={this.state.email}
                onChange={this.onChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Senha</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={this.state.password}
                onChange={this.onChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-success">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
