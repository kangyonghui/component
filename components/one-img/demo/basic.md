---
order: 0
title:
  zh-CN: 图片上传
  en-US: OneImg
---


````jsx
import {OneImg} from 'component';

class App extends React.Component {
  onChange = (data) => {
    console.log(data);
  }
  render() {
    return (
     <OneImg uploadUrl="/uploads/park" onChange={this.onChange}/>
    );
  }
}

ReactDOM.render(
  <App/>,
  mountNode
);
````
