import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { ICards } from './interfaces/cards';
import { SearchService } from '../../shared/services/search.service';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  // cartas!: Cards;
  //cards: ICards[] = [];

  #searchService = inject(SearchService);

  public getTask = signal<null | Array<ICards>>(null);

  public getTask$ = toSignal(this.#searchService.getSearch$());

  public getListTask = this.#searchService.getListTask;

  //===========================================
  cards: any = [];
  isLoading = false;
  error: string | null = null;

  //=====================
  http = inject(HttpClient);
  posts: any = [];

  //==============

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    // this.isLoading = true;
    this.searchService.getCards().subscribe(
      (cards) => {
        this.cards = cards;
        console.log('Cards ', cards);
        this.isLoading = false;
      },
      (error) => {
        this.error = error.message || 'An error occurred.';
        this.isLoading = false;
      }
    );
    // this.isLoading = true;
    // this.searchService.getCards().subscribe({
    //   next: (cards) => {
    //     this.cards = cards;
    //     console.log('teste ', this.cards);
    //     this.isLoading = false;
    //   },
    //   error: (error) => {
    //     this.error = error.message || 'An error occurred.';
    //     this.isLoading = false;
    //   },
    // });

    //======================
    this.#searchService.getSearch$().subscribe();

    // this.searchService.getCards().subscribe((res: any) => {
    //   (this.cards = res), console.log('Next 6: ', this.cards);
    // });
    // this.getTask$.subscribe({
    //   next: (next) => {
    //     this.cards = next;
    //     console.log('Next 2: ', next);
    //     this.getTask.set(next);
    //   },
    //   error: (error) => console.log('Erro: ', error),
    //   complete: () => console.log('complete!!'),
    // });

    //this.fetchPosts();
  }

  // fetchPosts() {
  //   this.http
  //     .get('https://jsonplaceholder.typicode.com/posts')
  //     .subscribe((posts: any) => {
  //       console.log('Posts: ', posts);
  //       this.posts = posts;
  //     });
  // }

  // searchCards(version: 'v1', selection: 'cards') {
  //   this.searchService.getSearch().subscribe({
  //     next: (next) => this.getTask.set(next),
  //     // next: (card) => (this.cartas = card),
  //     error: (error) => console.log('Erro: ', error),
  //   });
  // }
}
