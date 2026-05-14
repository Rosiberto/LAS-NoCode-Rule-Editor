import { jest } from '@jest/globals';

global.Swal = {
  fire: jest.fn()
};