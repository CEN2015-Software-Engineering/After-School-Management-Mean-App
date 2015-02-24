/**
 * Created by Joshua on 2/18/2015.
 */
describe('After School Add Child, Edit Child,', function() {
    it('Navigate to student Records and click add student', function() {
        browser.get('http://localhost:3000/');
        browser.driver.manage().window().setSize(1280, 1024);
        browser.sleep(2000);

        element(by.name('studentRecordsButton')).click();
        element(by.name('addChildButton')).click();

    });

    it('Add Information to Boxes and Submit', function() {

        element(by.name('firstName')).sendKeys('Protractor');
        element(by.name('lastName')).sendKeys('Test');
        element(by.name('enrolled')).click();
        element(by.name('month')).element(by.cssContainingText('option', 'January')).click();
        element(by.name('day')).element(by.cssContainingText('option', '7')).click();
        element(by.name('year')).element(by.cssContainingText('option', '1988')).click();
        element(by.name('email')).sendKeys('testing@testing.com');
        element(by.name('home')).sendKeys('0000000000');
        element(by.name('work')).sendKeys('0000000000');
        element(by.name('address')).sendKeys('1234 Cherry Oak Drive, Gainesville Florida');
        element(by.name('schoolName')).sendKeys('Forrest Elementary School');
        element(by.name('size')).sendKeys('XXL');

        element(by.model('checkModel.mon')).click();
        element(by.model('checkModel.wed')).click();
        element(by.model('checkModel.fri')).click();


        expect(element(by.name('firstName')).getAttribute('value')).toEqual('Protractor');
        expect(element(by.name('lastName')).getAttribute('value')).toEqual('Test');
        expect(element(by.name('enrolled')).getAttribute('value')).toEqual('on');
        expect(element(by.name('month')).getAttribute('value')).toEqual('1');
        expect(element(by.name('day')).getAttribute('value')).toEqual('7');
        expect(element(by.name('year')).getAttribute('value')).toEqual('1988');
        expect(element(by.name('email')).getAttribute('value')).toEqual('testing@testing.com');
        expect(element(by.name('home')).getAttribute('value')).toEqual('0000000000');
        expect(element(by.name('work')).getAttribute('value')).toEqual('0000000000');
        expect(element(by.name('address')).getAttribute('value')).toEqual('1234 Cherry Oak Drive, Gainesville Florida');
        expect(element(by.name('schoolName')).getAttribute('value')).toEqual('Forrest Elementary School');
        expect(element(by.name('size')).getAttribute('value')).toEqual('XXL');
        browser.sleep(2000);
        element(by.name('submit')).click();



    });

    it('Verify All Fields Contain Correct Information', function() {
        expect(element(by.name('fullNameField')).getText()).toEqual('Protractor Test\'s Profile');
        expect(element(by.name('birthDateField')).getText()).toEqual('1/7/1988');
        expect(element(by.name('fullNameField')).getText()).toEqual('Protractor Test\'s Profile');
        expect(element(by.name('fullNameField')).getText()).toEqual('Protractor Test\'s Profile');
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