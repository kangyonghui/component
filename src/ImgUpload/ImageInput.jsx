import React, {PropTypes} from 'react';
import {MessageNew} from 'component';
import objectAssign from 'object-assign';

const now = +(new Date());
let index = 0;

function imageid() {
  return '__imageid__' + now + '-' + (++index);
}


export default React.createClass({

  propTypes: {
    onFileLoaded: PropTypes.func,
  },

  onChange(e) {

    const files = e.target.files;
    //遍历所有文件
    for (var i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onload = () => {

        let type = file.type.split('/')[0];

        if (type && type == "image") {

          this.onFileLoaded(file, reader.result);

        } else {
          MessageNew.error({
            title: '请选择图片文件！'
          })
        }
      };

      reader.readAsDataURL(file);
    }
  },

  onFileLoaded(file, src) {

    const fileObj = {
      file,
      src,
      key: imageid(),
      mimeType: file.type,
    };


    this.props.onFileLoaded && this.props.onFileLoaded(fileObj);

  },

  onClick() {
    const el = this.file;
    if (!el) {
      return;
    }
    el.click();
    el.value = '';
  },

  onKeyDown(e) {
    if (e.key === 'Enter') {
      this.onClick();
    }
  },

  render() {

    const props = this.props;

    let {styles, viewOnly} = props;

    let show = {
      display: "block"
    };

    if (viewOnly === true) {
      show.display = 'none';
    }

    return (
      <div
        className='input-klass'
        style={objectAssign({}, styles, show)}
        onClick={this.onClick}
        onKeyDown={this.onKeyDown}
        onDrop={this.onFileDrop}
        onDragOver={this.onFileDrop}
        role="button"
        tabIndex="0"
      >
        <input type="file"
               ref={file => this.file = file}
               style={{display: 'none'}}
               disabled={props.disabled}
               accept={props.accept}
               multiple={this.props.multiple}
               onChange={this.onChange}/>
        {props.children}
      </div>
    );
  }

});
