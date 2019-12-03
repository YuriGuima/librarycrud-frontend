import axios from 'axios';
import { ToastsStore } from "react-toasts";


//Registro
export const register = newUser => {
  return axios
  .post('http://127.0.0.1:8000/api/register', newUser, {
    headers: { "Content-type": "application/json" }
  })
  .then(res => {
    alert("Cadastro realizado com sucesso!");
    console.log(res)
  })
  .catch(err => {
    alert("Por favor, verifique se os campos estão preenchidos corretamente.");
    console.log(err)
  })
}


export const login = user => {
  return axios
  .post('http://127.0.0.1:8000/api/login', {
    email: user.email,
    password: user.password
  },
  {
    headers: { "Content-Type": "application/json" }
  })
  .then(res => {
    localStorage.setItem('usertoken',res.data.token)
    console.log(res)
  })
  .catch(err => {
    console.log(err)
  })
}


export const getProfile = () => {
  return axios
  .get('http://127.0.0.1:8000/api/profile', {
    headers: { Authorization: `Bearer ${localStorage.usertoken}` }
  })
  .then(res => {
    console.log(res)
    return res.data
  })
  .catch(err => {
    console.log(err)
  })
}



// Rotas do Autor
export const getAuthorList = () => {
  return axios
    .get(`http://127.0.0.1:8000/api/author`, {
      headers: { "Content-type": "application/json" }
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
      document.location.reload(true);
      console.log(res);
    })
    .catch(err => {
      ToastsStore.error("Autor registrado em um Livro!");
      console.log(err);
    });
};


// Rotas do Gênero
export const getGenreList = () => {
  return axios
    .get(`http://127.0.0.1:8000/api/genre`, {
      headers: { "Content-type": "application/json" }
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
      document.location.reload(true);
      console.log(res);
    })
    .catch(err => {
      ToastsStore.error("Genero Literario registrado em um Livro!");
      console.log(err);
    });
};


// Rotas da Editora
export const getPublisherList = () => {
  return axios
    .get(`http://127.0.0.1:8000/api/publisher`, {
      headers: { "Content-type": "application/json" }
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
      document.location.reload(true);
      console.log(res);
    })
    .catch(err => {
      ToastsStore.error("Editora registrada em um Livro!");
      console.log(err);
    });
};


// Rotas do Livro
export const getBookList = () => {
  return axios
    .get(`http://127.0.0.1:8000/api/book`, {
      headers: { "Content-type": "application/json" }
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
      document.location.reload(true);
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
};