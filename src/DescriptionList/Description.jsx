import React from 'react';
import {Col} from 'antd';
import {Gallery} from 'component';
import PropTypes from 'prop-types';

const responsive = {
  1: {xs: 24},
  2: {xs: 24, sm: 12},
  3: {xs: 24, sm: 12, md: 8},
  4: {xs: 24, sm: 12, md: 6},
  5: {xs: 24, sm: 16},
  6: {xs: 24, sm: 18}
};

class Description extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  getColumn() {
    const {columns, column} = this.props;
    let col = column;
    if (columns) {
      switch (column) {
        case 1:
          col = 1;
          break;
        case 2:
          if (columns == 2)
            col = 1;
          break;
        case 3:
          if (columns == 2)
            col = 5;
          else if (columns == 3)
            col = 1;
          break;
        case 4:
          if (columns == 2)
            col = 2;
          else if (columns == 3)
            col = 6;
          else if (columns == 4)
            col = 1;
          break;
        default:
          break;
      }
    }
    return col;
  }

  render() {
    const {term, type, images, labelStyle, contentStyle} = this.props;
    let column = this.getColumn();
    let ele;
    if (type && type === 'image')
      if (term)
        ele = (
          <Col span={24}>
            <div className="description-label" style={labelStyle}>{this.props.term}</div>
            <div className="description-detail"><Gallery images={images}/></div>
          </Col>
        )
      else
        ele = (
          <Col span={23} offset={1}><Gallery images={images}/></Col>
        )
    else
      ele = (
        <Col {...responsive[column]}>
          <div className="description-label" style={labelStyle}>{this.props.term}</div>
          <div className="description-detail" style={contentStyle}>{this.props.children}</div>
        </Col>
      )

    return (
      <div>{ele}</div>
    )
  }
}

Description.propTypes = {
  term: PropTypes.string,
  labelStyle: PropTypes.object,
  contentStyle: PropTypes.object,
  type: PropTypes.string,
  images: PropTypes.array,
  columns: PropTypes.number
};
Description.defaultProps = {
  term: '',
  labelStyle: {},
  contentStyle: {},
  type: '',
  images: []
};

export default Description;
