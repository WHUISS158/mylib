let Result = []
function locate(frag, regex) {
    let result = []
    // do filter
    let _result = null, lastIndex = 0, _regex = isArray(regex) ? regex[0] : regex
    while((_result = _regex.exec(frag)) !== null){
        result.push(frag.slice(lastIndex,_result.index))
        result.push(_result[0])
        lastIndex = _result.index + _result[0].length
    }
    if(lastIndex !== frag.length) result.push(frag.slice(lastIndex,frag.length))
    console.log('***','frag = ',frag, 'regex = ', regex, 'result = ', result)
    if(isArray(regex)) regex.shift()
    if(isArray(regex) && regex.length > 0){
        for(let index = 0; index < result.length; index+=2){
            let _regex = []
            regex.forEach((value) => {
                _regex.push(value)
            })
            result[index] = locate(result[index], _regex)
        }
    }
    return result
}

function isArray(arr){
    return Object.prototype.toString.call(arr) == '[object Array]'
}

function iterate(arr){
    if(isArray(arr)){
        arr.forEach( value => {
            iterate(value)
        })
    }else{
        Result.push(arr)
    }
}

iterate(locate('beqwabeeqweqwcfhrdaqwebdqwcereddwaeabrewc',[/a/g,/c/g,/d/g]))
console.log(Result)
module.exports = exports = locate