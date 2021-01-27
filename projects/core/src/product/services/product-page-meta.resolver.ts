import { Injectable, Optional } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { BreadcrumbMeta, PageRobotsMeta } from '../../cms/model/page.model';
import { BasePageMetaResolver } from '../../cms/page/base-page-meta.resolver';
import { PageMetaResolver } from '../../cms/page/page-meta.resolver';
import {
  PageBreadcrumbResolver,
  PageDescriptionResolver,
  PageHeadingResolver,
  PageImageResolver,
  PageRobotsResolver,
  PageTitleResolver,
} from '../../cms/page/page.resolvers';
import { TranslationService } from '../../i18n/translation.service';
import { PageType } from '../../model/cms.model';
import { Product } from '../../model/product.model';
import { RoutingService } from '../../routing/facade/routing.service';
import { ProductService } from '../facade/product.service';
import { ProductScope } from '../model/product-scope';

/**
 * Resolves the page data for the Product Detail Page
 * based on the `PageType.PRODUCT_PAGE`.
 *
 * The page title, heading, description, breadcrumbs and
 * first GALLERY image are resolved if available in the data.
 */
@Injectable({
  providedIn: 'root',
})
export class ProductPageMetaResolver
  extends PageMetaResolver
  implements
    PageHeadingResolver,
    PageTitleResolver,
    PageDescriptionResolver,
    PageBreadcrumbResolver,
    PageImageResolver,
    PageRobotsResolver {
  // reusable observable for product data based on the current page
  protected product$ = this.routingService.getRouterState().pipe(
    map((state) => state.state.params['productCode']),
    filter((code) => !!code),
    switchMap((code) => this.productService.get(code, ProductScope.DETAILS)),
    filter(Boolean)
  );

  /**
   * @deprecated since 3.1, we'll use the BasePageMetaResolver in future versions
   */
  // TODO(#10467): Remove deprecated constructors
  constructor(
    routingService: RoutingService,
    productService: ProductService,
    translation: TranslationService
  );
  constructor(
    routingService: RoutingService,
    productService: ProductService,
    translation: TranslationService,
    // tslint:disable-next-line: unified-signatures
    basePageMetaResolver?: BasePageMetaResolver
  );
  constructor(
    protected routingService: RoutingService,
    protected productService: ProductService,
    protected translation: TranslationService,
    @Optional() protected basePageMetaResolver?: BasePageMetaResolver
  ) {
    super();
    this.pageType = PageType.PRODUCT_PAGE;
  }

  /**
   * Resolves the page heading for the Product Detail Page.
   * The page heading is used in the UI (`<h1>`), where as the page
   * title is used by the browser and crawlers.
   */
  resolveHeading(): Observable<string> {
    return this.product$.pipe(
      switchMap((p: Product) =>
        this.translation.translate('pageMetaResolver.product.heading', {
          heading: p.name,
        })
      )
    );
  }

  /**
   * Resolves the page title for the Product Detail Page. The page title
   * is resolved with the product name, the first category and the manufacturer.
   * The page title used by the browser (history, tabs) and crawlers.
   */
  resolveTitle(): Observable<string> {
    return this.product$.pipe(
      switchMap((p: Product) => {
        let title = p.name;
        title += this.resolveFirstCategory(p);
        title += this.resolveManufacturer(p);
        return this.translation.translate('pageMetaResolver.product.title', {
          title: title,
        });
      })
    );
  }

  /**
   * Resolves the page description for the Product Detail Page. The description
   * is based on the `product.summary`.
   */
  resolveDescription(): Observable<string> {
    return this.product$.pipe(
      switchMap((p: Product) =>
        this.translation.translate('pageMetaResolver.product.description', {
          description: p.summary,
        })
      )
    );
  }

  /**
   * Resolves breadcrumbs for the Product Detail Page. The breadcrumbs are driven by
   * a static home page crumb and a crumb for each category.
   */
  resolveBreadcrumbs(): Observable<BreadcrumbMeta[]> {
    return combineLatest([
      this.product$.pipe(),
      this.translation.translate('common.home'),
    ]).pipe(
      map(([p, label]: [Product, string]) => {
        const breadcrumbs = [];
        breadcrumbs.push({ label: label, link: '/' });
        for (const { name, code, url } of p.categories || []) {
          breadcrumbs.push({
            label: name || code,
            link: url,
          });
        }
        return breadcrumbs;
      })
    );
  }

  /**
   * Resolves the main page image for the Product Detail Page. The product image
   * is based on the PRIMARY product image. The zoom format is used by default.
   */
  resolveImage(): Observable<string> {
    return this.product$.pipe(
      map((p: Product) =>
        (<any>p.images?.PRIMARY)?.zoom?.url
          ? (<any>p.images.PRIMARY).zoom.url
          : null
      )
    );
  }

  protected resolveFirstCategory(product: Product): string {
    let firstCategory;
    if (product.categories?.length > 0) {
      firstCategory = product.categories[0];
    }
    return firstCategory
      ? ` | ${firstCategory.name || firstCategory.code}`
      : '';
  }

  protected resolveManufacturer(product: Product): string {
    return product.manufacturer ? ` | ${product.manufacturer}` : '';
  }

  /**
   * Resolves the robot information for the Product Detail Page. The
   * robot instruction defaults to FOLLOW and INDEX for all product pages,
   * regardless of whether they're purchasable or not.
   */
  // TODO(#10467): resolve robots from `BasePageMetaResolver` instead
  resolveRobots(): Observable<PageRobotsMeta[]> {
    return of([PageRobotsMeta.FOLLOW, PageRobotsMeta.INDEX]);
  }

  /**
   * Resolves the canonical url for the product page.
   */
  resolveCanonicalUrl(): Observable<string> {
    return this.basePageMetaResolver?.resolveCanonicalUrl();
  }
}
