import React from 'react';
import {Breadcrumb, Icon} from 'antd';
import {Link} from 'dva/router';
import './style.css';

/**
 * @description JSX 路由
 * @param route 路由对象
 * @param params 参数
 * @param routes 路由数组
 * @param paths 路径名称
 * @returns {} JSX
 */
function itemRender(route, params, routes, paths) {
  const length = routes.length;
  const index = routes.indexOf(route);
  const begin = index === 1;
  const last = index === length - 1;
  //noinspection JSUnresolvedVariable
  if (begin) {
    //noinspection JSUnresolvedVariable
    return <Link to={`/${paths.join('/')}`}><Icon type="home"/>{route.breadcrumbName}</Link>;
  } else if (last) {
    //noinspection JSUnresolvedVariable
    return <span>{route.breadcrumbName}</span>;
  }
  // noinspection JSUnresolvedVariable
  return <Link to={`/${paths.join('/')}`}>{route.breadcrumbName}</Link>;
}

/**
 * @description 根据传入的路由，返回对应的面包屑
 * @attribute routes 路由信息
 * @attribute params 参数信息
 */
class Bread extends React.Component {
  render() {
    const {routes, params} = this.props;
    return (
      <Breadcrumb className="zdy" itemRender={itemRender} routes={routes} params={params}/>
    );
  }
}

export default Bread;
