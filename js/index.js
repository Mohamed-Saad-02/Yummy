"use strict";
import { fetchDate, URL } from "./api.js";
import { addClasses, classToggle, removeClasses } from "./helper.js";

/* ---- Aside ---- */
const bars = document.getElementById("bars"),
  aside = document.querySelector("aside");
bars.addEventListener("click", () => classToggle(aside, "active"));

// Fetch Data and display in home page
const recipesContent = document.getElementById("recipesContent");

homePageRecipes();
function homePageRecipes() {
  recipesContent.innerHTML = "";
  recipesContent.className =
    "recipes grid sm:grid-cols-2 md:grid-cols-3 gap-y-5 gap-x-6 lg:grid-cols-4";
  removeClasses(document.getElementById("spinner"), "invisible opacity-0");

  fetchDate(URL.searchByName(""), (data) => {
    mealItem(data, recipesContent);

    hiddenAllSection();
    removeClasses(recipesContent, "hidden");
    addClasses(document.getElementById("spinner"), "invisible opacity-0");
  });
}

// Get Details Of Recipes
function getDetails(idMeal) {
  recipesContent.innerHTML = "";
  recipesContent.className =
    "details flex flex-wrap lg:flex-nowrap gap-y-5 gap-x-6";
  removeClasses(document.getElementById("spinner"), "invisible opacity-0");

  fetchDate(URL.getById(idMeal), (data) => {
    const [
      {
        strYoutube: youtube,
        strTags: tags,
        strSource: source,
        strMealThumb: image,
        strMeal: name,
        strInstructions: instructions,
        strCategory: category,
        strArea: area,
      },
    ] = data.meals;

    recipesContent.innerHTML = `
    <div class="image lg:basis-1/3 basis-full space-y-3 lg:space-y-0 text-white">
    <img
    src="${image}"
    alt="${name}"
    loading="lazy"
    class="rounded-md block lg:w-11/12 lg:max-w-full sm:max-w-96 mx-auto lg:ml-0 lg:mr-auto"
    />
    <h2 class="text-3xl font-semibold">${name}</h2>
    </div>
    <div class="info md:flex-1 space-y-3 text-white">
    <h2 class="text-3xl font-semibold">Instructions</h2>
    <p>${instructions}</p>
    <h3 class="text-[28px] font-bold">
    Area : <span class="font-medium">${area}</span>
    </h3>
    <h3 class="text-[28px] font-bold">
    Category : <span class="font-medium">${category}</span>
    </h3>
    <h3 class="text-[28px] font-semibold">Recipes :</h3>
    <ul
    class="flex items-center gap-4 flex-wrap *:px-2 *:py-1 *:bg-secondColor *:text-textSecondColor *:rounded"
    id="recipesTags"
    ></ul>
    
    <div class="tags space-y-3">
    <h3 class="text-[28px] font-semibold">Tags :</h3>
    <ul
    class="flex items-center gap-4 flex-wrap *:px-2 *:py-1 *:bg-pink *:text-textPink *:rounded md:justify-around lg:justify-start"
    >
    ${
      tags
        ?.split(",")
        .map((el) => `<li>${el}</li>`)
        .join("") ?? ""
    }
            </ul>
            </div>
            
            <ul
            class="flex items-center gap-2 pt-4 md:justify-around lg:justify-start"
            >
            <li>
            <a
            href="${source}"
            target="_blank"
            class="bg-green-600 hover:bg-green-700 transition-colors duration-300 px-3 py-2 rounded"
            >Source</a
            >
            </li>
            <li>
            <a
            href="${youtube}"
            target="_blank"
            class="bg-red-600 hover:bg-red-700 transition-colors duration-300 px-3 py-2 rounded"
            >Youtube</a
            >
            </li>
            </ul>
            </div>
            `;

    for (let i = 1; i <= 20; i++) {
      if (data.meals[0][`strIngredient${i}`] !== "") {
        let li = document.createElement("li");

        li.innerHTML = `${data.meals[0][`strMeasure${i}`]} ${
          data.meals[0][`strIngredient${i}`]
        }`;

        document.getElementById("recipesTags").appendChild(li);
      }
    }

    hiddenAllSection();
    removeClasses(recipesContent, "hidden");
    addClasses(document.getElementById("spinner"), "invisible opacity-0");
  });
}

