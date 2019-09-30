'use strict';

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleTagSelector = '.post-tags a',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector ='.tags.list';

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
    let html = '';
    const articleId = article.getAttribute('id'),
      articleTitle = article.querySelector(optTitleSelector).innerHTML,
      linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      titleList.innerHTML += linkHTML;
  }
  
  const links = document.querySelectorAll('.titles a');
  
  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

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

function generateTagsSidebar(argument) {
  const allTags = {};
  const articles = document.querySelectorAll(optArticleSelector);

  for (let article of articles) {
    const tagsList = article.querySelector(optArticleTagsSelector);
    console.log(tagsList);
    const articleTags = article.getAttribute('data-tags');
    console.log(articleTags);
    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);

    for (let tag of articleTags) {
        if (allTags.hasOwnProperty(tag)) {
            allTags[tag] +=1;
        } else {
          allTags[tag] =1;
        }
    }
     console.log(allTags);
  }
}

function tagClickHandler(event){

  event.preventDefault();
  const clickedElement = event.target,
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

function generateAuthors(){

  const articles = document.querySelectorAll(optArticleSelector);

  for (let article of articles) {
    let html = '';
    const authorList = article.querySelector(optArticleAuthorSelector),
      articleAuthor = article.getAttribute('data-author'),
      linkHTML = '<a href="#author-' + articleAuthor + '"> by ' + articleAuthor + '</a>';
    
    authorList.innerHTML += linkHTML;
  }
}

function authorClickHandler(event){

  event.preventDefault();
  const clickedElement = event.target,
    href = clickedElement.getAttribute('href'),
    author = href.replace('#author-',''),
    activeAuthors = document.querySelectorAll('a.active[href^="#author-"]'),
    authorLinks = document.querySelectorAll('p a[href^="#author-"]');

  for (let activeAuthor of activeAuthors) {
    activeAuthor.classList.remove('active');
  }

  for (let authorLink of authorLinks) {
    authorLink.classList.add('active');
  }

  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors() {

  const authorLinks = document.querySelectorAll(optArticleAuthorSelector);

  for (let authorLink of authorLinks) {
    authorLink.addEventListener('click', authorClickHandler);
  }
}

generateTitleLinks();

generateTags();

generateTagsSidebar();

addClickListenersToTags();

generateAuthors();

addClickListenersToAuthors();