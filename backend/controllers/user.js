const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passwordValidator = require('../middleware/passwordValidator');
const sanitize = require("mongo-sanitize");

const User = require('../models/User');

exports.signup = (req, res, next) => {
  const email = sanitize(req.body.email);
  const password = sanitize(req.body.password);
  if (!passwordValidator.validate(password)) {
    return res.status(400).json({ error: error });
  }
  bcrypt.hash(password, 10)
    .then(hash => {
      const user = new User({
        email: email,
        password: hash
      });
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  const email = sanitize(req.body.email);
  const password = sanitize(req.body.password);
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: error | 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: error | 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id},
              'WXdCEMvwAoO1vcrxptW00i8NGHIOhywyQ039A1Ns7tbkdw2q2b78S5wo2rnTYGEdwu3fGMTGpfqoNUDc',
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }))
    })
    .catch(error => res.status(500).json({ error }));
};