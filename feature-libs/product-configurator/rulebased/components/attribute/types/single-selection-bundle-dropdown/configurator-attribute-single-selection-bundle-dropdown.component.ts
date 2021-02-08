import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ConfigFormUpdateEvent } from '../../../form/configurator-form.event';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfiguratorAttributeBaseComponent } from '../base/configurator-attribute-base.component';
import { FormControl } from '@angular/forms';
import { ConfiguratorAttributeQuantityService } from '../../quantity/configurator-attribute-quantity.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'cx-configurator-attribute-single-selection-bundle-dropdown',
  templateUrl:
    './configurator-attribute-single-selection-bundle-dropdown.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorAttributeSingleSelectionBundleDropdownComponent
  extends ConfiguratorAttributeBaseComponent
  implements OnInit {
  attributeDropDownForm = new FormControl('');
  loading$ = new BehaviorSubject<boolean>(false);
  selectionValue: Configurator.Value;

  @Input() attribute: Configurator.Attribute;
  @Input() group: string;
  @Input() ownerKey: string;

  @Output() selectionChange = new EventEmitter<ConfigFormUpdateEvent>();

  constructor(private quantityService: ConfiguratorAttributeQuantityService) {
    super();
  }

  ngOnInit() {
    this.attributeDropDownForm.setValue(this.attribute.selectedSingleValue);

    this.selectionValue = this.attribute.values.find((value) => value.selected);
  }

  get withQuantity() {
    return this.quantityService.withQuantity(
      this.attribute.dataType,
      this.attribute.uiType
    );
  }

  get disableQuantityActions() {
    return this.quantityService.disableQuantityActions(
      this.attributeDropDownForm.value
    );
  }

  onSelect(): void {
    const event: ConfigFormUpdateEvent = {
      changedAttribute: {
        ...this.attribute,
        selectedSingleValue: this.attributeDropDownForm.value,
      },
      ownerKey: this.ownerKey,
      updateType: Configurator.UpdateType.ATTRIBUTE,
    };
    this.selectionChange.emit(event);
  }

  onDeselect(): void {
    const event: ConfigFormUpdateEvent = {
      changedAttribute: {
        ...this.attribute,
        selectedSingleValue: '0',
      },
      ownerKey: this.ownerKey,
      updateType: Configurator.UpdateType.ATTRIBUTE,
    };

    this.selectionChange.emit(event);
  }

  onChangeQuantity(eventObject): void {
    this.loading$.next(true);

    if (!eventObject.quantity) {
      this.attributeDropDownForm.setValue('');
      this.onSelect();
    } else {
      const event: ConfigFormUpdateEvent = {
        changedAttribute: {
          ...this.attribute,
          quantity: eventObject.quantity,
        },
        ownerKey: this.ownerKey,
        updateType: Configurator.UpdateType.ATTRIBUTE_QUANTITY,
      };

      this.selectionChange.emit(event);
    }
  }

  getSelectedValuePrice(
    attribute: Configurator.Attribute
  ): Configurator.PriceDetails | undefined {
    return attribute?.values?.find((value) => value?.selected)?.valuePrice;
  }

  getSelectedValuePriceTotal(
    attribute: Configurator.Attribute
  ): Configurator.PriceDetails | undefined {
    return attribute?.values?.find((value) => value?.selected)?.valuePriceTotal;
  }

  getProductPrice(
    attribute: Configurator.Attribute
  ): Configurator.PriceDetails | number {
    return (
      attribute?.quantity &&
      this.getSelectedValuePrice(attribute) &&
      this.getSelectedValuePriceTotal(attribute)
    );
  }

  setFormula(
    quantity?: number,
    price?: Configurator.PriceDetails,
    priceTotal?: Configurator.PriceDetails
  ) {
    return {
      quantity: quantity,
      price: price,
      priceTotal: priceTotal,
      isLightedUp: true,
    };
  }
}