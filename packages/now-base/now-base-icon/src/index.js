import '../assets/icons.scss';
import imgs from '../assets/images';
import React, { Component } from 'react';

/**
 * @description 聊天 icon
 */
export class IconsChart extends Component {
    render(){
        return (
            <img  src={imgs.live.chart} className="now-base-icons" alt="聊天/chart" {...this.props} />
        )
    }
}

/**
 * @description 美化 icon
 */
export class IconsBeautify extends Component {
    render(){
        return (
            <img  src={imgs.live.beautify} className="now-base-icons" alt="美化/beautify" {...this.props} />
        )
    }
}

/**
 * @description 更多 icon
 */
export class IconsMore extends Component {
    render(){
        return (
            <img  src={imgs.live.more} className="now-base-icons" alt="更多/more" {...this.props} />
        )
    }
}

/**
 * @description 礼物 icon
 */
export class IconsPresent extends Component {
    render(){
        return (
            <img  src={imgs.live.present} className="now-base-icons" alt="礼物/present" {...this.props} />
        )
    }
}

/**
 * @description 私信 icon
 */
export class IconsPriMsg extends Component {
    render(){
        return (
            <img  src={imgs.live.private_msg} className="now-base-icons" alt="私信/private_msg" {...this.props} />
        )
    }
}

/**
 * @description 录屏 record
 */
export class IconsRecord extends Component {
    render(){
        return (
            <img  src={imgs.live.record} className="now-base-icons" alt="录屏/record" {...this.props} />
        )
    }
}

/**
 * @description rotate_camera 旋转镜头
 */
export class IconsRotCamera extends Component {
    render(){
        return (
            <img  src={imgs.live.rotate_camera} className="now-base-icons" alt="旋转镜头/retate_camera" {...this.props} />
        )
    }
}

/**
 * @description share 转发
 */
export class IconsShare extends Component {
    render(){
        return (
            <img  src={imgs.live.share} className="now-base-icons" alt="转发/share" {...this.props} />
        )
    }
}

/******************* 直播分享 icons **********************/


/**
 * @description qq_share qq分享
 */
export class IconsQQShare extends Component {
    render(){
        return (
            <img  src={imgs.liveShare.qq_share} className="now-base-icons" alt="qq分享/QQshare" {...this.props} />
        )
    }
}

/**
 * @description qzone_share qq空间分享
 */
export class IconsQzoneShare extends Component {
    render(){
        return (
            <img  src={imgs.liveShare.qzone_share} className="now-base-icons" alt="qq空间分享/qzone_share" {...this.props} />
        )
    }
}

/**
 * @description wechat_mom_share 微信朋友圈分享
 */
export class IconsFriendsShare extends Component {
    render(){
        return (
            <img  src={imgs.liveShare.wechat_mom_share} className="now-base-icons" alt="微信朋友圈分享/wechat_mom_share" {...this.props} />
        )
    }
}

/**
 * @description wechat_share 微信分享
 */
export class IconsWechatShare extends Component {
    render(){
        return (
            <img  src={imgs.liveShare.wechat_share} className="now-base-icons" alt="wechat_share/微信分享" {...this.props} />
        )
    }
}

/**
 * @description weibo_share 微博分享
 */
export class IconsWeiboShare extends Component {
    render(){
        return (
            <img  src={imgs.liveShare.weibo_share} className="now-base-icons" alt="weibo_share/微博分享" {...this.props} />
        )
    }
}


/**************** 其他页 icons *********************/


/**
 * @description account 账户
 */
export class IconsAccount extends Component {
    render(){
        return (
            <img  src={imgs.others.account} className="now-base-icons" alt="account/账户" {...this.props} />
        )
    }
}

/**
 * @description back 回退
 */
export class IconsBack extends Component {
    render(){
        return (
            <img  src={imgs.others.back} className="now-base-icons" alt="back/回退" {...this.props} />
        )
    }
}

/**
 * @description browser_history 浏览记录
 */
export class IconsBrowHistory extends Component {
    render(){
        return (
            <img  src={imgs.others.browser_history} className="now-base-icons" alt="browser_history/浏览记录" {...this.props} />
        )
    }
}

/**
 * @description change_cover 换封面
 */
export class IconsChangeCover extends Component {
    render(){
        return (
            <img  src={imgs.others.change_cover} className="now-base-icons" alt="change_cover/换封面" {...this.props} />
        )
    }
}

/**
 * @description clear 清除
 */
export class IconsClear extends Component {
    render(){
        return (
            <img  src={imgs.others.clear} className="now-base-icons" alt="clear/清除" {...this.props} />
        )
    }
}

/**
 * @description contri_list 贡献榜
 */
