import React from 'react';
import createReactClass from 'create-react-class';
import Fade from './Fade';
import Icon from './Icon';
import Portal from './Portal';
import FAIcon from 'react-fa';
import PropTypes from 'prop-types';
import defaultStyles from './styles/default';
import Transition from 'react-transition-group/TransitionGroup';
import objectAssign from 'object-assign';

const BODY = document.body;

function blacklist(src) {
  var copy = {}, filter = arguments[1]

  if (typeof filter === 'string') {
    filter = {}
    for (var i = 1; i < arguments.length; i++) {
      filter[arguments[i]] = true
    }
  }

  for (const key in src) {
    // blacklist?
    if (filter[key]) continue

    copy[key] = src[key]
  }

  return copy
}

const Lightbox = createReactClass({
  displayName: 'Lightbox',
  propTypes: {
    backdropClosesModal: PropTypes.bool,
    currentImage: PropTypes.number,
    enableKeyboardInput: PropTypes.bool,
    height: PropTypes.number,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        src: PropTypes.string.isRequired,
        srcset: PropTypes.array,
      })
    ).isRequired,
    isOpen: PropTypes.bool,
    onClickNext: PropTypes.func.isRequired,
    onClickPrev: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    showCloseButton: PropTypes.bool,
    styles: PropTypes.object,
    width: PropTypes.number,
    hasRotate: PropTypes.bool,
  },
  statics: {
    extendStyles(styles) {
      let extStyles = {...defaultStyles};
      for (const key in extStyles) {
        if (key in styles) {
          extStyles[key] = objectAssign({}, defaultStyles[key], styles[key]);
        }
      }
      return extStyles;
    }
  },
  getDefaultProps() {
    return {
      backdropClosesModal: true,
      enableKeyboardInput: true,
      currentImage: 0,
      height: 600,
      styles: defaultStyles,
      width: 900,
      hasRotate: false,
    };
  },
  getInitialState: function () {
    return {
      currentImage: 0,
      currentDeg: 0,
    };
  },
  componentWillReceiveProps (nextProps) {
    this.setState({
      currentImage: nextProps.currentImage,
      currentDeg: 0
    });

    if (nextProps.isOpen && nextProps.enableKeyboardInput) {
      window.addEventListener('keydown', this.handleKeyboardInput);
    } else {
      window.removeEventListener('keydown', this.handleKeyboardInput);
    }

    if (nextProps.isOpen) {
      BODY.style.overflow = 'hidden';
    } else {
      BODY.style.overflow = null;
    }
  },


  gotoPrev (event) {
    if (this.props.currentImage === 0) return;
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.props.onClickPrev();
  },
  gotoNext (event) {
    if (this.props.currentImage === (this.props.images.length - 1)) return;
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.props.onClickNext();
  },
  rotateLeft (event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    let deg = this.state.currentDeg || 0;
    deg -= 90;
    this.setState({
      currentDeg: deg
    });
  },
  rotateRight (event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    let deg = this.state.currentDeg || 0;
    deg += 90;
    this.setState({
      currentDeg: deg
    });
  },
  handleKeyboardInput (event) {
    if (event.keyCode === 37) {
      this.gotoPrev();
    } else if (event.keyCode === 39) {
      this.gotoNext();
    } else if (event.keyCode === 27) {
      this.props.onClose();
    } else {
      return false;
    }
  },
  close () {
    this.props.backdropClosesModal && this.props.onClose && this.props.onClose();
  },

  renderArrowPrev () {
    if (this.props.currentImage === 0) return;

    return (
      <Fade key="arrowPrev">
        <button type="button" style={objectAssign({}, this.props.styles.arrow, this.props.styles.arrowPrev)}
                onClick={this.gotoPrev} onTouchEnd={this.gotoPrev}>
          <Icon type="arrowLeft"/>
        </button>
      </Fade>
    );
  },
  renderArrowNext () {
    if (this.props.currentImage === (this.props.images.length - 1)) return;

    return (
      <Fade key="arrowNext">
        <button type="button" style={objectAssign({}, this.props.styles.arrow, this.props.styles.arrowNext)}
                onClick={this.gotoNext} onTouchEnd={this.gotoNext}>
          <Icon type="arrowRight"/>
        </button>
      </Fade>
    );
  },
  renderRotate () {

    if (!this.props.hasRotate) return;

    return (
      <Fade key="rotate">
        <div style={objectAssign({}, this.props.styles.rotate)}>
          <button style={objectAssign({}, this.props.styles.rotateLeft)} key='left' type="button"
                  onClick={this.rotateLeft} onTouchEnd={this.rotateLeft}>
            <FAIcon size='2x' name='undo'/>
          </button>
          <button style={objectAssign({}, this.props.styles.rotateRight)} key='right' type="button"
                  onClick={this.rotateRight} onTouchEnd={this.rotateRight}>
            <FAIcon size="2x" name="repeat"/>
          </button>
        </div>
      </Fade>
    );
  },
  renderBackdrop () {
    if (!this.props.isOpen) return;

    return (
      <Fade key="backdrop">
        <div key="backdrop" style={this.props.styles.backdrop} onTouchEnd={this.close} onClick={this.close}/>
      </Fade>
    );
  },
  renderCloseButton () {
    if (!this.props.showCloseButton) return;

    return (
      <Fade key="closeButton">
        <button style={this.props.styles.close} onClick={this.props.onClose}>Close</button>
      </Fade>
    );
  },
  renderDialog () {
    if (!this.props.isOpen) return;

    return (
      <Fade key="dialog" onTouchEnd={this.close} onClick={this.close}
            style={objectAssign({}, this.props.styles.dialog, {height: this.props.height, width: this.props.width})}>
        {this.renderImages()}
        <Transition transitionName="div" component="div">
          {this.renderArrowPrev()}
        </Transition>
        <Transition transitionName="div" component="div">
          {this.renderArrowNext()}
        </Transition>
        <Transition transitionName="div" component="div">
          {this.renderRotate()}
        </Transition>
        <Transition transitionName="div" component="div">
          {this.renderCloseButton()}
        </Transition>
      </Fade>
    );
  },
  renderImages() {
    let {images, currentImage} = this.props;
    if (!images || !images.length) return;

    let width = '100%',
      transform = 'rotate(' + this.state.currentDeg + 'deg)',
      maxWidth = this.props.styles.image.maxWidth;

    if (this.state.currentDeg % 90 === 0 && this.state.currentDeg % 180 !== 0) {
      width = this.props.height;
      maxWidth = '100%';
    }

    const imgStyle = objectAssign({}, this.props.styles.image, {maxWidth});

    let img = undefined;

    if (images[currentImage].srcset) {
      img = (
        <img src={images[currentImage].src} srcSet={images[currentImage].srcset.join()}
             sizes={parseInt(imgStyle.maxWidth) + 'vw'} style={imgStyle} onTouchEnd={e => e.stopPropagation()}
             onClick={e => e.stopPropagation()}/>
      )
    } else {
      img = (
        <img src={images[currentImage].src} style={imgStyle} onTouchEnd={e => e.stopPropagation()}
             onClick={e => e.stopPropagation()}/>
      )
    }


    const constainerStyle = objectAssign({}, this.props.styles.transform, {width, transform});
    return (
      <Transition transitionName="div" component="div" style={constainerStyle}>
        <Fade key={'image' + currentImage}>
          {img}
        </Fade>
      </Transition>
    );
  },
  render() {
    let props = blacklist(this.props, 'backdropClosesModal', 'currentImage', 'enableKeyboardInput', 'height', 'images', 'isOpen', 'onClickNext', 'onClickPrev', 'onClose', 'showCloseButton', 'styles', 'width', 'hasRotate');

    return (
      <Portal {...props}>
        <Transition transitionName="div" component="div">
          {this.renderDialog()}
        </Transition>
        <Transition transitionName="div" component="div">
          {this.renderBackdrop()}
        </Transition>
      </Portal>
    );
  }
});


module.exports = Lightbox;
