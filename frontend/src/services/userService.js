import api from './api';

async function getUserByCpf(cpf) {
  try {
    const user = await api.get(`/users?cpf=${cpf}`);

    return user.data[0];
  } catch (err) {
    console.log(err.message);
  }
  return null;
}

export { getUserByCpf };
