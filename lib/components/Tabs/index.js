import React from 'react';
import cs from 'classnames';
import {pureMergeState} from '../../tools/pureMergeState';

import './index.css';

class BaseStruct extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentIndex: 0,
    }

    this.$changeTab = this.$changeTab.bind(this);
  }

  // 切换tab
  $changeTab(index){
    this.setState(pureMergeState('currentIndex', index))
  }

  render() {
    const {currentIndex} = this.state;

    return (
      <div className='tabs-container'>
        {
          this.props.children[currentIndex]
        }

        <div className='tab-bar'>
          {
            React.Children.map(this.props.children, (child, index) => {
              return (
                <div className={cs('tab-title', {'tab-active': currentIndex === index})}
                     key={'tab' + child.props.title + index}
                     onClick={() => this.$changeTab(index)}
                >
                  {child.props.title}
                </div>
              )
            }, null)
          }
        </div>
      </div>
    )
  }
}

function HOC(WrappedComponent) {
  return class extends WrappedComponent {
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <WrappedComponent {...this.props}/>
      )
    }
  }
}

const Tabs = HOC(BaseStruct);

export default Tabs;