import React, { Component } from "react";
import {
  addItem
} from "../../AuthorFunctions";

class AuthorCreate extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      nome: "",
      dtnascimento: "",
      sexo: "",
      nacionalidade: "",
      editDisabled: false,
      items: []
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    addItem(
      this.state.nome,
      this.state.dtnascimento,
      this.state.sexo,
      this.state.nacionalidade
    ).then(() => {
      alert("Cadastrado com sucesso!");
    });
    this.setState({
      nome: "",
      dtnascimento: "",
      sexo: "",
      nacionalidade: ""
    });
  };

  render() {
    return (
      <div className="container">
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <div className="row">
              <div className="col-md-9">
                <h4 htmlFor="nome">Nome:</h4>
                <div>
                  <input
                    type="text"
                    className="form-control"
                    id="nome"
                    name="nome"
                    value={this.state.nome || ""}
                    onChange={this.onChange.bind(this)}
                  />
                </div>
              </div>

              <div className="col-md-3">
                <h4 htmlFor="dtnascimento">Data de Nascimento:</h4>
                <input
                  type="date"
                  className="form-control"
                  id="dtnascimento"
                  name="dtnascimento"
                  value={this.state.dtnascimento || ""}
                  onChange={this.onChange.bind(this)}
                />
              </div>
            </div>
            <br></br>
            <div className="row">
              <div className="col-md-6">
                <h4 htmlFor="sexo">Sexo:</h4>
                <input
                  type="text"
                  className="form-control"
                  id="sexo"
                  name="sexo"
                  value={this.state.sexo || ""}
                  onChange={this.onChange.bind(this)}
                />
              </div>

              <div className="col-md-6">
                <h4 htmlFor="nome">Nacionalidade:</h4>
                <div>
                  <input
                    type="text"
                    className="form-control"
                    id="nacionalidade"
                    name="nacionalidade"
                    value={this.state.nacionalidade || ""}
                    onChange={this.onChange.bind(this)}
                  />
                </div>
              </div>
            </div>
          </div>
            <button
              type="submit"
              className="btn btn-success btn-block"
              onClick={this.onSubmit.bind(this)}
            >
              Submit
            </button>
        </form>
      </div>
    );
  }
}

export default AuthorCreate;
