'use strict';

angular.module('li211App.services')
.factory('articleService', function ($http) {
	return {
		getArticle: function(articles_id) {
			return $http({
				method: 'GET',
				url: '/api/articles/' + article_id
			});
		},
		getArticles: function(){
			return $http({
				method: 'GET',
				url: '/api/articles'
			});
		}
	};
});