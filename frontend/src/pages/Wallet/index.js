import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  Typography,
  Grid,
  FormControl,
  TextField,
  Button,
} from '@material-ui/core';
import { AppContainer, Panel } from './styles';

export default function Wallet({ history }) {
  const user = useSelector(state => state.user.data);
  return (
    <AppContainer maxWidth="sm">
      <Grid container justify="center" spacing={2} alignItems="center">
        <Grid item xs={12}>
          <Panel>
            <Typography align="center" variant="h5">
              Bem vindo à sua carteira, {user.name}
            </Typography>
            <Box my={4}>
              <Typography align="center" variant="h6">
                Detalhes da sua conta
              </Typography>
              <Typography>Número: {user.account.number}</Typography>
              <Typography>Saldo: R$ {user.account.balance}</Typography>
              <Typography>Limite: R$ {user.account.limit}</Typography>
            </Box>

            <Box my={4}>
              <Grid
                spacing={4}
                container
                justify="space-between"
                alignItems="center"
              >
                <Grid item xs={4}>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => history.push('/user/contacts')}
                  >
                    Contatos
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => history.push('/user/extracts')}
                  >
                    Extratos
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => history.push('/user/transfer')}
                  >
                    Transferir
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Panel>
        </Grid>
      </Grid>
    </AppContainer>
  );
}
