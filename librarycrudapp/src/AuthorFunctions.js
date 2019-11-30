import axios from 'axios';

export const getList = () => {
  return axios
    .get(`http://127.0.0.1:8000/api/author`, {
      headers: { "Contente-type": "application/json" }
    })
    .then(res => {
      return res.data;
    });
};

export const addItem = (nome,dtnascimento,sexo,nacionalidade) => {
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


export const updateItem = (nome,dtnascimento,sexo,nacionalidade,id) => {
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


export const deleteItem = id => {
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

export const showItem = id => {
  axios
    .get(`http://127.0.0.1:8000/api/author/${id}`,{
      headers: { "Contente-type": "application/json" }
    })
    .then(res => {
      return res.data;
    });
};

