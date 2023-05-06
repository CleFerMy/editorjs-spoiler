/**
 * Build styles
 */
 import './index.css';

 /**
 * Spoiler Tool for the Editor.js
 *
 * Allows to wrap inline fragment and style it somehow.
 */
export default class Spoiler {
  /**
   * Class name for term-tag
   *
   * @type {string}
   */
  static get CSS() {
    return 'cdx-spoiler';
  };

  /**
   * @param {{api: object}}  - Editor.js API
   */
  constructor({ api }) {
    this.api = api;

    /**
     * Toolbar Button
     *
     * @type {HTMLElement|null}
     */
    this.button = null;

    /**
     * Tag represented the term
     *
     * @type {string}
     */
    this.tag = 'SPAN';

    /**
     * CSS classes
     */
    this.iconClasses = {
      base: this.api.styles.inlineToolButton,
      active: this.api.styles.inlineToolButtonActive,
    };
  }

  /**
   * Specifies Tool as Inline Toolbar Tool
   *
   * @returns {boolean}
   */
  static get isInline() {
    return true;
  }

  /**
   * Create button element for Toolbar
   *
   * @returns {HTMLElement}
   */
  render() {
    this.button = document.createElement('button');
    this.button.type = 'button';
    this.button.classList.add(this.iconClasses.base);
    this.button.innerHTML = this.toolboxIcon;

    return this.button;
  }

  /**
   * Wrap/Unwrap selected fragment
   *
   * @param {Range} range - selected fragment
   */
  surround(range) {
    if (!range) {
      return;
    }

    const termWrapper = this.api.selection.findParentTag(this.tag, Spoiler.CSS);

    /**
     * If start or end of selection is in the highlighted block
     */
    if (termWrapper) {
      this.unwrap(termWrapper);
    } else {
      this.wrap(range);
    }
  }

  /**
   * Wrap selection with term-tag
   *
   * @param {Range} range - selected fragment
   */
  wrap(range) {
    /**
     * Create a wrapper for highlighting
     */
    const u = document.createElement(this.tag);

    u.classList.add(Spoiler.CSS);

    /**
     * SurroundContent throws an error if the Range splits a non-Text node with only one of its boundary points
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Range/surroundContents}
     *
     * // range.surroundContents(span);
     */
    u.appendChild(range.extractContents());
    range.insertNode(u);

    /**
     * Expand (add) selection to highlighted block
     */
    this.api.selection.expandToTag(u);
  }

  /**
   * Unwrap term-tag
   *
   * @param {HTMLElement} termWrapper - term wrapper tag
   */
  unwrap(termWrapper) {
    /**
     * Expand selection to all term-tag
     */
    this.api.selection.expandToTag(termWrapper);

    const sel = window.getSelection();
    const range = sel.getRangeAt(0);

    const unwrappedContent = range.extractContents();

    /**
     * Remove empty term-tag
     */
    termWrapper.parentNode.removeChild(termWrapper);

    /**
     * Insert extracted content
     */
    range.insertNode(unwrappedContent);

    /**
     * Restore selection
     */
    sel.removeAllRanges();
    sel.addRange(range);
  }

  /**
   * Check and change Term's state for current selection
   */
  checkState() {
    const termTag = this.api.selection.findParentTag(this.tag, Spoiler.CSS);

    this.button.classList.toggle(this.iconClasses.active, !!termTag);
  }

  /**
   * Get Tool icon's SVG
   *
   * @returns {string}
   */
  get toolboxIcon() {
    return `<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="533.333px" height="533.334px" viewBox="0 0 533.333 533.334" style="enable-background:new 0 0 533.333 533.334;" xml:space="preserve"><g><path d="M437.147,171.05c40.439,28.662,73.63,67.235,96.187,112.283C483.791,382.27,382.976,450,266.667,450
		c-32.587,0-63.954-5.319-93.322-15.148l40.602-40.602c17.218,3.802,34.881,5.75,52.72,5.75c46.646,0,92.111-13.274,131.482-38.387
		c31.334-19.988,57.888-46.761,77.832-78.281c-19.298-30.503-44.801-56.536-74.817-76.299L437.147,171.05z M266.667,380.208
		c-11.835,0-23.308-1.55-34.233-4.445l163.116-163.116c2.898,10.923,4.45,22.393,4.45,34.228
		C400,320.512,340.304,380.208,266.667,380.208z M500,16.667h-27.988L357.63,131.048c-28.686-9.335-59.247-14.381-90.964-14.381
		c-116.312,0-217.126,67.73-266.667,166.667c22.218,44.371,54.754,82.453,94.372,110.974L0,488.678v27.989h27.989L500,44.655V16.667
		z M216.667,180.208c25.023,0,45.753,18.382,49.423,42.38l-57.043,57.044c-23.997-3.672-42.379-24.401-42.379-49.424
		C166.667,202.594,189.052,180.208,216.667,180.208z M57.352,283.333c19.944-31.522,46.497-58.293,77.83-78.279
		c2.041-1.302,4.102-2.563,6.176-3.802c-5.187,14.233-8.025,29.595-8.025,45.623c0,30.48,10.235,58.567,27.447,81.022
		l-30.495,30.495C101.081,338.786,76.247,313.198,57.352,283.333z"/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>`;
  }

  /**
   * Sanitizer rule
   *
   * @returns {{u: {class: string}}}
   */
  static get sanitize() {
    return {
      u: {
        class: Spoiler.CSS,
      },
    };
  }
}
