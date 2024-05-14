// import { ICards } from './../../features/home/interfaces/cards';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
// import { ICards } from '../../features/home/interfaces/cards';
import { Observable, shareReplay, tap, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CardListModel } from '../../features/home/interfaces/card-list.model';

export interface ICards {
  name: string;
  manaCost: string;
  cmc: number;
  colors?: string[];
  colorIdentity?: string[];
  type: string;
  types?: string[];
  subtypes?: string[];
  rarity: string;
  set: string;
  setName: string;
  text: string;
  artist: string;
  number: string;
  power: string;
  toughness: string;
  layout: string;
  multiverseid: string;
  imageUrl: string;
  variations?: string[];
  foreignNames?: ForeignName[];
  printings?: string[];
  originalText: string;
  originalType: string;
  legalities?: Legality[];
  id: string;
}

export interface ForeignName {
  name: string;
  text: string;
  type: string;
  flavor: string;
  imageUrl: string;
  language: string;
  multiverseid: number;
}

export interface Legality {
  format: string;
  legality: string;
}

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  // version: string = '';
  // cards: string = 'cards';

  #http = inject(HttpClient);
  #api = signal(environment.urlApi);
  api = environment.urlApi;

  #setListTask = signal<ICards[] | null>(null);
  public getListTask = this.#setListTask.asReadonly();

  // urlbase = environment.urlApi;
  urlbase =
    'https://us-central1-curso-de-angular-api.cloudfunctions.net/app/tasks/';

  constructor(private http: HttpClient) {}

  getCards(): Observable<Array<ICards[]>> {
    return this.http
      .get<Array<ICards[]>>(this.api)
      .pipe(catchError(this.handleError<Array<ICards[]>>('getCards')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log the error for debugging

      // Return an empty result with a user-facing error message
      return of(result as T);
    };
  }

  // getSearch(): Observable<Cards[]> {
  //   const url = this.urlbase;
  //   return this.#http.get<Cards[]>(url);
  // }

  // public getSearch(): Observable<Cards> {
  //   return this.#http.get<Cards>(this.#api()).pipe(shareReplay());
  // }

  public getSearch$(): Observable<ICards[]> {
    return this.#http.get<ICards[]>(this.#api()).pipe(
      shareReplay(),
      tap((res) => {
        this.#setListTask.set(res);
        let kards: ICards[] = res;
        console.log('teste ', kards);
      })
    );
  }
  // public getSearch$(): Observable<any> {
  //   return this.#http.get<any>(this.urlbase).pipe(shareReplay());
  // }

  // getSearch(version: string, selection: string): Observable<Cards[]> {
  //   const url = this.urlbase;
  //   return this.http.get<Cards[]>(url);
  // }

  getCards2(): Observable<CardListModel> {
    return this.http.get<CardListModel>(this.api);
  }
}
