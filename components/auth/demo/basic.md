---
order: 0
title:
  zh-CN: 基本用法
  en-US: basic
---


````jsx
import {Auth} from 'component';

class App extends React.Component {
 render() {
    return (
        <Auth authUrl="/some/authurlok" authTips="暂无权限">
           <div style={{color: '#000', fontSize: '18px'}}>小朋友，你是否有很多问号</div>
        </Auth>
    );
 }
}

ReactDOM.render(
  <App/>,
  mountNode
);
````
