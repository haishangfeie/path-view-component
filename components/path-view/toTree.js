export default function toTree({
  value = [],
  fatherKey = 'pid',
  selfKey = 'id',
  childrenKey = 'children',
  rootValue = undefined
} = {}) {
  // 复制对象
  value = JSON.parse(JSON.stringify(value));
  for (let i = 0; i < value.length; i++) {
    let itemI = value[i];
    if (itemI[fatherKey] === rootValue) {
      continue;
    }
    for (let j = 0; j < value.length; j++) {
      if (i === j) {
        continue;
      }
      let itemJ = value[j];
      if (itemI[fatherKey] === itemJ[selfKey]) {
        if (
          !itemJ[childrenKey] ||
          Object.prototype.toString.call(itemJ[childrenKey]) !==
            '[object Array]'
        ) {
          itemJ[childrenKey] = [];
        }
        itemJ[childrenKey].push(itemI);
        break;
      }
    }
  }
  return value.filter(item => item[fatherKey] === rootValue);
}
