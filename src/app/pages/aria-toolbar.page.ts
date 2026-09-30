import { Component, signal } from '@angular/core';
import { Toolbar, ToolbarWidget, ToolbarWidgetGroup } from '@angular/aria/toolbar';

@Component({
  selector: 'app-aria-toolbar',
  imports: [Toolbar, ToolbarWidget, ToolbarWidgetGroup],
  template: `
    <h1>Angular Aria — Toolbar Example</h1>

    <div ngToolbar aria-label="Text Formatting Tools" class="toolbar">
      <div class="group">
        <button
          ngToolbarWidget
          value="undo"
          type="button"
          aria-label="undo"
          class="material-symbols-outlined"
          translate="no"
        >
          undo
        </button>

        <button
          ngToolbarWidget
          value="redo"
          type="button"
          aria-label="redo"
          class="material-symbols-outlined"
          translate="no"
        >
          redo
        </button>
      </div>

      <div class="separator" role="separator"></div>

      <div class="group">
        <button
          ngToolbarWidget
          value="bold"
          type="button"
          aria-label="bold"
          class="material-symbols-outlined"
          [attr.aria-pressed]="bold()"
          (click)="bold.set(!bold())"
          translate="no"
        >
          format_bold
        </button>

        <button
          ngToolbarWidget
          value="italic"
          type="button"
          aria-label="italic"
          class="material-symbols-outlined"
          [attr.aria-pressed]="italic()"
          (click)="italic.set(!italic())"
          translate="no"
        >
          format_italic
        </button>

        <button
          ngToolbarWidget
          value="underlined"
          type="button"
          aria-label="underlined"
          class="material-symbols-outlined"
          [attr.aria-pressed]="underlined()"
          (click)="underlined.set(!underlined())"
          translate="no"
        >
          format_underlined
        </button>
      </div>

      <div class="separator" role="separator"></div>

      <div ngToolbarWidgetGroup role="radiogroup" class="group" aria-label="Text alignment options">
        <button
          ngToolbarWidget
          role="radio"
          type="button"
          value="align left"
          aria-label="align left"
          class="material-symbols-outlined"
          [attr.aria-checked]="alignment() === 'left'"
          (click)="alignment.set('left')"
          translate="no"
        >
          format_align_left
        </button>

        <button
          ngToolbarWidget
          role="radio"
          type="button"
          value="align center"
          aria-label="align center"
          class="material-symbols-outlined"
          [attr.aria-checked]="alignment() === 'center'"
          (click)="alignment.set('center')"
          translate="no"
        >
          format_align_center
        </button>

        <button
          ngToolbarWidget
          role="radio"
          type="button"
          value="align right"
          aria-label="align right"
          class="material-symbols-outlined"
          [attr.aria-checked]="alignment() === 'right'"
          (click)="alignment.set('right')"
          translate="no"
        >
          format_align_right
        </button>
      </div>
    </div>

    <div class="state">
      <p>Bold: {{ bold() }} | Italic: {{ italic() }} | Underlined: {{ underlined() }} | Alignment: {{ alignment() }}</p>
    </div>
  `,
  styles: `
    @import url('https://fonts.googleapis.com/icon?family=Material+Symbols+Outlined');

    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2rem;
      padding: 2rem;
    }

    .toolbar {
      gap: 1.5rem;
      display: flex;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      background-color: #f0f0f0;
      border: 1px solid #ddd;
    }

    .group {
      gap: 0.5rem;
      display: flex;
    }

    .separator {
      width: 1px;
      align-self: center;
      height: calc(100% - 1rem);
      background-color: #ccc;
    }

    [ngToolbarWidget] {
      border: none;
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 4px;
      font-size: 1.25rem;
      background-color: transparent;
      color: #333;
    }

    [ngToolbarWidget]:hover {
      background-color: rgba(0, 0, 0, 0.08);
    }

    [ngToolbarWidget]:focus {
      outline-offset: -1px;
      outline: 2px solid #1976d2;
    }

    [ngToolbarWidget][aria-pressed='true'],
    [ngToolbarWidget][aria-checked='true'] {
      color: #1976d2;
      background-color: rgba(25, 118, 210, 0.1);
    }

    .state {
      color: #555;
      font-size: 0.9rem;
    }
  `,
})
export default class AriaToolbarPage {
  readonly bold = signal(false);
  readonly italic = signal(false);
  readonly underlined = signal(false);
  readonly alignment = signal<'left' | 'center' | 'right'>('left');
}
