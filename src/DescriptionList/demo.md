---
  order: 1
title:
  zh-CN: 详情页组件
  en-US: DescriptionList
---


  ````jsx
import {DescriptionList} from 'component';
const {Description} = DescriptionList;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <DescriptionList gutter={32} col={3} layout="horizontal" size="">
        <Description term="学历">大学本科</Description>
        <Description term="学历">大学本科</Description>
        <Description term="" type="image">
          <img src="..."/>
        </Description>
      </DescriptionList>
    );
  }
}

ReactDOM.render(
  <App/>,
  mountNode
);
````
