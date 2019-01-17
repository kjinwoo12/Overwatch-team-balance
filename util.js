function updateForm() {
    formArr = wrapper.getElementsByClassName("memberForm");
    for (var i = 0; i < formArr.length; i++) {
        var form = formArr[i];
        form.value = Number.parseInt(i);
        form.getElementsByClassName("btnDelete")[0].onclick = createBtnDeleteFunction(i)
    }
}

function createBtnDeleteFunction(index) {
    return function (event) {
        console.log(index);
        deleteMember(index);
    };
}
