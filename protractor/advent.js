describe('Calendar Test', function() {
    it('should load the new advent page', function() {
        browser.get('http://localhost:3000/#!/advents/create');
        browser.driver.manage().window().setSize(1280, 1024);
        browser.sleep(1000);
        expect(element(by.id('page-title')).getText()).toEqual('New Advent');
    });

    it('adds a new advent', function() {

        element(by.id('name')).sendKeys('Demo Day');
        expect(element(by.id('name')).getAttribute('value')).toEqual('Demo Day');

        element(by.id('date')).element(by.cssContainingText('option', 'March')).click();
        expect(element(by.id('date')).getAttribute('value')).toEqual('3');
        element(by.id('day')).element(by.cssContainingText('option', '23')).click();
        expect(element(by.id('day')).getAttribute('value')).toEqual('23');
        element(by.id('year')).element(by.cssContainingText('option', '2015')).click();
        expect(element(by.id('year')).getAttribute('value')).toEqual('2015');

        element(by.id('hr')).element(by.cssContainingText('option', '12')).click();
        expect(element(by.id('hr')).getAttribute('value')).toEqual('12');
        element(by.id('min')).element(by.cssContainingText('option', '50')).click();
        expect(element(by.id('min')).getAttribute('value')).toEqual('50');
        element(by.id('timeSuffix')).element(by.cssContainingText('option', 'AM')).click();
        expect(element(by.id('timeSuffix')).getAttribute('value')).toEqual('AM');

        element(by.id('description')).sendKeys('Show off cool app')
        expect(element(by.id('description')).getAttribute('value')).toEqual('Show off cool app');

        browser.sleep(1000);
        element(by.id('submit')).click();
    });

    it('should display the correct information', function() {
        browser.sleep(1000);
        expect(element(by.id('adventName')).getText()).toEqual('Demo Day');
        expect(element(by.id('adventDesc')).getText()).toEqual('Description: Show off cool app');
        expect(element(by.id('adventDate')).getText()).toEqual('Date: 3/23/2015');
        expect(element(by.id('adventTime')).getText()).toEqual('Time: 12:50 AM');
    });

    it('edits the advent', function() {
        element(by.name('updateAdventButton')).click();
        browser.sleep(500);
        element(by.model('advent.time.timeSuffix')).element(by.cssContainingText('option', 'PM')).click();
        element(by.model('advent.editableDescription')).clear();
        element(by.model('advent.editableDescription')).sendKeys('Show off super cool app');
        element(by.id('update')).click();
        browser.sleep(1500);
        expect(element(by.id('adventDesc')).getText()).toEqual('Description: Show off super cool app');
        expect(element(by.id('adventTime')).getText()).toEqual('Time: 12:50 PM');
        browser.sleep(1500);
    });

    it('deletes the advent', function() {
        element(by.name('updateAdventButton')).click();
    });

});