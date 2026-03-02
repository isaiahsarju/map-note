import { MapLocation } from "models/MapLocation";

export function replacePlaceHolders(mapLocation: MapLocation, text: string): string{
    //https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-1.html#keyof-and-lookup-types
    function getProperty<MapLocation, K extends keyof MapLocation>(mapLocation: MapLocation, key: K): any{
        return mapLocation[key];
    }

    function lookupReplacement (match: string, mapLocation: MapLocation): string{
        const cleanString = match.replace(/\{|\}/g,'');
        return getProperty(mapLocation, cleanString as keyof MapLocation);
    }
    
    return text.replace(/\{\{.*\}\}/g,(match) => lookupReplacement(match, mapLocation))
}