import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { ItemExistsModule } from '../../shared/item-exists.module';
import { CardModule } from '../../shared/card/card.module';
import { ToggleStatusModule } from '../../shared/detail/toggle-status-action/toggle-status.module';
import { UserDetailsComponent } from './user-details.component';
import { EditEnableMessageModule } from '../../shared/detail/edit-enable-message/edit-enable-message.module';

@NgModule({
  imports: [
    CommonModule,
    CardModule,
    RouterModule,
    UrlModule,
    I18nModule,
    ToggleStatusModule,
    ItemExistsModule,
    EditEnableMessageModule,
  ],
  declarations: [UserDetailsComponent],
  exports: [UserDetailsComponent],
})
export class UserDetailsModule {}
