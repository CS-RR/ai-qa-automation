import { test, expect } from '@playwright/test';
import petNegativeData from '../../data/pet-negative.json';

const baseUrl = 'https://petstore.swagger.io/v2/pet';

test.describe.configure({ mode: 'serial' });

test.describe('Petstore Negative Tests (JSON)', () => {

  test.fail('Create pet with wrong data type (ID as string)', async ({ request }) => {
    const response = await request.post(baseUrl, {
      data: petNegativeData.invalidIdPet
    });
    console.log('Wrong type status:', response.status());
    expect([400, 405]).toContain(response.status());
  });

  test('Create pet without name', async ({ request }) => {
    const response = await request.post(baseUrl, {
      data: petNegativeData.missingNamePet
    });
    console.log('Missing field status:', response.status());
    expect([400, 405]).toContain(response.status());
  });

  test('Update pet with empty body', async ({ request }) => {
    const response = await request.put(baseUrl, {
      data: petNegativeData.emptyBody
    });
    console.log('Empty update status:', response.status());
    expect([400, 405]).toContain(response.status());
  });

  test('Create pet with invalid status value', async ({ request }) => {
    const response = await request.post(baseUrl, {
      data: petNegativeData.invalidStatusPet
    });
    console.log('Invalid status code:', response.status());
    expect([400, 405]).toContain(response.status());
  });

});
