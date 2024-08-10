const express=require ('express')
const User=require('./models/user.schema')
const { modelNames } = require('mongoose')
const router=express.Router()
//1-data be inserted
const fakeData={
   Name:"sami",
   age:18,
  favoriteFoods:['pasta', ' burritos']
}



router.get('/add-user',(req,res)=>{
//2-Sauvegarder l'instance dans la base de données
  const newPerson=new User(fakeData)
   newPerson.save()
   .then(()=>res.send("user saved success!!"))
   .catch((err)=>console.log( err))
 
 

})
//3-Create Many Records with model.create()
router.get('/add-users',(req,res)=>{
   const datafake=[
      {Name:'Alice',age:25,favoriteFoods:['pizza','Burggers']},
      {Name:'Bob',age:25,favoriteFoods:['libanais','pasta']},
      {Name:'Hasen',age:25,favoriteFoods:['chiken','boeuf']},
   ];
   User.create(datafake)
   .then(()=>res.send("users saved succefully"))
   .catch((err)=>console.log('err', err))
})

//4-Find all the people having a given name,

router.get('/allusers:nametofind',(req,res)=>{
   const nametofind=req.params.nameall
   User.find({Name:nametofind})
   .then((people)=>{
      res.json({msg:'people founded succefully',people})

   })
   .catch((err)=>{
      console.log('err', err)
      res.status(500).send('An error occured while finding people')
      
   })
})

//5-Find just one person which has a certain food in the person's favorites
router.get('/findpersonbyfood/:food',(req,res)=>{
   const food=req.params.food
   User.findOne({favoriteFoods:food})
   .then((data)=>res.json(data))
   .catch((err)=>console.log('err', err))
})



//6-Use model.findById() to Search Your Database By _id
router.get('/get-user/:id', (req, res) => {
   const id= req.params.id;
   User.findOne({ _id: id })
   .then((data) => res.json(data))
   .catch((err) => console.log('err', err));
});

//7- Perform Classic Updates by Running Find, Edit, then Save
const personId = '66b3da7923513dd34dacd8a7'; // Remplacez ceci par l'ID réel

User.findById(personId)
  .then(person => {
    if (!person) {
      // Si aucune personne n'est trouvée, rejeter la promesse
      return Promise.reject('Personne non trouvée');
    }
    // Ajouter "hamburger" à la liste des favoriteFoods
    person.favoriteFoods.push('hamburger');
    // Sauvegarder le document mis à jour
    return person.save();
  })
  .then(updatedPerson => {
    // Document mis à jour avec succès
    console.log('Personne mise à jour avec succès :', updatedPerson);
  })
  .catch(err => {
    // Gérer les erreurs
    console.error('Erreur lors de la mise à jour :', err);
  });



//8-Perform New Updates on a Document Using model.findOneAndUpdate()
router.get('/update-age/:name',(req,res)=>{
const name=req.params.name
User.findOneAndUpdate({Name:"john"},{age:20},{new:true})
.then((updatedperson)=>res.json(updatedperson))
.catch((err)=>console.log('err', err))




})

//9-Delete One Document Using model.findByIdAndRemove

router.get('/remove-user/:userId',(req,res)=>{
   const userId=req.params.userId
   User.findOneAndDelete({_id:userId})
   .then(()=>res.send('user removed succefully'))
   .catch((err)=>console.log('err', err))
})

//10-Delete all the people whose name is “Mary”, using Model.remove()
router.get('/delete-marys',(req,res)=>{
   User.deleteMany({Name:'Mary'})
   .then(result=>{res.json({mesg:'doc removed ',deletedcount:result.deletedcount})
     .catch((err)=>console.log('erreur de suppression', err))
});
})



//11Chain Search Query Helpers to Narrow Search Results

router.get('/find-burritos',(req,res)=>{
User.find({favoriteFoods:'burritos'}) //Trouver les personnes qui aiment les burritos
.sort({Name:1})//Trier par nom par ordre croissant
.limit(2)// Limiter  résultats à deux documents
.select('Name')// Sélectionner uniquement le champ 'name', excluant 'age'
.exec((err, data) => { // Exécuter la requête et passer le callback
   if (err) {
     console.error('Erreur lors de la recherche :', err);
     res.status(500).json({ message: 'Erreur lors de la recherche' });
   } else {
     res.json(data); // Renvoi des résultats trouvés

}

})

})

module.exports=router