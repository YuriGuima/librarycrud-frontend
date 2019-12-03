import React, { Component } from "react";
import "./styles.css";

class Home extends Component {
  render() {
    return (
      <div className=".container-fluid mb-5 pb-5">
        <div className="container mt-4">
          <div className="text-center">
            <h1>Seja Bem Vindo</h1>
            <h4>
              ao <strong>LibraryCrud!</strong>
            </h4>
          </div>
          <br></br>
          <br></br>
          <div className="col-md-12 row">
            
            <div className="col-md-7">
              <h2>CADASTRO</h2>
              <h5>Create</h5>
              <p>
                Faça cadastro de Autores, Editoras, Gêneros e Livros clicando no botão <button className="btn btn-success btn-sm rounded-0">Novo</button>.
              </p>
              <br></br>
              <h2>EDIÇÃO</h2>
              <h5>Update</h5>
              <p>Para alterar qualquer campo de qualquer categoria basta clicar em <i className="fas fa-edit btn btn-primary btn-sm"></i>.</p>
            </div>

            <div className="col-md-5">
            <h2>VISUALIZAÇÃO</h2>
              <h5>Read</h5>
              <p>
                Clique no botão <i className="fas fa-eye btn btn-info btn-sm"></i> para ver os dados completos.
              </p>
              <br></br>
              <h2>EXCLUSÃO</h2>
              <h5>Delete</h5>
              <p>Para excluir basta clicar no botão <i className="fas fa-times btn btn-danger btn-sm"></i>.</p>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default Home;
