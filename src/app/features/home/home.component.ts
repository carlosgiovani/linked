import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
  inject,
  signal,
  ChangeDetectorRef,
} from '@angular/core';
import { ICards } from './interfaces/cards.model';
import { SearchService } from '../../shared/services/search.service';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { FormsModule } from '@angular/forms';

import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../core/components/dialog/dialog.component';

import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule, MatAccordion } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DatePipe } from '@angular/common';
import { ISets } from './interfaces/sets.model';

interface Food {
  value: string;
  viewValue: string;
}

// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
//   { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
//   { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
//   { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
//   { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
//   { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
//   { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
//   { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
//   { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
//   { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
// ];
// const ELEMENT_DATA: ICards[] = [];

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatPaginator,
    MatPaginatorModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    MatCardModule,
    MatExpansionModule,
    DialogComponent,
    MatProgressSpinnerModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  // cartas!: Cards;
  //cards: ICards[] = [];

  #searchService = inject(SearchService);

  public getTask = signal<null | Array<ICards>>(null);

  // public getTask$ = toSignal(this.#searchService.getSearch$());

  public getListTask = this.#searchService.getListTask;

  //===========================================
  listCards: any = [];
  isLoading = false;
  loaded = false;
  loadedCre = false;
  error: string | null = null;

  foods: Food[] = [
    { value: 'Amonkhet', viewValue: 'Amonkhet' },
    { value: 'Ixalan', viewValue: 'Ixalan' },
    { value: 'Zendikar', viewValue: 'Zendikar' },
    { value: 'Ravnica', viewValue: 'Ravnica' },
    { value: 'Onslaught', viewValue: 'Onslaught' },
  ];

  inputValue: string = '';
  selectedValue: string = '';

  // allCards!: any[];

  setCards: any = [];
  cardsCreatures: any = [];
  sizeSetCards: any;
  originalDate!: string;
  formattedDate!: string | null;

  // cards$!: Observable<ICards[]>;

  // myDataArray!: ICards[];

  // displayedColumns: string[] = ['id', 'name', 'manaCost', 'power', 'acao'];
  // columnsToDisplay: string[] = ['id', 'name', 'manaCost', 'power', 'acao'];
  // dataSource = new MatTableDataSource(ELEMENT_DATA);
  // dataSource: MatTableDataSource<any> = new MatTableDataSource();
  // dataSource: any;

  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(DialogComponent) userDialog!: DialogComponent;
  @ViewChild(MatAccordion) accordion!: MatAccordion;

  // pesquisar() {
  //   console.log('Pesquisando:', this.inputValue);
  // }

  //=====================
  http = inject(HttpClient);
  posts: any = [];

  //==============

  constructor(
    private searchService: SearchService,
    public dialog: MatDialog,
    private cdRef: ChangeDetectorRef,
    private cdRefCre: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // this.loadTableData();
    // this.callSetCreature();
    // this.searchCard();
    //====================
    // this.isLoading = true;
    // this.searchService.getCards().subscribe(
    //   (cards) => {
    //     this.cards = cards;
    //     this.dataSource = new MatTableDataSource(cards);
    //     console.log('dataSource ', this.dataSource);
    //     this.isLoading = false;
    //   },
    //   (error) => {
    //     this.error = error.message || 'An error occurred.';
    //     this.isLoading = false;
    //   }
    // );
    //==============================
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
    // this.#searchService.getSearch$().subscribe();
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

  // ngAfterViewInit() {
  //   // this.dataSource.paginator = this.paginator;
  //   // this.dataSource.sort = this.sort;
  // }

  // loadTableData(): void {
  //   this.searchService.getCards().subscribe({
  //     next: (data) => {
  //       this.listCards = data;
  //       this.dataSource = new MatTableDataSource(this.listCards.cards);
  //       // this.dataSource.paginator = this.paginator;
  //       // this.dataSource.sort = this.sort;
  //     },
  //     error: (error) => {
  //       console.error('Erro ao carregar dados', error);
  //     },
  //   });
  // }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }

  searchCard(): void {
    this.isLoading = true;
    this.searchService
      .getSearch(this.inputValue, this.selectedValue)
      .subscribe({
        next: (res) => {
          (this.setCards = res),
            (this.sizeSetCards = this.setCards.sets.length);
          this.cdRef.detectChanges();
          this.loaded = true;
          console.log('retorno => ', this.setCards.sets),
            console.log('size => ', this.setCards.sets.length),
            console.log('data ', this.formattedDate);
          this.isLoading = false;
          this.cdRef.detectChanges();
        },
        error: (error) => {
          console.log('Erro: ', error), (this.isLoading = false);
        },
      });
  }

  callSetCreature() {
    this.isLoading = true;
    this.searchService.getCardsCreature().subscribe({
      next: (cards) => {
        this.cardsCreatures = cards;
        this.loadedCre = true;
        // this.dataSource = this.cardsCreatures.cards;
        // console.log('Creature cards:', this.dataSource);
        this.isLoading = false;
        this.cdRefCre.detectChanges();
      },
      error: (error) => {
        console.log('Erro: ', error), (this.isLoading = false);
      },
    });
  }

  openDialog(id: ICards) {
    this.dialog
      .open(DialogComponent, {
        data: id,
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          console.log('dialog ', result);
        }
      });
    // const dialogRef = this.dialog.open(DialogComponent);

    // dialogRef.afterClosed().subscribe((result) => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }

  // filtrarLista(valor: string): void {
  //   // Aplica o filtro à lista de nomes
  //   // Por exemplo, filtra os nomes que contêm o valor digitado
  //   this.listaNomes = this.listaNomes.filter((nome) =>
  //     nome.toLowerCase().includes(valor.toLowerCase())
  //   );
  // }

  //=========>
  // myFunction() {
  //   var input, filter, table, tr, td, i;
  //   input = document.getElementById("myInput");
  //   filter = input.value.toUpperCase();
  //   table = document.getElementById("myTable");
  //   tr = table.getElementsByTagName("tr");
  //   for (i = 0; i < tr.length; i++) {
  //     td = tr[i].getElementsByTagName("td")[0];
  //     if (td) {
  //       txtValue = td.textContent || td.innerText;
  //       if (txtValue.toUpperCase().indexOf(filter) > -1) {
  //         tr[i].style.display = "";
  //       } else {
  //         tr[i].style.display = "none";
  //       }
  //     }
  //   }
  // }
  //=========>

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
