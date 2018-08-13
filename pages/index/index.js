// pages/treeTest/treeTest.js
Page({
  data: {
    value: [],
    unnormalizedValue: [],
    unnormalizedValue2: [],
    fatherKey: 'pid',
    pathMode: 'mode1',
    firstFloorTxt: '一级',
    btnTxt: 'Tap me'
  },
  selThis(e) {
    console.log(e.detail);
  },
  onLoad() {
    // 这里是模拟异步加载数据。数据value/unnormalizedValue改变视图可以自动更新
    setTimeout(() => {
      this.setData({
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
        ],
        unnormalizedValue: [
          {
            id: 1,
            title: '1'
          },
          {
            id: 2,
            pid: 1,
            title: '2'
          },
          {
            id: 3,
            pid: 1,
            title: '3'
          },
          {
            id: 4,
            pid: 2,
            title: '4'
          },
          {
            id: 5,
            pid: 4,
            title: '5'
          },
          {
            id: 6,
            pid: 5,
            title: '6'
          },
          {
            id: 7,
            title: '7'
          }
        ],
        unnormalizedValue2: [
          {
            id: 1,
            title: '1'
          },
          {
            id: 2,
            fatherId: 1,
            title: '2'
          },
          {
            id: 3,
            fatherId: 1,
            title: '3'
          },
          {
            id: 4,
            fatherId: 2,
            title: '4'
          },
          {
            id: 5,
            fatherId: 4,
            title: '5'
          },
          {
            id: 6,
            fatherId: 5,
            title: '6'
          },
          {
            id: 7,
            title: '7'
          }
        ]
      });
    }, 2000);
    setTimeout(() => {
      this.setData(
        {
          firstFloorTxt: '0级',
          btnTxt: '点我',
          fatherKey: 'fatherId'
        },
        () => {
          // this.selectComponent('#pathView').initView();
        }
      );
    }, 10000);
  }
});
