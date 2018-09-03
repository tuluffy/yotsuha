import React from 'react';
import MaskContainer from '../Mask/index';
import './index.css';

class BaseStruct extends React.Component {
  constructor(props) {
    super(props);

    this.handler = this.handler.bind(this);
  }

  handler(){
    const {okCallback} = this.props;

    okCallback && okCallback();
  }

  render() {
    const {content = '哇哈哈', okText = '确认'} = this.props;

    return (
      <MaskContainer>
        <div className='alert-container'>
          <div className='alert-content'>
            <div className='alert-theme'>{content}</div>
            <div className='alert-handler-block'>
              <div className='alert-handler-confirm'
                   onClick={this.handler}
              >{okText}</div>
            </div>
          </div>
        </div>
      </MaskContainer>
    )
  }
}

function HOC(WrappedComponent) {
  return class extends WrappedComponent {
    constructor(props) {
      super(props);
    }

    render() {
      const {show} = this.props;

      if(!!show){
        return (
          <WrappedComponent {...this.props}/>
        )
      }

      return null;
    }
  }
}

const Alert = HOC(BaseStruct);

export default Alert;