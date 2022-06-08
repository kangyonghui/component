---
order: 0
title:
  zh-CN: 基本用法
  en-US: common box
---


````jsx
import {CommonBox} from 'component';

class App extends React.Component {
 render() {
    return (
        <CommonBox title="基本用法" style={{backgroundColor: '#050431'}}>
           <div style={{color: '#fff'}}>hello word</div>
        </CommonBox>
    );
 }
}

ReactDOM.render(
  <App/>,
  mountNode
);
````
