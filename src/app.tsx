import * as React from 'react';
import dva from 'dva-no-router';
// import dva from 'dva-core';

import Router, { routerReducer, routerMiddleware } from './router';
import user from './models/user';
import notifications from './models/notifications';
import config from './models/config';
import version from './models/version';

class App extends React.Component {
  app = dva({
    extraReducers: {
      router: routerReducer,
    },
    // models: [user, notifications, config, version],
    // onAction: [routerMiddleware],
    onError(e: any) {
      console.log('onError', e)
    },
  });
  state = {
    init: false,
  };
  componentDidMount() {
    this.app.model(user);
    this.app.model(notifications);
    this.app.model(config);
    this.app.model(version);
    this.app.router(() => <Router />);

    this.setState({ init: true });
  }
  render() {
    if (!this.state.init) return null;
    return this.app.start()(this.props);
  }
}

export default App;
