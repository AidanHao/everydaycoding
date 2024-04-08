// list转tree
const list = [
  { key: 1, data: "A", parentkey: 0 },
  { key: 2, data: "B", parentkey: 0 },
  { key: 3, data: "C", parentkey: 1 },
  { key: 4, data: "D", parentkey: 1 },
  { key: 5, data: "E", parentkey: 2 },
  { key: 6, data: "F", parentkey: 3 },
  { key: 7, data: "G", parentkey: 2 },
  { key: 8, data: "H", parentkey: 4 },
];
function convert(list) {
  let judobj = {};
  for (let i = 0; i < list.length; i++) {
    judobj[list[i].key] = i;
  }
  for (let i = 0; i < list.length; i++) {
    if (list[i].parentkey === 0) {
      continue;
    } else {
      if (!list[judobj[list[i].parentkey]].children) {
        list[judobj[list[i].parentkey]].children = [];
        list[judobj[list[i].parentkey]].children.push(list[i]);
      } else {
        list[judobj[list[i].parentkey]].children.push(list[i]);
      }
    }
  }

  return list.filter((list) => {
    return list.parentkey === 0;
  });
}
let list2 = convert(list);
function reconvert(list) {
  let newlist = [];
  for (let i = 0; i < list.length; i++) {
    const { key, data, parentkey } = list[i];
    newlist.push({ key, data, parentkey });
    if (list[i].children) {
        newlist = newlist.concat((newlist,reconvert(list[i].children)));
    }
  }
  return newlist;
}
let list3 = reconvert(list2);
console.log(list3);
