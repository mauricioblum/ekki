import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Wallet from './pages/Wallet';
import Home from './pages/Home';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/wallet" component={Wallet} />
    </Switch>
  );
}
