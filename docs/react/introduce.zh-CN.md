---
order: 0
title: 组件列表首页
---
## 文档说明

* 该文档介绍了我们系统中用到的组件的属性，方法以及使用方式。
* 在开发过程中可以将测试代码写到md文件里面进行测试。
> 该功能需要我们在components文件夹下面建立类似button的文件夹以及类似的内容，便可以在页面显示我们的组件效果了。


## 使用方法
- 安装
    > npm install git+http://git.dev.wiseonline.cn/kangyh/component.git -save
- 使用
    ````
    import {SubmitGroupLarge} from 'component';
    ReactDOM.render(
        <div>
          <SubmitGroupLarge/>
        </div>,
        mountNode
      );
    ````
