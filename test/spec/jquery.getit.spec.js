(function ($, QUnit) {
	"use strict";

	var $testCanvas = $("#testCanvas");
	var $fixture = null;

	QUnit.module("jQuery GET-IT", {
		beforeEach: function () {
			// fixture is the element where your jQuery plugin will act
			$fixture = $("<p>Modern medicine has been hugely successful at reducing the impact of disease and increasing life expectancy. In spite of this, too much medical decision making is based on insufficient <cite data-term=\"evidence\" class=\"getit-definition\">evidence</cite>. As a result, doctors and other health professionals have sometimes harmed patients instead of helping them. It is essential that our decisions about what <cite data-term=\"treatment\" class=\"getit-definition\">treatments</cite> to use are based on <cite data-term=\"fair comparison of treatments\" class=\"getit-definition\">fair tests</cite> of their <cite data-term=\"treatment effect\" class=\"getit-definition\">effects</cite>.</p>");

			$testCanvas.append($fixture);
		},
		afterEach: function () {
			// we remove the element to reset our plugin job :)
			$fixture.remove();
		}
	});

	QUnit.test("is inside jQuery library", function ( assert ) {
		assert.equal(typeof $.fn.getit, "function", "has function inside jquery.fn");
		assert.equal(typeof $fixture.getit, "function", "another way to test it");
	});

	QUnit.test("returns jQuery functions after called (chaining)", function ( assert ) {
		assert.equal(typeof $fixture.getit().on, "function", "'on' function must exist after plugin call");
	});

	QUnit.test("caches plugin instance", function ( assert ) {
		$fixture.getit();
		assert.ok($fixture.data("plugin_getit"), "has cached it into a jQuery data");
	});

	QUnit.test("enable custom config", function ( assert ) {
		$fixture.getit({
		    glossary: "Test >>> Glossary Name",
		    title: "Test >>> title",
		    linkTitle: "Test >>> linkTitle",
            hideNotFound: false,
            notFound: "Test >>> notFound",
            titleNotFound: "Test >>> titleNotFound",
		});

		var pluginData = $fixture.data("plugin_getit");

		assert.deepEqual(pluginData.options, {
		    glossary: "Test >>> Glossary Name",
		    title: "Test >>> title",
		    linkTitle: "Test >>> linkTitle",
            hideNotFound: false,
            notFound: "Test >>> notFound",
            titleNotFound: "Test >>> titleNotFound",
		}, "extend plugin options");

	});


}(jQuery, QUnit));
