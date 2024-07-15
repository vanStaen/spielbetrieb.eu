import React from "react";
import { LinkOutlined } from "@ant-design/icons";
import { pageStore } from "../../../../../store/pageStore/pageStore.js";

import tiktokIco from "../../../../../img/icons/tiktok.ico";
import fetlifeIco from "../../../../../img/icons/fetlife.ico";
import joyclubIco from "../../../../../img/icons/joyclub.ico";
import facebookIco from "../../../../../img/icons/facebook.ico";
import soundcloudIco from "../../../../../img/icons/soundcloud.ico";
import spielbetriebIcoBlue from "../../../../../img/icons/spielbetriebblue.ico";
import spielbetriebIcoBeige from "../../../../../img/icons/spielbetriebbeige.ico";
import instagramIco from "../../../../../img/icons/instagram.png";
import residentadvisorIco from "../../../../../img/icons/residentadvisor.jpg";
import beatportIco from "../../../../../img/icons/beatport.png";
import youtubeIco from "../../../../../img/icons/youtube.ico";
import spotifyIco from "../../../../../img/icons/spotify.png";

export const getIcon = (url) => {

    if (url.includes("tiktok.com")) {
        return <img src={tiktokIco} width="15px" />;
    } else if (url.includes("fetlife.com")) {
        return <img src={fetlifeIco} width="15px" />;
    } else if (url.includes("joyclub.de")) {
        return <img src={joyclubIco} width="15px" />;
    } else if (url.includes("ra.co")) {
        return <img src={residentadvisorIco} width="15px" />;
    } else if (url.includes("facebook.com")) {
        return <img src={facebookIco} width="15px" />;
    } else if (url.includes("soundcloud.com")) {
        return <img src={soundcloudIco} width="15px" />;
    } else if (url.includes("instagram.com")) {
        return <img src={instagramIco} width="15px" />;
    } else if (url.includes("spotify.com")) {
        return <img src={spotifyIco} width="15px" />;
    } else if (url.includes("beatport.com/")) {
        return <img src={beatportIco} width="15px" />;
    } else if (url.includes("youtube.com/")) {
        return <img src={youtubeIco} width="15px" />;
    } else if (
        url.includes("spielbetrieb.eu") &&
        pageStore.selectedTheme === "light"
    ) {
        return <img src={spielbetriebIcoBlue} width="15px" />;
    } else if (
        url.includes("spielbetrieb.eu") &&
        pageStore.selectedTheme === "dark"
    ) {
        return <img src={spielbetriebIcoBeige} width="15px" />;
    } else {
        return <LinkOutlined />;
    }

}