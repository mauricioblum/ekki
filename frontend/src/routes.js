import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Wallet from './pages/Wallet';
import Contacts from './pages/Contacts';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/user" exact component={Wallet} />
      <Route path="/user/contacts" exact component={Contacts} />
    </Switch>
  );
}
