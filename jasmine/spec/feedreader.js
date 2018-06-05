/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

$(function () {

    // =======Testing suite of RSS Feeds=====
    describe('RSS Feeds', function () {

        // Ensure all feeds are defined, not empty
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // Ensure all feeds have URL wich are not empty"
        it('should ensure that url of feeds are defined', function () {
            for (const feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe('');
            };
        });

        // Ensure all feeds have names (String), not empty
        it('should ensure that name of feeds are defined', function () {
            for (const feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
            };
        });
    });

    // =====Testing suite of Menu=====
    describe('The menu', function () {

        // Ensure the menu is hidden initially
        it('should ensures the menu element is hidden by default', function () {
            expect(document.body.classList.value).toBe('menu-hidden');
        })

        // Ensure menu icon toggles hide/show on clicking
        it('should ensures the menu changes visibility when the menu icon is clicked.', function () {
            const menuIcon = document.querySelector('.menu-icon-link');
            menuIcon.click();
            expect(document.body.classList.value).toBe('');
            menuIcon.click();
            expect(document.body.classList.value).toBe('menu-hidden');
        });
    });

    // ======Testing suite of Initial Entries=====
    describe('Initial Entries', function () {

        // Avoid duplicated setup
        // Before loading feed
        beforeEach(function (done) {
            loadFeed(2, done);
        });

        // Load "loadFeed" function is called and completes it, and there
        // should at least 1 .entry element in the .feed contianer
        it('should ensures when the loadFeed function is called and completes its work, there is at least a single .entry element within the .feed container.', function () {
            expect(document.querySelectorAll('.feed .entry').length).toBeGreaterThan(0);
        });
    });

    // =====Testing suite of New Feed Selection=====
    describe('New Feed Selection', function () {
        let oldFeed, newFeed;

        // load, feed frist time and get content of that. after that inside that feed call loadFeed() again to change the content again.
        beforeEach(function (done) {
            loadFeed(1, function () {
                oldFeed = document.querySelector('.feed').innerHTML;
                loadFeed(2, done);
            });
        });

        // Ensure when new feed is loaded using loadFeed function,
        // the content changes
        it('should ensure content changes when a new feed is loaded', function () {
            expect(oldFeed).toBeDefined();
            newFeed = document.querySelector('.feed').innerHTML;
            expect(newFeed).toBeDefined();
            expect(oldFeed).not.toBe(newFeed);
        });
    });
}());