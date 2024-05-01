/**
 * @fileoverview
 * Data utils
 * References:
 * - [SO: Saving fetched JSON into variable](https://stackoverflow.com/questions/48474970/saving-fetched-json-into-variable)
 */
export { fetchData };


async function fetchData(resource, options) {
  const response = await fetch(resource, options).catch(error => console.error('Error fetching JSON:', error));
  return response.json();
}
