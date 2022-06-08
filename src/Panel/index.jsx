import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'rc-dialog';
import Draggable from 'react-draggable';
import close from './close.png';
import 'animate.css';
import './index.less';

export default class Panel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      position: props.position,
      currentZIndex: props.zIndex || parseInt(localStorage.getItem('panelIndex') || '1000'),
      mask: props.mask
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.position) {
      if (nextProps.position.x !== this.props.position.x || nextProps.position.y !== this.props.position.y) {
        this.setState({position: nextProps.position});
      }
    }
    if (!this.props.visible && nextProps.visible) {
      const index = nextProps.zIndex ? nextProps.zIndex + 1 : parseInt(localStorage.getItem('panelIndex') || '1000') + 1;
      localStorage.setItem('panelIndex', `${index}`);
      this.setState({currentZIndex: index, mask: nextProps.mask || false});
    }
    if (this.props.mask && !nextProps.mask) {
      this.setState({mask: nextProps.mask || false});
    }
  }

  onCancel = () => {
    this.setState({ mask: false }, () => {
      this.props.onCancel && this.props.onCancel();
    });
  };

  onStop = (e, position) => {
    const {x, y} = position;
    this.setState({position: {x, y}}, () => {
      this.props.onDragStop && this.props.onDragStop(e, position);
    });
  };

  render() {
    const { visible, disabled, title, zIndex, width, style, logo, className } = this.props;
    const { currentZIndex, mask, position } = this.state;
    return (
      <Dialog visible={visible} mask={mask} zIndex={zIndex || currentZIndex}>
        <Draggable
          disabled={disabled}
          position={position}
          onStop={this.onStop}
          cancel="strong"
        >
          <div className={`KPanel zoomIn animated ${className}`} style={{zIndex: zIndex || currentZIndex, ...style, minWidth: width ? 'auto' : '440px'}}>
            <div className="KPanel-header">
              <div style={{ display: 'flex', position: 'relative' }}>
                <div style={{ width: '5px', height: '25px', background: 'rgb(53, 158, 251)' }} />
                <div style={{ width: '20px', height: '5px', background: 'rgb(53, 158, 251)' }} />
                <div style={{ position: 'absolute', top: '1px', left: '25px', right: '20px', height: '1px', background: 'rgb(42, 91, 149)' }} />
                <div style={{ position: 'absolute', right: '5px', width: '20px', height: '5px', background: 'rgb(53, 158, 251)' }} />
                <div style={{ position: 'absolute', right: 0, width: '5px', height: '25px', background: 'rgb(53, 158, 251)' }} />
              </div>
              <div className="titleView">
                <div className="title">
                  {logo || <div style={{ width: '30px' }} />}
                  {title || ''}
                </div>
                <img className="cancelBtn" src={close} alt="" onClick={this.onCancel} />
              </div>
            </div>
            <div className="KPanel-content">
              <div style={{ position: 'absolute', top: '25px', bottom: '25px', left: 0, width: '1px', background: 'rgb(42, 91, 149)' }} />
              <div style={{ position: 'absolute', top: '25px', bottom: '25px', right: 0, width: '1px', background: 'rgb(42, 91, 149)' }} />
              <div style={{width: width + 65, float: 'right', padding: '5px 15px 0 15px'}}>
                <strong className="no-cursor" style={{cursor: 'default', fontWeight: 'normal'}}>
                  {
                    this.props.children
                  }
                </strong>
              </div>
            </div>
            <div className="KPanel-footer">
              <div style={{ width: '5px', height: '25px', background: 'rgb(53, 158, 251)' }} />
              <div style={{ position: 'absolute', bottom: 0, width: '25px', height: '5px', background: 'rgb(53, 158, 251)' }} />
              <div style={{ position: 'absolute', left: '25px', right: '25px', bottom: '1px', height: '1px', background: 'rgb(42, 91, 149)' }} />
              <div style={{ position: 'absolute', right: '5px', bottom: 0, width: '20px', height: '5px', background: 'rgb(53, 158, 251)' }} />
              <div style={{ position: 'absolute', right: 0, width: '5px', height: '25px', background: 'rgb(53, 158, 251)' }} />
            </div>
          </div>
        </Draggable>
      </Dialog>
    );
  }
}

Panel.propTypes = {
  logo: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object,
  width: PropTypes.number,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  visible: PropTypes.bool,
  mask: PropTypes.bool,
  disabled: PropTypes.bool,
  zIndex: PropTypes.number,
  position: PropTypes.object,
  onCancel: PropTypes.func,
  onDragStop: PropTypes.func
};

Panel.defaultProps = {
  className: '',
  style: {},
  width: 350,
  title: '',
  visible: false,
  mask: false,
  disabled: false,
  position: {x: 0, y: 0}
};
