const authenticate = async (req, res) => {
  const { info } = req.body;
  console.log('auth for ', info);
  const error = { userName: false, password: false };

  res.json(error);
};

const register = async (req, res) => {

  const { info } = req.body;
  console.log('signup for ', info);
  const error = { userName: true, password: info.password.trim() != info.confirmPassword };

  res.json(error);
}

module.exports = {
  authenticate,
  register
};
