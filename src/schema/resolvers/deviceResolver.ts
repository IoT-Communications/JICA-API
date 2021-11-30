import { contextType } from "..";
import { returnError } from "../../config/errorHandling";
import { UN_AUTHROIZED } from "../../config/errorMessages";
import Device from "../../entities/Device";




const resolvers = {
    Query: {
        getDevices,
        getDevice,
    },
};

async function getDevices(_, args, { user }: contextType ) {
    if (!user) return returnError('getDevices', UN_AUTHROIZED);
    return {
        device : await Device.find()
    };
}

async function getDevice(_, { deviceID }, { user }: contextType ) {
    if (!user) return returnError('getDevice', UN_AUTHROIZED);

    let device = await Device.find({
        where:{
            deviceID : deviceID
        }
    })
    return {
        device :  device
    };
}

export default resolvers;