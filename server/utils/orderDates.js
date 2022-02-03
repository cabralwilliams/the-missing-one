
function orderTimeStamps(timestamp1, timestamp2) {
    //Split each time string at the T
    let timeArr1 = timestamp1.toString().split('T');
    let timeArr2 = timeStamp2.toString().split('T');
    //Split each first part at the - and convert to numbers
    let dayInfo1 = timeArr1[0].split('-').map(numStr => parseInt(numStr));
    let dayInfo2 = timeArr2[0].split('-').map(numStr => parseInt(numStr));
    dayInfo1 = dayInfo1[0]*100000 + dayInfo1[1]*10000;
}