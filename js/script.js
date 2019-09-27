'use strict';

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list';

const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this,
    activeLinks = document.querySelectorAll('.titles a.active'),
    activeArticles = document.querySelectorAll('.posts .active'),
    articleSelector = clickedElement.getAttribute('href'),
    targetArticle = document.querySelector(articleSelector);

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  clickedElement.classList.add('active');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  targetArticle.classList.add('active');
};

function generateTitleLinks(customSelector = ''){
  let html ='';
  const titleList = document.querySelector(optTitleListSelector),
    articles = document.querySelectorAll(optArticleSelector + customSelector);

  for (let article of articles) {
    const articleId = article.getAttribute('id'),
      articleTitle = article.querySelector(optTitleSelector).innerHTML,
      linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

    html += linkHTML;
    /* titleList.innerHTML += linkHTML; */
    /* titleList.insertAdjacentHTML('afterbegin',linkHTML); */
  }

  const links = document.querySelectorAll('.titles a');

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

function generateTags(){
  let html ='';
  const articles = document.querySelectorAll(optArticleSelector);
    
  for (let article of articles) {
    const tagsList = article.querySelector(optArticleTagsSelector),
      articleTags = article.getAttribute('data-tags'),
      articleTagsArray = articleTags.split(' ');

    for (let tag of articleTagsArray) {
      const linkHTML = '<li><a href="#' + tag + '">' + tag + '</a></li>';
      html += linkHTML;
    }
  }
}

generateTags();

function tagClickHandler(event){
  event.preventDefault();
  const clickedElement = this,
    href = clickedElement.getAttribute('href'),
    tag = href.replace('#tag-', ''),
    activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
    
  for (let tag of ActiveTags) {
    activetags.classList.remove('active');
  }

  targetTag = document.querySelectorAll(href);

  for (let tag of targetTag) {
    targetTag.classList.add('active');
  }
  
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  /* find all links to tags */

  /* START LOOP: for each link */

    /* add tagClickHandler as event listener for that link */

  /* END LOOP: for each link */
}

addClickListenersToTags();