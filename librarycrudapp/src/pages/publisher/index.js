import React, { Component } from "react";
import Offline from "../../components/offlinepage"
import "./styles.css";
import { ToastsContainer, ToastsStore } from "react-toasts";
import ModalShow from "../../components/modal";
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


  onSubmit = e => {// Função para adicionar um registro na tabela
    e.preventDefault();

    addPublisher(this.state.nome).then(() => {
      this.getAll();
      this.successAlert("Editora cadastrada com sucesso!");
    });
    this.setState({
      nome: ""
    });
  };


  onUpdate = e => {// Atualiza um dado especifico da tabela
    e.preventDefault();
    updatePublisher(this.state.nome, this.state.id).then(() => {
      this.successAlert("Dados alterados com sucesso!");
      this.onToogleClose();
      this.getAll();
      this.setState({
        editDisabled: false
      });
    });
    this.getAll();
  };


  onShow = (Publisher, e) => {// Exibe os dados do elemento especifico
    e.preventDefault();
    this.setState({
      nome: Publisher.nome
    });
  };


  onDelete = (val, e) => {// Exclui um dado da tabela
    e.preventDefault();
    deletePublisher(val);
    this.getAll();
  };


  getAll = () => {// Retorna todos os dados da Tabela
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


  onToogleOpen() {// Abre o formulario
    // eslint-disable-next-line no-undef
    $(".collapse").collapse("show");
  }

  onToogleClose() {// Fecha o formulario
    // eslint-disable-next-line no-undef
    $(".collapse").collapse("hide");
  }


  onNew = e => {// Abre o formulario no modo de inserção
    e.preventDefault();
    this.onToogleOpen();
    this.setState({
      toogleOpen: true,
      id: "",
      nome: "",
      editDisabled: false
    });
  };


  onEdit = (Publisherid, e) => {// Abre o formulario no modo de edição e exibe os dados atuais
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


  onCancelEdit = e => {// Fecha o formulario de edição e limpa os campos
    e.preventDefault();
    this.setState({
      toogleOpen: true,
      id: "",
      nome: "",
      editDisabled: false
    });
  };


  modalContent() {// Estrutura da Model de exibição
    return (
      <div>
        <div className="modal-header">
          <h4>Editora</h4>
          <button type="button" className="close" data-dismiss="modal">
            &times;
          </button>
        </div>
        <div className="modal-body">
          <h4 className="text-primary">{this.state.nome}</h4>
        </div>
      </div>
    );
  }


  successAlert = msg => {// Popup de sucesso
    ToastsStore.success(msg);
  };


  render() {
    const principal = (
      <div className=".container-fluid">
        <ModalShow content={this.modalContent()} />
        <ToastsContainer store={ToastsStore} />
        <div className="collapse container" id="navbarToggleExternalContent">
          <form
            onSubmit={!this.state.editDisabled ? this.onSubmit : this.onUpdate}
            className="needs-validation mt-5 mb-5"
          >
            <div className="form-group mb-5">
              <div className="row">
                <div className="col-md-12 row">
                  <h4 htmlFor="nome" className="col-md-3 text-center">
                    Nome da Editora:
                  </h4>
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

            {!this.state.editDisabled ? (
              <button type="submit" className="btn btn-success btn-block">
                Cadastrar
              </button>
            ) : (
              <button type="submit" className="btn btn-primary btn-block">
                Update
              </button>
            )}
          </form>

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
        <div className="container pb-5">
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
                        className="btn btn-info optionButtons optionButtons"
                        disabled={this.state.editDisabled}
                        onClick={this.onShow.bind(this, Publisher)}
                        data-toggle="modal"
                        data-target="#myModal"
                      >
                        <i className="fas fa-eye"></i>
                      </button>
                      <button
                        className="btn btn-primary optionButtons optionButtons"
                        disabled={this.state.editDisabled}
                        onClick={this.onEdit.bind(this, Publisher.id)}
                        type="button"
                        data-toggle="collapse in"
                        data-target="#navbarToggleExternalContent"
                        aria-controls="navbarToggleExternalContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button
                        href=""
                        className="btn btn-danger optionButtons optionButtons"
                        disabled={this.state.editDisabled}
                        onClick={this.onDelete.bind(this, Publisher.id)}
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
      </div>
    );

    const offline = (
      <Offline />
    )

    return (
      <div>
      {localStorage.usertoken ? principal : offline}
      </div>
    )

  }
}

export default PublisherList;
