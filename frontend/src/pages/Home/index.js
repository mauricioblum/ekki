import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Box,
  Typography,
  Grid,
  FormControl,
  TextField,
  Button,
} from '@material-ui/core';
import { Types as UserTypes } from '../../store/ducks/user';

import { LoginBox, AppContainer } from './styles';

export default function Home({ history }) {
  const [inputCpf, setInputCpf] = useState('');
  const dispatch = useDispatch();

  async function getUser(cpf) {
    dispatch({ type: UserTypes.GET_USER_REQUEST, cpf, history });
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
              <Button
                type="submit"
                variant="outlined"
                color="primary"
                fullWidth
                onClick={() => getUser(inputCpf)}
              >
                Entrar
              </Button>
            </Box>
          </FormControl>
        </LoginBox>
      </Grid>
    </AppContainer>
  );
}
