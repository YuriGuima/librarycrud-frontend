import axios from 'axios';

// Rotas do Autor
export const getAuthorList = () => {
  return axios
    .get(`http://127.0.0.1:8000/api/author`, {
      headers: { "Contente-type": "application/json" }
    })
    .then(res => {
      return res.data;
    });
};

export const addAuthor = (nome,dtnascimento,sexo,nacionalidade) => {
  return axios
    .post(
      "http://127.0.0.1:8000/api/author",
      {
        nome: nome,
        dtnascimento: dtnascimento,
        sexo: sexo,
        nacionalidade: nacionalidade
      },
      {
        headers: { "Content-Type": "application/json" }
      }
    )
    .then(res => {
      console.log(res);
    });
};


export const updateAuthor = (nome,dtnascimento,sexo,nacionalidade,id) => {
  return axios
    .put(`http://127.0.0.1:8000/api/author/${id}`,
      {
        id: id,
        nome: nome,
        dtnascimento: dtnascimento,
        sexo: sexo,
        nacionalidade: nacionalidade
      },
      {
        headers: { "Content-Type": "application/json" }
      }
    )
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
};


export const deleteAuthor = id => {
  axios
    .delete(`http://127.0.0.1:8000/api/author/${id}`, {
      headers: { "Content-Type": "application/json" }
    })
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
};

export const showAuthor = id => {
  axios
    .get(`http://127.0.0.1:8000/api/author/${id}`,{
      headers: { "Contente-type": "application/json" }
    })
    .then(res => {
      return res.data;
    });
};


// Rotas do Gênero
export const getGenreList = () => {
  return axios
    .get(`http://127.0.0.1:8000/api/genre`, {
      headers: { "Contente-type": "application/json" }
    })
    .then(res => {
      return res.data;
    });
};

export const addGenre = (genero) => {
  return axios
    .post(
      "http://127.0.0.1:8000/api/genre",
      {
        genero: genero
      },
      {
        headers: { "Content-Type": "application/json" }
      }
    )
    .then(res => {
      console.log(res);
    });
};


export const updateGenre = (genero,id) => {
  return axios
    .put(`http://127.0.0.1:8000/api/genre/${id}`,
      {
        id: id,
        genero: genero
      },
      {
        headers: { "Content-Type": "application/json" }
      }
    )
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
};


export const deleteGenre = id => {
  axios
    .delete(`http://127.0.0.1:8000/api/genre/${id}`, {
      headers: { "Content-Type": "application/json" }
    })
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
};

export const showGenre = id => {
  axios
    .get(`http://127.0.0.1:8000/api/genre/${id}`,{
      headers: { "Contente-type": "application/json" }
    })
    .then(res => {
      return res.data;
    });
};


// Rotas da Editora
export const getPublisherList = () => {
  return axios
    .get(`http://127.0.0.1:8000/api/publisher`, {
      headers: { "Contente-type": "application/json" }
    })
    .then(res => {
      return res.data;
    });
};

export const addPublisher = (nome) => {
  return axios
    .post(
      "http://127.0.0.1:8000/api/publisher",
      {
        nome: nome
      },
      {
        headers: { "Content-Type": "application/json" }
      }
    )
    .then(res => {
      console.log(res);
    });
};


export const updatePublisher = (nome,id) => {
  return axios
    .put(`http://127.0.0.1:8000/api/publisher/${id}`,
      {
        id: id,
        nome: nome
      },
      {
        headers: { "Content-Type": "application/json" }
      }
    )
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
};


export const deletePublisher = id => {
  axios
    .delete(`http://127.0.0.1:8000/api/publisher/${id}`, {
      headers: { "Content-Type": "application/json" }
    })
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
};

export const showPublisher = id => {
  axios
    .get(`http://127.0.0.1:8000/api/publisher/${id}`,{
      headers: { "Contente-type": "application/json" }
    })
    .then(res => {
      return res.data;
    });
};


// Rotas do Livro
export const getBookList = () => {
  return axios
    .get(`http://127.0.0.1:8000/api/book`, {
      headers: { "Contente-type": "application/json" }
    })
    .then(res => {
      return res.data;
    });
};


export const addBook = (titulo,dtlancamento,authorid,genreid,publisherid) => {
  return axios
    .post(
      "http://127.0.0.1:8000/api/book",
      {
        titulo: titulo,
        dtlancamento: dtlancamento,
        author_id: authorid,
        genre_id: genreid,
        publisher_id: publisherid
      },
      {
        headers: { "Content-Type": "application/json" }
      }
    )
    .then(res => {
      console.log(res);
    });
};


export const updateBook = (titulo,dtlancamento,authorid,genreid,publisherid,id) => {
  return axios
    .put(`http://127.0.0.1:8000/api/book/${id}`,
      {
        id: id,
        titulo: titulo,
        dtlancamento: dtlancamento,
        author_id: authorid,
        genre_id: genreid,
        publisher_id: publisherid
      },
      {
        headers: { "Content-Type": "application/json" }
      }
    )
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
};


export const deleteBook = id => {
  axios
    .delete(`http://127.0.0.1:8000/api/book/${id}`, {
      headers: { "Content-Type": "application/json" }
    })
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
};

export const showBook = id => {
  axios
    .get(`http://127.0.0.1:8000/api/book/${id}`,{
      headers: { "Contente-type": "application/json" }
    })
    .then(res => {
      return res.data;
    });
};