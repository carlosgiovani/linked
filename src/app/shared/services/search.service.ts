// import { ICards } from './../../features/home/interfaces/cards';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
// import { ICards } from '../../features/home/interfaces/cards';
import { Observable, shareReplay, tap, of } from 'rxjs';
import { catchError, filter, map, mergeMap, toArray } from 'rxjs/operators';
import { CardListModel } from '../../features/home/interfaces/card-list.model';
import { ISets } from '../../features/home/interfaces/sets.model';
import { rejects } from 'assert';
import {
  Card,
  ISetCreature,
} from '../../features/home/interfaces/setCreature.model';

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
  apiSearch = environment.urlApiSearch;
  apiSetCreature = environment.urlSetCreature;

  #setListTask = signal<ICards[] | null>(null);
  public getListTask = this.#setListTask.asReadonly();

  // urlbase = environment.urlApi;
  // urlbase =
  //   'https://us-central1-curso-de-angular-api.cloudfunctions.net/app/tasks/';

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
      console.error(error); // log the error for debugging

      // Return an empty result with a user-facing error message
      return of(result as T);
    };
  }

  // getCardsCreature() {
  //   let cards: any[] = []
  //   let totalCards = 0

  //   const fetchCards = (nextPageUrl?: string) => {
  //     this.http.get(nextPageUrl || this.apiSetCreature).subscribe(response => {
  //       cards = cards.concat(response.cards.filter(card => card.types.includes('creature')))
  //       totalCards += response.cards.length;

  //       if(totalCards < 30 && response.next_page) {
  //         fetchCards(response.next_page)
  //       }
  //     })
  //   }
  //   fetchCards();

  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => resolve(cards), 1000)
  //   })
  // }

  getCardsCreature(): Observable<ISetCreature[]> {
    return this.http
      .get<ISetCreature[]>(this.apiSetCreature)
      .pipe(catchError(this.handleError<ISetCreature[]>('getCardsCreature')));
  }

  // fetchCreatureCards(): Observable<ISetCreature[]> {
  //   return this.http.get<ISetCreature>(this.apiSetCreature).pipe(
  //     map(response => response.cards),
  //     mergeMap(cards => cards),
  //     filter((card: ISetCreature) => card.types.includes('Creature')),
  //     toArray(),
  //     mergeMap(creatureCards => {
  //       if (creatureCards.length >= 30) {
  //         return of(creatureCards.slice(0, 30));
  //       } else {
  //         return this.fetchAdditionalCreatures(creatureCards);
  //       }
  //     })
  //   );
  // }

  // private fetchAdditionalCreatures(currentCards: any[]): Observable<ISetCreature[]> {
  //   if (currentCards.length >= 30) {
  //     return of(currentCards.slice(0, 30));
  //   } else {
  //     return this.http.get<ISetCreature>(this.apiSetCreature).pipe(
  //       map(response => response.cards),
  //       mergeMap(cards => cards),
  //       filter(card => card.types.includes('creature')),
  //       toArray(),
  //       mergeMap(newCards => this.fetchAdditionalCreatures([...currentCards, ...newCards]))
  //     );
  //   }
  // }

  getCardsId(id: string): Observable<Array<ICards[]>> {
    return this.http.get<Array<ICards[]>>(`this.api/${id}`);
  }

  // getSearch(): Observable<Cards[]> {
  //   const url = this.urlbase;
  //   return this.#http.get<Cards[]>(url);
  // }

  // public getSearch(): Observable<Cards> {
  //   return this.#http.get<Cards>(this.#api()).pipe(shareReplay());
  // }

  // public getSearch$(): Observable<ICards[]> {
  //   return this.#http.get<ICards[]>(this.#api()).pipe(
  //     shareReplay(),
  //     tap((res) => {
  //       this.#setListTask.set(res);
  //       let kards: ICards[] = res;
  //       console.log('teste ', kards);
  //     })
  //   );
  // }
  // public getSearch$(): Observable<any> {
  //   return this.#http.get<any>(this.urlbase).pipe(shareReplay());
  // }

  // getSearch(version: string, selection: string): Observable<Cards[]> {
  //   const url = this.urlbase;
  //   return this.http.get<Cards[]>(url);
  // }

  // getCards2(): Observable<CardListModel> {
  //   return this.http.get<CardListModel>(this.api);
  // }
}
