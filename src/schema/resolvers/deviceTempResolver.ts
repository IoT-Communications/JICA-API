import { contextType } from "..";
import { returnError } from "../../config/errorHandling";
import { UN_AUTHROIZED } from "../../config/errorMessages";
import DeviceTemp from "../../entities/DeviceTemp";




const resolvers = {
    Query: {
        getDeviceTemperatures,
        getDeviceTemperature,
    },
};

async function getDeviceTemperatures(_, args, { user }: contextType ) {
    if (!user) return returnError('getUsers', UN_AUTHROIZED);
    return {
        deviceTemp : await DeviceTemp.find()
    };
}

async function getDeviceTemperature(_, { deviceID }, { user }: contextType ) {
    if (!user) return returnError('getUsers', UN_AUTHROIZED);

    let temp = await DeviceTemp.find({
        where:{
            deviceID : deviceID
        }
    })
    return {
        deviceTemp :  temp
    };
}

export default resolvers;