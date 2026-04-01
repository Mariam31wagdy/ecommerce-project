import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private searchText = new BehaviorSubject<string>('');
  currentSearch = this.searchText.asObservable();

  changeSearch(text: string) {
    this.searchText.next(text);
  }
}