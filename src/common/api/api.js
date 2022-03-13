import { ALERT } from '../constants/constants.js';

const BASE_URL = 'http://localhost:3000';

const INIT = {
  POST(name) {
    return {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    };
  },
  PUT(name) {
    return {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: name ? JSON.stringify({ name }) : null,
    };
  },
  DELETE() {
    return {
      method: 'DELETE',
    };
  },
};

const request = async (resource, init) => {
  try {
    const res = await fetch(resource, init);

    if (!res.ok) alert(ALERT.REQUEST_ERROR);

    if (init && init.method === 'DELETE') return;

    return await res.json();
  } catch (error) {
    alert(ALERT.REQUEST_ERROR, error.message);
  }
};

export const menuApi = {
  getMenuListByCategory(currentCategory) {
    return request(`${BASE_URL}/api/category/${currentCategory}/menu`);
  },

  addItem(currentCategory, menuName) {
    return request(
      `${BASE_URL}/api/category/${currentCategory}/menu`,
      INIT.POST(menuName)
    );
  },

  editMenuItem(currentCategory, menuId, menuName) {
    return request(
      `${BASE_URL}/api/category/${currentCategory}/menu/${menuId}`,
      INIT.PUT(menuName)
    );
  },

  toggleSoldOut(currentCategory, menuId) {
    return request(
      `${BASE_URL}/api/category/${currentCategory}/menu/${menuId}/soldout`,
      INIT.PUT()
    );
  },

  deleteItem(currentCategory, menuId) {
    return request(
      `${BASE_URL}/api/category/${currentCategory}/menu/${menuId}`,
      INIT.DELETE()
    );
  },
};
