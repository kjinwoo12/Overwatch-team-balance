var wrapper = document.getElementById("memberWrapper");
var memberFormNodeArr = wrapper.getElementsByClassName("memberForm");
var memberFormHtml = wrapper.innerHTML;
var memberFormInnerHtml = memberFormNodeArr[0].innerHTML;
wrapper.removeChild(memberFormNodeArr[0]);

function getMemberCount() {
    return memberFormNodeArr.length;
}