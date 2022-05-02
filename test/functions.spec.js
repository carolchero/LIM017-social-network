/* eslint-disable object-curly-newline */
import f from '../src/lib/functions';

describe('functions', () => {
  it('f is object', () => {
    expect(typeof f).toBe('object');
  });
});
describe('timeNow', () => {
  it('timeNow return type format ', () => {
    const time = f.timeNow(new Date('2022-04-28T11:41:24'));
    expect(time).toBe('28-04-2022 11:41:24');
  });
});
describe('formatTime', () => {
  it('should  return 01 with "1"', () => {
    const format = f.formatTime('1');
    expect(format).toBe('01');
  });
});
describe('pasteHtmlAtCaret', () => {
  it('pasteHtmlAtCaret no select', () => {
    const div = document.createElement('div');
    div.focus();
    const sel = window.getSelection(div);
    sel.removeAllRanges();
    const pasteHtmlAtCaret = f.pasteHtmlAtCaret('<img class="emoticon" src="img/emoji/emoji1.png">');
    expect(pasteHtmlAtCaret).toBe(false);
  });
  it('pasteHtmlAtCaret with emoji1.png', () => {
    const div = document.createElement('div');
    div.innerHTML = 'example <p>ico</p>';
    document.body.appendChild(div);
    div.focus();
    const pasteHtmlAtCaret = f.pasteHtmlAtCaret('<img class="emoticon" src="img/emoji/emoji1.png">');
    expect(pasteHtmlAtCaret).toBe(false);
  });
  it('pasteHtmlAtCaret with emoji1.png range selection', () => {
    const div = document.createElement('div');
    div.innerHTML = 'example <p>ico</p>';
    document.body.appendChild(div);
    div.focus();
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNode(div.firstChild);
    selection.addRange(range);
    const pasteHtmlAtCaret = f.pasteHtmlAtCaret('<img class="emoticon" src="img/emoji/emoji1.png">');
    expect(pasteHtmlAtCaret).toBe(true);
  });
});
describe('validyEmail', () => {
  it('should return true with "example@gmail.com"', () => {
    const validyEmail = f.validyEmail('example@gmail.com');
    expect(validyEmail).toBe(true);
  });
  it('should return false with "example@"', () => {
    const validyEmail = f.validyEmail('example@');
    expect(validyEmail).toBe(false);
  });
});
describe('validyPassword', () => {
  it('should return {7,Minus: <img src=\'img/check.png\'></img>,Mayus: <img src=\'img/check.png\'></img>, Num: <img src=\'img/check.png\'></img>, Carac: <img src=\'img/check.png\'></img>,none,input-form div-level-higth-top} with "Example*"', () => {
    const validyPassword = f.validyPassword('Example1*');
    const cant = 'Min(6): <img src=\'img/check.png\'></img>';
    const minus = 'Minus: <img src=\'img/check.png\'></img>';
    const mayus = 'Mayus: <img src=\'img/check.png\'></img>';
    const number = 'Num: <img src=\'img/check.png\'></img>';
    const character = 'Carac: <img src=\'img/check.png\'></img>';
    const divH = 'none';
    const levelS = 'input-form div-level-higth-top';
    expect(validyPassword).toStrictEqual({ cant, minus, mayus, number, character, divH, levelS });
  });
  it('should return {7,Minus: <img src=\'img/false.png\'></img>,Mayus: <img src=\'img/false.png\'></img>, Num: <img src=\'img/false.png\'></img>, Carac: <img src=\'img/false.png\'></img>,none,input-form div-level-low} with ""', () => {
    const validyPassword = f.validyPassword('');
    const cant = 'Min(6): <img src=\'img/false.png\'></img>';
    const minus = 'Minus: <img src=\'img/false.png\'></img>';
    const mayus = 'Mayus: <img src=\'img/false.png\'></img>';
    const number = 'Num: <img src=\'img/false.png\'></img>';
    const character = 'Carac: <img src=\'img/false.png\'></img>';
    const divH = 'block';
    const levelS = 'input-form div-level-low';
    expect(validyPassword).toStrictEqual({ cant, minus, mayus, number, character, divH, levelS });
  });
  it('should return {input-form div-level-medium} with "Example"', () => {
    const validyPassword = f.validyPassword('Example');
    const cant = 'Min(6): <img src=\'img/check.png\'></img>';
    const minus = 'Minus: <img src=\'img/check.png\'></img>';
    const mayus = 'Mayus: <img src=\'img/check.png\'></img>';
    const number = 'Num: <img src=\'img/false.png\'></img>';
    const character = 'Carac: <img src=\'img/false.png\'></img>';
    const divH = 'none';
    const levelS = 'input-form div-level-medium';
    expect(validyPassword).toStrictEqual({ cant, minus, mayus, number, character, divH, levelS });
  });
  it('should return {input-form div-level-higth} with ""', () => {
    const validyPassword = f.validyPassword('Example1');
    const cant = 'Min(6): <img src=\'img/check.png\'></img>';
    const minus = 'Minus: <img src=\'img/check.png\'></img>';
    const mayus = 'Mayus: <img src=\'img/check.png\'></img>';
    const number = 'Num: <img src=\'img/check.png\'></img>';
    const character = 'Carac: <img src=\'img/false.png\'></img>';
    const divH = 'none';
    const levelS = 'input-form div-level-higth';
    expect(validyPassword).toStrictEqual({ cant, minus, mayus, number, character, divH, levelS });
  });
});
