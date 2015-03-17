describe('After School Add Child, Edit Child,', function() {
    it('Navigate to student Records and click add student', function() {
        browser.get('http://localhost:3000/');
        browser.driver.manage().window().setSize(1920, 1080);
        browser.sleep(2000);

        element(by.name('studentRecordsButton')).click();
        element(by.name('addChildButton')).click();

    });

    it('Add Information to Boxes and Submit', function() {

        element(by.name('firstName')).sendKeys('Protractor');
        expect(element(by.name('firstName')).getAttribute('value')).toEqual('Protractor');
        element(by.name('lastName')).sendKeys('Test');
        expect(element(by.name('lastName')).getAttribute('value')).toEqual('Test');
        element(by.name('enrolled')).click();
        expect(element(by.name('enrolled')).getAttribute('value')).toEqual('on');
        element(by.name('month')).element(by.cssContainingText('option', 'January')).click();
        expect(element(by.name('month')).getAttribute('value')).toEqual('1');
        element(by.name('day')).element(by.cssContainingText('option', '27')).click();
        expect(element(by.name('day')).getAttribute('value')).toEqual('27');
        element(by.name('year')).element(by.cssContainingText('option', '1988')).click();
        expect(element(by.name('year')).getAttribute('value')).toEqual('1988');
        element(by.name('email')).sendKeys('testing@testing.com');
        expect(element(by.name('email')).getAttribute('value')).toEqual('testing@testing.com');
        element(by.name('home')).sendKeys('0000000000');
        expect(element(by.name('home')).getAttribute('value')).toEqual('0000000000');
        element(by.name('work')).sendKeys('0000000000');
        expect(element(by.name('work')).getAttribute('value')).toEqual('0000000000');
        element(by.name('address')).sendKeys('1234 Cherry Oak Drive, Gainesville Florida');
        expect(element(by.name('address')).getAttribute('value')).toEqual('1234 Cherry Oak Drive, Gainesville Florida');
        element(by.name('schoolName')).sendKeys('Forrest Elementary School');
        expect(element(by.name('schoolName')).getAttribute('value')).toEqual('Forrest Elementary School');
        element(by.name('size')).sendKeys('XXL');
        expect(element(by.name('size')).getAttribute('value')).toEqual('XXL');
        element(by.model('checkModel.mon')).click();
        expect(element(by.name('checkMon')).isSelected());
        element(by.model('checkModel.checkWed')).click();
        expect(element(by.name('wed')).isSelected());
        element(by.model('checkModel.checkFri')).click();
        expect(element(by.name('fri')).isSelected());

        browser.executeScript('window.scrollTo(0,document.body.scrollHeight)').then(function(){
            browser.sleep(2000);
            element(by.name('submit')).click();

        });

    });

    it('Verify All Fields Contain Correct Information', function() {
        expect(element(by.name('fullNameField')).getText()).toEqual('Protractor Test\'s Profile');
        expect(element(by.name('birthDateField')).getText()).toEqual('1/27/1988');
    });

    it('Edit Child', function() {
        //open modal
        element(by.name('editChildButton')).click();

        //old values
        expect(element(by.name('firstName')).getAttribute('value')).toEqual('Protractor');
        expect(element(by.name('lastName')).getAttribute('value')).toEqual('Test');

        //new values
        element(by.name('firstName')).clear();
        element(by.name('lastName')).clear();
        element(by.name('firstName')).sendKeys('Gregory');
        element(by.name('lastName')).sendKeys('House M.D.');

        //exit modal
        element(by.name('confirmButton')).click();

        expect(element(by.name('fullNameField')).getText()).toEqual('Gregory House M.D.\'s Profile');

    });
    it('Open & Close Guardian Modal, Create new Sister', function() {
        browser.sleep(2000);
        browser.executeScript('window.scrollTo(0,document.body.scrollHeight);').then(function () {
            element(by.name('createGuardianButton')).click();
        });
        element(by.name('name')).sendKeys('Susan Test');

        element(by.name('relationship')).element(by.cssContainingText('option', 'Sister')).click();

        element(by.name('confirmButton')).click();
        browser.executeScript('window.scrollTo(0,document.body.scrollHeight);');

        browser.sleep(2000);

    });

    it('Open Guardian Modal, Edit Sister to Mom', function() {
        browser.executeScript('window.scrollTo(0,document.body.scrollHeight);').then(function () {
            element(by.name('updateParentButton')).click();
        });
        element(by.model('guardian.gName')).clear();
        element(by.model('guardian.gName')).sendKeys('House\'s Mom');

        element(by.model('guardian.rel')).element(by.cssContainingText('option', 'Mom')).click();

        element(by.name('confirmButton')).click();
        browser.executeScript('window.scrollTo(0,document.body.scrollHeight);');

        browser.sleep(2000);

    });


    it('Delete Child', function() {
        element(by.name('deleteChildButton')).click();

        //Click the Accept box in the Alert window
        browser.switchTo().alert().accept();
    });
});


describe('Add Attendance', function() {
    it('should load the new attendance page', function() {
        browser.get('http://localhost:3000/#!/attendances/create');
        browser.driver.manage().window().setSize(1920, 1080);
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
        //element(by.name('time'));
        //expect(element(by.name('time')).

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