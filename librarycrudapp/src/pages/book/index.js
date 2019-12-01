import React, { Component } from "react";
import { ToastsContainer, ToastsStore } from "react-toasts";
import { getAuthorList, getGenreList, getPublisherList } from "../../routes";
import { getBookList, addBook, updateBook, deleteBook } from "../../routes";

class BookList extends Component {
  constructor() {
    super();
    this.state = {
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
  componentDidMount() {
    this.getAll();
    this.getAuthors();
    this.getGenres();
    this.getPublishers();
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  getAll = () => {
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

  getAuthors = () => {
    getAuthorList().then(data => {
      this.setState(
        {
          Authors: [...data]
        },
        () => {
          console.log(this.state.Books);
        }
      );
    });
  };

  getGenres = () => {
    getGenreList().then(data => {
      this.setState(
        {
          Genres: [...data]
        },
        () => {
          console.log(this.state.Books);
        }
      );
    });
  };

  getPublishers = () => {
    getPublisherList().then(data => {
      this.setState(
        {
          Publishers: [...data]
        },
        () => {
          console.log(this.state.Books);
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

  onUpdate = e => {
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

  onShow = (Book, e) => {
    e.preventDefault();
    this.setState({
      titulo: Book.titulo
    });
  };

  onEdit = (Bookid, e) => {
    e.preventDefault();
    this.onToogleOpen();

    var data = [...this.state.Books];
    data.forEach((Book, index) => {
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

  onCancelEdit = e => {
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

  onDelete = (val, e) => {
    e.preventDefault();
    deleteBook(val);
    this.getAll();
  };

  onNew = e => {
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
                  <h4>
                    {this.state.titulo} - {this.state.dtlancamento}
                  </h4>
                  <button type="button" className="close" data-dismiss="modal">
                    &times;
                  </button>
                </div>
                <ul className="modal-body">
                  <li className="text-primary">{this.state.genre_id}</li>
                  <li className="text-primary">{this.state.author_id}</li>
                  <li className="text-primary">{this.state.publisher_id}</li>
                </ul>
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
          <form
            onSubmit={!this.state.editDisabled ? this.onSubmit : this.onUpdate}
            className="needs-validation"
          >
            <br></br>
            <br></br>
            <div className="form-group">
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
                  <h4 htmlFor="author_id">Autor:</h4>
                  <select
                    className="form-control"
                    id="author_id"
                    name="author_id"
                    value={this.state.author_id || ""}
                    onChange={this.onChange.bind(this)}
                    required
                  >
                    {this.state.Authors.map((Author, index) => (
                      <option key={index} value={Author.id} label={Author.nome}/>
                    ))}
                  </select>
                </div>

                <div className="col-md-4">
                  <h4 htmlFor="genre_id">Gênero Literário:</h4>
                  <select
                    className="form-control"
                    id="genre_id"
                    name="genre_id"
                    value={this.state.genre_id || ""}
                    onChange={this.onChange.bind(this)}
                    required
                  >
                    {this.state.Genres.map((Genre, index) => (
                      <option key={index} value={Genre.id} label={Genre.genero}/>
                    ))}
                  </select>
                </div>

                <div className="col-md-4">
                <h4 htmlFor="publisher_id">Editora:</h4>
                <select
                    className="form-control"
                    id="publisher_id"
                    name="publisher_id"
                    value={this.state.publisher_id || ""}
                    onChange={this.onChange.bind(this)}
                    required
                  >
                    {this.state.Publishers.map((Publisher, index) => (
                      <option key={index} value={Publisher.id} label={Publisher.nome}/>
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
        <div className="container">
          <table className="table bg-light Regular shadow mb-5">
            <thead className="thead-dark">
              <tr>
                <th className="text-left">Título</th>
                <th className="text-left">Data de Lançamento</th>
                <th className="text-left">Autor</th>
                <th className="text-left">Gênero</th>
                <th className="text-left">Editora</th>
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
                  <td className="text-left align-middle">{Book.author_id}</td>
                  <td className="text-left align-middle">{Book.genre_id}</td>
                  <td className="text-left align-middle">
                    {Book.publisher_id}
                  </td>

                  <td className="text-center align-middle">
                    <div className="btn-group m-0 p-0">
                      <button
                        href=""
                        className="btn btn-primary"
                        disabled={this.state.editDisabled}
                        onClick={this.onShow.bind(this, Book)}
                        data-toggle="modal"
                        data-target="#myModal"
                      >
                        Exibir
                      </button>
                      <button
                        className="btn btn-info text-light"
                        disabled={this.state.editDisabled}
                        onClick={this.onEdit.bind(this, Book.id)}
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
                        onClick={this.onDelete.bind(this, Book.id)}
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

export default BookList;
