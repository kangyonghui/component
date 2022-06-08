import React from 'react';
import {Icon} from 'antd';
import Gallery from '../Gallery';
import objectAssign from 'object-assign';
import isNaN from 'lodash/isNaN';

const styles = {
  marginRight: '10px'
};

export default class UploadList extends React.Component {
  static defaultProps = {
    listType: 'picture',  // or text
    items: [],
    progressAttr: {
      strokeWidth: 3,
      showInfo: false
    },
    multi: true,
    styles: {}
  };

  handleImageRemove(img) {
    let arr = [];
    if (this.props.items) {
      arr = this.props.items.filter(file => file.key == img.id)
    }

    this.props.onRemove && this.props.onRemove(arr[0]);
  }

  renderGallery() {
    let images = [];

    if (this.props.items) {
      images = this.props.items.map(function (file) {
        return {
          id: file.key,
          src: file.src,
          title: file.title
        }
      });
    }

    return images;
  }

  renderGallerBox() {

    return <Gallery preview={ this.props.preview || false } onImageRemove={this.handleImageRemove.bind(this)}
                    images={this.renderGallery()} thumbnailStyle={this.getSize()}/>;
  }

  getSize() {
    let aspectRatio = 1;

    if (this.props.aspectRatio && !isNaN(this.props.aspectRatio)) {

      aspectRatio = this.props.aspectRatio;

    }

    const thumbnailHeight = this.props.width / aspectRatio;

    const thumbnailStyle = {
      height: Math.floor(thumbnailHeight),
      width: this.props.width
    };

    return thumbnailStyle;
  }

  getSingleImg() {
    let image = "";

    if (this.props.items && this.props.items.length >= 0) {
      image = this.props.items[0].src;
    }


    return <img className="upload-input-img" style={this.getSize()} src={image} alt=""/>;
  }

  renderImg() {
    if (this.props.multi)
      return this.renderGallerBox();
    else
      return this.getSingleImg();
  }

  render() {


    return (
      <div style={objectAssign({}, styles, this.props.styles)}>
        {this.renderImg()}
      </div>
    );
  }
}
