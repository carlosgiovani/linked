import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { SearchService } from '../../shared/services/search.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

interface Items {
  value: string;
  viewValue: string;
}

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
    MatCardModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  listCards: any = [];
  isLoading = false;
  loaded = false;
  loadedCre = false;
  error: string | null = null;

  itemsSelect: Items[] = [
    { value: 'Amonkhet', viewValue: 'Amonkhet' },
    { value: 'Ixalan', viewValue: 'Ixalan' },
    { value: 'Zendikar', viewValue: 'Zendikar' },
    { value: 'Ravnica', viewValue: 'Ravnica' },
    { value: 'Onslaught', viewValue: 'Onslaught' },
  ];

  inputValue: string = '';
  selectedValue: string = '';

  setCards: any = [];
  cardsCreatures: any = [];

  constructor(
    private searchService: SearchService,
    private cdRef: ChangeDetectorRef,
    private cdRefCre: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  searchCard(): void {
    this.isLoading = true;
    this.searchService
      .getSearch(this.inputValue, this.selectedValue)
      .subscribe({
        next: (res) => {
          (this.setCards = res), this.cdRef.detectChanges();
          this.loaded = true;
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
        this.isLoading = false;
        this.cdRefCre.detectChanges();
      },
      error: (error) => {
        console.log('Erro: ', error), (this.isLoading = false);
      },
    });
  }
}
