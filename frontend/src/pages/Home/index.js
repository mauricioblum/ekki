import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Typography,
  Grid,
  FormControl,
  TextField,
  Button,
  CircularProgress,
} from '@material-ui/core';
import { Types as UserTypes } from '../../store/ducks/user';
import api from '../../services/api';

import { LoginBox, AppContainer } from './styles';
import Signup from './Signup';
import { Toast } from '../../components/Toast';

export default function Home({ history }) {
  const [inputCpf, setInputCpf] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState('success');
  const [loading, setLoading] = useState(false);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  function handleCloseToast(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    setToastOpen(false);
  }

  async function getUser(cpf) {
    dispatch({ type: UserTypes.GET_USER_REQUEST, cpf, history });
  }

  function closeForm() {
    setFormOpen(false);
  }

  async function registerUser(cpf, name, phone) {
    setLoading(true);
    try {
      setFormOpen(false);
      await api.post(`/users`, {
        name,
        cpf,
        phone,
      });
      setToastVariant('success');
      setToastMessage('Usuário cadastrado com sucesso!');
      setLoading(false);
      setToastOpen(true);
    } catch (err) {
      setLoading(false);
      setToastOpen(true);
      setToastVariant('error');
      setToastMessage(`Erro: ${err.response.data.error.message}`);
    }
  }

  return (
    <AppContainer maxWidth="sm">
      <Grid container justify="center" spacing={2} alignItems="center">
        <LoginBox>
          <Box mb={4}>
            <Typography variant="h4" align="center">
              Bem vindo ao Ekki!
            </Typography>
          </Box>
          {!loading ? (
            <FormControl fullWidth>
              <TextField
                id="cpf"
                type="number"
                required
                label="Digite o CPF para fazer o Login"
                value={inputCpf}
                onChange={e => setInputCpf(e.target.value)}
              />
              <Box mt={4}>
                {!user.loading ? (
                  <>
                    <Button
                      type="submit"
                      variant="outlined"
                      color="primary"
                      fullWidth
                      onClick={() => getUser(inputCpf)}
                    >
                      Entrar
                    </Button>
                    <Box my={2}>
                      <Button
                        type="button"
                        variant="outlined"
                        color="primary"
                        fullWidth
                        onClick={() => setFormOpen(true)}
                      >
                        Novo Usuário? Cadastrar
                      </Button>
                    </Box>
                  </>
                ) : (
                  <Grid container justify="center" alignItems="center">
                    <Grid item>
                      <CircularProgress color="primary" />
                    </Grid>
                  </Grid>
                )}
              </Box>
            </FormControl>
          ) : (
            <Grid container justify="center" alignItems="center">
              <Grid item>
                <CircularProgress color="primary" />
              </Grid>
            </Grid>
          )}
        </LoginBox>
      </Grid>
      <Signup
        open={formOpen}
        handleClose={closeForm}
        handleAdd={registerUser}
      />
      <Toast
        open={toastOpen}
        handleClose={handleCloseToast}
        variantType={toastVariant}
        message={toastMessage}
      />
    </AppContainer>
  );
}

Home.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func,
  }).isRequired,
};
