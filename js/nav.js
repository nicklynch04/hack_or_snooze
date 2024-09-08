"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
  $addStoryForm.hide()
  $allStoriesList.show();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}


function navAddStoryClick (evt) {
  console.debug("navAddStoryClick", evt);
  $addStoryForm.show();
}

function navFavoritesClick(evt) {
  console.debug("navFavoritesClick", evt);
  hidePageComponents();
  $addStoryForm.hide();
  putFavoritesOnPage();
}

function navUserStoriesClick(evt) {
  console.debug("navUserStoriesClick", evt);
  hidePageComponents();
  putUserStoriesOnPage();
  $addStoryForm.hide();
  $userStoriesList.show();
}

$navLogin.on("click", navLoginClick);
$navAddStory.on("click", navAddStoryClick);
$navFavorites.on("click", navFavoritesClick);
$navUserStories.on("click", navUserStoriesClick)


/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navAddStory.show();
  $navFavorites.show();
  $navUserProfile.text(`${currentUser.username}`).show();
  $navUserStories.show();
}
