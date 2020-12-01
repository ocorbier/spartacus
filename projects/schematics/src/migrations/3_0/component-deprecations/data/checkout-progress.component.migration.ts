import {
  CHECKOUT_PROGRESS_COMPONENT,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { ComponentData } from '../../../../shared/utils/file-utils';

export const CHECKOUT_PROGRESS_COMPONENT_MIGRATION: ComponentData = {
  // projects/storefrontlib/src/cms-components/checkout/components/checkout-progress/checkout-progress.component.ts
  selector: 'cx-checkout-progress',
  componentClassName: CHECKOUT_PROGRESS_COMPONENT,
  removedProperties: [
    {
      name: 'routerState$',
      comment: `${TODO_SPARTACUS} 'routerState$' property has been removed.`,
    },
    {
      name: 'activeStepUrl',
      comment: `${TODO_SPARTACUS} 'activeStepUrl' property has been removed.`,
    },
    {
      name: 'steps',
      comment: `${TODO_SPARTACUS} 'steps' property has been removed. Use '$steps' observable instead`,
    },
  ],
};
