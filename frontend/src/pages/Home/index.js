import React, { useState } from 'react';

import {
  Box,
  Typography,
  Grid,
  FormControl,
  TextField,
  Button,
} from '@material-ui/core';
import { getUserByCpf } from '../../services/userService';
import { LoginBox, AppContainer } from './styles';

export default function Home({ history }) {
  const [inputCpf, setInputCpf] = useState('');

  async function getUser(cpf) {
    const user = await getUserByCpf(cpf);
    console.log(user);

    history.push(`/wallet/${user.id}`);
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
