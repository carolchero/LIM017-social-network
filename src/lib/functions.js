/* eslint-disable one-var */
/* FUNCIONES DE LAS PUBLICACIONES */
const f = {
  // agrega fecha a las publicaciones
  timeNow(dateNow) {
    const date = `${this.formatTime(dateNow.getDate())}-${this.formatTime((dateNow.getMonth() + 1))}-${dateNow.getFullYear()} ${this.formatTime(dateNow.getHours())}:${this.formatTime(dateNow.getMinutes())}:${this.formatTime(dateNow.getSeconds())}`;
    return date;
  },
  formatTime(e) {
    if (e.toString().length < 2) {
      // eslint-disable-next-line no-param-reassign
      e = `0${e}`;
    }
    return e;
  },
  // función que permite agregar emoji en cualquier parte del texto
  pasteHtmlAtCaret(html) {
    let range;
    if (window.getSelection) {
      const sel = window.getSelection();
      if (sel.getRangeAt && sel.rangeCount) {
        range = sel.getRangeAt(0);
        range.deleteContents();
        const el = document.createElement('div');
        el.innerHTML = html;
        const frag = document.createDocumentFragment();
        let node;
        let lastNode;
        // eslint-disable-next-line no-cond-assign
        while ((node = el.firstChild)) {
          lastNode = frag.appendChild(node);
        }
        range.insertNode(frag);
        if (lastNode) {
          range = range.cloneRange();
          range.setStartAfter(lastNode);
          range.collapse(true);
          sel.removeAllRanges();
          sel.addRange(range);
        }
        return true;
      }
      return false;
    }
    return false;
  },
  validyEmail(value) {
    const regexEmail = /([\da-z_.-]+)@([\da-z.-]+)\.([a-z.]{2,6})$/;
    return regexEmail.test(value);
  },
  validyPassword(value) {
    const regexMinus = /(?=.*[a-z]).+$/;
    const regexMayus = /(?=.*[A-Z]).+$/;
    const regexNumber = /(?=.*[0-9]).+$/;
    const regexCharac = /(?=.*[-+_!@#$%^&*.,?]).+$/;
    let count = 0;
    let cant,
      minus,
      mayus,
      number,
      character,
      divH,
      levelS;

    if (value.length >= 6) {
      cant = 'Min(6): <img src=\'img/check.png\'></img>';
      divH = 'none';
      count += 1;
    } else {
      cant = 'Min(6): <img src=\'img/false.png\'></img>';
      divH = 'block';
    }
    if (regexMinus.test(value)) {
      minus = 'Minus: <img src=\'img/check.png\'></img>';
      count += 1;
    } else {
      minus = 'Minus: <img src=\'img/false.png\'></img>';
    }
    if (regexMayus.test(value)) {
      mayus = 'Mayus: <img src=\'img/check.png\'></img>';
      count += 1;
    } else {
      mayus = 'Mayus: <img src=\'img/false.png\'></img>';
    }
    if (regexNumber.test(value)) {
      number = 'Num: <img src=\'img/check.png\'></img>';
      count += 1;
    } else {
      number = 'Num: <img src=\'img/false.png\'></img>';
    }
    if (regexCharac.test(value)) {
      character = 'Carac: <img src=\'img/check.png\'></img>';
      count += 1;
    } else {
      character = 'Carac: <img src=\'img/false.png\'></img>';
    }

    switch (count) {
      case 3:
        levelS = 'input-form div-level-medium';
        break;
      case 4:
        levelS = 'input-form div-level-higth';
        break;
      case 5:
        levelS = 'input-form div-level-higth-top';
        break;
      default:
        levelS = 'input-form div-level-low';
        break;
    }
    // eslint-disable-next-line object-curly-newline
    return { cant, minus, mayus, number, character, divH, levelS };
  },
};

export default f;
