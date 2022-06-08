---
order: 0
title:
  zh-CN: 位置选取
  en-US: MapModal
---


````jsx
import {Form, Input} from 'antd';
import {MapModal} from 'component';

const FormItem = Form.Item;

class app extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      parkPosition: '121.604727, 31.20115'
    };
  }

  centerPointValue = (coord) => {
      this.props.form.setFieldsValue({
        parkPosition: coord
      });
  };
   
  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <Form>
        <FormItem label="园区位置：" labelCol={{span: 5}} wrapperCol={{span: 14}}>
          {getFieldDecorator('parkPosition', {
            initialValue: this.state.parkPosition,
            rules: [{
              required: true,
              message: '请输入园区位置'
            }]
          })(
            <Input size="large" readOnly="readOnly"/>
          )}
          <div style={{float: 'right', marginRight: '-70px'}}>
            <MapModal id="centerpoint" getValue={this.centerPointValue} type="point" initValue={this.state.parkPosition}/>
          </div>
        </FormItem>
      </Form>
    );
  }
}

const App = Form.create()(app);

ReactDOM.render(
  <App/>,
  mountNode
);
````
