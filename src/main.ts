<<<<<<< HEAD
import {App, Editor, MarkdownView, Modal, Notice, Plugin} from 'obsidian';
import {DEFAULT_SETTINGS, MyPluginSettings, SampleSettingTab} from "./settings";

// Remember to rename these classes and interfaces!

export default class MyPlugin extends Plugin {
	settings: MyPluginSettings;
=======
import { App, Editor, MarkdownView, Modal, Notice, Plugin } from 'obsidian';
import { DEFAULT_SETTINGS, LocationAddSettings, LocationAddTab } from './settings/settings';
import { AddLocationModal } from './modals/AddLocationModal';
import { AddCurrentLocation } from './modals/AddCurrentLocationModal';


// Remember to rename these classes and interfaces!

export default class LocationAddPlugin extends Plugin {
	settings: LocationAddSettings;
>>>>>>> initial_edits

	async onload() {
		await this.loadSettings();

		// This creates an icon in the left ribbon.
<<<<<<< HEAD
		this.addRibbonIcon('dice', 'Sample', (evt: MouseEvent) => {
			// Called when the user clicks the icon.
			new Notice('This is a notice!');
		});

		// This adds a status bar item to the bottom of the app. Does not work on mobile apps.
		const statusBarItemEl = this.addStatusBarItem();
		statusBarItemEl.setText('Status bar text');

		// This adds a simple command that can be triggered anywhere
		this.addCommand({
			id: 'open-modal-simple',
			name: 'Open modal (simple)',
			callback: () => {
				new SampleModal(this.app).open();
			}
		});
		// This adds an editor command that can perform some operation on the current editor instance
		this.addCommand({
			id: 'replace-selected',
			name: 'Replace selected content',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				editor.replaceSelection('Sample editor command');
			}
		});
		// This adds a complex command that can check whether the current state of the app allows execution of the command
		this.addCommand({
			id: 'open-modal-complex',
			name: 'Open modal (complex)',
			checkCallback: (checking: boolean) => {
				// Conditions to check
				const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
				if (markdownView) {
					// If checking is true, we're simply "checking" if the command can be run.
					// If checking is false, then we want to actually perform the operation.
					if (!checking) {
						new SampleModal(this.app).open();
					}

					// This command will only show up in Command Palette when the check function returns true
					return true;
				}
				return false;
			}
		});

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new SampleSettingTab(this.app, this));

		// If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
		// Using this function will automatically remove the event listener when this plugin is disabled.
		this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
			new Notice("Click");
		});
=======
		this.addRibbonIcon('map', 'New Location', () => {
				new AddLocationModal(this).open();
			})

		// This adds a new location
		this.addCommand({
			id: 'new-location',
			name: 'Add a new location',
			callback: () => {
				new AddLocationModal(this).open();
			}
		});

		// This adds a location based on the users current GPS coordinates
		this.addCommand({
			id: 'new-location-from-gps',
			name: 'Add current location',
			callback: () => {
				new AddCurrentLocation(this).open();
			}
		});


		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new LocationAddTab(this.app, this));
>>>>>>> initial_edits

		// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));

	}

	onunload() {
	}

	async loadSettings() {
<<<<<<< HEAD
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData() as Partial<MyPluginSettings>);
=======
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData() as Partial<LocationAddSettings>);
>>>>>>> initial_edits
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
<<<<<<< HEAD
}

class SampleModal extends Modal {
	constructor(app: App) {
		super(app);
	}

	onOpen() {
		let {contentEl} = this;
		contentEl.setText('Woah!');
	}

	onClose() {
		const {contentEl} = this;
		contentEl.empty();
	}
}
=======
};
>>>>>>> initial_edits
