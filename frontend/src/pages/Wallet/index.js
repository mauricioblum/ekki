import React from 'react';

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
  return (
    <AppContainer maxWidth="sm">
      <Grid container justify="center" spacing={2} alignItems="center">
        <Grid item xs={12}>
          <Panel>
            <Typography align="center">Bem vindo User!</Typography>
            <Typography>Saldo: R$ 1000,00</Typography>
            <Typography>Limite: R$ 500,00</Typography>
          </Panel>
        </Grid>
      </Grid>
    </AppContainer>
  );
}
