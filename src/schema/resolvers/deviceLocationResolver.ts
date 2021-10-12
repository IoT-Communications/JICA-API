import { contextType } from "..";
import { returnError } from "../../config/errorHandling";
import { UN_AUTHROIZED } from "../../config/errorMessages";
import DeviceLocation from "../../entities/DeviceLocation";




const resolvers = {
    Query: {
        getDeviceLocations,
    },
};

async function getDeviceLocations(_, args, { user }: contextType ) {
    if (!user) return returnError('getUsers', UN_AUTHROIZED);
    return {
        deviceLocations : await DeviceLocation.find()
    };
}

export default resolvers;