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

export default function Wallet() {
  const user = useSelector(state => state.user.data);
  return (
    <AppContainer maxWidth="sm">
      <Grid container justify="center" spacing={2} alignItems="center">
        <Grid item xs={12}>
          <Panel>
            <Typography align="center">Bem vindo {user.name}</Typography>
            <Typography>Saldo: R$ {user.account.balance}</Typography>
            <Typography>Limite: R$ {user.account.limit}</Typography>
          </Panel>
        </Grid>
      </Grid>
    </AppContainer>
  );
}
