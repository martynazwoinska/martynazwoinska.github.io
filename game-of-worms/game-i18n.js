const english = Object.freeze({
  sisterSpeciesLabel: "sister species",
  sisterSpeciesAria: "Sister species: {names}",
  meetSpeciesAria: "Meet {name}, {nickname}",
  reproductionMostlySelfing: "mostly selfing",
  reproductionOutcrossing: "outcrossing",
  opensBristolN2: "opens Bristol N2",
  illustratedPairAria: "Illustrated {name} {first} and {second}",
  markerAria: "Meet {name}, {reproduction}, from {place}{source}",
  markerSourceSuffix: ", record from {source}",
  accessoryForWorm: "{accessory} for the {worm}",
  accessoryMoved: "{accessory} moved.",
  accessoryPosition: "{accessory} position: {x} across and {y} down.",
  accessoryReset: "{accessory} position reset.",
  worldGeometryUnavailable: "World geometry unavailable",
  mapUnavailable: "The map is taking a nap. Pick a worm below."
});

const dictionaries = Object.freeze({ en: english });

function interpolate(template, values) {
  return template.replace(/\{([a-zA-Z0-9_]+)\}/g, (placeholder, key) => (
    Object.prototype.hasOwnProperty.call(values, key) ? String(values[key]) : placeholder
  ));
}

export function createGameTranslator(language) {
  const dictionary = dictionaries[language] || english;

  return function translate(key, values = {}, fallback = key) {
    const template = dictionary[key] || english[key] || fallback;
    return interpolate(template, values);
  };
}
