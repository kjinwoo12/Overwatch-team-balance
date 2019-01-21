//form
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
        deleteMember(index);
    };
}

//member
var tempNameArr = [
    "석양맨블라디",
    "퀘걸근육살수",
    "순정남마초맨",
    "난이쁜종만이",
    "bell런스",
    "안우렁왜우렁",
    "현수는석양딱",
    "간짜장세개",
    "이건희건희",
    "회장노예이라",
    "공사장님",
    "꼬북이는석양딱",
    "엘꼰도르빠사에콰도르",
    "수염수염꿀풍",
    "타짜김도련",
    "동펑노예펑펑",
    "뚜루뚜빠라빠우",
    "뿡뼁뿡빵봉지",
    "앤헐네임이즈존시나",
    "신비로운신비현씨",
    "오로상민씨",
    "정어리맛피자",
    "들쥐산쥐죽은쥐",
    "카스틴아저씨",
    "엠보어르신",
    "코팜?ㅇㅇ코팜",
    "호식이한마리치킨",
    "황제우유맛바나나",
    "꿀성대어택띠",
    "치리치리촽토",
    "마운틴-듀",
    "저스티스아저씨",
    "미스터도피자",
    "낫섬그랬섬안그랬섬",
    "템푸스키",
    "ㅠ3ㅠ",
    "틴성질미틴",
    "요왓섭맨아저씨"
    ]
    
function addMember() {
    var newElement = document.createElement("div");
    newElement.className = "memberForm";
    newElement.innerHTML = memberFormInnerHtml;
    wrapper.appendChild(newElement);
    formArr = wrapper.getElementsByClassName("memberForm");
    updateForm();
    setRandomData(newElement);
}

function setRandomData(element) {
    element.getElementsByClassName("name")[0].value = tempNameArr[parseInt(Math.random()*tempNameArr.length)]
        +"("+getMemberCount()+")";
    element.getElementsByClassName("score")[0].value = 2600 + parseInt(Math.random()*1900);
    var random = parseInt(Math.random()*3) + 1;
    if(random==1) {
        element.getElementsByClassName("isDPS")[0].checked = true;
        element.getElementsByClassName("isTank")[0].checked = false;
        element.getElementsByClassName("isHeal")[0].checked = false;
    } else if(random==2) {
        element.getElementsByClassName("isDPS")[0].checked = false;
        element.getElementsByClassName("isTank")[0].checked = true;
        element.getElementsByClassName("isHeal")[0].checked = false;
    } else {
        element.getElementsByClassName("isDPS")[0].checked = false;
        element.getElementsByClassName("isTank")[0].checked = false;
        element.getElementsByClassName("isHeal")[0].checked = true;
    }
}

function deleteMember(index) {
    var targetElement = wrapper.getElementsByClassName("memberForm")[index];
    var parent = targetElement.parentElement;
    parent.removeChild(targetElement);
    updateForm();
}

function averageScore(members) {
    var n = 0;
    for(var i=0; i<members.length; i++) {
        n+=members[i].score;
    }
    return n/members.length;
}

function initTeamDisplay() {
    resultDisplay.innerHTML = "";
}

function addTeam(team) {
    var form = document.createElement("div");
    form.className = "resultForm";
    form.innerHTML = resultFormInnerHtml;
    resultDisplay.appendChild(form);
    form.getElementsByClassName("teamName")[0].innerHTML = team.name + " ( average-score : "+team.average+")";
    var divMembers = form.getElementsByClassName("members")[0];
    for(var i=0; i<6; i++) {
        divMembers.innerHTML += 
            "<div>" + team.members[i].position + "<br/>" + team.members[i].name + "</div>";
    }
}