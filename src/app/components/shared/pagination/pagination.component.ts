import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent {
  private _currentPage = 1;
  private _limit = 1;

  @Input() nbItems = 1;
  @Input()
  set currentPage(value: number) {
    this._currentPage = value;
    this.currentPageChange.emit(this.currentPage);
  }
  get currentPage(): number {
    return this._currentPage;
  }
  @Input()
  set limit(value: number) {
    this._limit = value;
    this.limitChange.emit(this.limit);
  }
  get limit(): number {
    return this._limit;
  }

  @Output() limitChange = new EventEmitter<number>();
  @Output() currentPageChange = new EventEmitter<number>();

  get totalPages(): number {
    return Math.ceil(this.nbItems / this.limit);
  }
}
