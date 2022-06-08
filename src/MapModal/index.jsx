import React from 'react';
import {Button, Modal} from 'antd';
import PropTypes from 'prop-types';
import MapModal from './MapModal';
import MapEditorModal from './MapEditorModal';

const mapWidth = `${window.outerWidth}px`;
const mapHeight = `${window.outerHeight - 100}px`;

/**
 * @description 全景图定位的模态框
 * @props initValue<string> 初始化坐标值
 * @props getValue<function> 将选取的坐标值传递给对应的input
 * @props id<string> 渲染地图的容器id
 * @props type<string> 点定位or绘制编辑多边形
 * @props hideModal<function> 关闭模态框
 */


const defaultPosition = '121.604727, 31.20115';

class Bind extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      position: defaultPosition,
      path: null,
      type: 'point'
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.getPosition = this.getPosition.bind(this);
  }
  showModal() {
    this.setState({
      visible: true,
      type: this.props.type || 'point'
    });

  }

  hideModal() {
    this.setState({
      visible: false
    });
  }

  getPosition(str) {
    //MapModal选取的value值
    if (this.props.type === 'polygon') {
      const arr = str.split(',');
      str = `${str},${arr[0]},${arr[1]}`;
    }
    this.props.getValue(str);
  }


  render() {
    const {type, id, initValue, centerPoint} = this.props;
    return (
      <div>
        <Button type="default" onClick={this.showModal} size="large">浏览</Button>
        <Modal
          visible={this.state.visible}
          width={mapWidth}
          onOk={this.hideModal} onCancel={this.hideModal}
          style={{top: 0, height: mapHeight }}
          footer={null}
          closable={false}
        >
          { type === 'polygon' ?

            <MapEditorModal
              getValue={this.getPosition}
              hideModal={this.hideModal}
              centerPoint={centerPoint || defaultPosition}
              id={id}
              initValue={initValue}
            />
              :
            <MapModal
              id={id}
              getValue={this.getPosition}
              hideModal={this.hideModal}
              centerPoint={centerPoint}
              initValue={initValue}/>
          }
        </Modal>
      </div>
    );
  }
}
Bind.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string,
  getValue: PropTypes.func,
  hideModal: PropTypes.func,
  initValue: PropTypes.string,
  centerPoint: PropTypes.string
};
export default Bind;
