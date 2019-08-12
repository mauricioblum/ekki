import React, { useState } from 'react';

import {
  Container,
  Box,
  Typography,
  Grid,
  FormControl,
  TextField,
  Button,
} from '@material-ui/core';
import { LoginBox } from './styles';

export default function Home() {
  const [inputCpf, setInputCpf] = useState();
  return (
    <Container maxWidth="sm">
      <Box my={4} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
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
                  <Button variant="outlined" color="primary" fullWidth>
                    Entrar
                  </Button>
                </Box>
              </FormControl>
            </LoginBox>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
