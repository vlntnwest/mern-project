module.exports.signUpErrors = (err) => {
  let errors = { pseudo: "", email: "", passord: "" };
  if (err.message.includes("pseudo"))
    errors.pseudo = "Pseudo incorrect ou déjà pris";
  if (err.message.includes("email"))
    errors.email = "Email incorrect ou déjà pris";
  if (err.message.includes("password"))
    errors.password = "Le mot de passe doit faire 6 caractères minimum";

  if (err.code === 11000 && Object.keys(err.keyValue)["pseudo"])
    errors.pseudo = "Ce pseudo est déjà utilisé";

  if (err.code === 11000 && Object.keys(err.keyValue)["email"])
    errors.email = "Cet email est déjà utilisé";

  return errors;
};

module.exports.signInErrors = (err) => {
  let errors = { email: "", passord: "" };

  if (err.message.includes("email")) errors.email = "Email inconnu";
  if (err.message.includes("password"))
    errors.password = "Le mot de passe ne correspond pas";

  return errors;
};

module.exports.uploadErrors = (err) => {
  let errors = { format: "", maxSize: "" };

  if (err.message.includes("Invalid file"))
    errors.format = "Format incompatible";

  if (err.message.includes("Max size"))
    errors.maxSize = "Le fichier dépasse 500ko";
};
