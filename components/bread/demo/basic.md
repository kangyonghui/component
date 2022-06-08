---
order: 0
title:
  zh-CN: 面包屑
  en-US: Bread
---


````jsx
import {Bread} from 'component';

class App extends React.Component {
  render() {
    const routes = [{path: '/'}, {path: '/admin', breadcrumbName: '管理后台'}, {path: 'system', breadcrumbName: '系统设置'}, {path: 'service', breadcrumbName: '服务设置'}];
    const params = [];
    return (
     <Bread routes={routes} params={params}/>
    );
  }
}

ReactDOM.render(
  <App/>,
  mountNode
);
````
