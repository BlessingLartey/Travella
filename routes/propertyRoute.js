import { Router } from "express"; 
import { 
    addProperty, 
    getProperties, 
    updateProperty, 
    deleteProperty, 
    getProperty
} from "../controllers/propertyController.js";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";

const propertyRouter = Router();

propertyRouter.post(
    '/properties', 
    isAuthenticated,
    isAuthorized(['host']),
    addProperty
);

propertyRouter.get(
    '/properties', getProperties
);

propertyRouter.get(
    '/products/:id',
    getProperty);

propertyRouter.put(
    '/properties/:id', updateProperty
);

propertyRouter.delete(
    '/properties/:id', deleteProperty
);

export default propertyRouter;
