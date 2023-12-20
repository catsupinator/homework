const recipeTitle = document.getElementById("recipe-title");
const ingredient = document.getElementById("ingredient");
const ingredientButton = document.getElementById("ingredient-button");
const instruction = document.getElementById("instruction");
const instructionButton = document.getElementById("instruction-button");
const reset = document.getElementById("reset-button");
const builder = document.getElementById("builder");
const recipe = {title: "", ingredients: [], instructions: []};
let ingredList = [];
let instructList = [];

recipeTitle.addEventListener("keydown", (e) => {
    if (recipeTitle.value === "Recipe Title" && e.key !== "Tab") {
        recipeTitle.value = "";
    }
})

ingredient.addEventListener("keypress", (e) => {
    if (ingredient.value === "Ingredient") {
        ingredient.value = "";
    }
    if (e.key === "Enter") {
        addElement(ingredient);
    }
})

ingredientButton.addEventListener("click", () => {
    if (ingredient.value !== "Ingredient") {
        addElement(ingredient);
    }
})

instruction.addEventListener("keypress", (e) => {
    if (instruction.value === "Instruction") {
        instruction.value = "";
    }
    if (e.key === "Enter") {
        addElement(instruction);
    }
})

instructionButton.addEventListener("click", () => {
    if (instruction.value !== "Instruction") {
        addElement(instruction);
    }
})

reset.addEventListener("click", () => {
    resetRecipe();
})

reset.addEventListener("keypress", e => {
    if (e.key === "Enter") {
        resetRecipe();
    }
})

builder.addEventListener("click", () => {
    saveRecipe();
})

builder.addEventListener("keypress", e => {
    if (e.key === "Enter") {
        saveRecipe();
    }
})

function addElement(element) {
    const newElement = document.createElement("div");
    newElement.className = `${element.id}-item`;
    newElement.value = element.value;
    newElement.tabIndex = "0";
    newElement.innerHTML = element.value;
    newElement.ariaDescription = "Press space to delete";
    if (newElement.className === "ingredient-item") {
        ingredList.push(element.value);
    } else {
        instructList.push(element.value);
    }
    document.querySelector(`div[class="${element.id}-container"]`).append(newElement);
    element.value = element.id.charAt(0).toUpperCase() + element.id.slice(1);
    newElement.addEventListener("keydown", (e) => {
        if (e.code === "Space") {
            newElement.remove();
            if (newElement.className === "ingredient-item") {
                ingredList.splice(ingredList.indexOf(newElement.value), 1);
            } else {
                instructList.splice(instructList.indexOf(newElement.value), 1);
            }
        }
    })
    newElement.addEventListener("click", () => {
        newElement.remove();
        if (newElement.className === "ingredient-item") {
            ingredList.splice(ingredList.indexOf(newElement.value), 1);
        } else {
            instructList.splice(instructList.indexOf(newElement.value), 1);
        }
    })
}

function resetRecipe() {
    recipeTitle.value = "Recipe Title";
    ingredient.value = "Ingredient";
    instruction.value = "Instruction";
    ingredList = [];
    instructList = [];
    for (div in document.querySelector('div[class="ingredient-container"]') || document.querySelector('div[class="instruction-container"]')) {
        if (div in document.querySelector('div[class="ingredient-container"]')) {
            document.querySelector('div[class="ingredient-item"]').remove();
        }
        if (div in document.querySelector('div[class="instruction-container"]')) {
            document.querySelector('div[class="instruction-item"]').remove();
        }
    }
}

function saveRecipe() {
    recipe.title = `${recipeTitle.value}`;
    recipe.ingredients = ingredList;
    recipe.instructions = instructList;
    console.log(recipe);
    writeRecipeToFile(recipe);
}