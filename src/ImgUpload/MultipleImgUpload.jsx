import React from 'react';
import ImgUpload from './ImgUpload';
import {Icon} from 'antd';


export default React.createClass({
  getInitialState: function () {
    return {
      addable: true
    };
  },
  getDefaultProps: function () {
    return {
      text: '上传图片',
    };
  },
  getAllFile() {
    return this.imgUpload.getAllFile();
  },
  getAllURLFile() {
    return this.imgUpload.getAllURLFile();
  },
  reset(clearList = false) {
    return this.imgUpload.reset(clearList);
  },
  removeAllFiles() {
    return this.imgUpload.removeAllFiles();
  },
  onRemove(file) {
    if (this.props.onRemove && file.key && file.key.toString().indexOf("__imageid__") !== 0) {
      this.props.onRemove(file.key, file);
    }
  },
  onChange(file, fileList) {
    this.props.onChange && this.props.onChange(file);
  },
  renderChild() {
    const {addable} = this.state;
    if (addable === false) {
      return null
    } else {
      return (
        <div className='upload-input-container'>
          <Icon type="plus"/>
          <div className="ant-upload-text">{this.props.text}</div>
        </div>
      )
    }
  },
  render() {
    const {onRemove, onChange, ...others} = this.props;
    return (
      <ImgUpload ref={imgUpload => this.imgUpload = imgUpload} onRemove={this.onRemove} onChange={this.onChange} {...others}>
        {
          this.renderChild()
        }
      </ImgUpload>
    );
  }
})
