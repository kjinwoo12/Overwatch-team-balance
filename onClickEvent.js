function addMember() {
    var newElement = document.createElement("div");
    newElement.className = "memberForm";
    newElement.innerHTML =
        '<div>NAME&emsp;&emsp;: <input type="text" name="name" /></div>' +
        '<div>SCORE&emsp;&nbsp;&nbsp;:&nbsp; <input type="text" name="score" /></div>' +
        '<div>Position&emsp;:' +
        '<label><input type="checkbox" name="chk_info" value="dps">딜러</label>' +
        '<label><input type="checkbox" name="chk_info" value="tank">탱커</label>' +
        '<label><input type="checkbox" name="chk_info" value="heal">힐러</label>' +
        '</div>' +
        '<button class="btnDelete" onclick="">Delete</button>';
    wrapper.appendChild(newElement);
    formArr = wrapper.getElementsByClassName("memberForm");
    userCount++;
    updateForm();
}

function deleteMember(index) {
    var targetElement = wrapper.getElementsByClassName("memberForm")[index];
    var parent = targetElement.parentElement;
    parent.removeChild(targetElement);
    userCount--;
    updateForm();
}

function calculateBalance() {}
