import { MatPaginatorIntl } from '@angular/material';

export class RidesPaginatorIntl extends MatPaginatorIntl {
  constructor() {
    super();
  }
  
  /** A label for the range of items within the current page and the length of the whole list. */
  getRangeLabel = (page: number, pageSize: number, length: number) => {
    const paginatorIntl = new MatPaginatorIntl();
    return paginatorIntl.getRangeLabel(page, pageSize, length).replace('of', 'מתוך');
  }
}