export class IconsContriList extends Component {
    render(){
        return (
            <img  src={imgs.others.contri_list} className="now-base-icons" alt="contri_list/贡献榜" {...this.props} />
        )
    }
}

/**
 * @description emoji 表情
 */
export class IconsEmoji extends Component {
    render(){
        return (
            <img  src={imgs.others.emoji} className="now-base-icons" alt="emoji/表情" {...this.props} />
        )
    }
}

/**
 * @description location 位置
 */
export class IconsLocation extends Component {
    render(){
        return (
            <img  src={imgs.others.location} className="now-base-icons" alt="location/位置" {...this.props} />
        )
    }
}

/**
 * @description menu 菜单
 */
export class IconsMenu extends Component {
    render(){
        return (
            <img  src={imgs.others.menu} className="now-base-icons" alt="menu/菜单" {...this.props} />
        )
    }
}

/**
 * @description private_msg 私信
 */
export class IconsPriMsgOther extends Component {
    render(){
        return (
            <img  src={imgs.others.private_msg} className="now-base-icons" alt="private_msg/私信" {...this.props} />
        )
    }
}

/**
 * @description profile 个人中心
 */
export class IconsProfile extends Component {
    render(){
        return (
            <img  src={imgs.others.profile} className="now-base-icons" alt="profile/个人中心" {...this.props} />
        )
    }
}

/**
 * @description search 搜索
 */
export class IconsSearch extends Component {
    render(){
        return (
            <img  src={imgs.others.search} className="now-base-icons" alt="search/搜索" {...this.props} />
        )
    }
}

/**
 * @description setting 设置
 */
export class IconsSetting extends Component {
    render(){
        return (
            <img  src={imgs.others.setting} className="now-base-icons" alt="setting/设置" {...this.props} />
        )
    }
}

/**
 * @description shut 关闭
 */
export class IconsShut extends Component {
    render(){
        return (
            <img  src={imgs.others.shut} className="now-base-icons" alt="shut/关闭" {...this.props} />
        )
    }
}

/************************************** 辅助 icons ************************/

/**
 * @description realname 实名认证
 */
export class IconsRealName extends Component {
    render(){
        return (
            <img  src={imgs.assist.real_name} className="now-base-icons-assist" alt="realname/实名认证" {...this.props} />
        )
    }
}

/**
 * @description authentic 认证
 */
export class IconsAuth extends Component {
    render(){
        return (
            <img  src={imgs.assist.authentic} className="now-base-icons-assist" alt="authentic/认证" {...this.props} />
        )
    }
}

/**
 * @description female 女
 */
export class IconsFemale extends Component {
    render(){
        return (
            <img  src={imgs.assist.female} className="now-base-icons-small" alt="female/女" {...this.props} />
        )
    }
}

/**
 * @description male 男
 */
export class IconsMale extends Component {
    render(){
        return (
            <img  src={imgs.assist.male} className="now-base-icons-small" alt="male/男" {...this.props} />
        )
    }
}

/**
 * @description now_logo 标识
 */
export class IconsLogo extends Component {
    render(){
        return (
            <img  src={imgs.assist.now_logo} className="now-base-icons-logo" alt="now_logo/标识" {...this.props} />
        )
    }
}


/**
 * @description short_video 短视频
 */
export class IconsShortVideo extends Component {
    render(){
        return (
            <img  src={imgs.assist.short_video} className="now-base-icons-live" alt="short_video/短视频" {...this.props} />
        )
    }
}

/**
 * @description live_room 直播
 */
export class IconsLiveRoom extends Component {
    render(){
        return (
            <img  src={imgs.assist.live_room} className="now-base-icons-live" alt="live_room/直播" {...this.props} />
        )
    }
}

/**
 * @description large_coin 大量金币
 */
export class IconsLargeCoin extends Component {
    render(){
        return (
            <img  src={imgs.assist.large_coin} className="now-base-icons-small" alt="large_coin/大量金币" {...this.props} />
        )
    }
}

/**
 * @description unload_coin 未加载金币
 */
export class IconsUnloadCoin extends Component {
    render(){
        return (
            <img  src={imgs.assist.unload_coin} className="now-base-icons-small" alt="unload_coin/未加载金币" {...this.props} />
        )
    }
}

/**
 * @description small_coin 少量金币
 */
export class IconsSmallCoin extends Component {
    render(){
        return (
            <img  src={imgs.assist.small_coin} className="now-base-icons-small" alt="small_coin/少量金币" {...this.props} />
        )
    }
}

/**
 * @description go_pay 花豆
 */
export class IconsPay extends Component {
    render(){
        return (
            <img  src={imgs.assist.go_pay} className="now-base-icons-small" alt="go_pay/花豆" {...this.props} />
        )
    }
}



