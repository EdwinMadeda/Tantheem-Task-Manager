import Cookies from 'js-cookie';

const get = (name) => {
  let obj = {};
  try {
    obj = Cookies.get(name) ? JSON.parse(Cookies.get(name)) : {};
  } catch (err) {
    Cookies.remove(name);
  }
  return obj;
};

const getStr = (name) => {
  let str = '';
  try {
    str = Cookies.get(name) ?? '';
  } catch (err) {
    Cookies.remove(name);
  }
  return str;
};

const set = (name, value) => {
  Cookies.set(name, JSON.stringify(value), {
    sameSite: 'None',
    secure: true,
  });
};

const remove = (name) => {
  Cookies.remove(name, {
    sameSite: 'None',
    secure: true,
  });
};

const jsCookie = { get, getStr, set, remove };

export default jsCookie;
