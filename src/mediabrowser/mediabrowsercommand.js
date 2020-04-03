/**
 * @module media/mediabrowser/mediabrowsercommand
 */
import Command from '@ckeditor/ckeditor5-core/src/command';
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
        editor.model.change(writer => {
            if (typeof editor.config._config.openUploader === 'function') {
                editor.config._config.openUploader((file) => {
                    const type = getTypeFromUrl(file.url);
                    editor.model.insertContent(writer.createElement('media', {
                        alt: '',
                        src: file.url,
                        type: type.id,
                    }), editor.model.document.selection);
                });
            } else {
                console.error('Please specify openUploader callback in editor config');
            }
        });
    }
}
