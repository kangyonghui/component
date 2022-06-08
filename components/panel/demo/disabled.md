---
order: 1
title:
  zh-CN: 禁止拖拽
  en-US: disabled
---


````jsx
import {Button} from 'antd';
import {Panel} from 'component';

class App extends React.Component {
  constructor(props) {
   super(props);
   this.state = {
     visible: false
   };
  }

  showPanel = () => {
    this.setState({
      visible: true
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showPanel}>
          Open Modal
        </Button>
        <Panel
          disabled
          title="Basic Modal"
          position={{x: 1100, y: 250}}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <span style={{color: '#fff', fontSize: '18px'}}>disabled panel</span>
        </Panel>
      </div>
    );
  }
}

ReactDOM.render(
  <App/>,
  mountNode
);
````
