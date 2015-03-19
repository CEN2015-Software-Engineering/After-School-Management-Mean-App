describe('Calendar Test', function() {
    it('should load the new advent page', function() {
        browser.get('http://localhost:3000/#!/calendar');
        browser.driver.manage().window().setSize(1280, 1024);
        browser.sleep(1000);
        expect(element(by.id('page-title')).getText()).toEqual('Calendar Demo');
    });

    it('tests the today button', function() {
        element(by.name('next')).click();
        element(by.name('next')).click();
        element(by.name('today')).click();
        browser.sleep(3000);
    });
});