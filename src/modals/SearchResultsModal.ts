import type { ButtonComponent } from 'obsidian';
import { App, SuggestModal, Notice, Setting} from 'obsidian';
import type LocationAddPlugin from "../main";
import { MapLocation } from '../models/MapLocation';

export class SearchResultsModal extends SuggestModal<MapLocation> {
    plugin: LocationAddPlugin;

    searchTerm: string;
    title: string = 'Location Results';
    
    constructor(app: App, searchTerm: string) {
        super(app);
        this.setTitle(this.title);
        this.searchTerm = searchTerm;
    }

    private async searchNominatimFreeform(searchTerm: string): Promise<any> {
        const url = "https://nominatim.openstreetmap.org/search?q=" + encodeURIComponent(searchTerm) + "&format=json";

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const results = await response.json();
            return results;
        }
        catch (error) {
            console.warn('failed to get results of search', error);
            return null;
        }
    }

    // Returns all available suggestions.
    async getSuggestions(): Promise<MapLocation[]> {
        let mapLocations: MapLocation[] = await this.searchNominatimFreeform(this.searchTerm) as MapLocation[];
        return mapLocations.filter((mapLocation) =>
            mapLocation.name?.toLowerCase()
        );
    }

    // Renders each suggestion item.
    renderSuggestion(mapLocation: MapLocation, el: HTMLElement) {
        const mapLocationDiv = el.createEl('div', { cls: 'maplocation' });
        mapLocationDiv.createEl('div', {text: ((mapLocation.name != undefined && mapLocation.name?.length > 0) ? mapLocation.name : mapLocation.display_name), cls: 'maplocation__name'});
        mapLocationDiv.createEl('div', {text: mapLocation.display_name, cls: 'maplocation__display_name'});
        mapLocationDiv.createEl('small', {text: mapLocation.type, cls: 'maplocation__type'});
    }

    // Perform action on the selected suggestion.
    onChooseSuggestion(mapLocation: MapLocation, evt: MouseEvent | KeyboardEvent) {
        new Notice(`Selected ${mapLocation.name != undefined && mapLocation.name?.length > 0 ? mapLocation.name : mapLocation.display_name}`);
    }
}