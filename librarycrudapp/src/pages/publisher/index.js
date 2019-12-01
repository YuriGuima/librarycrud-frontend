import React, { Component } from "react";
import { ToastsContainer, ToastsStore } from "react-toasts";
import {
  getPublisherList,
  addPublisher,
  updatePublisher,
  deletePublisher
} from "../../routes";

class PublisherList extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      idRegister: true,
      nome: "",
      editDisabled: false,
      Publishers: []
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
    getPublisherList().then(data => {
      this.setState(
        {
          nome: "",
          Publishers: [...data]
        },
        () => {
          console.log(this.state.Publishers);
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
    
    addPublisher(
      this.state.nome
    ).then(() => {
      this.getAll();
      this.successAlert("Editora cadastrada com sucesso!");
    });
    this.setState({
      nome: ""
    });
  };

  onUpdate = e => {
    e.preventDefault();
    updatePublisher(
      this.state.nome,
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

  onShow = (Publisher, e) => {
    e.preventDefault();
    this.setState({
      nome: Publisher.nome
    });
  };

  onEdit = (Publisherid, e) => {
    e.preventDefault();
    this.onToogleOpen();

    var data = [...this.state.Publishers];
    data.forEach((Publisher, index) => {
      if (Publisher.id === Publisherid) {
        this.setState({
          toogleOpen: true,
          id: Publisher.id,
          nome: Publisher.nome,
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
      editDisabled: false
    });
  };

  onDelete = (val, e) => {
    e.preventDefault();
    deletePublisher(val);
    this.getAll();
  };

  onNew = e => {
    e.preventDefault();
    this.onToogleOpen();
    this.setState({
      toogleOpen: true,
      id: "",
      nome: "",
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
                  <h4>Editora</h4>
                  <button type="button" className="close" data-dismiss="modal">
                    &times;
                  </button>
                </div>
                <div className="modal-body">
                  <h4 className="text-primary">{ this.state.nome }</h4>
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
                <div className="col-md-12 row">
                  <h4 htmlFor="nome" className="col-md-3 text-center">Nome da Editora:</h4>
                  <div className="col-md-9 pr-0">
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
                <th className="text-center">Editora</th>
                <th className="text-right pr-5">Opções</th>
              </tr>
            </thead>
            <tbody>
              {this.state.Publishers.map((Publisher, index) => (
                <tr key={index}>
                  <td className="text-center align-middle">{Publisher.nome}</td>
                  
                  <td className="text-right align-middle">
                    <div className="btn-group m-0 p-0">
                      <button
                        href=""
                        className="btn btn-primary"
                        disabled={this.state.editDisabled}
                        onClick={this.onShow.bind(this, Publisher)}
                        data-toggle="modal" 
                        data-target="#myModal"
                      >
                        Exibir
                      </button>
                      <button
                        className="btn btn-info text-light"
                        disabled={this.state.editDisabled}
                        onClick={this.onEdit.bind(this, Publisher.id)}
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
                        onClick={this.onDelete.bind(this, Publisher.id)}
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

export default PublisherList;
