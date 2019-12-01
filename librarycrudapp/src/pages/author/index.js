import React, { Component } from "react";
import { ToastsContainer, ToastsStore } from "react-toasts";
import {
  getAuthorList,
  addAuthor,
  updateAuthor,
  deleteAuthor
} from "../../routes";

class AuthorList extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      idRegister: true, 
      nome: "",
      dtnascimento: "",
      sexo: "",
      nacionalidade: "",
      editDisabled: false,
      Authors: []
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
    getAuthorList().then(data => {
      this.setState(
        {
          nome: "",
          dtnascimento: "",
          sexo: "",
          nacionalidade: "",
          Authors: [...data]
        },
        () => {
          console.log(this.state.Authors);
        }
      );
    });
  };

  successAlert = msg => {
    ToastsStore.success(msg);
  };

  errorAlert = msg => {
    ToastsStore.error(msg);
  };

  onSubmit = e => {
    e.preventDefault();
    
    addAuthor(
      this.state.nome,
      this.state.dtnascimento,
      this.state.sexo,
      this.state.nacionalidade
    ).then(() => {
      this.getAll();
      this.successAlert("Autor cadastrado com sucesso!");
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
    updateAuthor(
      this.state.nome,
      this.state.dtnascimento,
      this.state.sexo,
      this.state.nacionalidade,
      this.state.id
    ).then(() => {
      this.successAlert("Dados alterados com sucesso!");
      this.onToogleClose();
      this.getAll();
      this.setState({
        editDisabled: false
      });
    });
    this.getAll();
  };

  onShow = (Author, e) => {
    e.preventDefault();
    this.setState({
      nome: Author.nome,
      dtnascimento: Author.dtnascimento,
      sexo: Author.sexo,
      nacionalidade: Author.nacionalidade
    });
  };

  onEdit = (Authorid, e) => {
    e.preventDefault();
    this.onToogleOpen();

    var data = [...this.state.Authors];
    data.forEach((Author, index) => {
      if (Author.id === Authorid) {
        this.setState({
          toogleOpen: true,
          id: Author.id,
          nome: Author.nome,
          dtnascimento: Author.dtnascimento,
          sexo: Author.sexo,
          nacionalidade: Author.nacionalidade,
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
    deleteAuthor(val);
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
  };

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
        
        <div className="container">
          <div className="modal fade" id="myModal" role="dialog">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h4>{this.state.nome}</h4>
                  <button type="button" className="close" data-dismiss="modal">
                    &times;
                  </button>
                </div>
                <div className="modal-body">
                  <ul>
                    <li>Data de nascimento: { this.state.dtnascimento }</li>
                    <li>Sexo: { this.state.sexo }</li>
                    <li>Nacionalidade: { this.state.nacionalidade }</li>
                  </ul>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-default"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <ToastsContainer store={ToastsStore} />
        <div className="collapse container" id="navbarToggleExternalContent">
          <form onSubmit={!this.state.editDisabled ? (this.onSubmit):(this.onUpdate)} className="needs-validation">
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
                      maxLength="100"
                      required
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
                    required
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
                    maxLength="50"
                    required
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
                      maxLength="100"
                      required
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
              >
                Cadastrar
              </button>
            ) : (
              <button
                type="submit"
                className="btn btn-primary btn-block"
              >
                Update
              </button>
            )}
            
          </form>
          <br></br>
          <br></br>
        </div>
        <nav className="navbar navbar-dark jumbotron p-0">
          {this.state.editDisabled ? (
            <button
              className="btn btn-primary rounded-0 pl-3 pr-3"
              type="button"
              data-toggle="collapse"
              data-target="#navbarToggleExternalContent"
              aria-controls="navbarToggleExternalContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
              onClick={this.onCancelEdit.bind(this)}
            >
              Cancelar
            </button>
          ) : (
            <button
              type="button"
              data-toggle="collapse"
              data-target="#navbarToggleExternalContent"
              aria-controls="navbarToggleExternalContent"
              className="btn btn-success rounded-0 pl-3 pr-3"
              onClick={this.onNew.bind(this)}
            >
              Novo
            </button>
          )}
        </nav>
        <div className="container">
          <table className="table bg-light Regular shadow mb-5">
            <thead className="thead-dark">
              <tr>
                <th>Nome</th>
                <th>Data de nascimento</th>
                <th>Sexo</th>
                <th>Nacionalidade</th>
                <th className="text-center">Opções</th>
              </tr>
            </thead>
            <tbody>
              {this.state.Authors.map((Author, index) => (
                <tr key={index}>
                  <td className="text-left align-middle">{Author.nome}</td>
                  <td className="text-left align-middle">
                    {Author.dtnascimento}
                  </td>
                  <td className="text-left align-middle">{Author.sexo}</td>
                  <td className="text-left align-middle">
                    {Author.nacionalidade}
                  </td>
                  <td className="text-center align-middle">
                    <div className="btn-group m-0 p-0">
                      <button
                        href=""
                        className="btn btn-primary"
                        disabled={this.state.editDisabled}
                        onClick={this.onShow.bind(this, Author)}
                        data-toggle="modal" 
                        data-target="#myModal"
                      >
                        Exibir
                      </button>
                      <button
                        className="btn btn-info text-light"
                        disabled={this.state.editDisabled}
                        onClick={this.onEdit.bind(this, Author.id)}
                        type="button"
                        data-toggle="collapse in"
                        data-target="#navbarToggleExternalContent"
                        aria-controls="navbarToggleExternalContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                      >
                        Editar
                      </button>
                      <button
                        href=""
                        className="btn btn-danger"
                        disabled={this.state.editDisabled}
                        onClick={this.onDelete.bind(this, Author.id)}
                      >
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <br></br>
        <br></br>
      </div>
    );
  }
}

export default AuthorList;
