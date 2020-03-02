let treeItem;
let htmlText="<table>";
for (treeItem of treeArr){
  htmlText +="<tr>"
  htmlText +="<td>" + treeItem.name + "</td>"
  htmlText +="<td>"+ "Planted by: " + treeItem.plantedBy + "</td>"
  htmlText +="<td>" + "Planted on date: " + treeItem.plantedOn + "</td>"
  htmlText += "<td>" + "with ID: " + "<a href = 'tree.html?id=" + treeItem.id + "'>" + treeItem.id + "</a>" + "</td>"
  htmlText +="</tr>"
  htmlText +="</table>"
}
document.getElementById("tableview").innerHTML=htmlText;
