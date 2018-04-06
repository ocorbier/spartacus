import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import * as fromCheckoutStore from '../../../store';
import * as fromRouting from '../../../../routing/store';
import { MatDialog } from '@angular/material';
import { SuggestedAddressDialogComponent } from './suggested-addresses-dialog/suggested-addresses-dialog.component';

@Component({
  selector: 'y-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddressFormComponent implements OnInit {
  countries$: Observable<any>;
  titles$: Observable<any>;

  @Output() addAddress = new EventEmitter<any>();

  address: FormGroup = this.fb.group({
    defaultAddress: [false],
    titleCode: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    line1: ['', Validators.required],
    line2: ['', Validators.required],
    town: ['', Validators.required],
    region: this.fb.group({
      isocode: ['', Validators.required]
    }),
    country: this.fb.group({
      isocode: ['', Validators.required]
    }),
    postalCode: ['', Validators.required],
    phone: ''
  });

  constructor(
    protected store: Store<fromRouting.State>,
    private fb: FormBuilder,
    protected dialog: MatDialog
  ) {}

  ngOnInit() {
    this.countries$ = this.store
      .select(fromCheckoutStore.getAllDeliveryCountries)
      .pipe(
        tap(countries => {
          if (Object.keys(countries).length === 0) {
            this.store.dispatch(new fromCheckoutStore.LoadDeliveryCountries());
          }
        })
      );

    this.titles$ = this.store.select(fromCheckoutStore.getAllTitles).pipe(
      tap(titles => {
        if (Object.keys(titles).length === 0) {
          this.store.dispatch(new fromCheckoutStore.LoadTitles());
        }
      })
    );
  }

  next() {
    this.address.value.region.isocode =
      this.address.value.region.isocode.indexOf('-') > -1
        ? this.address.value.region.isocode
        : this.address.value.country.isocode +
          '-' +
          this.address.value.region.isocode;

    if (this.address.value.town.toLowerCase().indexOf('review') > -1) {
      const dialogRef = this.dialog.open(SuggestedAddressDialogComponent, {
        data: {
          address: this.address.value
        }
      });

      const sub = dialogRef.componentInstance.onSelectedAddress.subscribe(
        address => {
          if (address.selected) {
            this.addAddress.emit(address);
          } else {
            this.address.setValue(address);
            this.address.value.region.isocode = address.region.isocode.slice(
              address.region.isocode.indexOf('-') + 1
            );
          }
        }
      );

      dialogRef.afterClosed().subscribe(() => {
        sub.unsubscribe();
      });
    } else {
      this.addAddress.emit(this.address.value);
    }
  }

  back() {
    this.store.dispatch(
      new fromRouting.Go({
        path: ['/cart']
      })
    );
  }

  required(name: string) {
    return (
      this.address.get(`${name}`).hasError('required') &&
      this.address.get(`${name}`).touched
    );
  }

  notSelected(name: string) {
    return (
      this.address.get(`${name}`).dirty && !this.address.get(`${name}`).value
    );
  }
}
