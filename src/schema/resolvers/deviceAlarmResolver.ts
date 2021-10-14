import { contextType } from "..";
import { returnError } from "../../config/errorHandling";
import { UN_AUTHROIZED } from "../../config/errorMessages";
import DeviceAlarm from "../../entities/DeviceAlarm";




const resolvers = {
    Query: {
        getDeviceAlarms,
        getDeviceAlarm,
    },
};

async function getDeviceAlarms(_, args, { user }: contextType ) {
    if (!user) return returnError('getUsers', UN_AUTHROIZED);
    return {
        deviceAlarm : await DeviceAlarm.find()
    };
}

async function getDeviceAlarm(_, { deviceID }, { user }: contextType ) {
    if (!user) return returnError('getUsers', UN_AUTHROIZED);

    let Alarm = await DeviceAlarm.find({
        where:{
            deviceID : deviceID
        }
    })
    return {
        deviceAlarm :  Alarm
    };
}

export default resolvers;