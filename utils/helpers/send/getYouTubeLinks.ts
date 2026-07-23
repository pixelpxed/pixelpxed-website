import * as linkify from "linkifyjs";

// YouTube URLs, including YouTube Music, YouTube Mobile.
const YOUTUBE_URL_REGEX =
  /(^(http(s)??\:\/\/)?(www\.|music\.|m\.)?((youtube\.com\/watch\?v=)|(youtu.be\/))([a-zA-Z0-9\-_])+)/;

export default function getYouTubeLinks(string: string) {
  return linkify
    .find(string, "url")
    .filter((item) => YOUTUBE_URL_REGEX.test(item.href));
}
