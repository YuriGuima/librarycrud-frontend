import React, { Component } from "react";
import "./styles.css";
import { ToastsContainer, ToastsStore } from "react-toasts";
import ModalShow from "../../components/modal";
import { getAuthorList, getGenreList, getPublisherList } from "../../routes";
import { getBookList, addBook, updateBook, deleteBook } from "../../routes";

class BookList extends Component {
  constructor() {
    super();
    this.state = {
      nameAuthor: "",
      nameGenre: "",
      namePublisher: "",
      id: "",
      idRegister: true,
      titulo: "",
      dtlancamento: "",
      author_id: "",
      genre_id: "",
      publisher_id: "",
      editDisabled: false,
      Books: [],
      Authors: [],
      Genres: [],
      Publishers: []
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  

  newMethod() {
    this.getAuthors();
    this.getGenres();
    this.getPublishers();
  }

  componentDidMount() {
    this.getAll();
    this.newMethod();
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };


  onSubmit = e => {// Função para adicionar um registro na tabela
    e.preventDefault();

    addBook(
      this.state.titulo,
      this.state.dtlancamento,
      this.state.author_id,
      this.state.genre_id,
      this.state.publisher_id
    ).then(() => {
      this.getAll();
      this.successAlert("Livro cadastrado com sucesso!");
    });
    this.setState({
      titulo: "",
      dtlancamento: "",
      author_id: "",
      genre_id: "",
      publisher_id: ""
    });
  };


  onUpdate = e => {// Atualiza um dado especifico da tabela
    e.preventDefault();
    updateBook(
      this.state.titulo,
      this.state.dtlancamento,
      this.state.author_id,
      this.state.genre_id,
      this.state.publisher_id,
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


  onShow = (Book, e) => {// Exibe os dados do elemento especifico
    e.preventDefault();
    this.setState({
      titulo: Book.titulo,
      dtlancamento: Book.dtlancamento,
      author_id: Book.author_id,
      genre_id: Book.genre_id,
      publisher_id: Book.publisher_id
    });
  };


  onDelete = (val, e) => {// Exclui um dado da tabela
    e.preventDefault();
    deleteBook(val)
    this.getAll();
  };


  getAll = () => {// Retorna todos os dados da Tabela
    getBookList().then(data => {
      this.setState(
        {
          titulo: "",
          dtlancamento: "",
          author_id: "",
          genre_id: "",
          publisher_id: "",
          Books: [...data]
        },
        () => {
          console.log(this.state.Books);
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
      titulo: "",
      dtlancamento: "",
      author_id: "",
      genre_id: "",
      publisher_id: "",
      editDisabled: false
    });
  };


  onEdit = (Bookid, e) => {// Abre o formulario no modo de edição e exibe os dados atuais
    e.preventDefault();
    this.onToogleOpen();

    var data = [...this.state.Books];
    data.forEach(Book => {
      if (Book.id === Bookid) {
        this.setState({
          toogleOpen: true,
          id: Book.id,
          titulo: Book.titulo,
          dtlancamento: Book.dtlancamento,
          author_id: Book.author_id,
          genre_id: Book.genre_id,
          publisher_id: Book.publisher_id,
          editDisabled: true
        });
      }
    });
  };


  onCancelEdit = e => {// Fecha o formulario de edição e limpa os campos
    e.preventDefault();
    this.setState({
      toogleOpen: true,
      titulo: "",
      dtlancamento: "",
      author_id: "",
      genre_id: "",
      publisher_id: "",
      editDisabled: false
    });
  };


  getAuthors = () => {// Pega a lista de Autores
    getAuthorList().then(data => {
      this.setState(
        {
          Authors: [...data]
        },
        () => {
          console.log(this.state.Authors);
        }
      );
    });
  };

  getGenres = () => {// Pegar a lista de Gêneros Literários
    getGenreList().then(data => {
      this.setState(
        {
          Genres: [...data]
        },
        () => {
          console.log(this.state.Genres);
        }
      );
    });
  };

  getPublishers = () => {// Pega a lista de Editoras
    getPublisherList().then(data => {
      this.setState(
        {
          Publishers: [...data]
        },
        () => {
          console.log(this.state.Publishers);
        }
      );
    });
  };


  authorShowParams(authorId) {
    this.state.Authors.forEach(Author => {
      if (Author.id === authorId) {
        // eslint-disable-next-line react/no-direct-mutation-state
        this.state.nameAuthor = Author.nome;
      }
    });
  }

  genreShowParams(genreId) {
    this.state.Genres.forEach(Genre => {
      if (Genre.id === genreId) {
        // eslint-disable-next-line react/no-direct-mutation-state
        this.state.nameGenre = Genre.genero;
      }
    });
  }


  publisherShowParams(publisherId) {
    this.state.Publishers.forEach(Publisher => {
      if (Publisher.id === publisherId) {
        // eslint-disable-next-line react/no-direct-mutation-state
        this.state.namePublisher = Publisher.nome;
      }
    });
  }


  successAlert = msg => {// Mensagem de sucesso
    ToastsStore.success(msg);
  };


  modalContent() {// Estrutura da Model de exibição
    return (
      <div>
        <div className="modal-header">
          <h4>
            {this.state.titulo} - {this.state.dtlancamento}
          </h4>
          <button type="button" className="close" data-dismiss="modal">
            &times;
          </button>
        </div>
        <div className="modal-body">
          <ul>
            {this.genreShowParams(this.state.genre_id)}
            <li className="text-primary">Gênero: {this.state.nameGenre}</li>

            {this.authorShowParams(this.state.author_id)}
            <li className="text-primary">Autor(a): {this.state.nameAuthor}</li>

            {this.publisherShowParams(this.state.publisher_id)}
            <li className="text-primary">
              Editora: {this.state.namePublisher}
            </li>
          </ul>
        </div>
      </div>
    );
  }

  render() {
    return (
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
                <div className="col-md-9">
                  <h4 htmlFor="titulo">Título:</h4>
                  <div>
                    <input
                      type="text"
                      className="form-control"
                      id="titulo"
                      name="titulo"
                      value={this.state.titulo || ""}
                      onChange={this.onChange.bind(this)}
                      maxLength="100"
                      required
                    />
                  </div>
                </div>

                <div className="col-md-3">
                  <h4 htmlFor="dtlancamento">Data de Lançamento:</h4>
                  <input
                    type="date"
                    className="form-control"
                    id="dtlancamento"
                    name="dtlancamento"
                    value={this.state.dtlancamento || ""}
                    onChange={this.onChange.bind(this)}
                    required
                  />
                </div>
              </div>

              <br></br>
              <div className="row">
                <div className="col-md-4">
                  <a href="/author" className="text-dark text-decoration-none">
                    <span className="btn btn-success btn-sm mr-2 mb-1">
                      <i className="fa fa-plus"></i>
                    </span>
                    <span className="h4" htmlFor="author_id">
                      Autor:
                    </span>
                  </a>
                  <select
                    required
                    className="form-control"
                    id="author_id"
                    name="author_id"
                    value={this.state.author_id || ""}
                    onChange={this.onChange.bind(this)}
                  >
                    <option value="">Autor</option>
                    {this.state.Authors.map((Author, index) => (
                      <option
                        key={index}
                        value={Author.id}
                        label={Author.nome}
                      />
                    ))}
                  </select>
                </div>

                <div className="col-md-4">
                  <a href="/genre" className="text-dark text-decoration-none">
                    <span className="btn btn-success btn-sm mr-2 mb-1">
                      <i className="fa fa-plus"></i>
                    </span>
                    <span className="h4" htmlFor="author_id">
                      Gênero Literário:
                    </span>
                  </a>
                  <select
                    required
                    className="form-control"
                    id="genre_id"
                    name="genre_id"
                    value={this.state.genre_id || ""}
                    onChange={this.onChange.bind(this)}
                  >
                    <option value="">Gênero</option>
                    {this.state.Genres.map((Genre, index) => (
                      <option
                        key={index}
                        value={Genre.id}
                        label={Genre.genero}
                      />
                    ))}
                  </select>
                </div>

                <div className="col-md-4">
                  <a
                    href="/publisher"
                    className="text-dark text-decoration-none"
                  >
                    <span className="btn btn-success btn-sm mr-2 mb-1">
                      <i className="fa fa-plus"></i>
                    </span>
                    <span className="h4" htmlFor="author_id">
                      Editora:
                    </span>
                  </a>
                  <select
                    required
                    className="form-control"
                    id="publisher_id"
                    name="publisher_id"
                    value={this.state.publisher_id || ""}
                    onChange={this.onChange.bind(this)}
                  >
                    <option value="">Editora</option>
                    {this.state.Publishers.map((Publisher, index) => (
                      <option
                        key={index}
                        value={Publisher.id}
                        label={Publisher.nome}
                      />
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <br></br>
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
        <div className="container pb-5">
          <table className="table bg-light Regular shadow mb-5">
            <thead className="thead-dark">
              <tr>
                <th className="text-left">Título</th>
                <th className="text-left">Lançamento</th>
                <th className="text-center">Autor</th>
                <th className="text-center">Gênero</th>
                <th className="text-center">Editora</th>
                <th className="text-center">Opções</th>
              </tr>
            </thead>
            <tbody>
              {this.state.Books.map((Book, index) => (
                <tr key={index}>
                  <td className="text-left align-middle">{Book.titulo}</td>

                  <td className="text-left align-middle">
                    {Book.dtlancamento}
                  </td>

                  <td className="text-center align-middle">
                    Id: {Book.author_id}
                  </td>

                  <td className="text-center align-middle">
                    Cod: {Book.genre_id}
                  </td>
                  <td className="text-center align-middle">
                    Cod: {Book.publisher_id}
                  </td>

                  <td className="text-center align-middle">
                    <div className="btn-group m-0 p-0">
                      <button
                        href=""
                        className="btn btn-info optionButtons"
                        disabled={this.state.editDisabled}
                        onClick={this.onShow.bind(this, Book)}
                        data-toggle="modal"
                        data-target="#myModal"
                      >
                        <i className="fas fa-eye"></i>
                      </button>
                      <button
                        className="btn btn-primary optionButtons"
                        disabled={this.state.editDisabled}
                        onClick={this.onEdit.bind(this, Book.id)}
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
                        className="btn btn-danger optionButtons"
                        disabled={this.state.editDisabled}
                        onClick={this.onDelete.bind(this, Book.id)}
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
  }
}

export default BookList;
