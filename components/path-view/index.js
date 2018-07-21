// components/path-view/path-view.js
import toTree from './toTree';
Component({
  attached() {
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
    // 设置初始的输出值
    this.setData({
      outValue: this.data.normalValue
    });
  },
  properties: {
    value: {
      type: Array,
      value: []
    },
    // 非树形数据，仅在value无传参时生效
    unnormalizedValue: {
      type: Array,
      value: []
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
      value: undefined
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
    }
  },
  data: {
    outValue: [],
    currentPath: [],
    // 判断当前是否已正在执行修改路径的方法
    isChange: false,
    // 映射value值，用于将可能为标准化的值标准化
    normalValue: []
  },
  methods: {
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
        selfKey: this.properties.selfKey
      });
    }
  }
});
