const matrix = [
  [1, 2, 3, 4, 5],
  [16, 17, 18, 19, 6],
  [15, 24, 25, 20, 7],
  [14, 23, 22, 21, 8],
  [13, 12, 11, 10, 9]
]

let finalArr = [];

// Takes matrix and returns a single ordered array - fires on page load
function orderArray(matr) {
  if (matr[0].length == 1) {
    finalArr.push(matr[0][0])
    return finalArr;
  }
  //add top line in order
  for (let i = 0; i < matr[0].length; i++) {
    finalArr.push(matr[0][i])
  }
  matr.shift();
  if (check(matr)) {
    return finalArr;
  }
  //add down right side
  for (let i = 0; i < matr.length; i++) {
    finalArr.push(matr[i].pop())
  }
  if (check(matr)) {
    return finalArr;
  }
  //add bottom line in reverse order
  for (let i = matr[matr.length - 1].length; i > 0; i--) {
    finalArr.push(matr[matr.length - 1].pop())
  }
  matr.pop();
  if (check(matr)) {
    return finalArr;
  }
  //add up left side
  for (let i = matr.length - 1; i > 0; i--) {
    finalArr.push(matr[i].shift())
  }
  if (check(matr)) {
    return finalArr;
  }
  //repeat as needed
  return orderArray(matr)
}

//Helper - Checks length to resolve length undefined error when matrix is empty
function check(matr) {
  return (matr.length < 1)
}

// Creates the grid with class and individual ids on page load
function populateField(matr){
  var parent = document.getElementById("animation-field");
  
  for (var i = 0;i < matr.length; i++) {
    for (var j = 0; j < matr[i].length; j++) {
      var div = document.createElement("div");
      var att = document.createAttribute("class");
      var id = document.createAttribute("id");
      att.value = "inner-cell"; 
      id.value = matr[i][j];
      div.setAttributeNode(att); 
      div.setAttributeNode(id);
      parent.appendChild(div); 
      div.innerHTML = "<p>" + matr[i][j] + "</p>";
      // parent = document.getElementById(matr[i][j]);
    }
  }
}

function runAnimation(ordArr) {
  timeoutLength = 500;
  for (i = 0; i < ordArr.length; i++) {
    let nodeID = ordArr[i];
    let node = document.getElementById(nodeID);
    let att = document.createAttribute("class");
    console.log(document.getElementById(nodeID)); 
    att.value = "inner-cell lit-up"; 
    setTimeout(function () { 
      node.setAttributeNode(att)
    }, timeoutLength);
    timeoutLength += 50;
  }
  setTimeout(function () {
    document.getElementById("output-field").innerHTML = ordArr.join(" ");
  }, timeoutLength);

};

$(function(){
  populateField(matrix);
  var orderedArray = orderArray(matrix);
  $(".start-btn").click(function(){
    runAnimation(orderedArray);
  });
  $(".reset-btn").click(function () {
    location.reload();
  });
});