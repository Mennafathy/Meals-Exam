let rowData = document.getElementById("rowData");
let contactsContainer = document.getElementById("contactsContainer");
let searchData = document.getElementById("searchData");
let contactForm = document.getElementById("contactForm");

// search by empty name
$(document).ready(function () {
  searchByName("");
});
// sideBar Open&close
function openNav() {
  $(".sideNav").animate({ left: 0 }, 500);
  //   document.querySelector(".open-btn").style.display = "none";
  //   document.querySelector(".close-btn").style.display = "block";
  //   $(".close-btn").click(function()
  //   {
  //     closeNav()
  //   })
  $(".open-btn").removeClass("fa-align-justify").addClass("fa-x");
  for (let i = 0; i < 5; i++) {
    $(".links ul li")
      .eq(i)
      .animate({ top: 0 }, (i + 5) * 100);
  }
}
// openNav();

function closeNav() {
  let width = $(".sideNav .sideNavContent").outerWidth(true);
  //   console.log(width);//332.438
  $(".sideNav").animate({ left: -width }, 500);
  //   document.querySelector(".open-btn").style.display = "block";
  //   document.querySelector(".close-btn").style.display = "none";
  $(".open-btn").removeClass("fa-x").addClass("fa-align-justify");

  //   links animation
  $(".links ul li").animate({ top: "100px" }, 500);
}
closeNav();
function OpenCloseNav() {
  $(".sideNav .open-btn").click(function () {
    if ($(".sideNav").css("left") == `0px`) {
      closeNav();
    } else {
      openNav();
    }
  });
}
OpenCloseNav();
//display Meals
function displayMeals(arr) {
  let temp = "";
  for (let i = 0; i < arr.length; i++) {
    temp += ` <div class="col-md-3">
        <div class="item rounded rounded-2" onclick="getMealsDetails('${arr[i].idMeal}')">
          <img
            src="${arr[i].strMealThumb}"
            class="w-100"
            alt=""
            srcset=""
          />
          <div class="layer d-flex align-items-center">
            <h2 class="text-black p-2">${arr[i].strMeal}</h2>
          </div>
        </div>
      </div>`;
  }
  rowData.innerHTML = temp;
  $("#searchRow").html(temp)
}
// displayMeals()
// search

async function searchByName(value) {
    rowData.innerHTML=""
  $(".spinner").removeClass("d-none").addClass("d-block");
  $(".spinner").fadeIn(500).fadeOut();
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`
  );
  let data = await response.json();
  console.log(data.meals);
  if (data.meals == "") {
    displayMeals([]);
  } else {
    displayMeals(data.meals);
    console.log("he");
  }

  $(".spinner").removeClass("d-block").addClass("d-none");
}
// searchByName()
async function searchByFirstLetter(value) {
    rowData.innerHTML=""
  $(".spinner").removeClass("d-none").addClass("d-block");
  $(".spinner").fadeIn(500);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${value}`
  );
  let data = await response.json();
  console.log(data.meals);
  if (data.meals == "") {
    displayMeals([]);
  } else {
    displayMeals(data.meals);
  }

 
  $(".spinner").removeClass("d-block").addClass("d-none");
}
function displaySearch() {
  $("#search").removeClass("d-none").addClass("d-flex");

  let temp = "";
  temp += ` 
  <div class="col-md-5">
    <input
      type="text"
      class="form-control text-white"
      placeholder="Search by name "  onkeyup="searchByName(this.value)"
    />
  </div>
  <div class="col-md-5">
    <input
      type="text"
      class="form-control text-white"
      placeholder="Search by first letter " onkeyup="searchByFirstLetter(this.value)" maxlength=1
    />
  </div>
  <div class="row gy-4" id="searchRow">
  </div>
`;
  rowData.innerHTML = temp;
  rowData.innerHTML = "";
  // $("#search").removeClass("d-block").addClass("d-none")
}

//get categories
async function getCategories() {
  $(".spinner").removeClass("d-none").addClass("d-block");
  $(".spinner").fadeIn(500).fadeOut();

  let response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );
  let data = await response.json();
  console.log(data.categories);
  displayCategories(data.categories);

 
  $(".spinner").removeClass("d-block").addClass("d-none");
}

