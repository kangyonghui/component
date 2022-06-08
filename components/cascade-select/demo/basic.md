---
order: 0
title:
  zh-CN: 级联选择
  en-US: CascadeSelect
---


````jsx
import {CascadeSelect} from 'component';
const CItem = CascadeSelect.Item;

class App extends React.Component {
  changeSelect = (value) => {
      //todo
   };
  render() {
    return (
     <CascadeSelect
       onChange={this.changeSelect}
     >
       <CItem
         key="parkid"
         placeholder={'请选择园区'}
         noParam
         format={v => v}
         url={'/api4/park/list/'} />
       <CItem
         key="buildingid"
         placeholder={'请选择楼宇'}
         param={'parkid'}
         url={'/api4/building/list/'} />
     </CascadeSelect>
    );
  }
}

ReactDOM.render(
  <App/>,
  mountNode
);
````
