function calculateBalance() {
    var infoArr = parseUserInfoArr();
    for(var i=0; i<infoArr.length; i++) {
        infoArr[i].index = i;
    }
    sortInfoArrForScoring(infoArr);
    
    var flexArr = parseFlexArr(infoArr);
    var multiArr = parseMultiArr(infoArr);
    var dpsArr = parseDPSArr(infoArr);
    var tankArr = parseTankArr(infoArr);
    var healArr = parseHealArr(infoArr);
    console.log("flex : " + flexArr.length);
    console.log("multi : " + multiArr.length);
    console.log("dps : " + dpsArr.length);
    console.log("tank : " + tankArr.length);
    console.log("heal : " + healArr.length);
    var relocatedInfoArr = relocatePosition(flexArr, multiArr, [
        {arr:dpsArr, type:"dps"},
        {arr:tankArr, type:"tank"}, 
        {arr:healArr, type:"heal"}
    ]);
    console.log("");
    console.log("========= re-position member ==========")
    console.log(relocatedInfoArr);
    var teamCount = Math.floor(relocatedInfoArr.length/6);
    var teamArr = createTeamArr(teamCount);
    
    setRoster(teamArr, dpsArr, tankArr, healArr);
    for(var i=0; i<teamArr.length; i++) {
        teamArr[i].name += (i+1);
    }
    console.log("");
    console.log("========= Team Roster ==========")
    console.log(teamArr);
}

function parseUserInfo(index) {
    var form = formArr[index];
    var name = form.getElementsByClassName("name")[0].value;
    var score = parseInt(form.getElementsByClassName("score")[0].value);
    var isDPS = form.getElementsByClassName("isDPS")[0].checked;
    var isTank = form.getElementsByClassName("isTank")[0].checked;
    var isHeal = form.getElementsByClassName("isHeal")[0].checked;
    
    return {
        name: (name==null)?"":name,
        score: (score==null)?0:score,
        isDPS: (isDPS==null)?false:isDPS,
        isTank: (isTank==null)?false:isTank,
        isHeal: (isHeal==null)?false:isHeal,
        index: null
    };
}

function parseUserInfoArr() {
    var infoArr = [];
    var memberCount = getMemberCount();
    console.log("memberCount : " + memberCount);
    for(var i=0; i<memberCount; i++) {
        var info = parseUserInfo(i);
        if(info==null) {
            return null;
        } else {
            infoArr.push(info);
        }
    }
    
    return infoArr;
}

function sortInfoArrForScoring(infoArr) {
    infoArr.sort(function(a, b) {
        return b.score - a.score;
    });
    return infoArr;
}

function parseFlexArr(infoArr) {
    var arr = [];
    for(var i=0; i<infoArr.length; i++) {
        if(infoArr[i].isDPS && infoArr[i].isTank && infoArr[i].isHeal) {
            arr.push(infoArr[i]);
        }
    }
    return arr;
}

function parseMultiArr(infoArr) {
    var arr = [];
    for(var i=0; i<infoArr.length; i++) {
        if(!infoArr[i].isDPS && infoArr[i].isTank && infoArr[i].isHeal ||
          infoArr[i].isDPS && !infoArr[i].isTank && infoArr[i].isHeal ||
          infoArr[i].isDPS && infoArr[i].isTank && !infoArr[i].isHeal) {
            arr.push(infoArr[i]);
        }
    }
    return arr;
}

function parseDPSArr(infoArr) {
    var arr = [];
    for(var i=0; i<infoArr.length; i++) {
        if(infoArr[i].isDPS && !infoArr[i].isTank && !infoArr[i].isHeal) {
            arr.push(infoArr[i]);
        }
    }
    return arr;
}

function parseTankArr(infoArr) {
    var arr = [];
    for(var i=0; i<infoArr.length; i++) {
        if(!infoArr[i].isDPS && infoArr[i].isTank && !infoArr[i].isHeal) {
            arr.push(infoArr[i]);
        }
    }
    return arr;
}

function parseHealArr(infoArr) {
    var arr = [];
    for(var i=0; i<infoArr.length; i++) {
        if(!infoArr[i].isDPS && !infoArr[i].isTank && infoArr[i].isHeal) {
            arr.push(infoArr[i]);
        }
    }
    return arr;
}

function createTeamArr(teamCount) {
    var teamArr = [];
    
    for(var i=0; i<teamCount; i++) {
        teamArr.push({
            name: "team",
            members: [],
            average: null
        });
    }
    return teamArr;
}

