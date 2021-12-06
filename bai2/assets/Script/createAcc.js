// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        tooltipUserName: cc.Label,
        tooltipPw: cc.Label,
        tooltipFullName: cc.Label,
        userNameBox: cc.Node,
        pwBox: cc.Node,
        fullNameBox: cc.Node,
        noti: cc.RichText,
        // _fullName,
    },

    onLoad(){
        this.tooltipUserName.node.active = false;
        this.tooltipPw.node.active = false;
        this.noti.node.active = false;
        this.node.getComponent(cc.Button).interactable = false;
    },

    fullNameCheck(){
        const strFullName = this.fullNameBox.getComponent(cc.EditBox).string;
        if(strFullName.length > 0){
            this.tooltipFullName.node.active = false;
            return true;
        }else {
            this.tooltipFullName.node.active = true;
            this.tooltipFullName.string = "Enter your name";
        }
    }, 
    
    userNameCheck(){
        const str = this.userNameBox.getComponent(cc.EditBox).string;
        if(str.length < 6) {
            this.tooltipUserName.node.active = true;
            this.tooltipUserName.string = "User name must have at least 6 letters";
        }else{
            this.tooltipUserName.node.active = false;
            return true;
        }
    },
        
    passwordCheck(){
        const strPw = this.pwBox.getComponent(cc.EditBox).string;
        if(strPw.match(/[0-9]/gm) && strPw.match(/[A-Z]/gm) && (strPw.length >= 8)){
            this.tooltipPw.node.active = false;
            this.node.getComponent(cc.Button).interactable = true;
            return true;
        } else {
            this.tooltipPw.node.active = true;
            this.tooltipPw.string = "Passwords must have at least 8 letters and \ncontain at least one uppercase letters and one numbers."
        }
    },

    hideToolTip(){
        if(this.userNameBox.getComponent(cc.EditBox).string.length === 0){
            this.tooltipUserName.node.active = false;
        }
        if(this.pwBox.getComponent(cc.EditBox).string.length === 0){
            this.tooltipPw.node.active = false;
        }
    },

    showNoti(){
        const name = this.userNameBox.getComponent(cc.EditBox).string;
        const str = `<color=#0fffff>Chúc mừng </c><color=#00ff00>${name}</c><color=#0fffff> đã đăng ký thành công</color>`;
        this.noti.string = str;
        this.noti.node.active = true;
    },

    sigUpBtn() {
        if(this.userNameCheck() && this.passwordCheck() && this.fullNameCheck()){
            this.showNoti();
        }
    },

});