// Display Meals Items
function mealItem(data, element, length = undefined) {
  for (const [index, meal] of data.meals.entries()) {
    if (index >= length) return;

    const { idMeal: id, strMealThumb: image, strMeal: name } = meal;
    const boxRecipe = document.createElement("div");
    boxRecipe.className = "box overflow-hidden rounded-md relative";
    boxRecipe.id = "recipe";

    boxRecipe.innerHTML = `
      <div class="group cursor-pointer" >
        <img src="${image}" alt="${name}" loading="lazy" class="bg-cover" />
        <div
          class="title absolute top-full bottom-0 group-hover:top-0 left-0 bg-layer h-full w-full p-4 text-3xl font-semibold grid transition-all duration-500"
        >
          <h3 class="my-auto">${name}</h3>
        </div>
      </div>
    `;

    element.appendChild(boxRecipe);
    boxRecipe.addEventListener("click", () => getDetails(id));
  }
}

// Hidden Sections
function hiddenAllSection() {
  document
    .querySelectorAll("section")
    .forEach((sec) => addClasses(sec, "hidden"));
}

const navLink = document.querySelectorAll("nav ul li"),
  searchLi = document.getElementById("search"),
  categoriesLi = document.getElementById("categories"),
  areaLi = document.getElementById("area"),
  ingredientsLi = document.getElementById("ingredients"),
  contactUsLi = document.getElementById("contactUs");

searchLi.addEventListener("click", () => {
  recipesContent.className = "";
  recipesContent.innerHTML = `
    <div class="flex items-center lg:justify-around justify-between lg:flex-row flex-wrap gap-x-8 gap-y-4 lg:w-4/5 lg:mx-auto">
            <input
              type="text"
              class="flex-1 rounded px-3 py-2 outline-none border border-white bg-transparent text-white md:basis-auto basis-full"
              placeholder="Search By Name"
              id="searchName"
            />
            <input
              type="text"
              class="flex-1 rounded px-3 py-2 outline-none border border-white bg-transparent text-white md:basis-auto basis-full"
              placeholder="Search By First Letter"
              id="searchLetter"
            />
    </div>
    <div class="recipes grid sm:grid-cols-2 md:grid-cols-3 gap-y-5 gap-x-6 lg:grid-cols-4 mt-8"></div>
    <div
      class="fixed right-0 bottom-0 w-[94%] h-[90%] flex items-center justify-center z-50 bg-black transition-all duration-500 invisible opacity-0"
      id="spinner"
    >
      <div
        class="w-14 h-14 rounded-full animate-spin border-4 border-dashed border-white border-t-transparent"
      ></div>
    </div>
  `;

  const searchName = document.getElementById("searchName");
  const searchLetter = document.getElementById("searchLetter");
  const recipes = document.querySelector(".recipes");
  const spinner = document.getElementById("spinner");

  searchName.addEventListener("input", function () {
    recipes.innerHTML = "";

    fetchDate(URL.searchByName(this.value), (data) => {
      removeClasses(spinner, "invisible opacity-0");
      mealItem(data, recipes);
      addClasses(spinner, "invisible opacity-0");
    });
  });

  searchLetter.addEventListener("input", function () {
    recipes.innerHTML = "";
    if (this.value.length < 1) return;

    fetchDate(URL.searchByLetter(this.value), (data) => {
      removeClasses(spinner, "invisible opacity-0");
      mealItem(data, recipes);
      addClasses(spinner, "invisible opacity-0");
    });
  });

  searchLetter.addEventListener("keydown", function (e) {
    if (this.value.length >= 1) {
      if (e.key != "Backspace") e.preventDefault();
      else return true;
    }
  });
});

navLink.forEach((li) =>
  li.addEventListener("click", () => removeClasses(aside, "active"))
);

categoriesLi.addEventListener("click", getCategories);
function getCategories() {
  recipesContent.innerHTML = "";
  recipesContent.className =
    "categories grid sm:grid-cols-2 md:grid-cols-3 gap-y-5 gap-x-6 lg:grid-cols-4";
  removeClasses(document.getElementById("spinner"), "invisible opacity-0");

  fetchDate(URL.getCategories, (data) => {
    for (const category of data.categories) {
      const {
        idCategory: id,
        strCategoryThumb: image,
        strCategory: name,
        strCategoryDescription: description,
      } = category;
      const boxRecipe = document.createElement("div");
      boxRecipe.className = "box overflow-hidden rounded-md relative";

      boxRecipe.innerHTML = `
      <div class="group cursor-pointer">
        <img src="${image}" alt="${name}" loading="lazy" class="bg-cover" />
        <div
          class="title absolute top-full bottom-0 group-hover:top-0 left-0 bg-layer h-full w-full p-2 text-center transition-all duration-500 flex items-center justify-center flex-col"
        >
          <h3 class="text-2xl font-semibold">${name}</h3>
          <p title="${description}" class="line-clamp-3">${description}</p>
        </div>
      </div>
    `;

      boxRecipe.firstElementChild.addEventListener("click", () =>
        getMealsList("c", name)
      );

      recipesContent.appendChild(boxRecipe);
    }

    hiddenAllSection();
    removeClasses(recipesContent, "hidden");
    addClasses(document.getElementById("spinner"), "invisible opacity-0");
  });
}

