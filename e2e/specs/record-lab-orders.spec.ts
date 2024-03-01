import { expect } from '@playwright/test';
import { type Visit } from '@openmrs/esm-framework';
import { generateRandomPatient, deletePatient, type Patient, startVisit, endVisit } from '../commands';
import { test } from '../core';
import { MedicationsPage, ChartPage } from '../pages';

let patient: Patient;
let visit: Visit;

test.beforeEach(async ({ api }) => {
  patient = await generateRandomPatient(api);
  visit = await startVisit(api, patient.uuid);
});

test('Make a lab order', async ({ page, api }) => {
  const patientChartPage = new ChartPage(page);

  await test.step('When I visit the patient chart page', async () => {
    await patientChartPage.goTo(patient.uuid);
  });

  await test.step('And I click on the `Clinical forms` link', async () => {
    await patientChartPage.page.getByLabel(/clinical forms/i).click();
  });

  await test.step('And I click on the `Laboratory Test Orders` link', async () => {
    await patientChartPage.page.getByRole('cell', { name: 'Laboratory Test Orders' }).click();
  });
  await test.step('And I select a lab order', async () => {
    //await page.locator('[id="accordion-item-\\:r27\\:"] select').selectOption('1325AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
    //await page.getByRole('button', { name: 'Add', exact: true }).click();
    await page.locator('[id="accordion-item-\\:r27\\:"]').getByRole('button', { name: 'Add' }).click();
    await page.locator('[id="accordion-item-\\:r27\\:"] select').selectOption('678AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
  });

  await test.step('And I click `Save and close` button', async () => {
    await page.getByRole('button', { name: 'Save and close' }).click();
  });

  await test.step('Then I should see a success notification', async () => {
    await expect(patientChartPage.page.getByText(/lab order(s) generated/i)).toBeVisible();
  });

  await test.step('And I should see the newly added order in the list', async () => {
    const headerRow = patientChartPage.formsTable().locator('thead > tr');
    const dataRow = patientChartPage.formsTable().locator('tbody > tr');

    await expect(headerRow).toContainText(/visit type/i);
    await expect(headerRow).toContainText(/form name/i);

    await expect(dataRow).toContainText(/facility visit/i);
    await expect(dataRow).toContainText(/laboratory test orders/i);
  });

  // edit
  /*
  await test.step('Then if I click on the overflow menu and click the `Edit` button', async () => {
    await expect(conditionsPage.page.getByRole('button', { name: /options/i })).toBeVisible();
    await conditionsPage.page.getByRole('button', { name: /options/i }).click();
    await expect(conditionsPage.page.getByRole('menu', { name: /edit or delete condition/i })).toBeVisible();
    await conditionsPage.page.getByRole('menuitem', { name: /edit/i }).click();
  });

  await test.step('And I edit the condition', async () => {
    await page.locator('label').filter({ hasText: 'Inactive' }).click();
    await page.getByLabel(/end date/i).fill('11/07/2023');
    await page.getByLabel(/end date/i).press('Tab');
  });

  await test.step('And I save the form', async () => {
    await page.getByRole('button', { name: /save & close/i }).click();
  });

  await test.step('Then I should see a success notification', async () => {
    await expect(conditionsPage.page.getByText(/condition updated/i)).toBeVisible();
  });

  await test.step('And I should see the updated condition in the list', async () => {
    await page.getByRole('combobox', { name: /show/i }).click();
    await page.getByText(/all/i).click();

    await expect(dataRow).toContainText(/mental status change/i);
    await expect(dataRow).toContainText(/jul 2023/i);
    await expect(dataRow).toContainText(/inactive/i);
  });
});

test('Edit a lab order', async ({ page, api }) => {
  const patientChartPage = new ChartPage(page);

  await test.step('When I visit the patient chart page', async () => {
    await patientChartPage.goTo(patient.uuid);
  });

  await test.step('And I click on the `Clinical forms` link', async () => {
    await patientChartPage.page.getByLabel(/clinical forms/i).click();
  });

  await test.step('And I click on the `Laboratory Test Orders` link', async () => {
    await patientChartPage.page.getByRole('cell', { name: 'Laboratory Test Orders' }).click();
  });
  await test.step('And I select a lab order', async () => {
    await page.locator('[id="accordion-item-\\:r27\\:"]').getByRole('button', { name: 'Add' }).click();
    //await page.locator('[id="accordion-item-\\:r27\\:"] select').selectOption('1325AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
    //await page.getByRole('button', { name: 'Add', exact: true }).click();
    await page.locator('[id="accordion-item-\\:r27\\:"]').getByRole('button', { name: 'Add' }).click();
    await page.locator('[id="accordion-item-\\:r27\\:"] select').selectOption('160735AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
    await page.locator('#tab select').selectOption('857AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
  });

  await test.step('And I click `Save and close` button', async () => {
    await page.getByRole('button', { name: 'Save and close' }).click();
  });

  await test.step('Then I should see a success notification', async () => {
    await expect(patientChartPage.page.getByText(/lab order(s) generated/i)).toBeVisible();
  });

  await test.step('And I should see the newly added order in the list', async () => {
    const headerRow = patientChartPage.formsTable().locator('thead > tr');
    const dataRow = patientChartPage.formsTable().locator('tbody > tr');

    await expect(headerRow).toContainText(/visit type/i);
    await expect(headerRow).toContainText(/form name/i);

    await expect(dataRow).toContainText(/facility visit/i);
    await expect(dataRow).toContainText(/laboratory test orders/i);
  });
});

test('Delete a lab order', async ({ page, api }) => {
  const patientChartPage = new ChartPage(page);

  await test.step('When I visit the patient chart page', async () => {
    await patientChartPage.goTo(patient.uuid);
  });

  await test.step('And I click on the `Clinical forms` link', async () => {
    await patientChartPage.page.getByLabel(/clinical forms/i).click();
  });

  await test.step('And I click on the `Laboratory Test Orders` link', async () => {
    await patientChartPage.page.getByRole('cell', { name: 'Laboratory Test Orders' }).click();
  });
  await test.step('And I select a lab order', async () => {
    await page.locator('[id="accordion-item-\\:r27\\:"]').getByRole('button', { name: 'Add' }).click();
    //await page.locator('[id="accordion-item-\\:r27\\:"] select').selectOption('1325AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
    //await page.getByRole('button', { name: 'Add', exact: true }).click();
    await page.locator('[id="accordion-item-\\:r27\\:"]').getByRole('button', { name: 'Add' }).click();
    await page.locator('[id="accordion-item-\\:r27\\:"] select').selectOption('160735AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
    await page.locator('#tab select').selectOption('857AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
  });

  await test.step('And I click `Save and close` button', async () => {
    await page.getByRole('button', { name: 'Save and close' }).click();
  });

  await test.step('Then I should see a success notification', async () => {
    await expect(patientChartPage.page.getByText(/lab order(s) generated/i)).toBeVisible();
  });

  await test.step('And I should see the newly added order in the list', async () => {
    const headerRow = patientChartPage.formsTable().locator('thead > tr');
    const dataRow = patientChartPage.formsTable().locator('tbody > tr');

    await expect(headerRow).toContainText(/visit type/i);
    await expect(headerRow).toContainText(/form name/i);

    await expect(dataRow).toContainText(/facility visit/i);
    await expect(dataRow).toContainText(/laboratory test orders/i);
  });*/
});

test.afterEach(async ({ api }) => {
  await endVisit(api, visit.uuid);
  await deletePatient(api, patient.uuid);
});
