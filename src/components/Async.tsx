import React from "react";

import Loader from "./Loader";

const sleep = (m: any) => new Promise(r => setTimeout(r, m));

export default function asyncComponent(importComponent: any) {
  interface State {
    component: any;
  }

  class AsyncComponent extends React.Component<any, State> {
    constructor(props: any) {
      super(props);

      this.state = {
        component: null
      };
    }

    async componentDidMount() {
      await sleep(250);

      const {default: component} = await importComponent();

      this.setState({
        component: component
      });
    }

    render() {
      const C = this.state.component;

      return C ? <C {...this.props} /> : <Loader />;
    }
  }

  return AsyncComponent;
}