function getMealsList(typeList, value) {
  recipesContent.innerHTML = "";
  recipesContent.className =
    "recipes grid sm:grid-cols-2 md:grid-cols-3 gap-y-5 gap-x-6 lg:grid-cols-4";
  removeClasses(document.getElementById("spinner"), "invisible opacity-0");

  fetchDate(URL.getMealsList(typeList, value), (data) => {
    mealItem(data, recipesContent, 20);

    hiddenAllSection();
    removeClasses(recipesContent, "hidden");
    addClasses(document.getElementById("spinner"), "invisible opacity-0");
  });
}

areaLi.addEventListener("click", getAreaList);

function getAreaList() {
  recipesContent.innerHTML = "";
  recipesContent.className =
    "recipes grid sm:grid-cols-2 md:grid-cols-3 gap-y-5 gap-x-6 lg:grid-cols-4";
  removeClasses(document.getElementById("spinner"), "invisible opacity-0");

  fetchDate(URL.getList("a"), (data) => {
    for (const [index, meal] of data.meals.entries()) {
      const { strArea: name } = meal;

      const boxRecipe = document.createElement("div");

      boxRecipe.innerHTML = displayMealList(
        '<i class="fa-solid fa-house-laptop text-[64px]"></i>',
        name
      );

      recipesContent.appendChild(boxRecipe);
      boxRecipe.addEventListener("click", () => getMealsList("a", name));
    }

    hiddenAllSection();
    removeClasses(recipesContent, "hidden");
    addClasses(document.getElementById("spinner"), "invisible opacity-0");
  });
}

function displayMealList(icon, name, description) {
  return `<div class="cursor-pointer text-center text-white">
        ${icon}
        <div class="title mt-1 font-semibold"
        >
          <h3 class="text-[28px]">${name}</h3>
          ${description ? `<p class="line-clamp-3">${description}</p>` : ""}
        </div>
      </div>`;
}

ingredientsLi.addEventListener("click", getIngredientList);
function getIngredientList() {
  recipesContent.innerHTML = "";
  recipesContent.className =
    "recipes grid sm:grid-cols-2 md:grid-cols-3 gap-y-5 gap-x-6 lg:grid-cols-4";
  removeClasses(document.getElementById("spinner"), "invisible opacity-0");

  fetchDate(URL.getList("i"), (data) => {
    for (const [index, meal] of data.meals.entries()) {
      if (index >= 20) break;

      const { strDescription: description, strIngredient: name } = meal;

      const boxRecipe = document.createElement("div");

      boxRecipe.innerHTML = displayMealList(
        '<i class="fa-solid fa-house-laptop text-[64px]"></i>',
        name,
        description
      );

      recipesContent.appendChild(boxRecipe);
      boxRecipe.addEventListener("click", () => getMealsList("i", name));
    }

    hiddenAllSection();
    removeClasses(recipesContent, "hidden");
    addClasses(document.getElementById("spinner"), "invisible opacity-0");
  });
}

const validation = {
  name: /^[a-zA-Z ]+$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
  age: /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/,
  password: /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/,
};

