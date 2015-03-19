describe('Create and Edit child', function() {
    it('navigates to Student Records and clicks add student', function() {
        browser.get('http://localhost:3000/');
        browser.driver.manage().window().setSize(1280, 1024);
        browser.sleep(1000);

        element(by.name('studentRecordsButton')).click();
        element(by.name('addChildButton')).click();
    });

    it('populates and submits create form', function() {

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
        element(by.name('home')).sendKeys('123-456-7890');
        expect(element(by.name('home')).getAttribute('value')).toEqual('123-456-7890');
        element(by.name('work')).sendKeys('098-765-4321');
        expect(element(by.name('work')).getAttribute('value')).toEqual('098-765-4321');
        element(by.name('address')).sendKeys('1234 Cherry Oak Drive, Gainesville Florida');
        expect(element(by.name('address')).getAttribute('value')).toEqual('1234 Cherry Oak Drive, Gainesville Florida');
        element(by.name('schoolName')).sendKeys('Forrest Elementary School');
        expect(element(by.name('schoolName')).getAttribute('value')).toEqual('Forrest Elementary School');
        element(by.name('grade')).sendKeys('6');
        expect(element(by.name('grade')).getAttribute('value')).toEqual('6');
        element(by.name('size')).sendKeys('XXL');
        expect(element(by.name('size')).getAttribute('value')).toEqual('XXL');


        browser.executeScript('window.scrollTo(0,document.body.scrollHeight)').then(function(){
            element(by.model('checkModel.mon')).click();
            element(by.model('checkModel.wed')).click();
            element(by.model('checkModel.fri')).click();
            element(by.name('profileLink')).sendKeys('carpentersata.com');
            expect(element(by.name('profileLink')).getAttribute('value')).toEqual('carpentersata.com');

            browser.sleep(1000);
            element(by.name('submit')).click();
        });

    });

    it('verifies that the information tab contains correct information', function() {
        expect(element(by.name('fullNameField')).getText()).toEqual('Protractor Test\'s Profile');
        expect(element(by.name('birthDateField')).getText()).toEqual('1/27/1988');
        expect(element(by.name('ageField')).getText()).toEqual('27');
        expect(element(by.name('homeNumField')).getText()).toEqual('123-456-7890');
        expect(element(by.name('workNumField')).getText()).toEqual('098-765-4321');
        expect(element(by.name('addressField')).getText()).toEqual('1234 Cherry Oak Drive, Gainesville Florida');
        expect(element(by.name('emailField')).getText()).toEqual('testing@testing.com');
        expect(element(by.name('schoolField')).getText()).toEqual('Forrest Elementary School');
        expect(element(by.name('gradeField')).getText()).toEqual('6');
        expect(element(by.name('sizeField')).getText()).toEqual('XXL');
    });

    it('verifies that the enrollment tab contains correct information', function() {
        element(by.name('enrollmentInfoTab')).click();
        expect(element(by.name('profileButton')).getAttribute('data-ng-href')).toEqual('http://carpentersata.com');
        expect(element(by.name('enrSun')).getAttribute('class')).toEqual('btn btn-day btn-lg custom-date-btn ng-pristine ng-valid');
        expect(element(by.name('enrMon')).getAttribute('class')).toEqual('btn btn-day btn-lg custom-date-btn ng-pristine ng-valid active');
        expect(element(by.name('enrTue')).getAttribute('class')).toEqual('btn btn-day btn-lg custom-date-btn ng-pristine ng-valid');
        expect(element(by.name('enrWed')).getAttribute('class')).toEqual('btn btn-day btn-lg custom-date-btn ng-pristine ng-valid active');
        expect(element(by.name('enrThu')).getAttribute('class')).toEqual('btn btn-day btn-lg custom-date-btn ng-pristine ng-valid');
        expect(element(by.name('enrFri')).getAttribute('class')).toEqual('btn btn-day btn-lg custom-date-btn ng-pristine ng-valid active');
        expect(element(by.name('enrSat')).getAttribute('class')).toEqual('btn btn-day btn-lg custom-date-btn ng-pristine ng-valid');
        expect(element(by.id('isEnrolled')).getAttribute('class')).toEqual('');
        expect(element(by.id('isCanceled')).getAttribute('class')).toEqual('ng-hide');
    });

    it('edits the child', function() {
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

    it('creates a new guardian', function() {
        element(by.name('guardiansInfoTab')).click();
        element(by.name('createGuardianButton')).click();
        
        element(by.name('name')).sendKeys('Susan Test');
        element(by.name('relationship')).element(by.cssContainingText('option', 'Sister')).click();
        element(by.name('confirmButton')).click();

        expect(element(by.name('guardianNameField')).getText()).toEqual('Susan Test');
        expect(element(by.name('guardianRelField')).getText()).toEqual('Sister');

        browser.sleep(1500);
    });
   
    it('edits an existing guardian', function() {

        element(by.name('guardiansInfoTab')).click();
        element(by.name('slideoutTab')).click();
        browser.sleep(500);
        element(by.name('1')).click();
        element(by.name('1')).click();
        element(by.name('1')).click();
        element(by.name('1')).click();
        element(by.name('+')).click();
        browser.sleep(500);
        element(by.name('editGuardianBtn')).click();
        browser.sleep(500);
        element(by.name('updateParentButton')).click();
        element(by.model('guardian.gName')).clear();
        element(by.model('guardian.gName')).sendKeys('House\'s Mom');
        browser.sleep(1000);
        element(by.model('guardian.rel')).element(by.cssContainingText('option', 'Mom')).click();
        element(by.name('confirmButton')).click();

        expect(element(by.name('guardianNameField')).getText()).toEqual('House\'s Mom');
        expect(element(by.name('guardianRelField')).getText()).toEqual('Mom');
        browser.sleep(1000);
    });

    it('deletes the child', function() {
        element(by.name('deleteChildButton')).click();
        //Click the Accept box in the Alert window
        browser.switchTo().alert().accept();
    });
});