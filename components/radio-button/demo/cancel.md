---
order: 1
title:
  zh-CN: 可取消选择按钮
  en-US: radio button
---


````jsx
import {RadioButton} from 'component';

class App extends React.Component {
 render() {
      const options = [{
       key: '1',
       text: '已认证'
      },
       {
         key: '0',
         text: '未认证'
       }];
    return (
       <RadioButton canCancel={true} options={options}/>
    );
 }
}

ReactDOM.render(
  <App/>,
  mountNode
);
````
