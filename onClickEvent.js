function onClickAddMember() {
    addMember();
}

function onClickDelete() {
    deleteMember();
}

function onClickCalculate() {
    var teamArr = calculateBalance();
    console.log(teamArr);
    displayTeamRoster(teamArr);
}