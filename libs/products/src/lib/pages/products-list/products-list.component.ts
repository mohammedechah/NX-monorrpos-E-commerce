import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../models/category';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'products-list',
  templateUrl: './products-list.component.html',
  styles: [],
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  isCategoryPage: boolean = false;

  constructor(
    private prodServices: ProductsService,
    private cateService: CategoriesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Subscribe to the route params and determine if category filter is active
    this.route.params.subscribe((params) => {
      const categoryid = params['categoryid'];
      if (categoryid) {
        // Use category filter if categoryid is present in the URL
        this._getProducts([categoryid]);
        this.isCategoryPage = true;
      } else {
        // Otherwise, get all products
        this._getProducts();
        this.isCategoryPage = false;
      }
    });

    // Fetch all categories for filtering
    this._getCategories();
  }

  // Get products with optional category filter
  private _getProducts(categoriesFilter?: string[]) {
    this.prodServices.getProducts(categoriesFilter).subscribe((products) => {
      this.products = products;
    });
  }

  // Fetch categories for displaying filters
  private _getCategories() {
    this.cateService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  // Handle category-based product filtering
  categoryFilter() {
    const selectedCategories: any[] = this.categories
      .filter((category) => category.checked)
      .map((category) => category.id);

    this._getProducts(selectedCategories);
  }
}
