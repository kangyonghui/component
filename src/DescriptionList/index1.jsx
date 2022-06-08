import React from 'react';
import {Row, Col} from 'antd';
import chunk from 'lodash/chunk';
import './index.less';
import PropTypes from 'prop-types';

const responsive = {
  1: {xs: 24},
  2: {xs: 24, sm: 12},
  3: {xs: 24, sm: 12, md: 8},
  4: {xs: 24, sm: 12, md: 6},
};

class DescriptionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const {children, layout, col, gutter, size} = this.props;
    const column = col > 4 ? 4 : col;
    const clsnames = 'descriptionList' + ' ' + size + ' ' + layout;
    const rowArray = children.length > 1 ? chunk(children, column) : [children];
    return (
      <div className={clsnames}>
        {
          rowArray.map((row, rowindex) => {
            let rowArr = row.length ? row : [row];
            return (
              <Row gutter={gutter} key={rowindex}>
                {
                  rowArr.map((child, index) => {
                    if (child.props.type && child.props.type === 'image')
                      if (child.props.term)
                        return (
                          <Col span={24} key={index}>
                            <div className="description-label"
                                 style={{width: child.props.labelWidth ? child.props.labelWidth : 80}}>{child.props.term}</div>
                            <div className="description-detail">{child.props.children}</div>
                          </Col>
                        )
                      else
                        return (
                          <Col span={23} offset={1} key={index}>{child.props.children}</Col>
                        )
                    else
                      return (
                        <Col {...responsive[column]} key={index}>
                          <div className="description-label"
                               style={{width: child.props.labelWidth ? child.props.labelWidth : 80}}>{child.props.term}</div>
                          <div className="description-detail">{child.props.children}</div>
                        </Col>
                      )
                  })
                }
              </Row>
            )
          })
        }
      </div>
    )
  }
}

DescriptionList.propTypes = {
  layout: PropTypes.string,
  col: PropTypes.number,
  gutter: PropTypes.number,
  size: PropTypes.string
};
DescriptionList.defaultProps = {
  layout: 'horizontal',
  col: 3,
  gutter: 32,
  size: ''
};

export default DescriptionList;
