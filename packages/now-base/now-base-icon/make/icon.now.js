import React, { Component } from 'react'
import { sandboxStore } from '@now-design/sandbox'
import '../assets/index.scss';
import Toast from 'now-base-toast';
import ReactTooltip from 'react-tooltip'
import {IconsChart,IconsBeautify,IconsMore,IconsPresent,IconsPriMsg,IconsRecord,IconsRotCamera,IconsShare
    ,IconsQQShare,IconsQzoneShare,IconsFriendsShare,IconsWechatShare,IconsWeiboShare
    ,IconsAccount,IconsBack,IconsBrowHistory,IconsChangeCover,IconsClear,IconsContriList,IconsEmoji,IconsLocation,IconsMenu,IconsPriMsgOther,IconsProfile,IconsSearch,IconsSetting,IconsShut
    ,IconsRealName,IconsAuth,IconsFemale,IconsMale,IconsLogo,IconsShortVideo,IconsLiveRoom,IconsLargeCoin,IconsUnloadCoin,IconsSmallCoin,IconsPay} from '../src';


export default class IconsWraper extends Component {
    handleCopy(msg,e){
        document.addEventListener('copy',function copy (e) {
            msg = `<${msg}/>`;
            e.clipboardData.setData('text/plain', msg);
            e.preventDefault();
        })
        document.execCommand('copy');
        document.removeEventListener('copy','copy');
        this.setState({
            content:'复制成功',
            type:'success',
            callback:()=>{}
        });
    }
    render() {
        return (
            <article className="now-icons-container">
                <section>
                    <h3>直播页icon</h3>
                    <section className="now-icons-section">
                        <IconsChart onClick={this.handleCopy.bind(this,'IconsChart')}  data-tip  data-for="IconsChart" />
                        <IconsBeautify onClick={this.handleCopy.bind(this,'IconsBeautify')}  data-tip  data-for="IconsBeautify" />
                        <IconsMore onClick={this.handleCopy.bind(this,'IconsMore')}  data-tip  data-for="IconsMore" />
                        <IconsPresent onClick={this.handleCopy.bind(this,'IconsPresent')} data-tip  data-for="IconsPresent" />
                        <IconsPriMsg onClick={this.handleCopy.bind(this,'IconsPriMsg')} data-tip  data-for="IconsPriMsg" />
                        <IconsRecord onClick={this.handleCopy.bind(this,'IconsRecord')} data-tip  data-for="IconsRecord" />
                        <IconsRotCamera onClick={this.handleCopy.bind(this,'IconsRotCamera')} data-tip  data-for="IconsRotCamera" />
                        <IconsShare onClick={this.handleCopy.bind(this,'IconsShare')} data-tip  data-for="IconsShare" />

                        <ReactTooltip id="IconsChart" >
                            <span>IconsChart</span>
                        </ReactTooltip>
                        <ReactTooltip id="IconsBeautify" >
                            <span>IconsBeautify</span>
                        </ReactTooltip>
                        <ReactTooltip id="IconsMore" >
                            <span>IconsMore</span>
                        </ReactTooltip>
                        <ReactTooltip id="IconsPresent" >
                            <span>IconsPresent</span>
                        </ReactTooltip>
                        <ReactTooltip id="IconsPriMsg" >
                            <span>IconsPriMsg</span>
                        </ReactTooltip>
                        <ReactTooltip id="IconsRecord" >
                            <span>IconsRecord</span>
                        </ReactTooltip>
                        <ReactTooltip id="IconsRotCamera" >
                            <span>IconsRotCamera</span>
                        </ReactTooltip>
                        <ReactTooltip id="IconsShare" >
                            <span>IconsShare</span>
                        </ReactTooltip>
                    </section>
                </section>
                <section>
                    <h3>直播页分享icon</h3>
                    <section className="now-icons-section">
                        <IconsQQShare onClick={this.handleCopy.bind(this,'IconsQQShare')} data-tip data-for="IconsQQShare"/>
                        <IconsQzoneShare onClick={this.handleCopy.bind(this,'IconsQzoneShare')} data-tip data-for="IconsQzoneShare"/>
                        <IconsFriendsShare onClick={this.handleCopy.bind(this,'IconsFriendsShare')} data-tip data-for="IconsFriendsShare"/>
                        <IconsWechatShare onClick={this.handleCopy.bind(this,'IconsWechatShare')} data-tip data-for="IconsWechatShare"/>
                        <IconsWeiboShare onClick={this.handleCopy.bind(this,'IconsWeiboShare')} data-tip data-for="IconsWeiboShare"/>

                        <ReactTooltip id="IconsQQShare">
                            <span>IconsQQShare</span>
                        </ReactTooltip>
                        <ReactTooltip id="IconsQzoneShare">
                            <span>IconsQzoneShare</span>
                        </ReactTooltip>
                        <ReactTooltip id="IconsFriendsShare">
                            <span>IconsFriendsShare</span>
                        </ReactTooltip>
                        <ReactTooltip id="IconsWechatShare">
                            <span>IconsWechatShare</span>
                        </ReactTooltip>
                        <ReactTooltip id="IconsWeiboShare">
                            <span>IconsWeiboShare</span>
                        </ReactTooltip>
                    </section>
                </section>
                <section>
                    <h3>其他页面icon</h3>
                    <section className="now-icons-section">
                        <IconsAccount onClick={this.handleCopy.bind(this,'IconsAccount')}  data-tip  data-for="IconsAccount" />
                        <IconsBack onClick={this.handleCopy.bind(this,'IconsBack')} data-tip  data-for="IconsBack" />
                        <IconsBrowHistory onClick={this.handleCopy.bind(this,'IconsBrowHistory')} data-tip  data-for="IconsBrowHistory" />
                        <IconsChangeCover onClick={this.handleCopy.bind(this,'IconsChangeCover')} data-tip  data-for="IconsChangeCover" />
                        <IconsClear onClick={this.handleCopy.bind(this,'IconsClear')} data-tip  data-for="IconsClear" />
                        <IconsContriList onClick={this.handleCopy.bind(this,'IconsContriList')} data-tip  data-for="IconsContriList" />
                        <IconsEmoji onClick={this.handleCopy.bind(this,'IconsEmoji')} data-tip  data-for="IconsEmoji" />
                        <IconsLocation onClick={this.handleCopy.bind(this,'IconsLocation')} data-tip  data-for="IconsLocation" />
                        <IconsMenu onClick={this.handleCopy.bind(this,'IconsMenu')} data-tip data-for="IconsMenu"/>
                        <IconsPriMsgOther onClick={this.handleCopy.bind(this,'IconsPriMsgOther')} data-tip data-for="IconsPriMsgOther"/>
                        <IconsProfile onClick={this.handleCopy.bind(this,'IconsProfile')} data-tip data-for="IconsProfile"/>
                        <IconsSearch onClick={this.handleCopy.bind(this,'IconsSearch')} data-tip data-for="IconsSearch"/>
                        <IconsSetting onClick={this.handleCopy.bind(this,'IconsSetting')} data-tip data-for="IconsSetting"/>
                        <IconsShut onClick={this.handleCopy.bind(this,'IconsShut')} data-tip data-for="IconsShut"/>

                        <ReactTooltip id="IconsAccount" >
                            <span>IconsAccount</span>
                        </ReactTooltip>
                        <ReactTooltip id="IconsBack" >
                            <span>IconsBack</span>
                        </ReactTooltip>
                        <ReactTooltip id="IconsBrowHistory" >
                            <span>IconsBrowHistory</span>
                        </ReactTooltip>
                        <ReactTooltip id="IconsChangeCover" >
                            <span>IconsChangeCover</span>
                        </ReactTooltip>
                        <ReactTooltip id="IconsClear" >
                            <span>IconsClear</span>
                        </ReactTooltip>
                        <ReactTooltip id="IconsContriList" >
                            <span>IconsContriList</span>
                        </ReactTooltip>
                        <ReactTooltip id="IconsEmoji" >
                            <span>IconsEmoji</span>
                        </ReactTooltip>
                        <ReactTooltip id="IconsLocation" >
                            <span>IconsLocation</span>
                        </ReactTooltip>
                        <ReactTooltip id="IconsMenu">
                            <span>IconsMenu</span>
                        </ReactTooltip>
                        <ReactTooltip id="IconsPriMsgOther">
                            <span>IconsPriMsgOther</span>
                        </ReactTooltip>
                        <ReactTooltip id="IconsProfile">
                            <span>IconsProfile</span>
                        </ReactTooltip>
                        <ReactTooltip id="IconsSearch">
                            <span>IconsSearch</span>
                        </ReactTooltip>
                        <ReactTooltip id="IconsSetting">
                            <span>IconsSetting</span>
                        </ReactTooltip>
                        <ReactTooltip id="IconsShut">
                            <span>IconsShut</span>
                        </ReactTooltip>
                    </section>
                </section>
                <section>
                    <h3>辅助icon</h3>
                    <section className="now-icons-section">
                        <IconsFemale onClick={this.handleCopy.bind(this,'IconsFemale')} data-tip data-for="IconsFemale"/>
                        <IconsMale onClick={this.handleCopy.bind(this,'IconsMale')} data-tip data-for="IconsMale"/>
                        <IconsLargeCoin onClick={this.handleCopy.bind(this,'IconsLargeCoin')} data-tip data-for="IconsLargeCoin"/>
                        <IconsUnloadCoin onClick={this.handleCopy.bind(this,'IconsUnloadCoin')} data-tip data-for="IconsUnloadCoin"/>
                        <IconsSmallCoin onClick={this.handleCopy.bind(this,'IconsSmallCoin')} data-tip data-for="IconsSmallCoin"/>
                        <IconsPay onClick={this.handleCopy.bind(this,'IconsPay')} data-tip data-for="IconsPay"/>
                        <IconsRealName onClick={this.handleCopy.bind(this,'IconsRealName')} data-tip data-for="IconsRealName"/>
                        <IconsAuth onClick={this.handleCopy.bind(this,'IconsAuth')} data-tip data-for="IconsAuth"/>

                        <ReactTooltip id="IconsFemale">
                            <span>IconsFemale</span>
                        </ReactTooltip>
                        <ReactTooltip id="IconsMale">
                            <span>IconsMale</span>
                        </ReactTooltip>
                        <ReactTooltip id="IconsLargeCoin">
                            <span>IconsLargeCoin</span>
                        </ReactTooltip>
                        <ReactTooltip id="IconsUnloadCoin">
                            <span>IconsUnloadCoin</span>
                        </ReactTooltip>
                        <ReactTooltip id="IconsSmallCoin">
                            <span>IconsSmallCoin</span>
                        </ReactTooltip>
                        <ReactTooltip id="IconsPay">
                            <span>IconsPay</span>
                        </ReactTooltip>
                        <ReactTooltip id="IconsRealName">
                            <span>IconsRealName</span>
                        </ReactTooltip>
                        <ReactTooltip id="IconsAuth">
                            <span>IconsAuth</span>
                        </ReactTooltip>

                    </section>
                    <section className="now-icons-section">
                        <IconsLogo onClick={this.handleCopy.bind(this,'IconsLogo')} data-tip data-for="IconsLogo"/>
                        <IconsShortVideo onClick={this.handleCopy.bind(this,'IconsShortVideo')} data-tip data-for="IconsShortVideo"/>
                        <IconsLiveRoom onClick={this.handleCopy.bind(this,'IconsLiveRoom')} data-tip data-for="IconsLiveRoom"/>

                        <ReactTooltip id="IconsLogo">
                            <span>IconsLogo</span>
                        </ReactTooltip>
                        <ReactTooltip id="IconsShortVideo">
                            <span>IconsShortVideo</span>
                        </ReactTooltip>
                        <ReactTooltip id="IconsLiveRoom">
                            <span>IconsLiveRoom</span>
                        </ReactTooltip>
                    </section>
                </section>
                <Toast {...this.state} />
            </article>
        )
    }
}
sandboxStore.add('icons', IconsWraper);


