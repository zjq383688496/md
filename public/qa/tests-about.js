suite('"About" Page Tests', function(){
	test('page should contain link to contact page', function() {
		assert($('a[href="/qa/test-about.js"]').length);
	});
});