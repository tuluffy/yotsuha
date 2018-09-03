import React from 'react';
import './index.css';

export default class TabItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return this.props.children
  }
}
