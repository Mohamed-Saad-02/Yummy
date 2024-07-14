"use strict";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1/";

/**
 *
 * @param {string} url URL you want Fetch
 * @param {Function} callback Your Callback
 */
export async function fetchDate(url, callback) {
  const response = await fetch(url);
  const data = await response.json();

  callback(data);
}

export const URL = {
  /**
   * @param {string} filed Pass a name FILED
   * @returns URL
   */
  searchByName: (filed) => `${BASE_URL}search.php?s=${filed}`,
  /**
   * @param {string} letter Pass a letter FILED
   * @returns URL
   */
  searchByLetter: (letter) => `${BASE_URL}search.php?f=${letter}`,
  /**
   * @param {string} id Pass a id FILED
   * @returns URL
   */
  getById: (id) => `${BASE_URL}lookup.php?i=${id}`,
  getCategories: `${BASE_URL}categories.php`,
  getList: (typeList) => `${BASE_URL}list.php?${typeList}=list`,

  getMealsList: (typeList, value) =>
    `${BASE_URL}filter.php?${typeList}=${value}`,

  getFilterBy: (typeList, value) =>
    `${BASE_URL}filter.php?${typeList}=${value}`,
};
