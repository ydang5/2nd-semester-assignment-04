let treeItem;
var treeId = getUrlParam('id','Empty');

for (treeItem of treeArr){
  if (treeItem.id == treeId){
    break
  }
}
console.log(treeItem)
