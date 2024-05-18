import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { AuthModule } from './auth/auth.module';
import { SidenavComponent } from './components/side-nav/side-nav.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SidenavComponent, HeaderComponent],
  imports: [CommonModule, AuthModule, RouterModule],
  exports: [SidenavComponent, HeaderComponent],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        `CoreModule has already been loaded. Import it in the AppModule only.`
      );
    }
  }
}
