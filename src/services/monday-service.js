const initMondayClient = require('monday-sdk-js');

const getAccountSlug = async (token, boardId) => {
  try {
    const mondayClient = initMondayClient();
    mondayClient.setToken(token);

    const query = `query($boardId: [Int]) {
        boards (ids: $boardId) {
          owner {
            account {
              slug
            }
          }
        }
      }`;
    
    const variables = { boardId };
    const response = await mondayClient.api(query, { variables });

    return response.data.boards[0].owner.account.slug;
  } catch (err) {
    console.error(err);
  }
};

const getUser = async (token, userId) => {
  try {
    const mondayClient = initMondayClient();
    mondayClient.setToken(token);

    const query = `query($userId: [Int]) {
        users (ids: $userId) {
          name
        }
      }`;
    
    const variables = { userId };
    const response = await mondayClient.api(query, { variables });

    return response.data.users[0];
  } catch (err) {
    console.error(err);
  }
};

const getBoard = async (token, boardId) => {
  try {
    const mondayClient = initMondayClient();
    mondayClient.setToken(token);

    const query = `query($boardId: [Int]) {
        boards (ids: $boardId) {
          name
        }
      }`;
    
    const variables = { boardId };
    const response = await mondayClient.api(query, { variables });

    return response.data.boards[0];
  } catch (err) {
    console.error(err);
  }
};

const getItem = async (token, itemId) => {
  try {
    const mondayClient = initMondayClient();
    mondayClient.setToken(token);

    const query = `query($itemId: [Int]) {
        items (ids: $itemId) {
          name,
          group { title }
          column_values() {
            id
            text
          }
        }
      }`;
    
    const variables = { itemId };
    const response = await mondayClient.api(query, { variables });

    return response.data.items[0];
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  getAccountSlug,
  getUser,
  getBoard,
  getItem
};