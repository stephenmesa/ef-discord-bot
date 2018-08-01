import makeAnychart from 'anychart';
import makeAnychartNodejs from 'anychart-nodejs';
import { JSDOM } from 'jsdom';

const jsdom = new JSDOM('<body><div id="container"></div></body>', { runScripts: 'dangerously' });
const { window } = jsdom;

export const anychart = makeAnychart(window);
export const anychartExport = makeAnychartNodejs(anychart);
