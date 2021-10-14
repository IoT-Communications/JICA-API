import { contextType } from "..";
import { returnError } from "../../config/errorHandling";
import { UN_AUTHROIZED } from "../../config/errorMessages";
import DeviceBattery from "../../entities/DeviceBattery";




const resolvers = {
    Query: {
        getDeviceBatteries,
        getDeviceBattery,
    },
};

async function getDeviceBatteries(_, args, { user }: contextType ) {
    if (!user) return returnError('getUsers', UN_AUTHROIZED);
    return {
        deviceBatteries : await DeviceBattery.find()
    };
}

async function getDeviceBattery(_, { deviceID }, { user }: contextType ) {
    if (!user) return returnError('getUsers', UN_AUTHROIZED);

    let batteries = await DeviceBattery.find({
        where:{
            deviceID : deviceID
        }
    })
    return {
        deviceBatteries :  batteries
    };
}

export default resolvers;