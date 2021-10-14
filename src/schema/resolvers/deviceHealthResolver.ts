import { contextType } from "..";
import { returnError } from "../../config/errorHandling";
import { UN_AUTHROIZED } from "../../config/errorMessages";
import DeviceHealth from "../../entities/DeviceHealth";




const resolvers = {
    Query: {
        getDeviceHealths,
        getDeviceHealth,
    },
};

async function getDeviceHealths(_, args, { user }: contextType ) {
    if (!user) return returnError('getUsers', UN_AUTHROIZED);
    return {
        deviceHealth : await DeviceHealth.find()
    };
}

async function getDeviceHealth(_, { deviceID }, { user }: contextType ) {
    if (!user) return returnError('getUsers', UN_AUTHROIZED);

    let health = await DeviceHealth.find({
        where:{
            deviceID : deviceID
        }
    })
    return {
        deviceHealth :  health
    };
}

export default resolvers;