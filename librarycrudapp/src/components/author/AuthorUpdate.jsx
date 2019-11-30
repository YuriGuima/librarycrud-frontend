import React, { Component } from "react";
import {
  updateItem
} from "../../AuthorFunctions";

class AuthorUpdate extends Component {
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

  componentDidMount() {
    this.getAll();
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onUpdate = e => {
    e.preventDefault();
    updateItem(
      this.state.nome,
      this.state.dtnascimento,
      this.state.sexo,
      this.state.nacionalidade,
      this.state.id
    ).then(() => {
      this.getAll();
    });
    this.setState({
      editDisabled: ""
    });
    this.getAll();
  };

  onEdit = (itemid, e) => {
    e.preventDefault();

    var data = [...this.state.items];
    data.forEach((item, index) => {
      if (item.id === itemid) {
        this.setState({
          id: item.id,
          nome: item.nome,
          dtnascimento: item.dtnascimento,
          sexo: item.sexo,
          nacionalidade: item.nacionalidade,
          editDisabled: true
        });
      }
    });
  };

  render() {
    return (
      <div className=".container-fluid">
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
          {!this.state.editDisabled ? (
            <button
              type="submit"
              className="btn btn-success btn-block"
              onClick={this.onSubmit.bind(this)}
            >
              Submit
            </button>
          ) : (
            ""
          )}
          {this.state.editDisabled ? (
            <button
              type="submit"
              onClick={this.onUpdate.bind(this)}
              className="btn btn-primary btn-block"
            >
              Update
            </button>
          ) : (
            ""
          )}
        </form>
        <table className="table">
          <tbody>
            {this.state.items.map((item, index) => (
              <tr key={index}>
                <td className="text-left">{item.nome}</td>
                <td className="text-left">{item.dtnascimento}</td>
                <td className="text-left">{item.sexo}</td>
                <td className="text-left">{item.nacionalidade}</td>
                <td className="text-right">
                  <button
                    href=""
                    className="btn btn-primary mr-1"
                    disabled={this.state.editDisabled}
                    onClick={this.onShow.bind(this, item.id)}
                  >
                    Show
                  </button>
                  <button
                    href=""
                    className="btn btn-info mr-1"
                    disabled={this.state.editDisabled}
                    onClick={this.onEdit.bind(this, item.id)}
                  >
                    Edit
                  </button>
                  <button
                    href=""
                    className="btn btn-danger"
                    disabled={this.state.editDisabled}
                    onClick={this.onDelete.bind(this, item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default AuthorUpdate;