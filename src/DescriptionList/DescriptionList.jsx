import React from 'react';
import {Row} from 'antd';
import PropTypes from 'prop-types';
import Description from './Description';
import chunk from 'lodash/chunk';
import './index.less';

class DescriptionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const {children, layout, col, gutter, size} = this.props;
    const column = col > 4 ? 4 : col;
    const clsnames = 'descriptionList' + ' ' + size + ' ' + layout;
    let rowArray = [];
    if (children) {
      rowArray = Array.isArray(children) ? chunk(children, column) : [children];
    }

    return (
      <div className={clsnames}>
        <Row gutter={gutter}>
          {
            rowArray.map((row, rowindex) => {
              let rowArr = row.length ? row : [row];
              return (
                <div key={rowindex} style={{display: 'flow-root'}}>
                  {
                    rowArr.map((child, index) => {
                      return (
                        <Description
                          term={child.props.term}
                          labelStyle={child.props.labelStyle}
                          contentStyle={child.props.contentStyle}
                          type={child.props.type}
                          images={child.props.images}
                          columns={child.props.columns}
                          column={column}
                          key={index}
                        >
                          {child.props.children}
                        </Description>
                      )
                    })
                  }
                </div>
              )
            })
          }
        </Row>
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

export default DescriptionList
