import React, {cloneElement} from 'react';

class CascadeSelect extends React.Component {
  constructor() {
    super();
    this.state = {

    };
  }
  componentWillMount() {
    this.props.children.map((v) => {
      this.state[v.key] = null;
    });
  }

  changeItem = (key, value) => {
    this.state[key] = value;
    this.setState({});
    const notNull = {};
    Object.keys(this.state).forEach((v) => {
      if (this.state[v] !== null) {
        notNull[v] = this.state[v];
      }
    });
    if (this.props.onChange) {
      this.props.onChange(notNull);
    }
  }

  render() {
    return (
      <div>
        {this.props.children.map((v) => {
          const {param} = v.props;
          const args = Object.assign({}, v.props, {
            value: this.state[v.key],
            onChange: value => this.changeItem(v.key, value)
          });
          if (param) {
            args.param = this.state[param];
          }
          const dom = cloneElement(v, args);
          return dom;
        })}
      </div>
    );
  }
}
export default CascadeSelect;
// class CascadeSelect extends React.Component{
//   componentWillReceiveProps(){
//
//   }
//   fetchData(){
//     axios({
//       url: `${this.props.url}/${this.props[this.props.params]}`
//     })
//   }
//   render(){
//     return (<div>
//       <Select onChange={(val) => this.props.onChange(this.props.key, val)}></Select>
//     </div> )
//   }
// }
