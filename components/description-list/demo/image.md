---
order: 1
title:
  zh-CN: 图片展示
  en-US: description list
---


```jsx
import {DescriptionList} from 'component';
const {Description} = DescriptionList;

class App extends React.Component {
  
  render() {
    const images = [{src: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1510570530018&di=399ba544716ec6c175e6cea16641282e&imgtype=0&src=http%3A%2F%2Fimg004.hc360.cn%2Fhb%2FMTQ2ODEyNTExMTE0NDcxOTYxOTQ4MA%3D%3D.jpg"},
    {src: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1510572546242&di=499224e11c5e289c4f9d940eeaa550a9&imgtype=0&src=http%3A%2F%2Fimage.rakuten.co.jp%2Fribbon-m%2Fcabinet%2Fkokuyo%2F511-53018_1.jpg"}];
    return (
      <DescriptionList>
        <Description term="姓名">张三</Description>
        <Description term="学历">大学本科</Description>
        <Description term="大学">上海复旦大学</Description>
        <Description term="照片" type="image" images={images} />
      </DescriptionList>
    )
  }
}

ReactDOM.render(
  <App/>,
  mountNode
);
```
