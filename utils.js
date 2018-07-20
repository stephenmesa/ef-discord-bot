function parseGoldString(gold) {
    if (isFinite(gold)) {
        return Number(gold);
    }

    // make sure the string follows the template of {number}{letters}
    var efGoldFormatRegExp = new RegExp(/(^\d+\.?\d*)(\D?)$/);

    var matches = gold.match(efGoldFormatRegExp);
    if (!matches) {
        return null;
    }

    var numPart = matches[1];
    var multiplierPart = matches[2].toLowerCase();
    var multiplier = 1;

    if (multiplierPart) {
        var multiplierCharCode = multiplierPart.charCodeAt(0);
        var aCharCode = 'a'.charCodeAt(0);
        multiplier = Math.pow(10, (multiplierCharCode - (aCharCode - 1)) * 3);
    }

    return Number(numPart) * multiplier;
}

function formatGoldString(gold) {
    if (!isFinite(gold)) {
        return 'Could not parse number: ' + gold.toString();
    }

    var tempGold = gold;
    var multiplier = 0;

    while(tempGold >= 1000) {
        tempGold = Math.floor(tempGold) / 1000;
        multiplier += 1;
    }

    var multiplierCharCode = 'a'.charCodeAt(0) - 1 + multiplier;
    var multiplerChar = multiplier ? String.fromCharCode(multiplierCharCode) : '';

    return tempGold.toString() + multiplerChar;
}

module.exports = {
    parseGoldString: parseGoldString,
    formatGoldString: formatGoldString,
};
