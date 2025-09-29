// MongoDB initialization script
db = db.getSiblingDB('snow_prompt_builder');

// Create collections with proper indexing
db.createCollection('User');
db.createCollection('Prompt');

// Create indexes for better performance
db.User.createIndex({ "email": 1 }, { unique: true });
db.User.createIndex({ "username": 1 });

db.Prompt.createIndex({ "creatorId": 1 });
db.Prompt.createIndex({ "createdAt": -1 });
db.Prompt.createIndex({ "tag": 1 });

print('Database initialized successfully!');