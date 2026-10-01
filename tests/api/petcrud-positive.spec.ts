import { test, expect } from '@playwright/test';
import petData from '../../data/pet.json';
import { resetResults, saveResult } from '../../utils/results.js';

const baseUrl = 'https://petstore.swagger.io/v2/pet';
const petId = Math.floor(Math.random() * 100000);

resetResults();

test.describe.configure({ mode: 'serial' });

test.describe('Petstore CRUD API', () => {

  test('Create a new pet', async ({ request }) => {
    const response = await request.post(baseUrl, { data: { id: petId, ...petData.validPet }});
    const status = response.status();
    const body = await response.json();

    saveResult('Create', status, status === 200, body);

    expect(status).toBe(200);
    expect(body.id).toBe(petId);
    expect(body.name).toBe(petData.validPet.name);
  });

  test('Read the pet by ID', async ({ request }) => {
    const response = await request.get(`${baseUrl}/${petId}`);
    const status = response.status();
    const body = await response.json();

    saveResult('Read', status, status === 200, body);

    expect(status).toBe(200);
    expect(body.id).toBe(petId);
  });

  test('Update the pet', async ({ request }) => {
    const response = await request.put(baseUrl, { data: { id: petId, ...petData.updatedPet }});
    const status = response.status();
    const body = await response.json();

    saveResult('Update', status, status === 200, body);

    expect(status).toBe(200);
    expect(body.name).toBe(petData.updatedPet.name);
  });

  test('Delete the pet', async ({ request }) => {
    const response = await request.delete(`${baseUrl}/${petId}`);
    const status = response.status();
    const body = await response.json().catch(() => null);

    saveResult('Delete', status, [200, 404].includes(status), body);

    expect([200, 404]).toContain(status);
  });

});