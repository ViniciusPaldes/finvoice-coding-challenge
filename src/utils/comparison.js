import _isInteger from 'lodash/isInteger';

const iterateObj = (data, singleLevelArray) => {
    for(var key in data){
        if (!_isInteger(parseInt(key))) {
            if (!(typeof data[key] === 'object' && data[key] !== null)) {
                singleLevelArray.push({key, data: data[key]});
            }
        }
        if (data.hasOwnProperty(key)) {
            if (data[key] !== null && typeof data[key] === 'object') {
                data[key] = iterateObj(data[key], singleLevelArray);
            }
        }
    }
    return data;
}


/**
 * This is the core of the challenge.
 */
export const compareJSON = (firstJson, secondJson) => {

    const firstObjSingleLevelArray = [];
    const secondObjSingleLevelArray = [];

    iterateObj(firstJson, firstObjSingleLevelArray);
    iterateObj(secondJson, secondObjSingleLevelArray);

    const total = Math.max(firstObjSingleLevelArray.length, secondObjSingleLevelArray.length);
    let equalCount = 0;

    for (let i = 0; i < total; i++) {
        if ( !!(firstObjSingleLevelArray[i]?.key === secondObjSingleLevelArray[i]?.key) && 
             !!(firstObjSingleLevelArray[i]?.data === secondObjSingleLevelArray[i]?.data) ) {
                equalCount++;
        }
    }
    
    return equalCount / total;
}