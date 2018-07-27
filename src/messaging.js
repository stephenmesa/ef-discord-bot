var srUndo = require('./commands/srUndo');
var sr = require('./commands/sr');

function processMessage(msg) {
  var calculateRegExp = new RegExp(/^!calc/);
  var msgCalcMatches = msg.content.match(calculateRegExp);

  var recordRegExp = new RegExp(/^!record/);
  var msgRecordMatches = msg.content.match(recordRegExp);

  var srRegExp = new RegExp(/^!sr/);
  var srArgsRegExp = new RegExp(/^!sr\s+(\d+)\s+(\d+(\.\d+)?\w+)\s+(\d+(\.\d+)?\w+)\s*(\d+(\.\d+)?)?/);
  var msgSrMatches = msg.content.match(srRegExp);
  var msgSrArgsMatches = msg.content.match(srArgsRegExp);

  var srUndoExp = new RegExp(/^!sr undo$/);
  var msgSrUndoMatches = msg.content.match(srUndoExp);

  if (msg.content === 'ping') {
    msg.reply('Pong!');
  } else if (msgCalcMatches) {
    msg.reply('The `!calc` command has been deprecated. Please use the `!sr` command instead! Usage: `!sr <knightLevel> <totalMedals> <srMedalsPerMinute> [srEfficiency]`');
  } else if (msgRecordMatches) {
    msg.reply('The `!record` command has been deprecated. Please use the `!sr` command instead! Usage: `!sr <knightLevel> <totalMedals> <srMedalsPerMinute> [srEfficiency]`');
  } else if (msgSrUndoMatches) {
    srUndo(msg);
  } else if (msgSrMatches) {
    if (!msgSrArgsMatches) {
      msg.reply('Usage:\n\n`!sr <knightLevel> <totalMedals> <srMedalsPerMinute> [srEfficiency]`\n\nExample: `!sr 280 4.4h 337.5f`');
    } else {
      var kl = msgSrArgsMatches[1];
      var totalStr = msgSrArgsMatches[2];
      var rateStr = msgSrArgsMatches[4];
      var srEfficiency = msgSrArgsMatches[6] || 1.05;
      sr(msg, kl, totalStr, rateStr, srEfficiency);
    }
  }
}

module.exports = {
  processMessage: processMessage,
};