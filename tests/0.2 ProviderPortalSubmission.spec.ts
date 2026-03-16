import {test, expect, BrowserContext} from '@playwright/test';
import path from 'path';
import fs from 'fs';
let webContext: BrowserContext;
const dataset = JSON.parse(JSON.stringify(require ("../Resources/Test Data/LoginDetails.json")));

for (const data of dataset) {

  test.describe(`Provider Portal Submission - ${data.username}`, () => {

    test.beforeEach(async ({ page }) => {
      console.log(`Logging in with username: ${data.username}`);

      await page.goto('https://al-arise-qa-publicaccess.citigovcloud.com/Account/Login?ReturnUrl=%2F');

      await page.fill('#username', data.username);
      await page.fill('#password', data.password);
      await page.getByRole('button', { name: 'Login' }).click();

      await page.waitForLoadState('networkidle');
    });

    test(`Update Provider Details page - ${data.username}`, async ({ page }) => {
      await page.getByRole('button', { name: 'Provider', exact: true }).click();
      await page.getByRole('link', { name: 'Profile' }).click();
      await page.waitForLoadState('networkidle');
      await page.locator('label:has-text("Legal Entity Type")').locator('..').locator('.k-dropdownlist').click();
      await page.waitForTimeout(2000);
      await page.locator('#LegalEntityTypeID-list').locator('text=Corporation').click(); 
      await page.locator('#TaxID').type('123-12-8569', { delay: 100 });

    await page.getByRole('textbox', { name: 'Street 1' }).fill('Saint Avenue, Catheral Central Road');
    await page.getByRole('textbox', { name: 'Street 2' }).fill('Near Red Cross Road');
        await page.waitForTimeout(1000);
    await page.getByRole('textbox', { name: 'City' }).fill('Adona');
    await page.waitForTimeout(1000);
    await page.getByRole('textbox', { name: 'Zip Code' }).isVisible();
    await page.getByRole('textbox', { name: 'Zip Code' }).type('72058-4563', { delay: 100 });
    await page.waitForTimeout(2000);

    const stateDropdown = page.locator('#MainAddress_State_label')
    .locator('..')
    .locator('.k-dropdownlist');
     await stateDropdown.click();
     await page.waitForTimeout(2000);
     await page.locator('#MainAddress_State-list').isVisible();
     await page.locator('#MainAddress_State-list').locator('.k-list-item', { hasText: 'AL' }).isVisible();
     await page.waitForTimeout(1000);
     await page.locator('#MainAddress_State-list').locator('.k-list-item', { hasText: 'AL' }).click();


    await page.locator('#MainAddress_fgCityStateZip').getByText('-- County --').click();
    await page.waitForTimeout(2000);
    await page.locator('#MainAddress_CountyNameID-list').isVisible();
    await page.waitForTimeout(1000);    
    await page.getByRole('searchbox').type('Perry', { delay: 100 });
    await page.waitForTimeout(2000);
    await page.locator('#MainAddress_CountyNameID-list').locator('text=Perry').click();

    await page.locator('#ProviderPhoneNumber_PhoneNumberTypeId_label').click();
    await page.waitForTimeout(2000);
    await page.getByRole('option', { name: 'Cell Phone' }).isVisible();
    await page.getByRole('option', { name: 'Cell Phone' }).click();
    await page.getByRole('textbox', { name: 'Primary Phone Number' }).isVisible();
    await page.getByRole('textbox', { name: 'Primary Phone Number' }).type('(141) 125-6369', { delay: 100 });
    
await page.getByRole('button', { name: 'Save' }).isVisible();
await page.getByRole('button', { name: 'Save' }).click();
    });

    test(`Update Point of Contact Details - ${data.username}`, async ({ page }) => {
      await page.getByRole('button', { name: 'Provider', exact: true }).click();
      await page.getByRole('link', { name: 'Profile' }).click();
      await page.waitForLoadState('networkidle');
      await page.getByRole('link', { name: 'Point of Contact Details' }).click(); 
      
      await page.getByRole('link', { name: 'Add POC Detail' }).click();
      await page.waitForLoadState('networkidle');

      await page.getByRole('combobox', { name: 'Contact Type' }).click();
      await page.waitForTimeout(2000);
      await page.locator('#ContactTypeID_listbox').click();
      await page.waitForTimeout(1000);
      //await page.getByRole('option', { name: 'Licensee' }).click(); 

      await page.locator('#IsFacilityStaff').check(); 
      await page.waitForTimeout(1000);

      await page.getByLabel('First Name').fill('Samsun');
      await page.getByLabel('Last Name').fill('Marton');
      await page.getByLabel('Email').fill('smarton@abc.com');
      await page.getByLabel('Date of Birth').type('01/01/1985', { delay: 100 });

      await page.getByRole('button', { name: 'Save' }).click();
      
  });


test(`Update Background check - ${data.username}`, async ({ page }) => {
      await page.getByRole('button', { name: 'Provider', exact: true }).click();
      await page.getByRole('link', { name: 'Profile' }).click();
      await page.waitForLoadState('networkidle');
      await page.getByRole('link', { name: 'Background Check' }).click(); 
      await page.locator('tbody tr').nth(0).locator('td:first-child a').click();
      await page.waitForLoadState('networkidle');
      
      await page.getByRole('link', { name: 'Add Criminal Background Check' }).click();
      await page.waitForLoadState('networkidle');

      
const monthNumber = '01';
const date = '15';
const year = '2025';

// open the calendar reliably
await page.getByRole('button', { name: 'select' }).nth(0).click();
// pick year
await page.getByRole('button', { name: /2025/ }).click();
// pick month (example: January → "Jan")
await page.getByRole('link', { name: 'Jan' }).click();
// pick day
await page.getByRole('link', { name: date }).click();
// open the calendar reliably
await page.getByRole('button', { name: 'select' }).nth(1).click();
// pick year
await page.getByRole('button', { name: /2025/ }).click();
// pick month (example: January → "Jan")
await page.getByRole('link', { name: 'Jan' }).click();
// pick day
await page.getByRole('link', { name: date }).click();

await page.locator('#Documents').setInputFiles('CBC_Doc.docx');
await page.waitForTimeout(2000);

await page.getByRole('button', { name: 'Save' }).waitFor({ state: 'visible' });
await page.getByRole('button', { name: 'Save' }).click();
await page.getByRole('link', { name: 'Back to Background Check Details' }).waitFor({ state: 'visible' });
await page.getByRole('link', { name: 'Back to Background Check Details' }).click();

await page.getByRole('link', { name: 'Upload CA/N Authorization Document' }).waitFor({ state: 'visible' });
await page.getByRole('link', { name: 'Upload CA/N Authorization Document' }).click();

await page.locator('#Documents').setInputFiles('CBN_Doc.docx');
await page.waitForTimeout(2000);     

await page.getByRole('button', { name: 'Save' }).waitFor({ state: 'visible' });
await page.getByRole('button', { name: 'Save' }).click();
await page.waitForLoadState('networkidle');
await page.getByRole('link', { name: 'Back to Background Check Details' }).waitFor({ state: 'visible' });
await page.getByRole('link', { name: 'Back to Background Check Details' }).click();
await page.waitForLoadState('networkidle');
await page.getByRole('button', { name: 'Submit' }).waitFor({ state: 'visible' });
await page.getByRole('button', { name: 'Submit' }).click();
await page.waitForTimeout(1000);

await page.getByRole('link', { name: 'Back to Background Check' }).waitFor({ state: 'visible' });
await page.getByRole('link', { name: 'Back to Background Check' }).click();
await page.waitForTimeout(1000) //Submitted Background check applicaton for first user

//Upload Background check renewal document

await page.locator('tbody tr').nth(1).locator('td:first-child a').click();
      await page.waitForLoadState('networkidle');
      
      await page.getByRole('link', { name: 'Add Criminal Background Check' }).click();
      await page.waitForLoadState('networkidle');

      
const monthNumber1 = '01';
const date1 = '15';
const year1 = '2025';

// open the calendar reliably
await page.getByRole('button', { name: 'select' }).nth(0).click();
// pick year
await page.getByRole('button', { name: /2025/ }).click();
// pick month (example: January → "Jan")
await page.getByRole('link', { name: 'Jan' }).click();
// pick day
await page.getByRole('link', { name: date1 }).click();
// open the calendar reliably
await page.getByRole('button', { name: 'select' }).nth(1).click();
// pick year
await page.getByRole('button', { name: /2025/ }).click();
// pick month (example: January → "Jan")
await page.getByRole('link', { name: 'Jan' }).click();
// pick day
await page.getByRole('link', { name: date1 }).click();

await page.locator('#Documents').setInputFiles('CBC_Doc.docx');
await page.waitForTimeout(2000);

await page.getByRole('button', { name: 'Save' }).waitFor({ state: 'visible' });
await page.getByRole('button', { name: 'Save' }).click();
await page.getByRole('link', { name: 'Back to Background Check Details' }).waitFor({ state: 'visible' });
await page.getByRole('link', { name: 'Back to Background Check Details' }).click();

await page.getByRole('link', { name: 'Upload CA/N Authorization Document' }).waitFor({ state: 'visible' });
await page.getByRole('link', { name: 'Upload CA/N Authorization Document' }).click();

await page.locator('#Documents').setInputFiles('CBN_Doc.docx');
await page.waitForTimeout(2000);     

await page.getByRole('button', { name: 'Save' }).waitFor({ state: 'visible' });
await page.getByRole('button', { name: 'Save' }).click();
await page.waitForLoadState('networkidle');
await page.getByRole('link', { name: 'Back to Background Check Details' }).waitFor({ state: 'visible' });
await page.getByRole('link', { name: 'Back to Background Check Details' }).click();
await page.waitForLoadState('networkidle');
await page.getByRole('button', { name: 'Submit' }).waitFor({ state: 'visible' });
await page.getByRole('button', { name: 'Submit' }).click();
await page.waitForTimeout(1000);

await page.getByRole('link', { name: 'Back to Background Check' }).waitFor({ state: 'visible' });
await page.getByRole('link', { name: 'Back to Background Check' }).click();
await page.waitForTimeout(1000) //Submitted Background check applicaton for first user
     
      });


test (`Update Acknowledgement - ${data.username}`, async ({ page }) => {
  await page.getByRole('button', { name: 'Provider', exact: true }).click();
      await page.getByRole('link', { name: 'Profile' }).click();
      await page.waitForLoadState('networkidle');
      await page.getByRole('link', { name: 'Acknowledgement' }).click();
      await page.waitForLoadState('networkidle');

await page.locator('#Questions_1__IsSelected_1').check();
await page.locator('#Questions_2__IsSelected_1').check();
await page.locator('#Questions_3__IsSelected_1').check();
await page.locator('#Questions_4__IsSelected_1').check();
await page.locator('#Questions_5__IsSelected_1').check();
await page.locator('#Questions_6__IsSelected_1').check();
await page.locator('#Questions_7__IsSelected_1').check();
await page.locator('#Questions_8__IsSelected_1').check();
await page.locator('#Questions_9__IsSelected_1').check();
await page.locator('#Questions_10__IsSelected_1').check();

await page.getByRole('button', { name: 'Save' }).waitFor({ state: 'visible' });
await page.getByRole('button', { name: 'Save' }).click();
      


  });


test (`Update Summary - ${data.username}`, async ({ page }) => {
  await page.getByRole('button', { name: 'Provider', exact: true }).click();
      await page.getByRole('link', { name: 'Profile' }).click();
      await page.waitForLoadState('networkidle');
      await page.getByRole('link', { name: 'Summary' }).click();
      await page.waitForLoadState('networkidle');

      await page.locator('#Signature_Certify').check();

await page.getByLabel("Provider's Signature").fill('Faith Based Provider');

await page.getByRole('button', { name: 'Submit' }).waitFor({ state: 'visible' });
await page.getByRole('button', { name: 'Submit' }).click();




  });

  });
}