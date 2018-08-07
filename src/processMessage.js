import srUndo from './commands/srUndo';
import sr from './commands/sr';
import srHistory from './commands/srHistory';
import graphKL from './commands/graphKL';
import graphMedals from './commands/graphMedals';
import graph from './commands/graph';
import srDelete from './commands/srDelete';

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

  const graphKlExp = new RegExp(/^!graph kl$/);
  const msgGraphKlMatches = msg.content.match(graphKlExp);

  const graphMedalsExp = new RegExp(/^!graph medals$/);
  const msgGraphMedalsMatches = msg.content.match(graphMedalsExp);

  const graphExp = new RegExp(/^!graph$/);
  const msgGraphMatches = msg.content.match(graphExp);

  const srHistoryExp = new RegExp(/^!sr history$/);
  const msgSrHistoryMatches = msg.content.match(srHistoryExp);

  const srDeleteExp = new RegExp(/^!sr delete (\d+)$/);
  const msgSrDeleteMatches = msg.content.match(srDeleteExp);

  if (msg.content === 'ping') {
    msg.reply('Pong!');
  } else if (msgCalcMatches) {
    msg.reply('The `!calc` command has been deprecated. Please use the `!sr` command instead! Usage: `!sr <knightLevel> <totalMedals> <srMedalsPerMinute> [srEfficiency]`');
  } else if (msgRecordMatches) {
    msg.reply('The `!record` command has been deprecated. Please use the `!sr` command instead! Usage: `!sr <knightLevel> <totalMedals> <srMedalsPerMinute> [srEfficiency]`');
  } else if (msgSrUndoMatches) {
    srUndo(msg);
  } else if (msgGraphMatches) {
    graph(msg);
  } else if (msgGraphKlMatches) {
    graphKL(msg);
  } else if (msgGraphMedalsMatches) {
    graphMedals(msg);
  } else if (msgSrHistoryMatches) {
    srHistory(msg);
  } else if (msgSrDeleteMatches) {
    const id = msgSrDeleteMatches[1];
    srDelete(msg, id);
  } else if (msgSrMatches) {
    if (!msgSrArgsMatches) {
      msg.reply('Usage:\n\n`!sr <knightLevel> <totalMedals> <srMedalsPerMinute> [srEfficiency]` - Record your SR progress.\n(Example: `!sr 280 4.4h 337.5f`)'
        + '\n\n`!sr undo` - Remove the last SR progress that you recorded.'
        + '\n`!sr history` - Retrieve a list of all progress recorded up to now.'
        + '\n`!graph` - Generate a graph of your KL and medals progress.'
        + '\n`!graph kl` - Generate a graph of your KL progress.'
        + '\n`!graph medals` - Generate a graph of your total medals progress.');
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
