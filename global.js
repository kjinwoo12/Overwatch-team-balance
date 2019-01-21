var wrapper = document.getElementById("memberWrapper");
var memberFormNodeArr = wrapper.getElementsByClassName("memberForm");
var memberFormHtml = wrapper.innerHTML;
var memberFormInnerHtml = memberFormNodeArr[0].innerHTML;
wrapper.removeChild(memberFormNodeArr[0]);

function getMemberCount() {
    return memberFormNodeArr.length;
}


var resultDisplay = document.getElementById("resultDisplay");
var resultFormNodeArr = resultDisplay.getElementsByClassName("resultForm");
var resultFormHtml = resultDisplay.innerHTML;
var resultFormInnerHtml = resultFormNodeArr[0].innerHTML;
resultDisplay.removeChild(resultFormNodeArr[0]);