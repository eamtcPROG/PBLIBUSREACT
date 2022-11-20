import { notification } from "antd";
class MyNotifications {

    succesNotification(_text,_action){
        const text = _text != undefined ? _text : "Object";
        const action = _action != undefined ? _action : "added";
        notification.success({
          message: `Succes`,
          description:
            `${text} was ${action} with succes`,
          placement:`bottomRight`,
          duration:2.5
        });
      };
}

export default MyNotifications;