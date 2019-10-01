'use strict';

const opts = {
  tagSizes: {
    count: 5,
    classPrefix: 'tag-size-',
  },
};

const select = {
  all: {
    article: '.post',
    linksTo: {
      tags: 'a[href^="#tag-"]',
      authors: 'a[href^="#author-"]',
    },
  },
  article: {
    title: '.post-title',
    tags: '.post-tags .list',
    tagsLink: '.post-tags a',
    author: '.post-author',
  },
  listOf: {
    titles: '.titles',
    tags: '.tags.list',
    tagsLink: '.tags.list a',
    authors: '.authors.list',
  },
};

const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = event.target,
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

function generateTitleLinks(customSelector = '') {
  const titleList = document.querySelector(select.listOf.titles),
    articles = document.querySelectorAll(select.all.article + customSelector);
  
  titleList.innerHTML = '';

  for (let article of articles) {
    const articleId = article.getAttribute('id'),
      articleTitle = article.querySelector(select.article.title).innerHTML,
      linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    
    titleList.innerHTML += linkHTML;
  }
  const links = document.querySelectorAll('.titles a');
  
  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

function generateTags(){
  const articles = document.querySelectorAll(select.all.article);
    
  for (let article of articles) {
    const tagsList = article.querySelector(select.article.tags),
      articleTags = article.getAttribute('data-tags'),
      articleTagsArray = articleTags.split(' ');

    for (let tag of articleTagsArray) {
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      tagsList.innerHTML += linkHTML;
    }
  }
}

function calculateTagsParams(tags) {
  const params = {
    max : 0,
    min: 999999
  };
  for(let tag in tags)  {
    params.max = Math.max(tags[tag], params.max);
    params.min = Math.min(tags[tag], params.min);
  }
  return params;
}

function calculateTagClass(count, params) {
  const normalizedCount = count - params.min,
    normalizedMax = params.max - params.min,
    percentage = normalizedCount / normalizedMax,
    classNumber = Math.floor( percentage * (opts.tagSizes.count - 1) + 1 );

  return opts.tagSizes.classPrefix + classNumber;
}

function generateTagsSidebar() {
  const allTags = [];
  const articles = document.querySelectorAll(select.all.article);

  for (let article of articles) {
    const articleTags = article.getAttribute('data-tags');
    const articleTagsArray = articleTags.split(' ');
    const tagsList = document.querySelector(select.listOf.tags);

    for (let tag of articleTagsArray) {
      if (allTags.hasOwnProperty(tag)) {
        allTags[tag] += 1;
      } else {
        allTags[tag] = 1;
      }
    }

    const tagsParams = calculateTagsParams(allTags);

    tagsList.innerHTML = '';
    for (let tag in allTags) {
      const linkHTML = '<li><a class="' + calculateTagClass(allTags[tag],tagsParams) + '"href="#tag-' + tag + '" >' + tag + '</a></li>';
      tagsList.innerHTML += linkHTML;
    }
  }
}

function tagClickHandler(event) {

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

function addClickListenersToTags()  {

  const tagLinks = document.querySelectorAll(select.article.tagsLink + ', ' + select.article.tags + ', ' + select.listOf.tagsLink);
  for (let tag of tagLinks) {
    tag.addEventListener('click', tagClickHandler);
  }
}

function generateAuthors(){

  const articles = document.querySelectorAll(select.all.article);

  for (let article of articles) {

    const authorList = article.querySelector(select.article.author),
      articleAuthor = article.getAttribute('data-author'),
      linkHTML = '<a href="#author-' + articleAuthor + '"> by ' + articleAuthor + '</a>';

    authorList.innerHTML += linkHTML;
  }
}

function generateAuthorsSidebar() {
  const allTags = [];
  const articles = document.querySelectorAll(select.all.article);

  for (let article of articles) {
    const articleAuthor = article.getAttribute('data-author');
    const articleAuthorArray = articleAuthor.split(' ');
    const authorList = document.querySelector(select.listOf.authors);

    for (let author of articleAuthorArray) {
      if (allTags.hasOwnProperty(author)) {
        allTags[author] += 1;
      } else {
        allTags[author] = 1;
      }
    }

    authorList.innerHTML = '';

    for (let articleAuthor in allTags) {
      const linkHTML = '<li><a href="#author-' + articleAuthor + '">' + articleAuthor + ' (' + allTags[articleAuthor] +') </a></li>';
      authorList.innerHTML += linkHTML;
    }
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

function authorClickHandlerSidebar(event){

  event.preventDefault();
  const clickedElement = event.target,
    href = clickedElement.getAttribute('href'),
    author = href.replace('#author-',''),
    activeAuthors = document.querySelectorAll('a.active[href^="#author-"]'),
    authorLinks = document.querySelectorAll('.authors a[href^="#author-' + author + '"]');


  for (let activeAuthor of activeAuthors) {
    activeAuthor.classList.remove('active');
  }

  for (let authorLink of authorLinks) {
    authorLink.classList.add('active');
  }

  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors() {

  const authorLinks = document.querySelectorAll(select.article.author);

  for (let authorLink of authorLinks) {
    authorLink.addEventListener('click', authorClickHandler);
  }
}

function addClickListenersToAuthorsSidebar() {

  const authorLinks = document.querySelectorAll(select.listOf.authors);

  for (let authorLink of authorLinks) {
    authorLink.addEventListener('click', authorClickHandlerSidebar);
  }
}

generateTitleLinks();

generateTags();

generateAuthors();

calculateTagsParams();

generateTagsSidebar();

generateAuthorsSidebar();

addClickListenersToTags();

addClickListenersToAuthors();

addClickListenersToAuthorsSidebar();