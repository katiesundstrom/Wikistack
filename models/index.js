const Sequelize = require('sequelize');
// making new instance of sequelize, and telling it where our database lives. telling it to connect. running locally, postgres always lives on 5432. default.
const db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false
});

// function using regex to generate our page's slug based on the page's title
function generateSlug (title) {
  let slug = title.replace(/\s+/g, '_').replace(/\W/g, '');
  return slug;
}

const Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('open', 'closed')
  }
},
  // create a new nested object, that has hooks as a property. Its value is an object.
  {
    hooks: {
      beforeValidate: (page, options) => {
        page.slug = generateSlug(page.title);
      }
    }
});

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
});


module.exports = { db, Page, User };

// only export once from a single file

