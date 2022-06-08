---
order: 3
title:
  zh-CN: 垂直排列
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
       <RadioButton activeKey="1" arrangement="vertical" options={options}/>
    );
 }
}

ReactDOM.render(
  <App/>,
  mountNode
);
````
