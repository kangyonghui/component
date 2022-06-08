import React from 'react';
import {Upload, Icon, Button, message} from 'antd';
/**
 * @description 上传文件组件
 * @attribute
 */
class OneUpload extends React.Component {
  constructor() {
    super();
    this.state = {
      fileList: []
    };
    this.handlePreview = this.handlePreview.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    let fileList;
    const url = this.props.fileList;
    if (url.length > 0) {
      fileList = url;
    } else {
      fileList = [];
    }
    this.setState({
      previewVisible: false,
      previewImage: '',
      fileList
    });
  }

  componentWillReceiveProps(nextProps) {
    const {fileList} = nextProps;
    if (typeof fileList === 'object' && this.props.fileList !== nextProps.fileList) {
      this.setState({
        fileList: nextProps.fileList
      });
    }
    if (typeof fileList === 'undefined' || fileList === null) {
      this.setState({
        fileList: []
      });
    }
  }

  handlePreview(file) {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange({fileList}) {
    const {type} = this.props;
    if (type && fileList.length) {
      let flag = true;
      type.split(',').forEach((v) => {
        if (fileList[0].name.indexOf(v) > 0) {
          flag = false;
        }
      });
      if (flag) {
        message.warn('文件类型不符合要求！');
        return false;
      }
    }
    const data = fileList.map(v => v.response);
    if (fileList[0]) {
    /*  if (fileList[0].status === 'done') {
        message.info('上传成功');
      } else if (fileList[0].status === 'error') {
        message.error('上传失败');
      } else {
        message.error('上传失败');
      }*/
      if (fileList[0].status === 'uploading') {
        message.loading({ content: '上传中...', key: 'oneUpload' });
      } else if (fileList[0].status === 'done') {
        if (fileList[0].response && fileList[0].response.code === 1) {
          message.error({ content: data.file.response.msg, key: 'oneUpload', duration: 2 });
        } else {
          message.success({ content: '上传成功!', key: 'oneUpload', duration: 2 });
        }
      } else {
        message.error({ content: '上传失败!', key: 'oneUpload', duration: 2 });
      }
    }
    if (fileList.length > 1) {
      fileList.shift();
    }
    this.props.onChange(data);
    this.setState({fileList});
  }

  render() {
    let {fileList} = this.state;
    const {name, uploadUrl, ...others} = this.props;
    if (fileList.length > 0 && fileList[0].url === '') {
      fileList = [];
    }
    return (
      <div>
        <Upload
          name={name || 'filedata'}
          action={uploadUrl}
          {...others}
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          <Button>
            <Icon type="upload"/> 上传
          </Button>
        </Upload>
      </div>
    );
  }
}

export default OneUpload;
