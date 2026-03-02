import { App, PluginSettingTab, Setting, ButtonComponent, TextComponent, Notice, MarkdownRenderer} from "obsidian";
import type LocationAddPlugin from "../main";
import { IconColorAssociation } from "../models/IconColorAssociation"

export interface LocationAddSettings {
	templatePath: string;
	iconColorLookup: boolean,
	icaDict: {[id: string] : IconColorAssociation},
}

export const DEFAULT_SETTINGS: LocationAddSettings = {
	templatePath: '',
	iconColorLookup: false,
	icaDict: {}
}

export class LocationAddTab extends PluginSettingTab {
	plugin: LocationAddPlugin;
	private icaType: TextComponent;
	private strType: string;
	private icaIcon: TextComponent;
	private strIcon: string | undefined;
	private icaColor: TextComponent;
	private strColor: string | undefined;
	private icaAddBtn: ButtonComponent;

	constructor(app: App, plugin: LocationAddPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	setICADisabled(disabled: boolean): void {
		this.icaType?.setDisabled(disabled);
		this.icaIcon?.setDisabled(disabled);
		this.icaColor?.setDisabled(disabled);
		this.icaAddBtn?.setDisabled(disabled);
	}

	display(): void {
		const {containerEl} = this;
		containerEl.empty();
		const settings = this.plugin.settings;
		
		// To-Do make this a searchable drop down
		new Setting(containerEl)
			.setName('Path to template file')
			.setDesc('See README docs for example template file')
			.addText((text) =>
				text
				.setPlaceholder('path/to/template/file')
				.setValue(settings.templatePath)
				.onChange(async (value) => {
					settings.templatePath = value;
					await this.plugin.saveSettings();
				}));
		
		// Enable / disable icon lookups
		const icDesc = document.createDocumentFragment();
		icDesc.appendText('Use custom associations for ');  
		icDesc.createEl('a', {  
			text: 'icons',  
			attr: { href: 'https://lucide.dev/icons/', target: '_blank' }  
		});
		icDesc.appendText(' and ');
		icDesc.createEl('a', {  
			text: 'colors',  
			attr: { href: 'https://en.wikipedia.org/wiki/Web_colors', target: '_blank' }  
		});
		new Setting(containerEl)  
			.setName('Icon and color associations')
			.setDesc(icDesc)
			.addToggle(toggle => toggle  
				.setValue(settings.iconColorLookup)  
				.onChange(async (value) => {  
					settings.iconColorLookup = value;  
					await this.plugin.saveSettings();  
					this.display();
					this.setICADisabled(!value);
				})  
			);
		
		const icAssociation = new Setting(containerEl)
            .setName('Add new icon color association')
            .setDesc('Add or update type association with icon/color')
			.setDisabled(!settings.iconColorLookup);
		icAssociation.addText((text) =>{
			this.icaType = text;
			text
				.setPlaceholder("type: e.g. landmark")
				.setDisabled(!settings.iconColorLookup)
				.onChange((value) =>
					{
						this.strType = value
					}
				);
		});
		// this should be a lookup box with icons rendered
		icAssociation.addText((text) => text.setPlaceholder("icon: e.g. tree").setDisabled(!settings.iconColorLookup).onChange((value) => {this.strColor = value}));
		icAssociation.addText((text) => text.setPlaceholder("color: e.g. green | #00ff04").setDisabled(!settings.iconColorLookup).onChange((value) => {this.strIcon = value}));
		icAssociation.addButton((button) => {
			this.icaAddBtn = button;
			button
			.setButtonText('+')
			.onClick(async () => {
				if(this.icaType.getValue() === undefined || this.icaType.getValue() === ''){
					console.error("Must supply a type name. Setting not saved")
					new Notice("Must supply a type name. Setting not saved")
					return;
				}
				// To-Do check that one or both color or icon are set if not give notice
				// To-Do add backup toggle to search lucide and pick first item from searched array
				settings.icaDict[this.strType]= {'color':this.strColor, 'icon':this.strIcon};
				console.log(settings.icaDict);
				this.strColor = undefined;
				this.strIcon = undefined;
				await this.plugin.saveSettings();
				this.display();
			})
			.setDisabled(!settings.iconColorLookup)});
	}
}
