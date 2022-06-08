---
order: 1
title:
  zh-CN: 事件按钮组
  en-US: button group
---


````jsx
import {SubmitGroupLarge} from 'component';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
 handleReturn = () => {
     alert('返回');
 }
 handleSubmit = () => {
     alert('保存');
 }
 render() {
    return (
        <SubmitGroupLarge  cancelTxt="返回" confirmTxt="保存" cancelClick={this.handleReturn}
                                      confirmClick={this.handleSubmit}/>
    );
 }
}

ReactDOM.render(
  <App/>,
  mountNode
);
````
