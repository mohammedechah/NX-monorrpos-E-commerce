import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService, Category } from '@bluebits/products';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',
})
export class CategoriesListComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  endsubs$ : Subject<any> = new Subject();

  constructor(
    private messageService: MessageService,
    private categoryService: CategoriesService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._getCategories();
  }
  ngOnDestroy(): void {
    this.endsubs$.next(0);
    this.endsubs$.complete();
  }
  updateCategory(categoryid : string){
    this.router.navigateByUrl(`categories/form/${categoryid}`); 

  }

  deleteCategory(categoryId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this category?',
      header: 'Delete Category',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.categoryService.deleteCategory(categoryId).subscribe(
          () => {
            this._getCategories();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Category is deleted!',
            });
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Category is not deleted!',
            });
          }
        );
      }
    });
  }

  private _getCategories() {
    this.categoryService.getCategories().pipe(takeUntil(this.endsubs$)).subscribe((categories) => {
      this.categories = categories;
    });
  }
}
