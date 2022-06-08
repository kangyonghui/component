---
order: 0
title:
  zh-CN: 文件上传
  en-US: OneUpload
---


````jsx
import {OneUpload} from 'component';

class App extends React.Component {
  onChange = (data) => {
    console.log(data);
  }
  render() {
    return (
     <OneUpload fileList={[]} uploadUrl="/uploads/park" onChange={this.onChange}/>
    );
  }
}

ReactDOM.render(
  <App/>,
  mountNode
);
````
