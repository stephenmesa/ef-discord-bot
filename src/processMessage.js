import srUndo from './commands/srUndo';
import sr from './commands/sr';

const processMessage = (msg) => {
  const calculateRegExp = new RegExp(/^!calc/);
  const msgCalcMatches = msg.content.match(calculateRegExp);

  const recordRegExp = new RegExp(/^!record/);
  const msgRecordMatches = msg.content.match(recordRegExp);

  const srRegExp = new RegExp(/^!sr/);
  const srArgsRegExp = new RegExp(/^!sr\s+(\d+)\s+(\d+(\.\d+)?\w+)\s+(\d+(\.\d+)?\w+)\s*(\d+(\.\d+)?)?/);
  const msgSrMatches = msg.content.match(srRegExp);
  const msgSrArgsMatches = msg.content.match(srArgsRegExp);

  const srUndoExp = new RegExp(/^!sr undo$/);
  const msgSrUndoMatches = msg.content.match(srUndoExp);

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
      const kl = msgSrArgsMatches[1];
      const totalStr = msgSrArgsMatches[2];
      const rateStr = msgSrArgsMatches[4];
      const srEfficiency = msgSrArgsMatches[6] || 1.05;
      sr(msg, kl, totalStr, rateStr, srEfficiency);
    }
  }
};

export default processMessage;