function relocatePosition(flexArr, multiArr, positionArrayArr) {
    positionArrayArr.sort(function(a, b) {
        return a.arr.length - b.arr.length;
    });
    
    if(multiArr.length!=0) {
        for(var i=0; i<3; i++) {
            for(var j=0; j<multiArr.length!=0; j++) {
                if(positionArrayArr[i].type=="dps" && multiArr[j].isDPS) {
                    positionArrayArr[i].arr.push(multiArr[j]);
                    multiArr.splice(0, 1); //remove index 0
                    return relocatePosition(flexArr, multiArr, positionArrayArr);
                } else if(positionArrayArr[i].type=="tank" && multiArr[j].isTank) {
                    positionArrayArr[i].arr.push(multiArr[j]);
                    multiArr.splice(0, 1); //remove index 0
                    return relocatePosition(flexArr, multiArr, positionArrayArr);
                } else if(positionArrayArr[i].type=="heal" && multiArr[j].isHeal) {
                    positionArrayArr[i].arr.push(multiArr[j]);
                    multiArr.splice(0, 1); //remove index 0
                    return relocatePosition(flexArr, multiArr, positionArrayArr);
                }
            }
        }
        return null;
    } else if(flexArr.length!=0) {
        positionArrayArr[0].arr.push(flexArr[0]);
        multiArr.splice(0, 1);
        return relocatePosition(flexArr, multiArr, positionArrayArr);
    } else {
        var positionlengthAverage = Math.ceil((positionArrayArr[0].arr.length + positionArrayArr[1].arr.length + positionArrayArr[2].arr.length)/3);
        
        var switchTargetArr = [];
        for(var i=1; i<3; i++) {
            sortInfoArrForScoring(positionArrayArr[i].arr);
            while(positionArrayArr[i].arr.length > positionlengthAverage) {
                var member = positionArrayArr[i].arr[0];
                switchTargetArr.push(member);
                positionArrayArr[i].arr.splice(0, 1);
            }
        }
        
        for(var i=0; i<2; i++) {
            while(positionArrayArr[i].arr.length < positionlengthAverage && switchTargetArr.length!=0) {
                var member = switchTargetArr[0];
                switchTargetArr.splice(0, 1);
                if(positionArrayArr[i].type=="dps" && !member.isDPS ||
                   positionArrayArr[i].type=="tank" && !member.isTank ||
                   positionArrayArr[i].type=="heal" && !member.isHeal) {
                    var logMsg = member.name + " : ";
                    if(member.isDPS) logMsg += "DPS -> ";
                    else if(member.isHeal) logMsg += "Heal ->";
                    else if(member.isTank) logMsg += "Tank ->";
                    member.score -= 250;
                    if(positionArrayArr[i].type=="dps") {
                        member.isDPS = true;
                        logMsg += "DPS";
                    } else if(positionArrayArr[i].type=="tank") {
                        member.isTank = true;
                        logMsg += "Tank";
                    } else if(positionArrayArr[i].type=="heal") {
                        member.isHeal = true;
                        logMsg += "Heal";
                    }
                    console.log(logMsg);
                }
                positionArrayArr[i].arr.push(member);
            }
            sortInfoArrForScoring(positionArrayArr[i].arr);
        }
        var returnArr = positionArrayArr[0].arr.concat(positionArrayArr[1].arr, positionArrayArr[2].arr);
        sortInfoArrForScoring(returnArr);
        return returnArr;
    }
}

function setRoster(teamArr, dpsArr, tankArr, healArr) {
    pickMember(teamArr, dpsArr);
    for(var i=0; i<teamArr.length; i++) {
        teamArr[i].average = averageScore(teamArr[i].members);
    }
    teamArr.sort(function(a, b) {
        return a.average - b.average;
    });
    
    pickMember(teamArr, tankArr);
    for(var i=0; i<teamArr.length; i++) {
        teamArr[i].average = averageScore(teamArr[i].members);
    }
    teamArr.sort(function(a, b) {
        return a.average - b.average;
    });
    
    pickMember(teamArr, healArr);
    for(var i=0; i<teamArr.length; i++) {
        teamArr[i].average = averageScore(teamArr[i].members);
        sortInfoArrForScoring(teamArr[i].members);
    }
}

function pickMember(teamArr, memberArr) {
    var cpyMemberArr = JSON.parse(JSON.stringify(memberArr));
    cpyMemberArr.sort(function(a, b) {
        a.index - b.index;
    });
    var teamLength = cpyMemberArr.length;
    var spareMemberCount = length%teamLength;
    cpyMemberArr.splice(cpyMemberArr.length-1-spareMemberCount, spareMemberCount);
    sortInfoArrForScoring(cpyMemberArr);
    
    for(var i=0; i<teamArr.length; i++) {
        teamArr[i].members.push(cpyMemberArr[0]);
        cpyMemberArr.splice(0, 1);
    }
    for(var i=teamArr.length-1; i>=0; i--) {
        teamArr[i].members.push(cpyMemberArr[0]);
        cpyMemberArr.splice(0, 1);
    }
}