function calculateBalance() {
    var infoArr = parseUserInfoArr();
    for(var i=0; i<infoArr.length; i++) {
        infoArr[i].index = i;
    }
    sortInfoArrForScoring(infoArr);
    
    var flexArr = parseFlexArr(infoArr);
    var dpsArr = parseDPSArr(infoArr);
    var tankArr = parseTankArr(infoArr);
    var healArr = parseHealArr(infoArr);
    var sdpsArr = parseSDPSArr(infoArr);
    var stankArr = parseSTankArr(infoArr);
    var shealArr = parseSHealArr(infoArr);
    var relocatedInfoArr = relocatePosition(flexArr, [
        {arr:dpsArr, type:"dps"},
        {arr:tankArr, type:"tank"}, 
        {arr:healArr, type:"heal"}, 
        {arr:sdpsArr, type:"sub-dps"}, 
        {arr:stankArr, type:"sub-tank"}, 
        {arr:shealArr, type:"sub-heal"},
    ]);
    console.log("relocatedInfoArr");
    console.log(relocatedInfoArr);
    var teamCount = Math.floor(relocatedInfoArr.length/6);
    console.log(teamCount);
    var teamArr = createTeamArr(teamCount);
    
    setRoster(teamArr, dpsArr, tankArr, healArr, sdpsArr, stankArr, shealArr);
    for(var i=0; i<teamArr.length; i++) {
        teamArr[i].name += (i+1);
    }
    
    return teamArr;
}

function displayTeamRoster(teamArr) {
    initTeamDisplay();
    for(var i=0; i<teamArr.length; i++) {
        addTeam(teamArr[i]);
    }
}

function parseUserInfo(index) {
    var form = formArr[index];
    var name = form.getElementsByClassName("name")[0].value;
    var score = parseInt(form.getElementsByClassName("score")[0].value);
    var isDPS = form.getElementsByClassName("isDPS")[0].checked;
    var isTank = form.getElementsByClassName("isTank")[0].checked;
    var isHeal = form.getElementsByClassName("isHeal")[0].checked;
    var issDPS = form.getElementsByClassName("issDPS")[0].checked;
    var issTank = form.getElementsByClassName("issTank")[0].checked;
    var issHeal = form.getElementsByClassName("issHeal")[0].checked;
    
    return {
        name: (name==null)?"":name,
        score: (score==null)?0:score,
        isDPS: (isDPS==null)?false:isDPS,
        isTank: (isTank==null)?false:isTank,
        isHeal: (isHeal==null)?false:isHeal,
        issDPS: (issDPS==null)?false:issDPS,
        issTank: (issTank==null)?false:issTank,
        issHeal: (issHeal==null)?false:issHeal,
        index: null,
        position: null,
    };
}

function parseUserInfoArr() {
    var infoArr = [];
    var memberCount = getMemberCount();
    memberCount -= memberCount%6;
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
    var possiblePositionArrCount;
    for(var i=0; i<infoArr.length; i++) {
        possiblePositionArrCount = 0;
        
        if(infoArr[i].isDPS) possiblePositionArrCount++;
        if(infoArr[i].issDPS) possiblePositionArrCount++;
        if(infoArr[i].isTank) possiblePositionArrCount++;
        if(infoArr[i].issTank) possiblePositionArrCount++;
        if(infoArr[i].isHeal) possiblePositionArrCount++;
        if(infoArr[i].issHeal) possiblePositionArrCount++;
        
        if(2<=possiblePositionArrCount) arr.push(infoArr[i]);
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
        if(infoArr[i].isDPS && !infoArr[i].isTank && !infoArr[i].isHeal &&
          !infoArr[i].issDPS && !infoArr[i].issTank && !infoArr[i].issHeal) {
            arr.push(infoArr[i]);
        }
    }
    return arr;
}

function parseTankArr(infoArr) {
    var arr = [];
    for(var i=0; i<infoArr.length; i++) {
        if(!infoArr[i].isDPS && infoArr[i].isTank && !infoArr[i].isHeal &&
          !infoArr[i].issDPS && !infoArr[i].issTank && !infoArr[i].issHeal) {
            arr.push(infoArr[i]);
        }
    }
    return arr;
}

function parseHealArr(infoArr) {
    var arr = [];
    for(var i=0; i<infoArr.length; i++) {
        if(!infoArr[i].isDPS && !infoArr[i].isTank && infoArr[i].isHeal &&
          !infoArr[i].issDPS && !infoArr[i].issTank && !infoArr[i].issHeal) {
            arr.push(infoArr[i]);
        }
    }
    return arr;
}

function parseSDPSArr(infoArr) {
    var arr = [];
    for(var i=0; i<infoArr.length; i++) {
        if(!infoArr[i].isDPS && !infoArr[i].isTank && !infoArr[i].isHeal &&
          infoArr[i].issDPS && !infoArr[i].issTank && !infoArr[i].issHeal) {
            arr.push(infoArr[i]);
        }
    }
    return arr;
}

function parseSTankArr(infoArr) {
    var arr = [];
    for(var i=0; i<infoArr.length; i++) {
        if(!infoArr[i].isDPS && !infoArr[i].isTank && !infoArr[i].isHeal &&
          !infoArr[i].issDPS && infoArr[i].issTank && !infoArr[i].issHeal) {
            arr.push(infoArr[i]);
        }
    }
    return arr;
}

