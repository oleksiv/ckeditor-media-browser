/**
 * @module media/mediabrowser/mediabrowserediting
 */
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import MediaResizeCommand from "./mediaresizecommand";

/**
 * Media Browser Editing Plugin
 *
 * @extends module:core/plugin~Plugin
 */
export default class MediaResizeEditing extends Plugin {
    /**
     * @inheritDoc
     */
    init() {
        const editor = this.editor;
        editor.commands.add('mediaResize', new MediaResizeCommand(editor));
    }
}