// getCategories()
function displayCategories(arr) {
  searchData.innerHTML = "";
  let temp = "";
  for (let i = 0; i < arr.length; i++) {
    temp += ` <div class="col-md-3">
        <div onclick="getMealsCategory('${
          arr[i].strCategory
        }')" class="item rounded rounded-2">
          <img
            src="${arr[i].strCategoryThumb}"
            class="w-100"
            alt=""
            srcset=""
          />
          <div class="layer text-center text-black">
            <h2>${arr[i].strCategory}</h2>
            <p>${arr[i].strCategoryDescription
              .split(" ")
              .slice(0, 20)
              .join(" ")}</p>
          </div>
        </div>
      </div>`;
  }
  rowData.innerHTML = temp;
}
//get category Meals
async function getMealsCategory(category) {
  $(".spinner").removeClass("d-none").addClass("d-block");
  $(".spinner").fadeIn(200);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  let data = await response.json();
  console.log(data.meals);
  displayMeals(data.meals.slice(0, 20));
  
  $(".spinner").removeClass("d-block").addClass("d-none");
}
// getMealsCategory()
//get Area
async function getArea() {
  $(".spinner").removeClass("d-none").addClass("d-block");
  $(".spinner").fadeIn(500).fadeOut();
  let response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
  );
  let data = await response.json();
  // console.log(data.meals);
  displayArea(data.meals);
 
  $(".spinner").removeClass("d-block").addClass("d-none");
}
// getArea()
function displayArea(arr) {
  let temp = "";
  for (let i = 0; i < arr.length; i++) {
    temp += ` <div class="col-md-3">
        <div onclick="getMealsArea('${arr[i].strArea}')" class="item rounded rounded-2 text-center">
          <i class="fa-solid fa-house-laptop fa-4x"></i>
          <h3>${arr[i].strArea}</h3>
        </div>
      </div>`;
  }
  rowData.innerHTML = temp;
}
// get area meals
async function getMealsArea(area) {
  $(".spinner").removeClass("d-none").addClass("d-block");
  $(".spinner").fadeIn(200).fadeOut();
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  let data = await response.json();
  console.log(data.meals);
  displayMeals(data.meals.slice(0, 20));
  $(".spinner").removeClass("d-block").addClass("d-none");
}
//get ingredients
async function getIngredients() {
  rowData.innerHTML = "";
  $(".spinner").removeClass("d-none").addClass("d-block");
  $(".spinner").fadeIn(500).fadeOut();
  let response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
  );
  let data = await response.json();
  console.log(data.meals);
  displayIngredients(data.meals.slice(0, 20));

  $(".spinner").removeClass("d-block").addClass("d-none");
}
// getIngredients()
function displayIngredients(arr) {
  searchData.innerHTML = "";
  let temp = "";
  for (let i = 0; i < arr.length; i++) {
    temp += ` <div class="col-md-3">
        <div onclick="getIngredientsMeals('${
          arr[i].strIngredient
        }')" class="item rounded rounded-2 text-center">
          <i class="fa-solid fa-drumstick-bite fa-4x"></i>
          <h3>${arr[i].strIngredient}</h3>
          <p>${arr[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
        </div>
      </div>`;
  }
  rowData.innerHTML = temp;
}
//get ingredients meals
async function getIngredientsMeals(ingredient) {
  $(".spinner").removeClass("d-none").addClass("d-block");
  $(".spinner").fadeIn(200).fadeOut();
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
  );
  let data = await response.json();
  console.log(data.meals);
  displayMeals(data.meals.slice(0, 20));
  
  $(".spinner").removeClass("d-block").addClass("d-none");
}

