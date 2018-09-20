// components/path-view/path-view.js
import toTree from './toTree';
Component({
  properties: {
    value: {
      type: Array,
      value: [],
      observer() {
        this.initView();
      }
    },
    // 非树形数据，仅在value无传参时生效
    unnormalizedValue: {
      type: Array,
      value: [],
      observer() {
        this.initView();
      }
    },
    fatherKey: {
      type: String,
      value: 'pid'
    },
    selfKey: {
      type: String,
      value: 'id'
    },
    rootValue: {
      type: null,
      value: null
    },
    pathMode: {
      type: String,
      value: 'mode1'
    },
    firstFloorTxt: {
      type: String,
      value: '第一级'
    },
    btnTxt: {
      type: String,
      value: '选择'
    },
    contentKey: {
      type: String,
      value: 'title'
    },
    // 保持位置
    // 如果开启，数据动态更新后，会保持和更新前父元素对应的界面一致
    // 这里是通过记录下更新前的父元素的唯一标识符：id（或是selfKey中设定的键对应的值），在更新后找回显示出来
    // 所以就算更新后路径变了（父元素本来在第四层，变成了第二层之类），仍然能显示父元素的相应界面
    keepLoc: {
      type: Boolean,
      value: false
    }
  },
  data: {
    outValue: [],
    currentPath: [],
    // 判断当前是否已正在执行修改路径的方法
    isChange: false,
    // 映射value值，存放树形数据
    normalValue: [],
    currentFatherId: null
  },
  methods: {
    initView() {
      if (this.properties.keepLoc) {
        if (this.data.outValue.length > 0) {
          // 记录下当前界面元素的父节点id
          let fatherId = this.properties.fatherKey;
          this.setData({
            currentFatherId: this.data.outValue[0][fatherId] || null
          });
        }
      }
      // 优先使用value
      if (this.properties.value.length > 0) {
        this.setData({
          normalValue: this.properties.value
        });
      } else {
        // 将unnormalizedValue标准化
        this.setData({
          normalValue: this.normalizeValue()
        });
      }

      if (this.properties.keepLoc && this.data.currentFatherId !== null) {
        // 得到父元素的位置
        let fatherNodeLocation = this.searchLocById(this.data.currentFatherId);
        // 父元素的位置即是我们希望得到的当前路径
        let currentPath = fatherNodeLocation;
        this.switchPath(currentPath);
      } else {
        // 设置初始的输出值
        this.setData({
          outValue: this.data.normalValue,
          currentPath: []
        });
      }
    },
    tapItem(e) {
      // 如果正在执行修改路径的方法
      if (this.data.isChange) {
        return;
      }
      this.setData({
        isChange: true
      });
      // 获取当前点击的索引
      const currentIndex = e.currentTarget.dataset.index;
      const currentText = e.currentTarget.dataset.text;
      // 如果当前点击的标签还有下一级，就将路径改变
      if (this.data.outValue[currentIndex].children) {
        // 添加索引如路径
        this.setData({
          currentPath: [
            ...this.data.currentPath,
            { text: currentText, index: currentIndex }
          ]
        });
        this.selPath();
      }
      this.setData({
        isChange: false
      });
    },
    // 选择路径
    // pathsIndex 是 paths 的索引
    selPath(pathsIndex = this.data.currentPath.length - 1) {
      // 判断是否在第一级
      if (this.data.currentPath.length === 0) {
        return;
      }
      // 根据路径修改 outValue
      let tmpValue = this.data.normalValue;
      // 如果 pathsIndex 是 -1 就应该要回到第一级
      if (pathsIndex === -1) {
        this.setData({
          currentPath: [],
          outValue: tmpValue
        });
        return;
      }
      for (let i = 0; i <= pathsIndex; i++) {
        let item = this.data.currentPath[i].index;
        tmpValue = tmpValue[item]['children'];
      }
      // 更新 outValue , currentPath
      let endIndex = pathsIndex + 1;
      this.setData({
        outValue: tmpValue,
        currentPath: this.data.currentPath.slice(0, endIndex)
      });
    },
    toPath(e) {
      // 如果正在执行修改路径的方法
      if (this.data.isChange) {
        return;
      }
      this.setData({
        isChange: true
      });
      // 获取当前点击的索引
      const index =
        e.currentTarget.dataset.index != undefined
          ? e.currentTarget.dataset.index
          : this.data.currentPath.length - 1;
      this.selPath(index - 1);
      this.setData({
        isChange: false
      });
    },
    tapBtn(e) {
      this.triggerEvent('tapBtn', e.currentTarget.dataset.item);
    },
    // 将非标准值标准化
    normalizeValue() {
      return toTree({
        value: this.properties.unnormalizedValue,
        fatherKey: this.properties.fatherKey,
        selfKey: this.properties.selfKey,
        rootValue:
          this.properties.rootValue === null
            ? undefined
            : this.properties.rootValue
      });
    },
    // 通过唯一标识符找到元素的所在位置
    // 这里特意用了loc（location）表示位置而不是path，二者的区别是loc还包括了元素自身，而path不包括元素自身
    // 如树形数据[{id:1,title:'1'}],id:1的位置是[1]，而它的路径是[]
    searchLocById(id) {
      if (id == null) {
        return null;
      }
      let tree = JSON.parse(JSON.stringify(this.data.normalValue));
      for (let i = 0; i < tree.length; i++) {
        tree[i].__location = [i];
        if (id === tree[i][this.properties.selfKey]) {
          return tree[i].__location;
        }
      }
      var stark = [];
      stark = stark.concat(tree);
      while (stark.length) {
        var temp = stark.shift();
        if (temp.children) {
          for (let j = 0; j < temp.children.length; j++) {
            temp.children[j].__location = [...temp.__location, j];
            if (id === temp.children[j][this.properties.selfKey]) {
              return temp.children[j].__location;
            }
          }
          // 当前节点有子节点时，将子节点放到当前的栈的前面
          stark = temp.children.concat(stark);
        }
      }
      // 如果找不到对应id的位置
      return null;
    },
    // 直接跳转到指定路径
    switchPath(pathArr = []) {
      let tmpValue = JSON.parse(JSON.stringify(this.data.normalValue));
      let currentPath = [];
      for (let i = 0; i < pathArr.length; i++) {
        let index = pathArr[i];
        let text = tmpValue[index][this.properties.contentKey];
        tmpValue = tmpValue[index]['children'];
        currentPath.push({
          text,
          index
        });
      }
      // 更新 outValue , currentPath
      this.setData({
        outValue: tmpValue,
        currentPath
      });
    }
  }
});
