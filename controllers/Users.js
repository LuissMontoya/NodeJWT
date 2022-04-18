const UsersData = require("../dataModels/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

if (process.env.NODE_ENV !== "production") {
  require("dotenv/config");
}

const { KEY } = process.env;
let newUser = {};
let users = [];

const register = async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).send("Debe indicar el nombre, email y el password");
    }
    //console.log(res.body);
    const { name, email, password } = req.body;

    if (!(email && name && password)) {
      res.status(400).send("Debe indicar el nombre, email y el password");
    }

    const userExists = users.find((user) => user.email === email);

    if (userExists) {
      res
        .status(400)
        .send(
          "El usuario existe, por favor inicia sesión con tus credenciales"
        );
    }

    const encryptedPassword = await bcrypt.hash(password, 10);
    newUser = UsersData.User(name, email, encryptedPassword);

    users = [...users, newUser];
  } catch (error) {
    console.log("Ha ocurrido un Error", error);
  }
  return res.status(201).json(newUser);
};



const login = async (req, res) => {
  console.log("login", req.body);
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(400).send("Indica el nombre y la contraseña");
    }

    const user = users.find((us) => us.email === email);

    console.log(user, users);

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ email }, KEY, { expiresIn: "2h" });
      user.token = token;
      res.status(200).json(user);
    } else {
      res.status(403).send("Credenciales inválidas");
    }
  } catch (error) {
    console.log("Ha ocurrido un error", error);
  }
};

module.exports = { register, login };
