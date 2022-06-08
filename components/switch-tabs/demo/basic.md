---
order: 0
title:
  zh-CN: 基本用法
  en-US: switch tabs
---


````jsx
import {SwitchTabs} from 'component';

class App extends React.Component {
 render() {
    return (
       <SwitchTabs indexTable={1}>
         <div label="tab0">
           tab0
         </div>
         <div label="tab1">
           tab1
         </div>
         <div label="tab2">
           tab2
         </div>
       </SwitchTabs>
    );
 }
}

ReactDOM.render(
  <App/>,
  mountNode
);
````