contactUsLi.addEventListener("click", () => {
  recipesContent.className = "flex items-center justify-center min-h-[90vh]";

  recipesContent.innerHTML = `
  <form class="w-4/5 mx-auto">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
    <div>
      <input
        type="text"
        name="userName"
        placeholder="Enter Your Name"
        class="w-full rounded px-3 py-2 outline-none placeholder:text-[#333   placeholder:opacity-80"
        autocomplete="off"
        id="name"
      />
      <p
        class="bg-red-200 mt-2 p-3 text-center rounded text-red-900 hidden"
      >
        Special characters and numbers not allowed
      </p>
    </div>
    <div>
      <input
        type="email"
        name="userEmail"
        placeholder="Enter Your Email"
        class="w-full rounded px-3 py-2 outline-none placeholder:text-[#333   placeholder:opacity-80"
        autocomplete="off"
        id="email"
      />
      <p
        class="bg-red-200 mt-2 p-3 text-center rounded text-red-900 hidden"
      >
        Email not valid *exemple@yyy.zzz
      </p>
    </div>
    <div>
      <input
        type="number"
        name="userPhone"
        placeholder="Enter Your Phone"
        class="w-full rounded px-3 py-2 outline-none placeholder:text-[#333   placeholder:opacity-80"
        autocomplete="off"
        id="phone"
      />
      <p
        class="bg-red-200 mt-2 p-3 text-center rounded text-red-900 hidden"
      >
        Enter valid Phone Number
      </p>
    </div>
    <div>
      <input
        type="number"
        name="userAge"
        placeholder="Enter Your Age"
        class="w-full rounded px-3 py-2 outline-none placeholder:text-[#333   placeholder:opacity-80"
        autocomplete="off"
        id="age"
      />
      <p
        class="bg-red-200 mt-2 p-3 text-center rounded text-red-900 hidden"
      >
        Enter valid age
      </p>
    </div>
    <div>
      <input
        type="password"
        name="userPassword"
        placeholder="Enter Your Password"
        class="w-full rounded px-3 py-2 outline-none placeholder:text-[#333   placeholder:opacity-80"
        autocomplete="off"
        id="password"
      />
      <p
        class="bg-red-200 mt-2 p-3 text-center rounded text-red-900 hidden"
      >
        Enter valid password *Minimum eight characters, at least one
        letter small, one letter capital , one number and one symbol*
      </p>
    </div>
    <div>
      <input
        type="password"
        name="userRePassword"
        placeholder="RePassword"
        class="w-full rounded px-3 py-2 outline-none placeholder:text-[#333   placeholder:opacity-80"
        autocomplete="off"
        id="rePassword"
      />
      <p
        class="bg-red-200 mt-2 p-3 text-center rounded text-red-900 hidden"
      >
        Password must match
      </p>
    </div>
    </div>
    <div class="text-center pt-4">
      <button class="border hover:bg-red-500 hover:text-white transition-all duration-500 disabled:border-red-800 border-red-500 bg-transparent text-red-500 disabled:bg-transparent disabled:text-red-800 rounded px-3 py-1 mx-auto w-fit" id="submitBtn" disabled>Submit</button>
    </div>
  </form>`;

  const inputs = recipesContent.querySelectorAll("form > div > div > input");

  const userName = document.getElementById("name"),
    userEmail = document.getElementById("email"),
    userPhone = document.getElementById("phone"),
    userAge = document.getElementById("age"),
    userPassword = document.getElementById("password"),
    userRePassword = document.getElementById("rePassword");

  let isValidName;
  let isValidEmail;
  let isValidPhone;
  let isValidAge;
  let isValidPassword;
  let isValidRePassword;

  userName.addEventListener("input", function () {
    isValidName = validate(this, validation[this.id]);
    return isValidName;
  });

  userEmail.addEventListener("input", function () {
    isValidEmail = validate(this, validation[this.id]);
    return isValidEmail;
  });
  userPhone.addEventListener("input", function () {
    isValidPhone = validate(this, validation[this.id]);
    return isValidPhone;
  });
  userAge.addEventListener("input", function () {
    isValidAge = validate(this, validation[this.id]);
    return isValidAge;
  });
  userPassword.addEventListener("input", function () {
    isValidPassword = validate(this, validation[this.id]);
    return isValidPassword;
  });

  userRePassword.addEventListener("input", function () {
    if (this.value === document.getElementById("password").value) {
      addClasses(this.nextElementSibling, "hidden");
      isValidRePassword = true;
    } else {
      removeClasses(this.nextElementSibling, "hidden");
      isValidRePassword = false;
    }
  });

  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      let isValid =
        isValidName &&
        isValidEmail &&
        isValidPhone &&
        isValidAge &&
        isValidPassword &&
        isValidRePassword;
      if (isValid)
        document.getElementById("submitBtn").removeAttribute("disabled");
      else document.getElementById("submitBtn").setAttribute("disabled", "");
    });
  });
});

function validate(element, reg) {
  const value = element.value;
  if (reg.test(value)) {
    addClasses(element.nextElementSibling, "hidden");
    return true;
  } else {
    removeClasses(element.nextElementSibling, "hidden");
    return false;
  }
}
