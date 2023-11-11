const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

const app = express();
app.use(cors());

// Initialize Firestore with your credentials
const serviceAccount = require("C:/Users/ALEXANDREA/Food-Recipe-App-React-Native/weathereats.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

app.get('/api/HotandHumid', async (req, res) => {
    try {
      // Retrieve recipes from Firestore
      const recipes = [];
      const recipeDocs = await db.collection('Hot and Humid').get();
  
      recipeDocs.forEach(doc => {
        const recipe = doc.data();
        recipe.id = doc.id;  // Include the recipe ID in the response
        recipes.push(recipe);
      });
  
      const responseData = { recipes };
      console.log('Server Response:', responseData);
      res.status(200).json(responseData);
    } catch (error) {
      console.error('Server Error:', error.message);
      res.status(500).json({ error: error.message });
    }
  });

  app.get('/api/HotandHumid/:id', async (req, res) => {
    try {
      const recipeId = req.params.id;
      // Retrieve the specific recipe from Firestore based on the provided ID
      const recipeDoc = await db.collection('Hot and Humid').doc(recipeId).get();
  
      if (!recipeDoc.exists) {
        return res.status(404).json({ error: 'Recipe not found' });
      }
  
      const recipe = recipeDoc.data();
      recipe.id = recipeDoc.id;  // Include the recipe ID in the response
  
      const responseData = { recipe };
      console.log('Server Response:', responseData);
      res.status(200).json(responseData);
    } catch (error) {
      console.error('Server Error:', error.message);
      res.status(500).json({ error: error.message });
    }
});

  
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://192.168.100.129:${PORT}`);
});
