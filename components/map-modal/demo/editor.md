---
order: 1
title:
  zh-CN: 区域选取
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
      shape: '',
      centerpoint: '121.604727, 31.20115'
    };
  }

  shapeValue = (coord) => {
      this.props.form.setFieldsValue({
        shape: coord
      });
  };
   
  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <Form>
        <FormItem label="地图轮廓：" labelCol={{span: 5}} wrapperCol={{span: 14}}>
          {getFieldDecorator('shape', {
            initialValue: this.state.shape,
            rules: [{
              required: true,
              message: '选取轮廓'
            }]
          })(
            <Input size="large" readOnly="readOnly"/>
          )}
          <div style={{float: 'right', marginRight: '-70px'}}>
            <MapModal id="shape" getValue={this.shapeValue} type="polygon" initValue={this.state.shape} centerPoint={this.state.centerpoint}/>
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
