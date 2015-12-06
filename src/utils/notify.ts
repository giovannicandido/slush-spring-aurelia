import 'uikit';
import 'uikit/js/components/notify.js';
export enum NotifyStatus {INFO,SUCCESS, WARNING, DANGER}
export enum NotifyPosition {TOP_CENTER, TOP_LEFT, TOP_RIGHT, BOTTOM_CENTER, BOTTOM_LEFT, BOTTOM_RIGHT}
export class Notify {
    static show(message: string, status: NotifyStatus = NotifyStatus.INFO, timeout = 5000,
                pos: NotifyPosition =  NotifyPosition.TOP_CENTER){
        UIkit.notify(message, {status: Notify.getStatusString(status), pos: Notify.getPositionString(pos),
            timeout: timeout})
    }
    private static getStatusString(status: NotifyStatus): string {
        switch (status) {
            case NotifyStatus.INFO:
                return "info";
                break;
            case NotifyStatus.DANGER:
                return "danger";
                break;
            case NotifyStatus.SUCCESS:
                return "success";
                break;
            case NotifyStatus.WARNING:
                return "warning";
                break;
        }
    }
    private static getPositionString(position: NotifyPosition): string {
        switch (position) {
            case NotifyPosition.BOTTOM_CENTER:
                return "bottom-center";
                break;
            case NotifyPosition.BOTTOM_LEFT:
                return "bottom-left";
                break;
            case NotifyPosition.BOTTOM_RIGHT:
                return "bottom-right";
                break;
            case NotifyPosition.TOP_CENTER:
                return "top-center";
                break;
            case NotifyPosition.TOP_LEFT:
                return "top-left";
                break;
            case NotifyPosition.TOP_RIGHT:
                return "top-right";
                break;

        }
    }
}
export interface DialogModal {
    show()
    hide()
}
export class Dialog {
    static confirm(message: string, fn: () => any){
        UIkit.modal.confirm(message, fn)
    }
    static alert(message: string){
        UIkit.modal.alert(message);
    }
    static modal(selector: string): DialogModal{
        return UIkit.modal(selector)
    }
}
