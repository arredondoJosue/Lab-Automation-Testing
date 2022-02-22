// Lines 2 through 6 are our boilerplate lines of code, we need them for our tests to work
const {Builder, Capabilities, By} = require('selenium-webdriver')

require('chromedriver')

const driver = new Builder().withCapabilities(Capabilities.chrome()).build()

beforeAll(async () => {
    await driver.get('http://127.0.0.1:5501/3-Labs/automation/movieList/index.html')
})

afterAll(async () => {
    await driver.quit()
})

test('add movie', async () => {
    let movieToAdd = 'Star Wars'

    let inputField = await driver.findElement(By.xpath('//input'))
    await inputField.sendKeys('Star Wars\n')
    // await driver.sleep(2000)
    await driver.findElement(By.css('button'))

    let movie = await driver.findElement(By.xpath('//li/span')).getText()
    expect(movie).toBe(movieToAdd)

})

test('cross off movie as watched', async () => {
    let movie = await driver.findElement(By.xpath('//li/span'))
    await movie.click()
    // await driver.sleep(2000)
    let checked = await driver.findElement(By.css('.checked'))
    expect(checked).toBeTruthy()
})

test('uncheck crossed off movie to display as need to watch', async () => {
    await driver.sleep(2000)
    
    let movie = await driver.findElement(By.xpath('//li/span'))
    let checked = await driver.findElement(By.css('.hide'))
    
    await movie.click()
    expect(checked).toBeTruthy()
})

test('should delete movie and give message that movie was deleted', async () => {
    let deleteBtn = await driver.findElement(By.xpath('//button[contains(text(), "x")]')).click()
    let message = await driver.findElement(By.xpath('//aside')).getText()
    expect(message).toBe('Star Wars deleted!')
    await driver.sleep(2000)
    expect(deleteBtn).toBeFalsy()
})