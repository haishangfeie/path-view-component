# path-view-component

> 微信小程序 树形菜单替代组件：路径视图 path-view

## 项目截图

路径视图动态效果图-路径模式：currentPage:
![路径视图动态效果图-路径模式：currentPage](https://github.com/haishangfeie/path-view-component/blob/master/static/1.gif?raw=true)

路径视图动态效果图-路径模式：folder:
![路径视图动态效果图-路径模式：folder](https://github.com/haishangfeie/path-view-component/blob/master/static/2.gif?raw=true)

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
# API
| 参数      | 说明    | 类型      | 可选值 | 默认值  |
|---------- |-------- |---------- |---------- |---------- |
|value     | 显示的树状数据 | Array | Y | [] |
|pathMode     | 路径模式，支持：'folder'、'currentPage'。'folder'模式，点击路径跳转时视图显示对应标签下一级的内容,'currentPage'模式，点击路径跳转时视图显示标签对应的那一层级的内容 | String | Y | folder |
|firstFloorTxt     | pathMode为'folder'时生效，指定第一级标签的文本 | String | Y | 第一级 |
|btnTxt | 点击按钮显示的文本 | String | Y | 选择 |

## 事件
| 事件名      | 说明    | 参数      |
|---------- |-------- |---------- |
| tapBtn  | 单击节点按钮触发的事件 | 返回传入该item的所有信息 Object |