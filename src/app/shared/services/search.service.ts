import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ISets } from '../../features/home/interfaces/sets.model';
import { ISetCreature } from '../../features/home/interfaces/setCreature.model';
import { ICards } from '../../features/home/interfaces/cards.model';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  api = environment.urlApi;
  apiSearch = environment.urlApiSearch;
  apiSetCreature = environment.urlSetCreature;

  #setListTask = signal<ICards[] | null>(null);
  public getListTask = this.#setListTask.asReadonly();

  constructor(private http: HttpClient) {}

  getSearch(name: string, origin: string): Observable<Array<ISets>> {
    const url = `https://api.magicthegathering.io/v1/sets?name=${name}|${origin}`;
    return this.http.get<Array<ISets>>(url);
  }

  getCards(): Observable<Array<ICards[]>> {
    return this.http
      .get<Array<ICards[]>>(this.api)
      .pipe(catchError(this.handleError<Array<ICards[]>>('getCards')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  getCardsCreature(): Observable<ISetCreature[]> {
    return this.http
      .get<ISetCreature[]>(this.apiSetCreature)
      .pipe(catchError(this.handleError<ISetCreature[]>('getCardsCreature')));
  }

  getCardsId(id: string): Observable<Array<ICards[]>> {
    return this.http.get<Array<ICards[]>>(`this.api/${id}`);
  }
}
