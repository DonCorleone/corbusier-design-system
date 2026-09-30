import { Component, signal } from '@angular/core';
import { Toolbar, ToolbarWidget, ToolbarWidgetGroup } from '@angular/aria/toolbar';

@Component({
  selector: 'app-toolbar',
  imports: [Toolbar, ToolbarWidget, ToolbarWidgetGroup],
  template: `
    <div ngToolbar aria-label="Text Formatting Tools" class="toolbar">
      <div class="group">
        <button ngToolbarWidget value="undo" type="button" aria-label="undo" class="material-symbols-outlined" translate="no">undo</button>
        <button ngToolbarWidget value="redo" type="button" aria-label="redo" class="material-symbols-outlined" [disabled]="true" translate="no">redo</button>
      </div>

      <div class="separator" role="separator"></div>

      <div class="group">
        <button ngToolbarWidget value="bold" type="button" aria-label="bold" class="material-symbols-outlined"
          [attr.aria-pressed]="bold()" (click)="bold.set(!bold())" translate="no">format_bold</button>
        <button ngToolbarWidget value="italic" type="button" aria-label="italic" class="material-symbols-outlined"
          [attr.aria-pressed]="italic()" (click)="italic.set(!italic())" translate="no">format_italic</button>
        <button ngToolbarWidget value="underlined" type="button" aria-label="underlined" class="material-symbols-outlined"
          [attr.aria-pressed]="underlined()" (click)="underlined.set(!underlined())" translate="no">format_underlined</button>
      </div>

      <div class="separator" role="separator"></div>

      <div ngToolbarWidgetGroup role="radiogroup" class="group" aria-label="Text alignment options">
        <button ngToolbarWidget role="radio" type="button" value="align left" aria-label="align left" class="material-symbols-outlined"
          [attr.aria-checked]="alignment() === 'left'" (click)="alignment.set('left')" translate="no">format_align_left</button>
        <button ngToolbarWidget role="radio" type="button" value="align center" aria-label="align center" class="material-symbols-outlined"
          [attr.aria-checked]="alignment() === 'center'" (click)="alignment.set('center')" translate="no">format_align_center</button>
        <button ngToolbarWidget role="radio" type="button" value="align right" aria-label="align right" class="material-symbols-outlined"
          [attr.aria-checked]="alignment() === 'right'" (click)="alignment.set('right')" translate="no">format_align_right</button>
      </div>
    </div>

    <p class="state">Bold: {{ bold() }} | Italic: {{ italic() }} | Underlined: {{ underlined() }} | Alignment: {{ alignment() }}</p>
  `,
  styles: `
    @import url('https://fonts.googleapis.com/icon?family=Material+Symbols+Outlined');

    :host {
      /* Figma layout: Default */
      --widget-bg:          var(--default);
      --widget-bg-hover:    var(--default-darker);
      --widget-bg-disabled: var(--default-lighter);
      --widget-color:       var(--black);

      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .toolbar {
      gap: 1.5rem;
      display: inline-flex;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      background-color: var(--bg-surface);
      border: 1px solid var(--border);
      margin-top: 1rem;
      margin-bottom: 0.5rem;
    }

    .group {
      gap: 0.5rem;
      display: flex;
    }

    .separator {
      width: 1px;
      align-self: center;
      height: calc(100% - 1rem);
      background-color: var(--border);
    }

    [ngToolbarWidget] {
      border: 2px solid transparent;
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 0;
      font-size: 1.25rem;
      background-color: var(--widget-bg);
      color: var(--widget-color);
    }

    [ngToolbarWidget]:not([aria-disabled='true']):hover {
      background-color: var(--widget-bg-hover);
      filter: drop-shadow(0 4px 2px rgba(0, 0, 0, 0.25));
    }

    [ngToolbarWidget]:focus-visible {
      outline-offset: 2px;
      outline: 2px solid var(--accent);
    }

    [ngToolbarWidget][aria-pressed='true'],
    [ngToolbarWidget][aria-checked='true'],
    [ngToolbarWidget]:not([aria-disabled='true']):active {
      background-color: var(--widget-bg-hover);
      border-color: var(--black);
    }

    [ngToolbarWidget][aria-disabled='true'] {
      cursor: default;
      pointer-events: none;
      background-color: var(--widget-bg-disabled);
      filter: blur(2px);
    }

    .state {
      font-size: 0.85rem;
      color: var(--text-muted);
    }
  `,
})
export class AppToolbar {
  readonly bold = signal(false);
  readonly italic = signal(false);
  readonly underlined = signal(false);
  readonly alignment = signal<'left' | 'center' | 'right'>('left');
}
