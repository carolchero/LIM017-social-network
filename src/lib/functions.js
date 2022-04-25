/* FUNCIONES DE LAS PUBLICACIONES */
const f = {
  // agrega fecha a las publicaciones
  timeNow() {
    const dateNow = new Date();
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
      }
    }
  },
};

export default f;
