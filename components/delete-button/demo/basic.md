---
order: 0
title:
  zh-CN: 基本用法
  en-US: DeleteButton
---


````jsx
import {DeleteButton} from 'component';

class App extends React.Component {
  
  handleDelete = (data) => {
    return () => (alert(data));
  }

  render() {
    return (
     <DeleteButton onClick={this.handleDelete('delete!')} />
    );
  }
}

ReactDOM.render(
  <App/>,
  mountNode
);
````
