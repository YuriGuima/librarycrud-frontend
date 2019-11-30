import React, { Component } from "react";
import {
  getList,
  addItem,
  showItem,
  updateItem,
  deleteItem
} from "../../AuthorFunctions";

class List extends Component {
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

  getAll = () => {
    getList().then(data => {
      this.setState(
        {
          nome: "",
          dtnascimento: "",
          sexo: "",
          nacionalidade: "",
          items: [...data]
        },
        () => {
          console.log(this.state.items);
        }
      );
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
      this.getAll();
    });
    this.setState({
      nome: "",
      dtnascimento: "",
      sexo: "",
      nacionalidade: ""
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
      this.onToogleClose();
      this.getAll();
      this.setState({
        editDisabled: false
      });
    });
    this.getAll();
  };

  onShow = (itemid, e) => {
    e.preventDefault();
    showItem(itemid);
    this.getAll();
  };

  onEdit = (itemid, e) => {
    e.preventDefault();
    this.onToogleOpen();

    var data = [...this.state.items];
    data.forEach((item, index) => {
      if (item.id === itemid) {
        this.setState({
          toogleOpen: true,
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

  onCancelEdit = e => {
    e.preventDefault();
    this.setState({
      toogleOpen: true,
      id: "",
      nome: "",
      dtnascimento: "",
      sexo: "",
      nacionalidade: "",
      editDisabled: false
    });
  };

  onDelete = (val, e) => {
    e.preventDefault();
    deleteItem(val);
    this.getAll();
  };

  onNew = e => {
    e.preventDefault();
    this.onToogleOpen();
    this.setState({
      toogleOpen: true,
      id: "",
      nome: "",
      dtnascimento: "",
      sexo: "",
      nacionalidade: "",
      editDisabled: false
    });
  }

  onToogleOpen() {
    // eslint-disable-next-line no-undef
    $(".collapse").collapse("show");
  }

  onToogleClose() {
    // eslint-disable-next-line no-undef
    $(".collapse").collapse("hide");
  }

  render() {
    return (
      <div className=".container-fluid">
        <div className="collapse container" id="navbarToggleExternalContent">
          <form onSubmit={this.onSubmit}>
            <br></br>
            <br></br>
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

            <br></br>
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
          <br></br>
          <br></br>
        </div>
        <nav className="navbar navbar-dark bg-dark">
          <button type="button" className="nav-item btn btn-outline-success" onClick={this.onNew.bind()}>
            Novo
          </button>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarToggleExternalContent"
            aria-controls="navbarToggleExternalContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={this.onCancelEdit.bind(this)}
          >
            <span className="navbar-toggler-icon small"></span>
          </button>
        </nav>
        <br></br>
        <div className="container">
          <table className="table">
            <thead className="thead-dark">
              <th>Nome</th>
              <th>Data de nascimento</th>
              <th>Sexo</th>
              <th>Nacionalidade</th>
              <th></th>
            </thead>
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
                      className="btn btn-info mr-1 text-light"
                      disabled={this.state.editDisabled}
                      onClick={this.onEdit.bind(this, item.id)}
                      type="button"
                      data-toggle="collapse in"
                      data-target="#navbarToggleExternalContent"
                      aria-controls="navbarToggleExternalContent"
                      aria-expanded="false"
                      aria-label="Toggle navigation"
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
      </div>
    );
  }
}

export default List;
