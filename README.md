# path-view-component

> 微信小程序 树形菜单替代组件：路径视图 path-view

## 项目截图

![路径视图动态效果图](https://github.com/haishangfeie/path-view-component/static/1.gif)

## 使用方法

```
git clone https://github.com/haishangfeie/path-view-component.git

将components文件夹放入微信小程序项目根目录中
```

举例：例如是 index 页面要引入组件

> pages/index/index.json

```
{
  "usingComponents": {
    "path-view": "/components/path-view/index"
  }
}
```

> pages/index/index.wxml

```
<path-view value="{{value}}"
            btnTxt='选中本项'
            catchtapBtn="selThis"></path-view>
```

> pages/index/index.js

```
Page({
  data: {
    value: [
      {
        title: 'a-一级节点',
        children: [
          {
            title: 'a-二级节点1',
            children: [
              {
                title: 'a-三级节点1',
                children: [
                  {
                    title: 'a-四级节点1'
                  }
                ]
              },
              {
                title: 'a-三级节点2'
              },
              {
                title: 'a-三级节点3'
              }
            ]
          },
          {
            title: 'a-二级节点2',
            children: [
              {
                title: 'a-三级节点1'
              },
              {
                title: 'a-三级节点2'
              }
            ]
          }
        ]
      },
      {
        title: 'b-一级节点',
        children: [
          {
            title: 'b-二级节点1',
            children: [
              {
                title: 'b-三级节点1'
              },
              {
                title: 'b-三级节点2'
              },
              {
                title: 'b-三级节点3'
              }
            ]
          },
          {
            title: 'b-二级节点2',
            children: [
              {
                title: 'b-三级节点1'
              },
              {
                title: 'b-三级节点2'
              }
            ]
          }
        ]
      }
    ]
  },
  selThis(e) {
    console.log(e.detail);
  }
});
```
