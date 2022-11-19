import { notification } from "antd";
class MyNotifications {

    succesNotification(_text){
        const text = _text != undefined ? _text : "Object";
        notification.success({
          message: `Succes`,
          description:
            `${text} was added with succes`,
          placement:`bottomRight`,
          duration:2.5
        });
      };
}

export default MyNotifications;