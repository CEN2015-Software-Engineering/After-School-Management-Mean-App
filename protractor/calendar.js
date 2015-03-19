describe('Calendar Test', function() {
    it('should load the new advent page', function() {
        browser.get('http://localhost:3000/#!/calendar');
        browser.driver.manage().window().setSize(1280, 1024);
        browser.sleep(1000);
        expect(element(by.id('page-title')).getText()).toEqual('Calendar Demo');
    });

    it('tests the today button', function() {
        element(by.name('next')).click();
        browser.sleep(500);
        element(by.name('next')).click();
        browser.sleep(500);
        element(by.name('today')).click();
        browser.sleep(1000);
    });

    it('selects a day with an event', function() {
        element.all(by.name('testing')).get(22).click();
        browser.sleep(500);
        element(by.binding('name')).click();
        browser.sleep(500);
        element(by.name('close')).click();
        browser.sleep(500);
    });
});