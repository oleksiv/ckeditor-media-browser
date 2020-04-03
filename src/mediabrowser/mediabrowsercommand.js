/**
 * @module media/mediabrowser/mediabrowsercommand
 */
import Command from '@ckeditor/ckeditor5-core/src/command';
import * as filestack from "filestack-js";
import {getTypeFromUrl} from "../media/utils";

/**
 * Media Browser Command
 *
 * @extends module:core/command~Command
 */
export default class MediaBrowserCommand extends Command {
    /**
     * @inheritDoc
     */
    execute() {
        const editor = this.editor;
        const editorDoc = editor.sourceElement.ownerDocument;
        const apiKey = editor.config.get('fileStackApiKey');
        if (!apiKey) {
            console.error('fileStackApiKey is not defined in editor config');
        }

        const client = filestack.init(apiKey);

        editor.model.change(writer => {
            // const browser = editor.config.get('media.browser');
            //
            // if (!browser || !browser.length) {
            //     return;
            // }

            const options = {
                onFileUploadFinished: file => {
                    const type = getTypeFromUrl(file.url);
                    editor.model.insertContent(writer.createElement('media', {
                        alt: '',
                        src: file.url,
                        type: type.id,
                    }), editor.model.document.selection);
                },
                fromSources: ['local_file_system'],
                storeTo: {
                    location: 's3',
                    path: editor.config._config.getPath(this),
                }
                // accept: ['video/*'],
            };

            client.picker(options).open().then(() => {
                // debugger;
            });

            // const src = 'https://via.placeholder.com/350x150';
            // let type = null;
            //
            // if (!type && (type = getTypeFromUrl(src))) {
            //     type = type.id;
            // }
            //
            // editor.model.insertContent(writer.createElement('media', {
            //     alt: 'test',
            //     src: 'https://via.placeholder.com/350x150',
            //     type: type
            // }), editor.model.document.selection);
        });
    }
}
