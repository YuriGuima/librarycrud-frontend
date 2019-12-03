import React, { Component } from "react";
import Offline from "../../components/offlinepage"
import '../../index'
import './styles.css';
import { ToastsContainer, ToastsStore } from "react-toasts";
import ModalShow from "../../components/modal";
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


  onSubmit = e => {// Função para adicionar um registro na tabela
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


  onUpdate = e => {// Atualiza um dado especifico da tabela
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


  onShow = (Author, e) => {// Exibe os dados do elemento especifico
    e.preventDefault();
    this.setState({
      nome: Author.nome,
      dtnascimento: Author.dtnascimento,
      sexo: Author.sexo,
      nacionalidade: Author.nacionalidade
    });
  };
  

  onDelete = (val, e) => {// Exclui um dado da tabela
    e.preventDefault();
    deleteAuthor(val);
    this.getAll();
  };


  getAll = () => {// Retorna todos os dados da Tabela
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
      dtnascimento: "",
      sexo: "",
      nacionalidade: "",
      editDisabled: false
    });
  };


  onEdit = (Authorid, e) => {// Abre o formulario no modo de edição e exibe os dados atuais
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


  onCancelEdit = e => {// Fecha o formulario de edição e limpa os campos
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


  modalContent() {// Estrutura da Model de exibição
    return (
      <div>
        <div className="modal-header">
          <h4 className="contentModal">{this.state.nome}</h4>
          <button type="button" className="close" data-dismiss="modal">
            &times;
          </button>
        </div>
        <div className="modal-body">
          <ul className="list-group">
            <li className="contentModal"><strong>Data de nascimento:</strong> {this.state.dtnascimento}</li>
            <li className="contentModal"><strong>Sexo:</strong> {this.state.sexo}</li>
            <li className="contentModal"><strong>Nacionalidade:</strong> {this.state.nacionalidade}</li>
          </ul>
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
              <div className="row mb-4">
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
                      placeholder="Ex: Anakin Skywalker"
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
                    placeholder="Ex: Masculino / Feminino / Outro"
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
                      placeholder="Ex: Brasileira"
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
          <table className="table bg-light shadow mb-5">
            <thead className="thead-dark rounded-top">
              <tr>
                <th>Nome</th>
                <th>Nascimento</th>
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
                        className="btn btn-info optionButtons"
                        disabled={this.state.editDisabled}
                        onClick={this.onShow.bind(this, Author)}
                        data-toggle="modal"
                        data-target="#myModal"
                      >
                        <i className="fas fa-eye"></i>
                      </button>
                      <button
                        className="btn btn-primary optionButtons"
                        disabled={this.state.editDisabled}
                        onClick={this.onEdit.bind(this, Author.id)}
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
                        className="btn btn-danger optionButtons"
                        disabled={this.state.editDisabled}
                        onClick={this.onDelete.bind(this, Author.id)}
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

export default AuthorList;
