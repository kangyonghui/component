公共tab切换

```
import B from '...／b.jsx';
import SwitchTabs from '.../components/SwitchTabs';

class A extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <SwitchTabs>
        <div label="tab1" />
        <B label="tab2" />
        ...
      </SwitchTabs>
    )
  }
}
export default A;

```
