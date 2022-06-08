/**
 * Created by neo on 15/12/15.
 */
import React from 'react';
import createReactClass from 'create-react-class';
import Lightbox from './Lightbox.js';
import objectAssign from 'object-assign';
import PropTypes from 'prop-types';
import './styles/style.css';
import './styles/paper-work.css';

const PaperWork = createReactClass({
  displayName: 'PaperWork',
  propTypes: {
    images: PropTypes.array,
    heading: PropTypes.string,
    subheading: PropTypes.string,
    sepia: PropTypes.bool,
    hasRotate: PropTypes.bool,
    thumbnail: PropTypes.object
  },
  getDefaultProps() {
    return {
      thumbnail: {}
    };
  },
  getInitialState() {
    return {
      lightboxIsOpen: false,
      currentImage: 0,
    };
  },
  openLightbox(index, event) {
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
  gotoPrevious() {
    this.setState({
      currentImage: this.state.currentImage - 1,
    });
  },
  gotoNext() {
    this.setState({
      currentImage: this.state.currentImage + 1,
    });
  },
  renderGallery() {
    if (!this.props.images) return;
    let gallery = this.props.images.map((obj, i) => {
      const imgElement = obj.element || <img src={obj.src} style={ obj.style || {} }/>;
      return (
        <li key={i} className="image-list-item">
          <a href={obj.src} onClick={(event) => this.openLightbox(i, event)}
             style={objectAssign({}, styles.thumbnail, this.props.thumbnail)}>
            {imgElement}
          </a>
          <p>{obj.title}</p>
        </li>
      );
    });

    return (
      <div style={styles.gallery}>
        <ul className="image-list-group">
          {gallery}
        </ul>
      </div>
    );
  },
  render() {
    return (
      <div className="section paper-work">
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
          styles={this.props.styles}
          hasRotate={this.props.hasRotate || false}
          width={1200}
        />
      </div>
    );
  }
});

const THUMBNAIL_SIZE = 168;

const styles = {
  gallery: {
    // marginLeft: -5,
    // marginRight: -5,
    overflow: 'hidden',
  },
  thumbnail: {
    backgroundSize: 'cover',
    borderRadius: 5,
    float: 'left',
    height: 'auto',
    overflow: 'hidden',
    width: THUMBNAIL_SIZE,
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

module.exports = PaperWork;
