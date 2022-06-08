/**
 * Created by neo on 15/12/15.
 */
import React from 'react';
import createReactClass from 'create-react-class';
import Lightbox from './Lightbox.js';
import './styles/style.css';
import Icon from 'react-fa';
import classnames from "classnames";
import objectAssign from 'object-assign';
import PropTypes from 'prop-types';

const THUMBNAIL_SIZE = 120;

const defaultStyles = {
  gallery: {
    overflow: 'hidden',
  },
  thumbnail: {
    backgroundSize: 'cover',
    height: 'auto',
    overflow: 'hidden',
    width: THUMBNAIL_SIZE
  },
  thumbnailImage: {
    display: 'block',
    height: 'auto',
    left: '50%',
    position: 'relative',

    WebkitTransform: 'translateX(-50%)',
    MozTransform: 'translateX(-50%)',
    msTransform: 'translateX(-50%)',
    transform: 'translateX(-50%)',
  },
};

const Gallery = createReactClass({
  displayName: 'Gallery',
  propTypes: {
    images: PropTypes.array,
    heading: PropTypes.string,
    subheading: PropTypes.string,
    sepia: PropTypes.bool,
    style: PropTypes.object,
    preview: PropTypes.bool
  },
  getDefaultProps() {
    return {
      style: {}
    };
  },
  getInitialState () {
    return {
      lightboxIsOpen: false,
      currentImage: 0,
      preview: false
    };
  },
  openLightbox (index, event) {
    event.preventDefault();
    this.setState({
      currentImage: index,
      lightboxIsOpen: true,
    });
  },
  closeLightbox () {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    });
  },
  gotoPrevious () {
    this.setState({
      currentImage: this.state.currentImage - 1,
    });
  },
  gotoNext () {
    this.setState({
      currentImage: this.state.currentImage + 1,
    });
  },
  handleDelete(obj){
    this.props.onImageRemove(obj);
  },
  renderGallery () {
    if (!this.props.images) return;

    const {style, preview} = this.props

    defaultStyles.thumbnail.width = style.width || defaultStyles.thumbnail.width;
    defaultStyles.thumbnail.height = style.height;

    const cls = classnames({
      "image-list-item": true,
      'preview': !preview ? true : false
    });

    let gallery = this.props.images.map((obj, i) => {
      return (
        <li key={i} className={cls}>
          <a href={obj.src} onClick={(event) => this.openLightbox(i, event)}
             style={objectAssign({}, defaultStyles.thumbnail)}>
            {/*<img src={obj.src} style={ obj.style || {} }/>*/}
            <img src={obj.src} style={objectAssign({}, obj.style, this.props.style) || {}}/>
          </a>
          <p>{obj.title}</p>
          {this.props.onImageRemove ?
            <div className="image-del"><span onClick={this.handleDelete.bind(this, obj)}><Icon
              name="times"/></span>
            </div> : null}
        </li>
      );
    });

    return (
      <div style={defaultStyles.gallery}>
        <ul className="image-list-group">
          {gallery}
        </ul>
      </div>
    );
  },
  render () {
    return (
      <div className="section" style={{marginBottom: "15px"}}>
        {this.props.heading && <h2>{this.props.heading}</h2>}
        {this.props.subheading && <p>{this.props.subheading}</p>}
        {this.renderGallery()}
        <Lightbox
          currentImage={this.state.currentImage}
          images={this.props.images}
          isOpen={this.state.lightboxIsOpen}
          onClickPrev={this.gotoPrevious}
          onClickNext={this.gotoNext}
          onClose={this.closeLightbox}
          width={1200}
          hasRotate={this.props.hasRotate || false}
        />
      </div>
    );
  }
});

module.exports = Gallery;
