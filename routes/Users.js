const auth = require("../middlewares/auth");
const controller = require("../controllers/Users");

const UserRoutes = (app) => {
  app.post("/register", (req, res) => {
    return controller.register(req, res);
  });

  app.post("/login", (req, res) => {
    //res.render("login");
    return controller.login(req, res);
  });

  app.get("/welcome", auth, (req, res) => {
    //res.status(200).send("Bienvenido");
    res.status(200).render("home", { titulo: "Mi título dinámico" });
  });

  app.use((req, res, next) => {
    res.status(404).render("404", {
      titulo: "404",
      descripcion: "No se encontró la página que buscas",
    });
  });
};

module.exports = UserRoutes;
