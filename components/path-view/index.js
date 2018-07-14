// components/path-view/path-view.js
Component({
  attached() {
    // 设置初始的输出值
    this.setData({
      outValue: this.properties.value
    });
  },
  properties: {
    value: {
      type: Array,
      value: []
    },
    btnTxt: {
      type: String,
      value: '选择'
    }
  },
  data: {
    outValue: [],
    currentPath: []
  },
  methods: {
    tapItem(e) {
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
    },
    // 选择路径
    // pathsIndex 是 paths 的索引
    selPath(pathsIndex = this.data.currentPath.length - 1) {
      // 判断是否在第一级
      if (this.data.currentPath.length === 0) {
        return;
      }
      // 根据路径修改 outValue
      let tmpValue = this.data.value;
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
      // 获取当前点击的索引
      const index =
        e.currentTarget.dataset.index != undefined
          ? e.currentTarget.dataset.index
          : this.data.currentPath.length - 1;
      this.selPath(index - 1);
    },
    tapBtn(e) {
      this.triggerEvent('tapBtn', e.currentTarget.dataset.item);
    }
  }
});
