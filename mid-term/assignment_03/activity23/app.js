class TreeController{
    constructor(){
      let dataJSON = localStorage.getItem("treeModel");

      if (dataJSON === undefined || dataJSON === null || dataJSON ===""){
        let dataObj = {
          accountArr:[],
          treeArr:[],
          accountObj: null
        }
        dataJSON = JSON.stringify(dataObj)
        localStorage.setItem("treeModel", dataJSON);
        this.accountArr = [];
        this.treeArr = [];
        this.accountObj = null;
      } else {
          let dataObj = JSON.parse(dataJSON);
          this.accountArr = dataObj.accountArr;
          this.treeArr = dataObj.treeArr;
          this.accountObj = dataObj.accountObj;
      }
    }
    register(){
      let username = document.getElementById("register-username").value
      let password = document.getElementById("register-password").value
      let accountObj = {
        username: username,
        password: password
      }
      this.accountArr.push(accountObj);
      localStorage.setItem ("treeModel", JSON.stringify(this));
        alert("register successfully")
      window.location.href = "login.html"
    }
    login(){
      let username = document.getElementById("login-username").value
      let password = document.getElementById("login-password").value
      let accountObj;
      for (accountObj of this.accountArr){
        if (accountObj.username === username && accountObj.password === password){
          this.accountObj = accountObj
          localStorage.setItem("treeModel",JSON.stringify(this))
          alert("login successfully")
          window.location.href = "index.html"
          return
        }
      }
        alert("username or password is incorrect")
    }
    add(){
      if (this.accountObj === undefined || this.accountObj === null || this.accountObj ===""){
        alert("Please login")
        window.location.href = "login.html"
      } else {
        window.location.href = "add.html"
      }
    }
    onClickAddTree(){
      let treeName = document.getElementById("treename").value
      let treePlanedBy = document.getElementById("plantedby").value
      let treePlanedOn = document.getElementById("plantedon").value
      let treeIDNumber = document.getElementById("treeid").value
      let treeID = String(treeIDNumber)
      let treeObj = {
        treeName: treeName,
        treePlantedBy: treePlanedBy,
        treePlantedOn: treePlanedOn,
        treeID: treeID,
        isDeleted: false
      }
      this.treeArr.push(treeObj)
      localStorage.setItem("treeModel",JSON.stringify(this))
      alert("tree added")
      window.location.href = "index.html"
    }
    listTree(id){
      let treeItem;
      let htmlText="<table>";
      for (treeItem of this.treeArr){
        if (treeItem.isDeleted === false){
          htmlText +="<tr>"
          htmlText +="<td>" + treeItem.treeName + "</td>"
          htmlText +="<td>"+ "Planted by: " + treeItem.treePlantedBy + "</td>"
          htmlText +="<td>" + "Planted on date: " + treeItem.treePlantedOn + "</td>"
          htmlText += "<td>" + "with ID: " + "<a href = 'edit.html?id=" + treeItem.treeID + "'>" + treeItem.treeID + "</a>" + "</td>"
          htmlText += "&nbsp;<button onclick='controller.onEditClick(\"" + treeItem.treeID + "\");'>Edit</button>";
          htmlText += "&nbsp;<button onclick='controller.onPermDeleteClick(\"" + treeItem.treeID + "\");'>Delete</button>";
          htmlText += "&nbsp;<button onclick='controller.onTempDeleteClick(\"" + treeItem.treeID + "\");'>Achive</button>";
        //TODO htmlText += "<td>" + "with ID: " + "<a href = 'edit.html?id=" + treeItem.treeID + "'>" + treeItem.treeID + "</a>" + "</td>"
          htmlText +="</tr>"
          htmlText +="</table>"
        }
      }
      document.getElementById("tableview").innerHTML=htmlText;
    }
    onEditClick(id){
      window.location.href="edit.html?id="+id;
    }
    onEditSaveClick(){
      let treeItem;
      var treeId = getUrlParam('id','Empty');

      for (treeItem of this.treeArr){
        if (treeItem.id == treeId){
          break
        }
      }
      treeItem.treeName = document.getElementById("editname").value
      treeItem.treePlanedBy = document.getElementById("editplanedby").value
      treeItem.treePlanedOn = document.getElementById("editplanedon").value
      treeItem.treeID = document.getElementById("editid").value


        localStorage.setItem("treeModel",JSON.stringify(this))
        window.location.href = "index.html"
    }
    onEditPageLoad(){
      let treeItem;
      var treeId = getUrlParam('id','Empty');

      for (treeItem of this.treeArr){
        if (treeItem.treeID == treeId){
          break
        }
    }
    document.getElementById("editname").value = treeItem.treeName
    document.getElementById("editplanedby").value = treeItem.treePlanedBy
    document.getElementById("editplanedon").value = treeItem.treePlanedOn
    document.getElementById("editid").value = treeItem.treeID
 }
  onPermDeleteClick(id){
    let index;
    for (index=0; index<this.treeArr.length; index++){
      var treeObj = this.treeArr[index]
      if (treeObj.treeID === id){
      treeArr.splice(index,1);
      localStorage.setItem("treeModel",JSON.stringify(this))
      controller.listTree();
      }
    }
  }
  onTempDeleteClick(id){
   let treeObj;
   for (treeObj of this.treeArr){
     if(treeObj.treeID===id){
     treeObj.isDeleted = true;
     localStorage.setItem("treeModel",JSON.stringify(this))
     alert("Deleted Tree")
     controller.listTree();
     return;
    }
   }
 }
}


controller = new TreeController();
