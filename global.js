var userCount = 12;
var wrapper = document.getElementById("memberWrapper");
var memberFormNodeArr = wrapper.getElementsByClassName("memberForm");
var memberFormHtml = wrapper.innerHTML;
wrapper.removeChild(memberFormNodeArr[0])

for (var i = 0; i < 12; i++) {
    wrapper.innerHTML += memberFormHtml;
}
updateForm();
