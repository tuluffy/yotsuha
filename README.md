A library for react component.

Note: 所有的组件符合es module规范，具体用法可以直接看源码.

Installation

    $ yarn add yotsuha -D
    
or  

     $ npm i yotsuha --save



Use

    import {Alert} from 'yotsuha';
    
    <Alert show={this.state.showAlert}
           content='提示信息'
           okText='知道了'
           okCallback={() => console.log('do something...')}
    />


