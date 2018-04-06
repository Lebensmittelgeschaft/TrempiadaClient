import { MatPaginatorIntl } from '@angular/material';

export class HebrewPaginatorIntl extends MatPaginatorIntl {
  constructor() {
    super();
    this.firstPageLabel = 'עמוד ראשון';
    this.itemsPerPageLabel = 'גודל עמוד';
    this.lastPageLabel = 'עמוד אחרון';
    this.nextPageLabel = 'עמוד הבא';
    this.previousPageLabel = 'עמוד קודם';
  }
  
  /** A label for the range of items within the current page and the length of the whole list. */
  getRangeLabel = (page: number, pageSize: number, length: number) => {
    const paginatorIntl = new MatPaginatorIntl();
    return paginatorIntl.getRangeLabel(page, pageSize, length).replace('of', 'מתוך');
  }
}
