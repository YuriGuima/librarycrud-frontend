import React, { Component } from "react";
import { register } from "../routes";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      first_name: "",
      email: "",
      password: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      name: this.state.first_name,
      email: this.state.email,
      password: this.state.password
    };

    register(newUser)
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
              <label htmlFor="first_name">Nome</label>
              <input
                type="text"
                className="form-control"
                name="first_name"
                value={this.state.first_name}
                onChange={this.onChange}
                placeholder="Ex: Anakin Skylwalker"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={this.state.email}
                onChange={this.onChange}
                placeholder="Ex: iamyourfather@email.com"
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
                placeholder="No minimo 6 caracteres"
                required
              />
            </div>
            <button type="submit" className="btn btn-success">
              Cadastrar
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
