import React from 'react';
import {Button, Input} from 'antd';
import PropTypes from 'prop-types';
/**
 * @deacription: 全景图园区、楼宇轮廓绘制
 * @props：
 *
 *    id<string>: 渲染高得地图的容器
 *    getValue<function>: 返回选取的坐标值
 *    hideModal<function> : 关闭模态框
 *    initValue<string>: 初始化时坐标值，
 *    centerPoint<string>: 地图中心点坐标
 */

const mapHeight = `${window.outerHeight - 100}px`;
const defaultPosition = [121.604727, 31.20115];
const styleLabel = {
  position: 'fixed',
  top: '10px',
  left: '50%',
  padding: '5px 10px',
  background: '#fff',
  zIndex: 100,
  marginLeft: '-200px',
  width: '400px',
  textAlign: 'center'
};

const script1 = document.createElement("script");
script1.src = 'http://webapi.amap.com/maps?v=1.4.1&key=71cb242717a38b3104bc787f8bc38612';
document.body.appendChild(script1);

const script2 = document.createElement("script");
script2.src = 'http://webapi.amap.com/ui/1.0/main.js';
document.body.appendChild(script2);

class MapModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      map: null,
      editor: null,
      draw: null,
      polygon: null,
      path: [],
      disabledEditor: true, //是否能编辑
      disabledReturn: true,  //是否可返回值
      disabledDraw: false //是否可绘制
    };
    this.editorClose = this.editorClose.bind(this);
    this.editorOpen = this.editorOpen.bind(this);
    this.string2Coords = this.string2Coords.bind(this);
    this.drawClose = this.drawClose.bind(this);
    this.drawStart = this.drawStart.bind(this);
    this.sendValue = this.sendValue.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.drawPolygon = this.drawPolygon.bind(this);
    this.editPolygon = this.editPolygon.bind(this);

  }

  editorOpen() {
    this.state.editor.open();
    //编辑开始时不能返回数据
    this.setState({
      disabledReturn: true
    });
  }
  editorClose() {
    //关闭编辑
    this.state.editor.close();
    //编辑结束才能返回数据
    this.setState({
      disabledReturn: false
    });
  }

  drawClose() {
    //清空画布
    this.state.draw.close(true);
    this.state.draw.polygon();
    //清空数据
    this.setState({
      path: []
    });
  }

  drawStart() {
    this.state.draw.polygon();
  }

  sendValue() {
    //返回值，关闭模态框
    const path = this.state.path.toString();
    this.props.getValue(path);
    this.props.hideModal();
  }

  handleCancel() {
    //关闭模态框
    this.props.hideModal();
  }

  string2Coords(type, value) {
    if (type === 'point') {
      if (typeof value === 'object') {
        return value;
      } else { return value.split(','); }
    }

    if (type === 'polygon') {
      const arr = [];
      value = value.split(',');
      for (let i = 0; i < value.length; i += 2) {
        arr.push([value[i], value[i + 1]]);
      }
      return arr;
    }
  }
  editPolygon(path) {

    this.setState({
      path //编辑初始值
    });
    const that = this;
    const map = this.state.map;
    const polygon = new AMap.Polygon({
      map,
      path,
      strokeColor: '#2f9cfd',
      strokeOpacity: 1,
      strokeWeight: 3,
      fillColor: '#2f9cfd',
      fillOpacity: 0.25
    });

    this.state.polygon = polygon;
    map.plugin(['AMap.PolyEditor'], () => {
      const polygonEditor = new AMap.PolyEditor(map, polygon);
      that.state.editor = polygonEditor;
      that.setState({
        disabledEditor: false,
        disabledDraw: true
      });

      AMap.event.addListener(polygonEditor, 'end', (data) => {
        //编辑结束
        const path = data.target.getPath();
        //更新为编辑后的值
        that.setState({
          path,

        });
      });
    });
  }

  drawPolygon() {
    this.setState({
      disabledDraw: false, //启动绘制按钮
      disabledEditor: true
    });
    const map = this.state.map;
    const that = this;
    map.plugin(['AMap.PolyEditor', 'AMap.MouseTool'], () => {
      //绘制多边形
      const mouseTool = new AMap.MouseTool(map);
      that.state.draw = mouseTool;

      AMap.event.addListener(mouseTool, 'draw', (data) => {

        if (data.type === 'draw') {
          //绘制完成，关闭绘制
          mouseTool.close(false);

          //获取绘制多边形形对象及坐标值
          const obj = data.obj;
          const path = data.obj.getPath();
          that.setState({
            path,
            disabledEditor: false,
            disabledReturn: false,
            polygon: obj
          });

          //添加编辑功能
          const polygonEditor = new AMap.PolyEditor(map, obj);
          that.state.editor = polygonEditor;
          AMap.event.addListener(polygonEditor, 'end', (data) => {
            //编辑结束
            const path = data.target.getPath();
            //更新为编辑后的值
            that.setState({
              path,

            });
          });
        }
      });

    });
  }

  componentDidMount() {
    let {centerPoint, initValue} = this.props;
    if (typeof centerPoint === 'string') {
      centerPoint = this.string2Coords('point', centerPoint);
    }

    const that = this;
    //生成地图
    const map = new AMap.Map(this._cont, {
      zoom: 17,
      resizeEnable: true,
      center: centerPoint
    });
    this.state.map = map;

    //有初始化值，生成多边形对象，编辑
    if (initValue) {
      const path = this.string2Coords('polygon', initValue);
      this.editPolygon(path);

    } else {
      //无初始化值，先绘制多边形对象，再编辑
      this.drawPolygon();

    }

  }

  componentWillUnmount() {
  }

  componentWillReceiveProps(nextProps) {
    //编辑时重新定位

    const initValue = nextProps.initValue;

    if (nextProps.centerPoint !== this.props.centerPoint) {
      //改变地图中心点
      const centerpoint = this.string2Coords('point', nextProps.centerPoint);
      this.state.map.setCenter(centerpoint);
    }

    if (initValue !== this.props.initValue) {
      this.state.map.clearMap();
      if (initValue) {
        const path = this.string2Coords('polygon', initValue);
        this.editPolygon(path);
      } else {
        //无初始化值，先绘制多边形对象，再编辑
        this.setState({
          path: []  //清空input
        });
        this.drawPolygon();
      }

    } else {
      //两次值都为空
      if (!initValue) {
        this.state.map.clearMap();
        this.setState({
          path: []  //清空input
        });
        this.drawPolygon();
      }
    }
  }


  render() {
    const container = this.props.id;
    return (
      <div>
        <div style={styleLabel}>
          <div style={{ display: 'inline-block'}}>
            <Button type="primary" style={{}} onClick={this.drawStart} disabled={this.state.disabledDraw}>开始绘制</Button>
            <Button type="default" style={{marginLeft: '15px'}} onClick={this.drawClose} disabled={this.state.disabledDraw}>重新绘制</Button>
          </div>
          <div style={{ display: 'inline-block'}}>
            <Button type="primary" style={{marginLeft: '15px'}} onClick={this.editorOpen} disabled={this.state.disabledEditor}>开始编辑</Button>
            <Button type="primary" style={{marginLeft: '15px'}} onClick={this.editorClose} disabled={this.state.disabledEditor}>结束编辑</Button>
          </div>
          <p style={{fontSize: '12px', textAlign: 'left'}}>*点击开始绘制按钮，鼠标在地图上单击、拖动绘制，双击结束绘制</p>
          <div style={{margin: '8px 0'}}>
            坐标值：
            <Input type="text" value={this.state.path.toString()} readOnly style={{width: '300px', overflowX: 'scroll'}}/>
          </div>
          <div>
            <Button type="default" onClick={this.handleCancel}>取消</Button>
            <Button type="primary" style={{ marginLeft: '16px'}} onClick={this.sendValue} disabled={this.state.disabledReturn}>确定</Button>
          </div>
        </div>

        <div ref={c => this._cont = c} id={container} style={{ width: '100%', height: mapHeight}} />

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
