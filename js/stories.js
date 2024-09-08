"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}




/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story, isOwn) {
  console.debug("generateStoryMarkup", story);

  
  const starType = story.isFavorite() ? "fas" : "far";
  const hostName = story.getHostName();

  let favoriteButton = "";
  let $deleteButton = ""

  if (currentUser) {
    favoriteButton = `<span class="star"><i class="${starType} fa-star" data-button="fav"></i></span>`
  } 
  
  if (isOwn) {
    $deleteButton = '<span class="delete"><i class="fas fa-trash-alt"></i></span>'
  }
  
  return $(`
      <li class="storyLi" id="${story.storyId}">
      <div class = "actions">
        ${favoriteButton}
        ${$deleteButton}
        </div>
        <div class="storyInfo">
        <div class="top">
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        </div>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
        </div>
      </li>
      <hr>
    `);
}


/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

}



function putFavoritesOnPage() {
  console.debug("putFavoritesOnPage");
  $favoriteStoriesList.empty();


  currentUser.currentFavorites.forEach(story => {
    const $favoriteStory = generateStoryMarkup(story);
    $favoriteStoriesList.append($favoriteStory);
  })

 
  $favoriteStoriesList.show();

}



function putUserStoriesOnPage() {
  console.debug("putUserStoriesOnPage");
  $userStoriesList.empty();
  

  currentUser.ownStories.forEach(story => {
    const $userStory = generateStoryMarkup(story, true)
    $userStoriesList.append($userStory);
  })

  
  
}
 



$addStoryForm.on("submit", async function (event) {
  event.preventDefault();
  const title = $("#new-story-title").val();
  const author = $("#new-story-author").val();
  const url = $("#new-story-url").val();
  const username = currentUser.username

  const newStoryObject = {title, url, author, username}
  let newStory = await storyList.addStory(currentUser, newStoryObject);
  console.log(newStory)

  putUserStoriesOnPage();
  putStoriesOnPage();
  


  $addStoryForm.hide()
  $addStoryForm.trigger('reset')


  
})
 


$allStoriesList.add($favoriteStoriesList).on('click', '.star', async function() {
  const $storyClicked = $(this).parent()
  const $starIcon = $(this).find('> i')
  
  const targetStory = (storyList.stories.find(story => story.storyId === $storyClicked.attr('id')))
  currentUser.toggleFavorite(targetStory)
  if ($starIcon.hasClass('far')) {
    $starIcon.removeClass('far').addClass('fas');
  } else {
    $starIcon.removeClass('fas').addClass('far');
  }
})



$userStoriesList.on('click', '.fa-trash-alt', async function() {
  const $storyClicked = $(this).closest('li')
  const targetStoryId = ($storyClicked.attr('id'));
  console.log( `Removing ${$storyClicked}`);  
  await storyList.removeStory(currentUser, targetStoryId);

  hidePageComponents();
  putUserStoriesOnPage();
})










