/**
 * Created by Joshua on 2/18/2015.
 */
describe('After School Add Child, Edit Child,', function() {
    it('Delete Child', function () {
        element(by.name('deleteChildButton')).click();

        //Click the Accept box in the Alert window
        browser.switchTo().alert().accept();
    });
});