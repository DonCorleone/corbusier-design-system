import { Component } from '@angular/core';
import { injectLoad } from '@analogjs/router';
import { toSignal } from '@angular/core/rxjs-interop';

import { load } from './index.server';
import { AppMenuBar } from '../components/menubar.component';
import { AppToolbar } from '../components/toolbar.component';
import { AppTree } from '../components/tree.component';

@Component({
  selector: 'app-home',
  imports: [AppMenuBar, AppToolbar, AppTree],
  template: `
    <p>Server says: {{ data().message }}</p>
    <app-menubar />
    <app-toolbar />
    <app-tree />
  `,
})
export default class Home {
  protected readonly data = toSignal(injectLoad<typeof load>(), {
    requireSync: true,
  });
}
