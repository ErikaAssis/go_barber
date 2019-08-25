const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      avatar: DataTypes.STRING,
      password: DataTypes.VIRTUAL,
      password_hash: DataTypes.STRING,
      provider: DataTypes.BOOLEAN
    },
    {
      // Automatização de tarefas
      hooks: {
        beforeSave: async (user) => {
          if (user.password) user.password_hash = await bcrypt.hash(user.password, 8);
        }
      }
    }
  );

  // eslint-disable-next-line func-names
  // eslint-disable-next-line space-before-function-paren
  User.prototype.checkPassword = function(password) {
    return bcrypt.compare(password, this.password_hash);
  };

  return User;
};
