import React, { Component } from "react";
import List from "./components/author/AuthorList";

function App() {
  return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 mx-auto">
            <h1 className="text-center">Biblioteca</h1>
            <List />
          </div>
        </div>
      </div>
    );
}

export default App;
