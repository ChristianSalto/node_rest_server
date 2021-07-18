const { response, request } = require('express');
const bcryptjs = require('bcryptjs');


const User = require('../models/user');


// ------- GET ----------//
const userGet = async (req = request, res = response, next) => {

	// const { name = "Not name", page = 1, } = req.query;

	const { limit = 5, skip = 0 } = req.query;
	const query = { status: true };

	// const users = await User.find(query).skip(Number(skip)).limit(Number(limit));
	// const total = await User.countDocuments(query);

	const [total, users] = await Promise.all([
		User.countDocuments(query),
		User.find(query).skip(Number(skip)).limit(Number(limit))
	])

	res.json({
		total,
		users
	});
}


// ------- PUT ----------//
const userPut = async (req = request, res = response, next) => {

	const { id } = req.params;
	const { _id, password, google, email, ...rest } = req.body;

	// console.log(_id)

	if (password) {
		const salt = bcryptjs.genSaltSync();
		rest.password = bcryptjs.hashSync(password, salt);
	}

	const user = await User.findByIdAndUpdate(id, rest)

	res.json(user);
}


// ------- POST ----------//
const userPost = async (req = request, res = response, next) => {


	const { name, email, password, role } = req.body;
	const user = new User({ name, email, password, role });

	// Encriptar la contraseña
	const salt = bcryptjs.genSaltSync();
	user.password = bcryptjs.hashSync(password, salt);

	// Guardar en DB
	await user.save();

	res.json({
		msj: "post api -> controller",
		user,
	});
}



// ------- DELETE ----------//
const userDelete = async (req = request, res = response, next) => {


	const { id } = req.params
	// const user = await User.findByIdAndDelete(id)

	const uid = req.uid

	const user = await User.findByIdAndUpdate(id, { status: false })

	res.json({ user, uid });
}



// ------- PATCH ----------//
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