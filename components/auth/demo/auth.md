---
order: 1
title:
  zh-CN: 无权限
  en-US: auth
---


````jsx
import {Auth} from 'component';
import Mock from 'mockjs';
import axios from 'axios';

Mock.mock('/some/authurl?auth=true', {"code": 403});
axios.interceptors.response.use((response) => {
  const {data: {code, msg}, config: {url}} = response;
  if (code === 403) {
    return {code: 403};
  }
});

class App extends React.Component {
 render() {
    return (
        <Auth authUrl="/some/authurl" authTips={<div style={{color: 'red'}}>没身份，想啥呢</div>}>
           <div>hello word</div>
        </Auth>
    );
 }
}

ReactDOM.render(
  <App/>,
  mountNode
);
````
