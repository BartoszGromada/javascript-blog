'use strict';

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleTagSelector = '.post-tags a',
  optArticleAuthorSelector = '.post-author';

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
  const titleList = document.querySelector(optTitleListSelector),
    articles = document.querySelectorAll(optArticleSelector + customSelector);
    
    titleList.innerHTML = "";
  for (let article of articles) {
    let html ='';
    const articleId = article.getAttribute('id'),
      articleTitle = article.querySelector(optTitleSelector).innerHTML,
      linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      /* html += linkHTML; */
      titleList.innerHTML += linkHTML;
      /* titleList.insertAdjacentHTML('afterBegin',linkHTML); */
  }
  
  const links = document.querySelectorAll('.titles a');
  
  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

function generateTags(){

  const articles = document.querySelectorAll(optArticleSelector);
    
  for (let article of articles) {
    let html ='';
    const tagsList = article.querySelector(optArticleTagsSelector),
      articleTags = article.getAttribute('data-tags'),
      articleTagsArray = articleTags.split(' ');

    for (let tag of articleTagsArray) {
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      tagsList.innerHTML += linkHTML;
    }

  }
}

generateTags();

function tagClickHandler(event){

  event.preventDefault();
  const clickedElement = this,
    href = clickedElement.getAttribute('href'),
    tag = href.replace('#tag-',''),
    activeTags = document.querySelectorAll('a.active[href^="#tag-"]'),
    tagLinks = document.querySelectorAll('a[href^="#tag-' + tag + '"]');

  for (let activeTag of activeTags) {
    activeTag.classList.remove('active');
  }
  
  for (let tagLink of tagLinks) {
    tagLink.classList.add('active');
  }

  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){

  const tagLinks = document.querySelectorAll(optArticleTagSelector, optArticleTagsSelector);

   for (let tag of tagLinks) {
    tag.addEventListener('click', tagClickHandler);
  }
}

addClickListenersToTags();

function generateAuthors(){

  const articles = document.querySelectorAll(optArticleSelector);

  for (let article of articles) {
    let html ='';
    const authorList = article.querySelector(optArticleAuthorSelector),
      articleAuthor = article.getAttribute('data-author'),
      linkHTML = '<a href="#author-' + articleAuthor + '"> by ' + articleAuthor + '</a>';
    
    authorList.innerHTML += linkHTML;
  }
}

generateAuthors();

function authorClickHandler(event){

  event.preventDefault();
  const clickedElement = event.target;
    const href = clickedElement.getAttribute('href');
    const author = href.replace('#author-','');
    const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');
    const authorLinks = document.querySelectorAll('p a[href^="#author-"]');

  for (let activeAuthor of activeAuthors) {
    activeAuthor.classList.remove('active');
  }

  for (let authorLink of authorLinks) {
    authorLink.classList.add('active');
  }

  generateTitleLinks('[data-author="' + author + '"]');
  console.log('[data-author="#author-' + author + '"]');
}

function addClickListenersToAuthors() {

  const authorLinks = document.querySelectorAll(optArticleAuthorSelector);

  for (let authorLink of authorLinks) {
    authorLink.addEventListener('click', authorClickHandler);
  }
}

addClickListenersToAuthors();