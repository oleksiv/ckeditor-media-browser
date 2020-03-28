Editor Customization
=============================


If you want to add more plugins to the existing build or customize something that cannot be controlled with the editor configuration you should create a custom build first.

According to [CKEDITOR documentation](https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/frameworks/angular.html) you need to create a custom Editor build before using in Angular application.
It's needed in case you want to customize the editor, like add more plugins. This build is already created and you could use it. It's located in **build/ckeditor.js**

See instructions below which tell how to customize the editor and how to include in Angular application.

Current build (./src/ckeditor.js) already extend ClassicEditor configuration alongside with File Uploader plugin (./src/file-uploader.js).

Build Editor in Development environment
=============================
```
./node_modules/.bin/webpack --mode development --watch
```

Build Editor in Production environment
=============================
```
./node_modules/.bin/webpack --mode production
```

Use Editor In Angular
=============================
app.component.ts
```
import {Component, OnInit} from '@angular/core';
import * as CustomEditor from 'ckeditor5-build-classic/build/ckeditor';

@Component({
  selector: 'app-root',
  template: `<ckeditor [editor]="editor" [config]="config"></ckeditor>`,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public editor;
  public config = {
    fileStackApiKey: 'A78e38y7HQUG5OYrs7rDTz'
  };

  ngOnInit(): void {
    this.editor = CustomEditor;
  }
}

```
app.module.ts
```

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CKEditorModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```
