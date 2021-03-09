const { Connection } = require('../../db/models');

const getConnectionByUserId = async (userId) => {
  try {
    const connection = await Connection.findOne({ where: { userId }, order: [ [ 'createdAt', 'DESC' ]] });
    return connection;
  } catch (err) {
    console.error(err);
  }
};

const createConnection = async (attributes) => {
  const { userId, token, guildId } = attributes;
  try {
    const connection = await Connection.create({
      token,
      userId,
      guildId
    });
    return connection;
  } catch (err) {
    console.error(err);
  }
};

const updateConnection = async (connectionId, updates) => {
  const { userId, token, guildId } = updates;
  try {
    const connection = await Connection.update(
      { userId, token, guildId },
      {
        where: {
          id: connectionId,
        },
      }
    );
    return connection;
  } catch (err) {
    console.error(err);
  }
};

const deleteConnection = async (connectionId) => {
  try {
    const tokenToDelete = await Connection.findByPk(connectionId);
    const id = tokenToDelete.id;
    await tokenToDelete.destroy();
    return id;
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  getConnectionByUserId,
  createConnection,
  updateConnection,
  deleteConnection,
};