// get Details
async function getMealsDetails(id) {
  //   rowData.innerHTML = "";
  $(".spinner").removeClass("d-none").addClass("d-block");
  $(".spinner").fadeIn(200).fadeOut();
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  let data = await response.json();
  // console.log("mealss",data.meals[0]);
  displayDetails(data.meals[0]);
  
  $(".spinner").removeClass("d-block").addClass("d-none");
}
function displayDetails(mealDetails) {
  searchData.innerHTML = "";
  let ingredients = "";
  for (let i = 0; i <= 20; i++) {
    if (mealDetails[`strIngredient${i}`]) {
      ingredients += `<li class="alert alert-info p-1 mt-2 me-3">${
        mealDetails[`strMeasure${i}`]
      } ${mealDetails[`strIngredient${i}`]}</li>`;
    }
  }
  let tags = mealDetails.strTags?.split(",");
  if (!tags) {
    tags = [];
  }
  // let tags="";
  // if(tags==mealDetails.strTags)
  // {
  //     tags.split(",")
  // }
  // else
  // {
  //     tags=[]
  // }
  let tagsData = "";
  for (let i = 0; i < tags.length; i++) {
    tagsData += `<li class="alert alert-danger p-1 mt-2 me-3">${tags[i]}</li>`;
  }

  let temp = "";
  temp += `  <div class="col-md-4 text-white text-capitalize">
        <img
          src="${mealDetails.strMealThumb}"
          class="w-100 rounded rounded-2"
          alt=""
          srcset=""
        />
        <h2>${mealDetails.strMeal}</h2>
      </div>
      <div class="col-md-8 text-white text-capitalize">
        <h2>instructions</h2>
        <p>
          ${mealDetails.strInstructions}
        </p>
        <h3>Area: ${mealDetails.strArea}</h3>
        <h3>Category: ${mealDetails.strCategory}</h3>
        <h3>Recipes: </h3>
        <ul class="recipe d-flex flex-wrap list-unstyled">
          ${ingredients}
        </ul>
        <h3 class="mb-4">tags: </h3>
        <ul class="list-unstyled d-flex flex-wrap">
          ${tagsData}
        </ul>
       <a target="_blank" href="${mealDetails.strSource}"> <button class="btn btn-success">Source</button></a>
       <a target="_blank" href="${mealDetails.strYoutube}"> <button class="btn btn-danger">Youtube</button></a>
      </div>
    </div>`;
  rowData.innerHTML = temp;
}

//contacts &validation

