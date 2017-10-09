'use strict'

function formatNumber(num) {
    let result = parseInt(num)
    if (isNaN(result)) return 0
    if ( result >= 1e4 ) {
        return (parseFloat(result) / 1e4).toFixed(1) + '万'
    }
    else {
        return result
    }
}

export default formatNumber