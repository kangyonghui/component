import React from 'react';
import {Upload, Modal, Icon, message} from 'antd';

let uid = 0;

/**
 * @description 上传图片组件
 * @attribute uploadUrl 上传图片的链接地址
 */
class OneImg extends React.Component {
  constructor() {
    super();
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: [],
    };
    this.handleCancel = this.handleCancel.bind(this);
    this.handlePreview = this.handlePreview.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    let fileList;
    const url = this.props.fileList;
    if (url) {
      fileList = [{
        uid: -1,
        name: 'xxx.png',
        status: 'done',
        url,
      }];
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
    if (typeof fileList === 'string' && this.props.fileList !== fileList) {
      this.setState({
        fileList: [{
          uid: uid++,
          name: nextProps.fileList.split('.').pop(),
          status: 'done',
          url: nextProps.fileList,
        }]
      });
    }
    if (typeof fileList === 'undefined' || fileList === null) {
      this.setState({
        fileList: []
      });
    }
  }

  handleCancel() {
    this.setState({previewVisible: false});
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
      if (fileList[0].name.indexOf(type) < 0) {
        message.warn('文件必须为ico类型');
        return false;
      }
    }
    const data = fileList.map(v => v.response);
    if (fileList.length > 1) {
      fileList.shift();
    }
    this.props.onChange(data);
    this.setState({fileList});
  }

  render() {
    const props = this.props;
    const {previewVisible, previewImage} = this.state;
    let fileList = this.state.fileList;
    if (fileList.length > 0 && fileList[0].url === '') {
      fileList = [];
    }

    const uploadButton = (
      <div>
        <Icon type="plus"/>
        <div className="ant-upload-text">上传图片</div>
      </div>
    );
    const {uploadUrl, name} = this.props;
    return (
      <div className="clearfix">
        <Upload
          name={name || 'filedata'}
          action={uploadUrl}
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          listType="picture-card"
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img src={previewImage} alt="example" style={{width: '100%'}}/>
        </Modal>
      </div>
    );
  }
}

export default OneImg;
