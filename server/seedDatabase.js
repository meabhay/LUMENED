const mongoose = require('mongoose');
const Category = require('./models/Category');
require('dotenv').config();

// Connect to database
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Default categories to seed
const defaultCategories = [
  {
    name: "Web Development",
    description: "Learn web development technologies including HTML, CSS, JavaScript, React, Node.js, and more."
  },
  {
    name: "Data Science",
    description: "Explore data analysis, machine learning, Python, R, and statistical methods."
  },
  {
    name: "Mobile Development",
    description: "Build mobile applications for iOS and Android using React Native, Flutter, Swift, and Kotlin."
  },
  {
    name: "Programming Languages",
    description: "Master programming languages like Python, Java, C++, JavaScript, and more."
  },
  {
    name: "Database Management",
    description: "Learn database design, SQL, MongoDB, PostgreSQL, and database optimization techniques."
  },
  {
    name: "Cloud Computing",
    description: "Understand AWS, Azure, Google Cloud, and cloud architecture principles."
  },
  {
    name: "Cybersecurity",
    description: "Learn about network security, ethical hacking, and cybersecurity best practices."
  },
  {
    name: "Artificial Intelligence",
    description: "Explore AI concepts, machine learning algorithms, and neural networks."
  },
  {
    name: "DevOps",
    description: "Learn continuous integration, deployment, Docker, Kubernetes, and automation tools."
  },
  {
    name: "Design",
    description: "Master UI/UX design, graphic design, and design thinking principles."
  }
];

async function seedCategories() {
  try {
    console.log('🌱 Starting to seed categories...');
    
    // Check if categories already exist
    const existingCategories = await Category.find({});
    console.log(`Found ${existingCategories.length} existing categories`);
    
    if (existingCategories.length === 0) {
      // Insert default categories
      const createdCategories = await Category.insertMany(defaultCategories);
      console.log(`✅ Successfully created ${createdCategories.length} categories:`);
      createdCategories.forEach(cat => {
        console.log(`   - ${cat.name}`);
      });
    } else {
      console.log('📦 Categories already exist in database:');
      existingCategories.forEach(cat => {
        console.log(`   - ${cat.name}`);
      });
    }
    
    console.log('🎉 Database seeding completed!');
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seeding function
seedCategories();
