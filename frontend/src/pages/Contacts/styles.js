import styled from 'styled-components';
import { Box, Container, Paper, Table } from '@material-ui/core';

export const Panel = styled(Box)`
  border: 2px solid #4fa444;
  border-radius: 20px;
  height: auto;
  width: 100%;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const AppContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

export const ContactsContainer = styled(Paper).attrs({
  elevation: 4,
})`
  width: 100%;
  margin-top: 15px;
  overflow-x: auto;
`;

export const ContactsTable = styled(Table)``;
