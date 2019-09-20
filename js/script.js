'use strict';

const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this,
    activeLinks = document.querySelectorAll('.titles a.active'),
    activeArticles = document.querySelectorAll('.posts .active'),
    articleSelector = clickedElement.getAttribute('href'),
    targetArticle = document.querySelector(articleSelector);

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  clickedElement.classList.add('active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  targetArticle.classList.add('active');
} 

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  titleList = document.querySelector(optTitleListSelector),
  articles = document.querySelectorAll(optArticleSelector);

function generateTitleLinks(){
  let html ='';
    
  for(let article of articles){
    const articleId = article.getAttribute('id');
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    html = html + linkHTML;
      /*  titleList.innerHTML = titleList.innerHTML + linkHTML; */
      /* titleList.insertAdjacentHTML('afterbegin',linkHTML); */
  }

  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();