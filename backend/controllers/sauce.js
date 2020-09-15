const Sauce = require('../models/Sauce')

exports.createSauce = (req, res, next) => {
  const sauce = [
    {
      name: 'mayonnaise'
    },
    {
      name: 'ketchup'
    }
  ];
  res.status(200).json(sauce);
};