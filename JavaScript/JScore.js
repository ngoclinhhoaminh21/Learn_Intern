const { forIn } = require('lodash');
const _ = require('lodash');
const scores = [
  { score: 45, subject: 'chinese' },
  { score: 90, subject: 'math' },
  { score: 60, subject: 'english' },
  { score: 60, subject: 'english' },
];
const users = [
  { user: 'fred', age: 48 },
  { user: 'barney', age: 50 },
  { user: 'fred', age: 40 },
  { user: 'barney', age: 34 },
];
const sortBy = function (arr, ...propertys) {
  const cloneDeepArr = JSON.parse(JSON.stringify(arr));
  for (let key in propertys) {
    key = key * 1;
    cloneDeepArr.sort((a, b) => {
      if (key === 0) {
        if (typeof a[propertys[key]] === 'string')
          return a[propertys[key]].localeCompare(b[propertys[key]]);
        return a[propertys[key]] - b[propertys[key]];
      }
      if (key > 0) {
        if (a[propertys[key - 1]] === b[propertys[key - 1]]) {
          if (typeof a[propertys[key]] === 'string')
            return a[propertys[key]].localeCompare(b[propertys[key]]);
          filterAObject(acc[acc.length - 1][0]);
          return a[propertys[key]] - b[propertys[key]];
        }
        return 0;
      }
    });
  }
  return cloneDeepArr;
};
const orderBy = function (arr, propertys, orders) {
  const cloneDeepArr = JSON.parse(JSON.stringify(arr));
  for (let key in propertys) {
    key = key * 1;
    const order = orders[key] === 'asc' ? 1 : -1;
    cloneDeepArr.sort((a, b) => {
      if (key === 0) {
        if (typeof a[propertys[key]] === 'string')
          return a[propertys[key]].localeCompare(b[propertys[key]]) * order;
        return (a[propertys[key]] - b[propertys[key]]) * order;
      }
      if (key > 0) {
        if (a[propertys[key - 1]] === b[propertys[key - 1]]) {
          if (typeof a[propertys[key]] === 'string')
            return a[propertys[key]].localeCompare(b[propertys[key]]) * order;
          return (a[propertys[key]] - b[propertys[key]]) * order;
        }
        return 0;
      }
    });
  }
  return cloneDeepArr;
};
const filterAObject = function (obj, filterObj) {
  for (const key in filterObj) {
    if (!obj.hasOwnProperty(key)) return false;
    if (obj[key] !== filterObj[key]) return false;
  }
  return true;
};
const objectWithPropertys = function (obj, propertys) {
  const target = {};
  for (const key of propertys) {
    if (!obj.hasOwnProperty(key)) return {};
    target[key] = obj[key];
  }
  return target;
};
const groupBy = function (arr, propertys) {
  const sortedArr = sortBy(arr, ...propertys);
  return sortedArr.reduce((acc, el, index, arr) => {
    if (
      acc.length === 0 ||
      !filterAObject(acc[acc.length - 1][0], objectWithPropertys(el, propertys))
    ) {
      return [...acc, [el]];
    }
    acc[acc.length - 1] = [...acc[acc.length - 1], el];
    return acc;
  }, []);
};
console.log(groupBy(users, ['user']));
const y = orderBy(users, ['user', 'age'], ['asc', 'asc']);
console.log(y);
console.log(sortBy(users, 'age'));
// groupBy(users, ['age']);
const filter = function (arr, filterObj) {
  return arr.reduce((acc, el, index, arr) => {
    for (const key in filterObj) {
      if (filterObj[key] !== el[key]) return acc;
    }
    return [...acc, el];
  }, []);
};
const test = filter(scores, { score: 60, subject: 'math' });
console.log(test);
// const score60 = scores.reduce((acc, el, index, arr) => {
//   if (el.score === 60) {
//     acc = [...acc, el];
//   }
//   return acc;
// }, []);
// const a = { score: 45, subject: 'chinese' };
// const b = { score: 90, subject: 'math' };
// const arr1 = [a, b];
// const arr2 = arr1.map((el) => {
//   return { ...el };
// });
// arr2[1].score = 100;
// console.log(arr1);
// console.log(arr2);
