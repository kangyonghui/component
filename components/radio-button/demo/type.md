---
order: 4
title:
  zh-CN: 按钮样式
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
       },
       {
         key: '2',
         text: '认证中'
       },
       {
        key: '3',
        text: '认证失败',
        disabled: true
       }];
    return (
       <RadioButton activeKey="1" size="small" defaultType="dashed" clickType="danger" options={options}/>
    );
 }
}

ReactDOM.render(
  <App/>,
  mountNode
);
````
