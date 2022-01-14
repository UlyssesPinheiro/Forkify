import View from './view.js';
import icons from 'url:../../img/icons.svg';
import state from '../model';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', e => {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      handler(Number(btn.getAttribute('data-goto')));
    });
  }

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    const curPage = this._data.pageNumber;
    //page 1 and there are other pages
    if (curPage === 1 && numPages > 1) {
      return this._generateButtons(false, true, curPage);
    }
    //page 1 and there are NO other pages
    if (curPage === 1 && numPages === 1) {
      return this._generateButtons(false, false, curPage);
    }
    //last page
    if (curPage === numPages && curPage !== 1) {
      return this._generateButtons(true, false, curPage);
    }
    //other page
    if (curPage !== numPages && curPage !== 1) {
      return this._generateButtons(true, true, curPage);
    }
  }

  _generateButtons(prev, next, curPage) {
    let buttons = prev
      ? `
    <button data-goto="${
      curPage - 1
    }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${curPage - 1}</span>
    </button>`
      : '';

    buttons += next
      ? `
      <button data-goto="${
        curPage + 1
      }" class="btn--inline pagination__btn--next">
          <span>Page ${curPage + 1}</span>
          <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
          </svg>
      </button>`
      : '';

    return buttons;
  }
}

export default new PaginationView();
