function calculateBalance() {
    var teamArr = createTeamArr(teamCount);
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
    
    var teamCount = parseInt(infoArr.length/6);
    
    relocatePosition(infoArr, flexArr, multiArr, dpsArr, tankArr, healArr, teamCount);
}

function parseUserInfo(index) {
    var form = formArr[index];
    var name = form.getElementsByClassName("name")[0].value;
    var score = parseInt(form.getElementsByClassName("score")[0].value);
    var isDPS = form.getElementsByClassName("isDPS")[0].getAttribute("checked");
    var isTank = form.getElementsByClassName("isTank")[0].getAttribute("checked");
    var isHeal = form.getElementsByClassName("isHeal")[0].getAttribute("checked");
    
    return {
        name: (name==null)?"":name,
        score: (score==null)?0:score,
        isDPS: (isDPS==null)?false:true,
        isTank: (isTank==null)?false:true,
        isHeal: (isHeal==null)?false:true,
        index: null
    };
}

function parseUserInfoArr() {
    var infoArr = [];
    var memberCount = getMemberCount();
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
}

function parseDPSArr(infoArr) {
    var arr = [];
    for(var i=0; i<infoArr.length; i++) {
        if(infoArr[i].isDPS && !infoArr[i].isTank && !infoArr[i].isHeal) {
            arr.push(infoArr[i]);
        }
    }
}

function parseTankArr(infoArr) {
    var arr = [];
    for(var i=0; i<infoArr.length; i++) {
        if(!infoArr[i].isDPS && infoArr[i].isTank && !infoArr[i].isHeal) {
            arr.push(infoArr[i]);
        }
    }
}

function parseHealArr(infoArr) {
    var arr = [];
    for(var i=0; i<infoArr.length; i++) {
        if(!infoArr[i].isDPS && !infoArr[i].isTank && infoArr[i].isHeal) {
            arr.push(infoArr[i]);
        }
    }
}

function createTeamArr(teamCount) {
    var teamArr = [];
    for(var i=0; i<teamCount; i++) {
        teamArr.push({
            name: "team"+(i+1),
            dps: [],
            tank: [],
            heal: []
        });
    }
    return teamArr;
}

function relocatePosition(infoArr, flexArr, multiArr, dpsArr, tankArr, healArr, teamCount) {
    var positionArrayArr = [dpsArr, tankArr, healArr];
    positionArrayArr.sort(function(a, b) {
        return a.length - b.length;
    });
}