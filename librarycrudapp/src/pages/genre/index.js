import React, { Component } from "react";
import Offline from "../../components/offlinepage"
import './styles.css';
import { ToastsContainer, ToastsStore } from "react-toasts";
import ModalShow from "../../components/modal";
import { getGenreList, addGenre, updateGenre, deleteGenre } from "../../routes";

class GenreList extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      idRegister: true,
      genero: "",
      editDisabled: false,
      Genres: []
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


  onSubmit = e => {
    e.preventDefault();

    addGenre(this.state.genero).then(() => {
      this.getAll();
      this.successAlert("Gênero cadastrado com sucesso!");
    });
    this.setState({
      genero: ""
    });
  };


  onUpdate = e => {
    e.preventDefault();
    updateGenre(this.state.genero, this.state.id).then(() => {
      this.successAlert("Dados alterados com sucesso!");
      this.onToogleClose();
      this.getAll();
      this.setState({
        editDisabled: false
      });
    });
    this.getAll();
  };


  onShow = (Genre, e) => {
    e.preventDefault();
    this.setState({
      genero: Genre.genero
    });
  };


  onDelete = (val, e) => {
    e.preventDefault();
    deleteGenre(val);
    this.getAll();
  };


  getAll = () => {
    getGenreList().then(data => {
      this.setState(
        {
          genero: "",
          Genres: [...data]
        },
        () => {
          console.log(this.state.Genres);
        }
      );
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


  onNew = e => {
    e.preventDefault();
    this.onToogleOpen();
    this.setState({
      toogleOpen: true,
      id: "",
      genero: "",
      editDisabled: false
    });
  };


  onEdit = (Genreid, e) => {
    e.preventDefault();
    this.onToogleOpen();

    var data = [...this.state.Genres];
    data.forEach((Genre, index) => {
      if (Genre.id === Genreid) {
        this.setState({
          toogleOpen: true,
          id: Genre.id,
          genero: Genre.genero,
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
      genero: "",
      editDisabled: false
    });
  };


  modalContent() {
    return (
      <div>
        <div className="modal-header">
          <h4>Gênero Literário</h4>
          <button type="button" className="close" data-dismiss="modal">
            &times;
          </button>
        </div>
        <div className="modal-header">
          <h4 className="contentModal">{this.state.genero}</h4>
        </div>
      </div>
    );
  }


  successAlert = msg => {
    ToastsStore.success(msg);
  };


  render() {
    const principal = (
      <div className=".container-fluid">
        <ModalShow content={this.modalContent()}/>
        <ToastsContainer store={ToastsStore} />
        <div className="collapse container" id="navbarToggleExternalContent">
          <form
            onSubmit={!this.state.editDisabled ? this.onSubmit : this.onUpdate}
            className="needs-validation mt-5 mb-5"
          >
            <div className="form-group mb-5">
              <div className="row">
                <div className="col-md-12 row">
                  <h4 htmlFor="genero" className="col-md-2 text-center">
                    Gênero:
                  </h4>
                  <div className="col-md-10 pr-0">
                    <input
                      type="text"
                      className="form-control"
                      id="genero"
                      name="genero"
                      value={this.state.genero || ""}
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
          <table className="table bg-light shadow mb-5">
            <thead className="thead-dark">
              <tr>
                <th className="text-center">Gênero</th>
                <th className="text-right pr-5">Opções</th>
              </tr>
            </thead>
            <tbody>
              {this.state.Genres.map((Genre, index) => (
                <tr key={index}>
                  <td className="text-center align-middle">{Genre.genero}</td>

                  <td className="text-right align-middle">
                    <div className="btn-group m-0 p-0">
                      <button
                        href=""
                        className="btn btn-info optionButtons"
                        disabled={this.state.editDisabled}
                        onClick={this.onShow.bind(this, Genre)}
                        data-toggle="modal"
                        data-target="#myModal"
                      >
                        <i className="fas fa-eye"></i>
                      </button>
                      <button
                        className="btn btn-primary optionButtons"
                        disabled={this.state.editDisabled}
                        onClick={this.onEdit.bind(this, Genre.id)}
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
                        onClick={this.onDelete.bind(this, Genre.id)}
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

export default GenreList;
