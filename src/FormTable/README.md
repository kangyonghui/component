# FormTable

是FormFilter和Table的整合组件，常规的Table页面就是用该方式。

其中`filterGroup`,`basicCondition`,`advancedCondition` 均可以不配置，这样显示的就是纯粹的Table。

- FormTable        基本TableList
- CheckTableList   多选TableList
- RadioTableList   单选TableList

## API

属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
columns | table列的配置 | array | -
rowKey | 主键 | string | -
pagination | 是否分页 | boolean | false
remote | 远程分页 | boolean | false
filterGroup | 操作按钮,TableFilter部分 | array | -
basicCondition | 基本条件,FormFilter部分 | array | -
advancedCondition | 高阶条件,FormFilter部分 | array | -
onItemSelect | 勾选之后的回调函数,参数为选中的数据 | function(rows: array) | -
requestParams | 传入构造的业务请求参数 | object | {}
