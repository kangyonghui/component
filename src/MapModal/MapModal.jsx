import React from 'react';
import {Button} from 'antd';
import PropTypes from 'prop-types';

/**
 * @deacription: 全景图园区定位坐标点选取
 * @props：
 *    id<string>: 渲染高得地图的容器
 *    getValue<function>: 返回选取的坐标值
 *    hideModal<function> : 关闭模态框
 *    initValue<string>: 初始化时坐标值，
 *    centerPoint<string>: 地图中心点坐标
 *
 */

const script1 = document.createElement("script");
script1.src = 'http://webapi.amap.com/maps?v=1.4.1&key=71cb242717a38b3104bc787f8bc38612';
document.body.appendChild(script1);

const script2 = document.createElement("script");
script2.src = 'http://webapi.amap.com/ui/1.0/main.js';
document.body.appendChild(script2);

const mapHeight = `${window.outerHeight - 100}px`;
const defaultPosition = [121.604727, 31.20115];
const styleLabel = {
  position: 'fixed',
  top: '10px',
  left: '50%',
  padding: '5px 10px',
  border: '1px solid #d3d3d3',
  background: '#fff',
  width: '560px',
  marginLeft: '-280px'
};
class MapModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      map: null,
      point: null
    };
    this.string2coord = this.string2coord.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.sendValue = this.sendValue.bind(this);
  }

  string2coord(value) {
    if (typeof value === 'object') {
      return value;
    }
    if (typeof value === 'string' && value) {
      return value.split(',');
    }
  }

  componentDidMount() {
    const that = this;

    AMapUI.loadUI(['misc/PositionPicker'], (PositionPicker) => {
      let center = '';
      const {initValue, centerPoint} = that.props;
      if (initValue) {
        center = that.string2coord(initValue);
      } else if (centerPoint) {
        center = that.string2coord(centerPoint);
      } else {
        center = defaultPosition;
      }
      const map = new AMap.Map(that._cont, {
        zoom: 17,
        scrollWheel: false,
        center
      });
      that.state.map = map;
      that.setState({
        point: center.toString()
      });
      map.on('complete', (d) => {

        if (d.type === 'complete') {

          const positionPicker = new PositionPicker({
            mode: 'drapMap',
            map
          });

          positionPicker.on('success', (positionResult) => {
            const p = positionResult.position;
            that.setState({
              point: p.toString()
            });
          });

          positionPicker.on('fail', (positionResult) => {
            console.log('坐标选取失败！', positionResult.position);
            that.state.map.setCenter(center);

          });

          positionPicker.start();
          //手动添加图片，触发事件
          positionPicker.customControl.addTo();
          map.on('moveend', positionPicker._eventHandlers.onMapDragEnd);

          map.plugin(['AMap.ToolBar'], () => {
            map.addControl(new AMap.ToolBar({
              liteStyle: true,
              position: 'RT'
            }));
          });

        }
      });

    });

  }

  componentWillUnmount() {
  }

  componentWillReceiveProps(nextProps) {
    //编辑时重新定位
    const value = nextProps.initValue;

    if (value !== this.props.initValue) {
      let center = defaultPosition;
      if (value) {
        center = value;
      } else if (nextProps.centerPoint) {
        center = nextProps.centerPoint;
      }

      this.state.map.setCenter(this.string2coord(center));
      this.setState({
        point: center
      });


    }
  }
  sendValue() {
    //返回值，关闭模态框
    const point = this.state.point;
    this.props.getValue(point);
    this.props.hideModal();
  }

  handleCancel() {
    //关闭模态框
    this.props.hideModal();
  }

  render() {
    return (
      <div>
        <div ref={c => this._cont = c} id={this.props.id} style={{ width: '100%', height: mapHeight}} />
        <div style={styleLabel}>
          <h2 style={{ display: 'inline-block'}}>拖动地图选取点坐标：{this.state.point}</h2>
          <Button type="default" style={{ marginLeft: '16px', float: 'right'}} onClick={this.handleCancel}>取消</Button>
          <Button type="primary" style={{ marginLeft: '16px', float: 'right'}} onClick={this.sendValue}>确定</Button>
        </div>
      </div>
    );
  }
}

MapModal.propTypes = {
  id: PropTypes.string,
  getValue: PropTypes.func,
  hideModal: PropTypes.func,
  initValue: PropTypes.string,
  centerPoint: PropTypes.string
};
export default MapModal;
