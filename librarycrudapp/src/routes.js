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