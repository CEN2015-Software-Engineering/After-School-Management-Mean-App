

describe('Add Attendance', function() {
    it('should load the new attendance page', function() {
        browser.get('http://localhost:3000/#!/attendances/create');
        browser.driver.manage().window().setSize(1280, 1024);
        browser.sleep(2000);
        expect(element(by.id('page-title')).getText()).toEqual('New Attendance');
    });

    it('should add a new attendance', function() {

        element(by.name('childID')).sendKeys('5502cb9770feca48148ec769');
        expect(element(by.name('childID')).getAttribute('value')).toEqual('5502cb9770feca48148ec769');
        element(by.name('childName')).sendKeys('Test Child');
        expect(element(by.name('childName')).getAttribute('value')).toEqual('Test Child');
        element(by.name('month')).element(by.cssContainingText('option', 'May')).click();
        expect(element(by.name('month')).getAttribute('value')).toEqual('5');
        element(by.name('day')).element(by.cssContainingText('option', '17')).click();
        expect(element(by.name('day')).getAttribute('value')).toEqual('17');
        element(by.name('year')).element(by.cssContainingText('option', '2015')).click();
        expect(element(by.name('year')).getAttribute('value')).toEqual('2015');
        element(by.name('attended')).click();
        expect(element(by.name('attended')).getAttribute('value')).toEqual('on');
        element(by.name('guardian')).sendKeys('Jack Bauer');
        expect(element(by.name('guardian')).getAttribute('value')).toEqual('Jack Bauer');
        //TODO element(by.name('time'));
        //TODO expect(element(by.name('time')).

        browser.executeScript('window.scrollTo(0,document.body.scrollHeight)').then(function(){
            element(by.name('isAdvent')).click();
            expect(element(by.name('isAdvent')).getAttribute('value')).toEqual('true');
            element(by.name('isClass')).click();
            expect(element(by.name('isClass')).getAttribute('value')).toEqual('false');
            element(by.name('adventID')).sendKeys('12345');
            expect(element(by.name('adventID')).getAttribute('value')).toEqual('12345');
            browser.sleep(1000);
            element(by.name('submit')).click();

        });
    });

    it('should display the correct information', function() {
        expect(element(by.name('childID')).getText()).toEqual('childID: 5502cb9770feca48148ec769');
        expect(element(by.name('childName')).getText()).toEqual('childName: Test Child');
        expect(element(by.name('date')).getText()).toEqual('date: 5/17/2015');
        expect(element(by.name('attended')).getText()).toEqual('attended: True');
        expect(element(by.name('scheduledAbsent')).getText()).toEqual('scheduledAbsent: False');
        expect(element(by.name('signout.time')).getText()).toEqual('Signed out at: No signout time');
        expect(element(by.name('signout.guardian')).getText()).toEqual('Signed out by: Jack Bauer');
        expect(element(by.name('isAdvent')).getText()).toEqual('isAdvent: True');
        expect(element(by.name('adventID')).getText()).toEqual('adventID: 12345');

    });

});
