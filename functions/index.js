const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const cors = require("cors")({origin: true});
const yenv = require("yenv");
const env = yenv("env.yaml", {env: "production"});
const fs = require("fs");
const moment = require("moment");
admin.initializeApp();

/**
 * Here we're using Gmail to send
 */
const transporter = nodemailer.createTransport({
  service: env.service,
  auth: {
    user: env.user,
    pass: env.pass,
  },
});

exports.sendPasswordNewUser = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    // getting dest email by query string
    const body = req.body;

    fs.readFile("./newUser.html", function(err, data) {
      if (err) {
        console.error("Could not open file: %s", err);
        process.exit(1);
      }
      let html = data.toString("utf8");
      const titulo = `Credênciais de acesso -
       ${moment().format("DD-MM-YYYY HH:mm")} - Acelera Ariguaina`;

      // muda os dados na string para formatar o envio de e-mail
      html = html.split("{obj.nome}").join(body.nome);
      html = html.split("{obj.dia}")
          .join(moment().format("DD/MM/YYYY HH:mm:ss"));

      html = html.split("{obj.email}").join(body.email);
      html = html.split("{obj.senha}").join(body.senha);

      const mailOptions = {
        from: env.user,
        to: body.destinatario,
        subject: titulo,
        html: html,
      };

      // returning result
      return transporter.sendMail(mailOptions, (erro, info) => {
        if (erro) {
          return res.send({
            status: false,
            message: "Erro ao enviar email ao novo usuário!",
            error: erro.toString(),
          });
        }
        return res.send({status: true, message: "Email enviado com sucesso!"});
      });
    });
  });
});
