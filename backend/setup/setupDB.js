db.getSiblingDB(DBNAME);
db.createUser({
  user: "deploy",
  pwd: PASSWORD,
  roles: ["dbOwner"]
});
