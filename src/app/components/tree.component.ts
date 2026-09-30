import { Component, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { Tree, TreeItem, TreeItemGroup } from '@angular/aria/tree';

type TreeNode = {
  name: string;
  value: string;
  children?: TreeNode[];
  disabled?: boolean;
  expanded?: boolean;
};

@Component({
  selector: 'app-tree',
  imports: [Tree, TreeItem, TreeItemGroup, NgTemplateOutlet],
  template: `
    <ul ngTree #tree="ngTree" [(value)]="selected" class="file-tree">
      <ng-template
        [ngTemplateOutlet]="treeNodes"
        [ngTemplateOutletContext]="{nodes: nodes, parent: tree}"
      />
    </ul>

    <p class="selected-label">Selected: {{ selected().join(', ') || 'none' }}</p>

    <ng-template #treeNodes let-nodes="nodes" let-parent="parent">
      @for (node of nodes; track node.value) {
        <li
          ngTreeItem
          [parent]="parent"
          [value]="node.value"
          [label]="node.name"
          [disabled]="node.disabled ?? false"
          [(expanded)]="node.expanded"
          #treeItem="ngTreeItem"
        >
          <span aria-hidden="true" class="material-symbols-outlined expand-icon" translate="no">{{
            node.children ? 'chevron_right' : ''
          }}</span>
          <span aria-hidden="true" class="material-symbols-outlined" translate="no">{{
            node.children ? 'folder' : 'description'
          }}</span>
          {{ node.name }}
          <span aria-hidden="true" class="material-symbols-outlined selected-icon" translate="no">check</span>
        </li>

        @if (node.children) {
          <ul role="group">
            <ng-template ngTreeItemGroup [ownedBy]="treeItem" #group="ngTreeItemGroup">
              <ng-template
                [ngTemplateOutlet]="treeNodes"
                [ngTemplateOutletContext]="{nodes: node.children, parent: group}"
              />
            </ng-template>
          </ul>
        }
      }
    </ng-template>
  `,
  styles: `
    @import url('https://fonts.googleapis.com/icon?family=Material+Symbols+Outlined');

    :host {
      /* Figma layout: Tertiary */
      --item-bg:          var(--tertiary);
      --item-bg-hover:    var(--tertiary-darker);
      --item-bg-disabled: var(--tertiary-lighter);
      --item-color:       var(--white);
      --item-color-disabled: var(--black);

      display: flex;
      flex-direction: column;
      align-items: center;
      user-select: none;
    }

    [ngTree] {
      min-width: 20rem;
      background-color: var(--bg-surface);
      border: 1px solid var(--border);
      border-radius: 0.5rem;
      padding: 0.5rem;
      margin: 0;
    }

    [ngTreeItem] {
      cursor: pointer;
      list-style: none;
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.3rem 0.75rem;
      margin-bottom: 2px;
      border: 2px solid transparent;
      color: var(--item-color);
      background-color: var(--item-bg);
      font-size: 0.875rem;
    }

    [ngTreeItem][aria-disabled='true'] {
      color: var(--item-color-disabled);
      background-color: var(--item-bg-disabled);
      cursor: default;
      pointer-events: none;
      filter: blur(2px);
    }

    [ngTreeItem]:not([aria-disabled='true']):hover,
    [ngTreeItem]:not([aria-disabled='true']):focus {
      background-color: var(--item-bg-hover);
    }

    [ngTreeItem]:not([aria-disabled='true']):hover {
      filter: drop-shadow(0 4px 2px rgba(0, 0, 0, 0.25));
    }

    [ngTreeItem]:focus {
      outline: none;
    }

    [ngTreeItem][aria-selected='true'],
    [ngTreeItem]:not([aria-disabled='true']):active {
      background-color: var(--item-bg-hover);
      border-color: var(--black);
    }

    .material-symbols-outlined {
      font-size: 1.1rem;
      width: 20px;
    }

    .expand-icon {
      transition: transform 0.15s ease;
      opacity: 0.5;
    }

    [ngTreeItem][aria-expanded='true'] .expand-icon {
      transform: rotate(90deg);
    }

    .selected-icon {
      visibility: hidden;
      margin-left: auto;
      font-size: 1rem;
    }

    [ngTreeItem][aria-selected='true'] .selected-icon {
      visibility: visible;
    }

    ul[role='group'] {
      margin: 0;
      padding: 0;
      padding-left: 1.25rem;
    }

    li[aria-expanded='false'] + ul[role='group'] {
      display: none;
    }

    .selected-label {
      font-size: 0.8rem;
      color: var(--text-muted);
      margin-top: 0.5rem;
    }
  `,
})
export class AppTree {
  readonly nodes: TreeNode[] = [
    {
      name: 'public',
      value: 'public',
      children: [
        { name: 'index.html', value: 'public/index.html' },
        { name: 'favicon.ico', value: 'public/favicon.ico' },
        { name: 'styles.css', value: 'public/styles.css' },
      ],
      expanded: true,
    },
    {
      name: 'src',
      value: 'src',
      children: [
        {
          name: 'app',
          value: 'src/app',
          children: [
            { name: 'app.ts', value: 'src/app/app.ts' },
            { name: 'app.html', value: 'src/app/app.html' },
            { name: 'app.css', value: 'src/app/app.css' },
          ],
          expanded: false,
        },
        {
          name: 'assets',
          value: 'src/assets',
          children: [{ name: 'logo.png', value: 'src/assets/logo.png' }],
          expanded: false,
        },
        { name: 'main.ts', value: 'src/main.ts' },
        { name: 'styles.css', value: 'src/styles.css', disabled: true },
      ],
      expanded: false,
    },
    { name: 'angular.json', value: 'angular.json' },
    { name: 'package.json', value: 'package.json' },
    { name: 'README.md', value: 'README.md' },
  ];

  readonly selected = signal(['angular.json']);
}
