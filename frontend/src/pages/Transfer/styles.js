import styled from 'styled-components';
import { Box, Container, Grid } from '@material-ui/core';

export const Panel = styled(Grid).attrs({
  container: true,
  justify: 'space-between',
  alignItems: 'center',
  direction: 'column',
  spacing: 4,
})`
  border: 2px solid #4fa444;
  border-radius: 20px;
  height: auto;
  width: 100%;
  padding: 15px;
`;

export const AppContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;
