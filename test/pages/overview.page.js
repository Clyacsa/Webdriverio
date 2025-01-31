class OverviewPage{

    get ItemName() {
        return $('[data-test="inventory-item-name"]');
    }

    get finishButton() {
        return $('#finish');
    }

    get completeMessage() {
        return $('[data-test="complete-header"]');
    }

    async clickONFinishButton() {
        await this.finishButton.click();
    }  
}
module.exports = new OverviewPage()