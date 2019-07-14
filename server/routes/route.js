import UserController from '../controllers/user.controller';
import UserMiddleware from '../middlewares/user.authorization';
import PropertyController from '../controllers/property.controller';
import PropertyMiddleware from '../middlewares/property.authorization';
import Authentication from '../middlewares/authentication';

const Route = (logger, router) => {
  router.post('/auth/signup', UserMiddleware.signUp, UserController.signUp);
  router.post('/auth/signin', UserMiddleware.signIn, UserController.signIn);
  router.post('/property', Authentication.userToken, PropertyMiddleware.create, PropertyController.create);
  router.get('/property', Authentication.userToken, PropertyController.findAll);
  router.get('/property/:property_id', Authentication.userToken, PropertyController.findOne);
  router.get('/properties', Authentication.userToken, PropertyMiddleware.findByType, PropertyController.findByType);
  router.patch('/property/:property_id', Authentication.userToken, PropertyMiddleware.update, PropertyController.update);
  router.patch('/property/:property_id/sold', Authentication.userToken, PropertyMiddleware.markSold, PropertyController.markSold);
  router.delete('/property/:property_id', Authentication.userToken, PropertyController.delete);
  return router;
};

export default Route;
