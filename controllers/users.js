const { response, request } = require('express');



const userGet = (req = request, res = response, next) => {

  const { name = "Not name", page = 1, } = req.query;

  res.json({
    msj: "get api -> controller",
    name,
    page,
  });
}

const userPut = (req = request, res = response, next) => {

  const { id } = req.params;

  res.json({
    msj: "put api -> controller",
    id
  });
}

const userPost = (req = request, res = response, next) => {

  const { nombre, edad } = req.body;

  res.json({
    msj: "post api -> controller",
    nombre,
    edad
  });
}

const userDelete = (req = request, res = response, next) => {
  res.json({
    msj: "delete api -> controller",
  });
}

const userPatch = (req = request, res = response, next) => {
  res.json({
    msj: "patch api -> controller",
  });
}

module.exports = {
  userGet,
  userPut,
  userPost,
  userDelete,
  userPatch
}