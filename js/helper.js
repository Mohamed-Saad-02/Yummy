/**
 * @function Remove classes from element
 * @param {Element} element You want to remove class.
 * @param {(...tokens: [string])} classesName Pass classes you want remove as string with space between every class.
 */
export function removeClasses(element, classesName) {
  element.classList.remove(...classesName.split(" "));
}
/**
 * @function Add classes to element
 * @param {Element} element You want to add class.
 * @param {(...tokens: [string])} classesName Pass classes you want add as string with space between every class.
 */
export function addClasses(element, classesName) {
  element.classList.add(...classesName.split(" "));
}

/**
 * @function Toggle Class
 * @param {Element} element
 * @param {string} className
 */
export function classToggle(element, className) {
  element.classList.toggle(className);
}

// export function addEventOnElement(elements, eventType, callback) {
//   for (const elem of elements) elem.addEventListener(eventType, callback);
// }
