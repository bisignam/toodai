db = new Mongo().getDB("toodai");

db.createUser({
  user: 'toodai',
  pwd: 'toodai',
  roles: [
    {
      role: 'readWrite',
      db: 'toodai',
    },
  ],
});

db.createCollection('users', { capped: false });

db.users.insert({username: "admin",email: "admin@admin.com", password: "", roles: ["ROLE_ADMIN"]});

db.createCollection('bookmark', { capped: false });

db.bookmark.insert({ url: "https//www.google.com", title: "test bookmark", description: "test description" });