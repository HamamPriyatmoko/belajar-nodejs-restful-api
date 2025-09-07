import userService from '../service/user-service.js';

const register = async (req, res, next) => {
  try {
    const result = await userService.register(req.body);
    res.status(200).json({ data: result });
  } catch (error) {
    // console.log(error);
    next(error);
  }
};
const login = async (req, res, next) => {
  try {
    const result = await userService.login(req.body);
    console.log(result.token);
    res
      .status(200)
      .cookie('session_token', result.token, {
        httpOnly: true,
        path: '/',
      })
      .json({ data: result });
  } catch (error) {
    // console.log(error);
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const username = req.user.username;
    console.log(username);
    const result = await userService.get(username);
    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const username = req.user.username;
    const request = req.body;
    request.username = username;

    const result = await userService.update(request);
    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    await userService.logout(req.user.username);
    res.status(200).clearCookie('session_token', { path: '/' }).json({ data: 'OK' });
  } catch (error) {
    next(error);
  }
};

export default {
  register,
  login,
  getUser,
  update,
  logout,
};