function parseSHealArr(infoArr) {
    var arr = [];
    for(var i=0; i<infoArr.length; i++) {
        if(!infoArr[i].isDPS && !infoArr[i].isTank && !infoArr[i].isHeal &&
          !infoArr[i].issDPS && !infoArr[i].issTank && infoArr[i].issHeal) {
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

function relocatePosition(flexArr, positionArrayArr) {
    var possiblePositionArr = [];
    console.log("flex");
    console.log(flexArr);
    sortInfoArrForScoring(flexArr);
    for(var i=0; i<flexArr.length; i++) {
        if(flexArr[i].isDPS) possiblePositionArr.push(positionArrayArr[0]);
        if(flexArr[i].isTank) possiblePositionArr.push(positionArrayArr[1]);
        if(flexArr[i].isHeal) possiblePositionArr.push(positionArrayArr[2]);
        if(flexArr[i].issDPS) possiblePositionArr.push(positionArrayArr[3]);
        if(flexArr[i].issTank) possiblePositionArr.push(positionArrayArr[4]);
        if(flexArr[i].issHeal) possiblePositionArr.push(positionArrayArr[5]);
        
        positionArrayArr.sort(function(a, b) {
           return a.arr.length - b.arr.length; 
        });
        
        positionArrayArr[0].arr.push(flexArr[i]);
        possiblePositionArr = [];
    }
    
    
    var positionLengthSum = 0;
    for(var i=0; i<positionArrayArr.length; i++) {
        positionLengthSum += positionArrayArr[i].arr.length;
    }
    var positionLengthAverage = positionLengthSum / positionArrayArr.length;
        
    var switchTargetArr = [];
    for(var i=0; i<positionArrayArr.length; i++) {
        sortInfoArrForScoring(positionArrayArr[i].arr);
        while(positionArrayArr[i].arr.length > positionLengthAverage) {
            var member = positionArrayArr[i].arr[0];
            switchTargetArr.push(member);
            positionArrayArr[i].arr.splice(0, 1);
        }
    }
        
    for(var i=0; i<positionArrayArr.length; i++) {
        while(positionArrayArr[i].arr.length < positionLengthAverage && switchTargetArr.length!=0) {
            var member = switchTargetArr[0];
            switchTargetArr.splice(0, 1);
            if(positionArrayArr[i].type=="dps" && !member.isDPS) {
                if(member.issDPS) member.score -= 150;
                else member.score -= 250;
            } else if(positionArrayArr[i].type=="tank" && !member.isTank) {
                if(member.issTank) member.score -= 150;
                else member.score -= 250;
            } else if(positionArrayArr[i].type=="heal" && !member.isHeal) {
                if(member.issHeal) member.score -= 150;
                else member.score -= 250;
            } else if(positionArrayArr[i].type=="sub-dps" && !member.issDPS) {
                if(member.isDPS) member.score -= 150;
                else member.score -= 250;
            } else if(positionArrayArr[i].type=="sub-tank" && !member.issTank) {
                if(member.isTank) member.score -= 150;
                else member.score -= 250;
            } else if(positionArrayArr[i].type=="sub-heal" && !member.issHeal) {
                if(member.isHeal) member.score -= 150;
                else member.score -= 250;
            }
            positionArrayArr[i].arr.push(member);
        }
        sortInfoArrForScoring(positionArrayArr[i].arr);
    }
        
    for(var i=0; i<positionArrayArr.length; i++) {
        for(var j=0; j<positionArrayArr[i].arr.length; j++) {
            positionArrayArr[i].arr[j].position = positionArrayArr[i].type;
        }
    }
        
    var returnArr = positionArrayArr[0].arr;
    for(var i=1; i<positionArrayArr.length; i++) {
        returnArr = returnArr.concat(positionArrayArr[i].arr);
    }
    sortInfoArrForScoring(returnArr);
    return returnArr;
}

function setRoster(teamArr, dpsArr, tankArr, healArr, sdpsArr, stankArr, shealArr) {
    pickMember(teamArr, dpsArr);
    for(var i=0; i<teamArr.length; i++) {
        teamArr[i].average = averageScore(teamArr[i].members);
    }
    teamArr.sort(function(a, b){return a.average - b.average});
    
    pickMember(teamArr, sdpsArr);
    for(var i=0; i<teamArr.length; i++) {
        teamArr[i].average = averageScore(teamArr[i].members);
    }
    teamArr.sort(function(a, b){return a.average - b.average});
    
    pickMember(teamArr, tankArr);
    for(var i=0; i<teamArr.length; i++) {
        teamArr[i].average = averageScore(teamArr[i].members);
    }
    teamArr.sort(function(a, b){return a.average - b.average});
    
    pickMember(teamArr, stankArr);
    for(var i=0; i<teamArr.length; i++) {
        teamArr[i].average = averageScore(teamArr[i].members);
    }
    teamArr.sort(function(a, b){return a.average - b.average});
    
    pickMember(teamArr, healArr);
    for(var i=0; i<teamArr.length; i++) {
        teamArr[i].average = Math.round(averageScore(teamArr[i].members));
    }
    teamArr.sort(function(a, b){return a.average - b.average});
    
    pickMember(teamArr, shealArr);
    for(var i=0; i<teamArr.length; i++) {
        teamArr[i].average = Math.round(averageScore(teamArr[i].members));
    }
    teamArr.sort(function(a, b){return a.average - b.average});
}

function pickMember(teamArr, memberArr) {
    var cpyMemberArr = JSON.parse(JSON.stringify(memberArr));
    var teamLength = cpyMemberArr.length;
    var spareMemberCount = length%teamLength;
    cpyMemberArr.splice(cpyMemberArr.length-1-spareMemberCount, spareMemberCount);
    sortInfoArrForScoring(cpyMemberArr);
    
    for(var i=0; i<teamArr.length; i++) {
        teamArr[i].members.push(cpyMemberArr[0]);
        cpyMemberArr.splice(0, 1);
    }
}