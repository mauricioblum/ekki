import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Wallet from './pages/Wallet';
import Contacts from './pages/Contacts';
import Transfer from './pages/Transfer';
import Extract from './pages/Extract';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/user" exact component={Wallet} />
      <Route path="/user/contacts" exact component={Contacts} />
      <Route path="/user/transfer" exact component={Transfer} />
      <Route path="/user/extracts" exact component={Extract} />
    </Switch>
  );
}
