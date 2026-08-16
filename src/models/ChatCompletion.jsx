// Ref: https://platform.openai.com/docs/api-reference/chat/create
export var Role;
(function (Role) {
    Role["System"] = "system";
    Role["User"] = "user";
    Role["Assistant"] = "assistant";
})(Role || (Role = {}));
export function getRole(roleString) {
    return Role[roleString];
}
export var MessageType;
(function (MessageType) {
    MessageType["Normal"] = "normal";
    MessageType["Error"] = "error";
})(MessageType || (MessageType = {}));
export function getMessageType(messageTypeString) {
    return MessageType[messageTypeString];
}
