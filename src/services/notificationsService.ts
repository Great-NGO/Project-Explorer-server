// const Notification = require("../models/NotificationModel");
import { Model, Types } from "mongoose";

import { translateError } from "../utils/translateError";
import { BaseService, ServiceResponse } from "./baseService";
import { INotification, TNotification, Notification } from "../models/notificationModel";



/** Notification Service Class - Manage every Notification related operation */
class NotificationService extends BaseService<INotification> {

    constructor(){
        super(Notification)
    }

}

export default NotificationService;