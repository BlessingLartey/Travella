import { Router } from "express"; 
import { 
    addProperty, 
    getProperties, 
    updateProperty, 
    deleteProperty 
} from "../controllers/propertyController.js";

const propertyRouter = Router();

propertyRouter.post(
    '/properties', addProperty
);

propertyRouter.get(
    '/properties', getProperties
);

propertyRouter.put(
    '/properties/:id', updateProperty
);

propertyRouter.delete(
    '/properties/:id', deleteProperty
);

export default propertyRouter;