function displayContacts() {
  searchData.innerHTML = "";
  console.log("hello");
  // $("#contacts").removeClass("d-none").addClass("d-block")

  let temp = ``;
  temp += ` <div class="contact d-flex justify-content-center align-items-center vh-100 konafa" id="contactsData">
  <div class="container w-75 text-center" id="contactsContainer">
    <div class="row text-capitalize" id="rowData">
      <div class="col-md-6">
        <input
          type="text"
          name=""
          class="form-control mb-4 text-white"
          placeholder="Enter Your name" onkeyup="validateInput()"
          id="nameInp"
        />
        <div class="alert alert-danger w-100 mt-2  nameAlert d-none">
      <p>Special characters and numbers not allowed</p>
    </div>
      </div>
      <div class="col-md-6">
        <input
          type="email"
          name=""
          class="form-control mb-4 text-white"
          placeholder="Enter Your Email" onkeyup="validateInput()"
          id="emailInp"
        />
        <div class="alert alert-danger w-100 mt-2  emailAlert d-none">
      <p class="text-lowercase">Email not valid *example@yyy.zzz</p>
    </div>
      </div>
      <div class="col-md-6">
        <input
          type="number"
          name=""
          class="form-control mb-4 text-white"
          placeholder="Enter Your phone" onkeyup="validateInput()"
          id="phoneInp"
        />
        <div class="alert alert-danger w-100 mt-2  phoneAlert d-none">
      <p>Enter valid Phone Number</p>
    </div>
      </div>
      <div class="col-md-6">
        <input
          type="number"
          name=""
          class="form-control mb-4 text-white"
          placeholder="Enter Your age" onkeyup="validateInput()"
          id="ageInp"
        />
        <div class="alert alert-danger w-100 mt-2  ageAlert d-none">
      <p>Enter valid age</p>
    </div>
      </div>
      <div class="col-md-6">
        <input
          type="password"
          name=""
          class="form-control mb-4 text-white"
          placeholder="Enter Your password" onkeyup="validateInput()"
          id="passInp"
        />
        <div class="alert alert-danger w-100 mt-2  passAlert d-none">
      <p>Enter valid password *Minimum eight characters, at least one letter and one number:*</p>
    </div>
      </div>

      <div class="col-md-6">
        <input
          type="password"
          name=""
          class="form-control mb-4 text-white"
          placeholder="Enter Your repassword" 
          id="repassInp"
        />
        <div class="alert alert-danger w-100 mt-2  repassAlert d-none">
      <p>Enter valid repassword</p>
    </div>
      </div>
    </div>
    <button id="submitBtn" disabled="" class="btn btn-outline-danger mt-3">
      Submit
    </button>
  </div>
</div>`;
  rowData.innerHTML = temp;
  // document.getElementById("searchData").innerHTML=""
  $("#nameInp").focus(function () {
    nameTouched = true;
  });
  $("#emailInp").focus(function () {
    emailTouched = true;
  });
  $("#phoneInp").focus(function () {
    phoneTouched = true;
  });
  $("#ageInp").focus(function () {
    ageTouched = true;
  });
  $("#ageInp").focus(function () {
    ageTouched = true;
  });
  $("#passInp").focus(function () {
    passTouched = true;
  });
  $("#repassInp").focus(function () {
    repassTouched = true;
  });
}
function nameValidation() {
  let regexName = /^[A-Za-z ]+$/;
  let nameInp = document.getElementById("nameInp").value;
  return regexName.test(nameInp);
}
function emailValidation() {
  let regexEmail = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
  let emailInp = document.getElementById("emailInp").value;
  return regexEmail.test(emailInp);
}
function phoneValidation() {
  let regexPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  let phoneInp = document.getElementById("phoneInp").value;
  return regexPhone.test(phoneInp);
}
function ageValidation() {
  let regexAge = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/;
  let ageInp = document.getElementById("ageInp").value;
  return regexAge.test(ageInp);
}
function passValidation() {
  let regexPass = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/;
  let passInp = document.getElementById("passInp").value;
  return regexPass.test(passInp);
}
function repassValidation() {
  let passInp = document.getElementById("passInp").value;
  let repassInp = document.getElementById("repassInp").value;
  return passInp == repassInp;
}
let nameTouched = false;
let emailTouched = false;
let phoneTouched = false;
let ageTouched = false;
let passTouched = false;
let repassTouched = false;

function validateInput() {
  if (nameTouched) {
    if (nameValidation()) {
      $(".nameAlert").removeClass("d-block").addClass("d-none");
    } else {
      $(".nameAlert").removeClass("d-none").addClass("d-block");
    }
  }
  if (emailTouched) {
    if (emailValidation()) {
      $(".emailAlert").removeClass("d-block").addClass("d-none");
    } else {
      $(".emailAlert").removeClass("d-none").addClass("d-block");
    }
  }
  if (phoneTouched) {
    if (phoneValidation()) {
      $(".phoneAlert").removeClass("d-block").addClass("d-none");
    } else {
      $(".phoneAlert").removeClass("d-none").addClass("d-block");
    }
  }
  if (ageTouched) {
    if (ageValidation()) {
      $(".ageAlert").removeClass("d-block").addClass("d-none");
    } else {
      $(".ageAlert").removeClass("d-none").addClass("d-block");
    }
  }
  if (passTouched) {
    if (passValidation()) {
      $(".passAlert").removeClass("d-block").addClass("d-none");
    } else {
      $(".passAlert").removeClass("d-none").addClass("d-block");
    }
  }
  if (repassTouched) {
    if (repassValidation()) {
      $(".repassAlert").removeClass("d-block").addClass("d-none");
    } else {
      $(".repassAlert").removeClass("d-none").addClass("d-block");
    }
  }
  let btn = document.getElementById("submitBtn");

  if (
    nameValidation() &&
    emailValidation() &&
    ageValidation() &&
    phoneValidation() &&
    passValidation() &&
    repassValidation()
  ) {
    btn.removeAttribute("disabled");
  } else {
    btn.setAttribute("disabled", true);
  }
}
