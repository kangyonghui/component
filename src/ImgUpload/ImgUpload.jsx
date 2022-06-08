import ImageCropper from './ImageCropper';
import ImageInput from './ImageInput';
import UploadList from './uploadList';
import React from 'react';
import isNaN from 'lodash/isNaN';
import {message} from 'antd';

function noop() {
}

function getFileItem(file, fileList) {
  let target = fileList.filter((item) => {
    return item.key === file.key;
  })[0];
  return target;
}

// 新增一个 props.maxSize: React.PropTypes.number 控制文件大小
//props.maxLength: React.PropTypes.number 控制文件个数


export default class Upload extends React.Component {

  static defaultProps = {
    type: 'select',
    multiple: false,
    onChange: noop,
    onRemove: noop,
    showUploadList: true,
    listType: 'pictrue',
    className: '',
    aspectRatio: 4 / 3,
    cropQuality: 0.9,
    width: 104
  }

  constructor(props) {
    super(props);
    this.state = {
      fileList: this.props.initialFileList || this.props.defaultFileList || [],
      // fileList: [],
      initialed: false,
      croppingFileObj: null,
      uploadEnable: true
    };
  }

  onFileLoaded(fileObj) {
    if (this.props.hiddenCropper === true) {
      this.cropImage(fileObj)
    } else {

      this.setState({croppingFileObj: fileObj});
    }

  }

  cropImage(fileObj) {
    let targetItem = fileObj;
    let nextFileList = this.state.fileList.concat();
    if (this.props.showUploadList === false) {
      //不显示图片列表的情况下，清空列表
      nextFileList = [];

    }
    if (this.props.maxLength && !isNaN(this.props.maxLength) && nextFileList.length == this.props.maxLength) {
      nextFileList.pop()
    }
    nextFileList.push(targetItem);
    this.onChange({
      file: targetItem,
      fileList: nextFileList
    });

  }

  onChange = (info) => {

    if (this.props.onChangeBefore && this.props.onChangeBefore(info.file, info.fileList) === false) {

      return
    }

    if (info.file.status !== 'removed' && info.file.file.size / 1024 / 1024 >= this.props.maxSize) {
      if (this.props.hiddenCropper)
        message.error(`图片必须小于 ${this.props.maxSize}MB!`);
      else
        message.error(`裁剪后的图片必须小于 ${this.props.maxSize}MB!`);

      return;
    }


    const updateStatus = {
      fileList: info.fileList,
      uploadEnable: true
    }

    if (this.props.maxLength > 0 && info.fileList.length >= this.props.maxLength)
      updateStatus.uploadEnable = false;

    this.setState(updateStatus, () => {

      if (this.props.onChange) {
        this.props.onChange(info.file, info.fileList);
      }

    })


  }


  removeFile(file) {
    let fileList = this.state.fileList;
    let targetItem = getFileItem(file, fileList);
    let index = fileList.indexOf(targetItem);
    if (index !== -1) {
      fileList.splice(index, 1);
      return fileList;
    }
    return null;
  }

  handleRemove(file) {
    let fileList = this.removeFile(file);
    if (fileList) {
      this.onChange({
        file,
        fileList,
      });
    }
  }

  handleManualRemove = (file) => {

    file.status = 'removed';

    this.handleRemove(file);

    if (this.props.onRemove) {

      this.props.onRemove(file);

    }
  }

  componentWillReceiveProps(nextProps) {

    if (!this.state.initialed && nextProps.initialFileList && Array.isArray(nextProps.initialFileList) && nextProps.initialFileList.length) {
      const updateState = {
        initialed: true,
        fileList: nextProps.initialFileList,
        uploadEnable: true
      };

      if (nextProps.maxLength > 0 && nextProps.initialFileList.length >= nextProps.maxLength)
        updateState.uploadEnable = false;

      this.setState(updateState);
    }

  }

  getUploadList() {
    let uploadList;
    if (this.props.showUploadList && this.state.fileList.length > 0) {
      uploadList = (
        <UploadList
          preview={this.props.viewOnly}
          listType={this.props.listType}
          items={this.state.fileList}
          onRemove={this.handleManualRemove}
          aspectRatio={this.props.aspectRatio}
          width={this.props.width}
        />
      );
    }
    return uploadList;
  }

  getAspectRatio() {

    const {aspectRatio} = this.props;


    let aspectRatioNum = 1;

    if (aspectRatio && !isNaN(aspectRatio)) {

      aspectRatioNum = this.props.aspectRatio;

    }

    const thumbnailWidth = 96 * aspectRatio;

    return {
      ratio: aspectRatioNum,
      width: thumbnailWidth,
    }

  }

  render() {
    let type = this.props.type || 'select';
    const {cropper, ...props} = this.props;
    let inputProps = {
      ...props,
      onFileLoaded: this.onFileLoaded.bind(this)
    };

    const aspectRatio = this.getAspectRatio();

    const uploadList = this.getUploadList();

    const cropperProps = {
      fileObj: this.state.croppingFileObj,
      onImageCrop: this.cropImage.bind(this),
      aspectRatio: aspectRatio.ratio,
      quality: this.props.cropQuality
    }

    return (
      <div style={{position: 'relative'}}>
               <span style={{display: 'flex'}}>
                  {uploadList}
                 <ImageInput ref={imageInput => this.imageInput = imageInput} {...inputProps}>
                     {this.state.uploadEnable ? this.props.children : null}
                  </ImageInput>
                  <ImageCropper {...cropperProps}/>
               </span>
      </div>
    );
  }

  // useful api
  getAllFile() {

    const {fileList} = this.state;

    let arr = [];

    fileList.forEach(function (val) {
      if (val.file)
        arr[arr.length] = val.file;
    });

    return arr;
  }

  getAllURLFile() {
    return this.state.fileList;
  }

  reset(clearList) {
    const updateState = {
      initialed: false
    };

    if (clearList)
      updateState.fileList = [];

    this.setState(updateState);
  }

  removeAllFiles() {
    this.setState({fileList: []})
  }

  open() {
    this.imageInput.onClick()
  }

}
