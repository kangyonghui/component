---
order: 1
title:
  zh-CN: 纯空div
  en-US: common box
---


````jsx
import {CommonBox} from 'component';

class App extends React.Component {
 render() {
    return (
        <CommonBox isDiv={true}>
           <span style={{color: '#000', fontSize: '18px'}}>hello word</span>
        </CommonBox>
    );
 }
}

ReactDOM.render(
  <App/>,
  mountNode
);
````
